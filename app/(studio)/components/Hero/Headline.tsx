"use client";

import { Fragment, useEffect, useRef } from "react";

// Letters are split at render time; the effect only drives their wdth axis.
export function Headline({ id, text }: { id: string; text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.trim().split(" ");

  useEffect(() => {
    const h = ref.current;
    if (!h) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const chars = [...h.querySelectorAll<HTMLElement>(".c")];

    // intro: condensed to normal, once
    const timers: number[] = [];
    if (reduce) chars.forEach(c => c.classList.remove("intro"));
    else chars.forEach((c, i) => timers.push(window.setTimeout(() => c.classList.remove("intro"), 120 + i * 28)));

    // width responds to cursor
    if (!fine || reduce) return () => timers.forEach(clearTimeout);
    let raf = 0, mx = -9999, my = -9999;
    const update = () => {
      raf = 0;
      for (const c of chars) {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / 260);
        c.style.setProperty("--w", (100 + t * 25).toFixed(1));
      }
    };
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(update); };
    const onLeave = () => { mx = my = -9999; if (!raf) raf = requestAnimationFrame(update); };
    const hero = h.closest(".hero");
    addEventListener("pointermove", onMove, { passive: true });
    hero?.addEventListener("pointerleave", onLeave);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      hero?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <h1 className="headline" id={id} ref={ref} aria-label={text.trim()}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="w" aria-hidden="true">
            {[...w].map((c, j) => <span className="c intro" key={j}>{c}</span>)}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
