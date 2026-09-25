#!/usr/bin/env node
/**
 * Records the Work section previews from the live client sites.
 *
 * For each site: load at 1440x900, let the intro settle, save the first
 * screen as a poster, then record a smooth scroll top to bottom and encode
 * it to a muted, looping MP4 (H.264) and WebM (VP9), each under 3 MB.
 *
 *   node scripts/capture-work.mjs                 # all sites
 *   node scripts/capture-work.mjs garnerhall      # one site
 *   node scripts/capture-work.mjs tab-eater=https://example.com   # override a URL
 *
 * Needs ffmpeg with libx264 and libvpx-vp9 on PATH (or FFMPEG=/path/to/ffmpeg).
 * Output goes to public/work/ (or OUT_DIR). Frames are captured through the
 * DevTools screencast as high-quality JPEGs so the only lossy encode is ours.
 */
import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const SITES = {
  garnerhall: "https://garnerhall.com",
  "tab-eater": "https://tabeater.app",
};

const VIEWPORT = { width: 1440, height: 900 };
const SETTLE_MS = 2500;      // intro animations land before the poster
const HOLD_START_MS = 1000;  // loop restarts on a still first screen
const SCROLL_MS = 8500;      // top to bottom
const HOLD_END_MS = 700;
const FPS = 30;
const MAX_BYTES = 3 * 1024 * 1024;
const OUT_DIR = path.resolve(process.env.OUT_DIR || "public/work");
const FFMPEG = process.env.FFMPEG || "ffmpeg";

const sleep = ms => new Promise(r => setTimeout(r, ms));

function ffmpeg(args) {
  const r = spawnSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.error) throw new Error(`Could not run ffmpeg (${FFMPEG}): ${r.error.message}`);
  if (r.status !== 0) throw new Error(`ffmpeg exited with ${r.status}`);
}

function selectSites(argv) {
  if (!argv.length) return Object.entries(SITES);
  return argv.map(arg => {
    const [name, url] = arg.split(/=(.*)/s);
    if (!url && !SITES[name]) throw new Error(`Unknown site "${name}". Known: ${Object.keys(SITES).join(", ")}`);
    return [name, url || SITES[name]];
  });
}

async function capture(browser, name, url, tmp) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  const page = await context.newPage();
  console.log(`\n${name}: loading ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 }).catch(() => page.waitForLoadState("load"));
  await sleep(SETTLE_MS);

  const poster = path.join(OUT_DIR, `${name}.jpg`);
  await page.screenshot({ path: poster, type: "jpeg", quality: 82 });

  const frames = [];
  const cdp = await context.newCDPSession(page);
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    frames.push({ data, t: metadata.timestamp });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: VIEWPORT.width, maxHeight: VIEWPORT.height, everyNthFrame: 1 });
  const tStart = Date.now() / 1000;

  await sleep(HOLD_START_MS);
  const scrolled = await page.evaluate(async ms => {
    const el = document.scrollingElement || document.documentElement;
    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    await new Promise(done => {
      const t0 = performance.now();
      const step = now => {
        const p = Math.min(1, (now - t0) / ms);
        // re-read the height each frame so lazily growing pages still reach the end
        scrollTo({ top: (el.scrollHeight - innerHeight) * ease(p), behavior: "instant" });
        p < 1 ? requestAnimationFrame(step) : done();
      };
      requestAnimationFrame(step);
    });
    return el.scrollHeight - innerHeight;
  }, SCROLL_MS);
  await sleep(HOLD_END_MS);

  const tEnd = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await context.close();

  if (scrolled < 10) console.warn(`${name}: page did not scroll (it may scroll an inner element); video will be static`);
  if (!frames.length) throw new Error(`${name}: no frames captured`);

  // Screencast frames arrive unevenly (and only when the screen changes), so
  // resample to a constant rate: each output tick shows the latest frame.
  frames.sort((a, b) => a.t - b.t);
  const count = Math.round((tEnd - tStart) * FPS);
  let src = 0;
  for (let k = 0; k < count; k++) {
    const t = tStart + k / FPS;
    while (src + 1 < frames.length && frames[src + 1].t <= t) src++;
    await fs.writeFile(path.join(tmp, `${name}-${String(k).padStart(5, "0")}.jpg`), Buffer.from(frames[src].data, "base64"));
  }
  console.log(`${name}: ${frames.length} frames captured over ${(tEnd - tStart).toFixed(1)}s, scrolled ${scrolled}px`);
  return path.join(tmp, `${name}-%05d.jpg`);
}

async function encode(name, pattern) {
  const input = ["-framerate", String(FPS), "-i", pattern, "-vf", "format=yuv420p", "-an"];
  const targets = [
    { ext: "mp4", crfs: [20, 23, 26, 29, 32, 35], args: crf => ["-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-crf", crf, "-movflags", "+faststart"] },
    { ext: "webm", crfs: [32, 36, 40, 44, 48], args: crf => ["-c:v", "libvpx-vp9", "-crf", crf, "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2"] },
  ];
  for (const { ext, crfs, args } of targets) {
    const out = path.join(OUT_DIR, `${name}.${ext}`);
    let size = Infinity, used;
    // lowest CRF (best quality) that fits the budget
    for (const crf of crfs) {
      ffmpeg([...input, ...args(String(crf)), out]);
      size = (await fs.stat(out)).size;
      used = crf;
      if (size <= MAX_BYTES) break;
    }
    const mb = (size / 1024 / 1024).toFixed(2);
    if (size > MAX_BYTES) console.warn(`${name}.${ext}: still ${mb} MB at CRF ${used}`);
    else console.log(`${name}.${ext}: ${mb} MB (CRF ${used})`);
  }
}

const sites = selectSites(process.argv.slice(2));
await fs.mkdir(OUT_DIR, { recursive: true });
const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "capture-work-"));
const browser = await chromium.launch();
try {
  for (const [name, url] of sites) await encode(name, await capture(browser, name, url, tmp));
} finally {
  await browser.close();
  await fs.rm(tmp, { recursive: true, force: true });
}
console.log(`\nSaved to ${path.relative(process.cwd(), OUT_DIR) || "."}/`);
