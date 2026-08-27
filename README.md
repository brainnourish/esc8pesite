# esc8pe.media

Partnerships site for Escape Reality (@esc8pe). Next.js 15 App Router, TypeScript,
Tailwind v4. Static, no database, no API routes. Same black-and-white system as the media kit.

The page is built to sell. A brand that types the domain after a cold email lands on proof,
formats, process and a way to get in touch. Instagram is a secondary link in the header and
footer rather than a feature.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

```bash
npx vercel        # first run links the project
npx vercel --prod
```

Then in the Vercel dashboard: Settings > Domains > add `esc8pe.media`, and point the
apex A record and the `www` CNAME at Vercel as instructed there.

Important: adding the domain to Vercel does **not** touch your Google Workspace MX records.
Web and mail are separate record types. Do not let any registrar "reset to defaults"
prompt wipe your MX, SPF, DKIM or DMARC entries.

## Editing the page

Everything editable lives in **`app/site.config.ts`**. You should not need to touch
`page.tsx` for routine updates.

- `stats` — the four headline numbers in the strip. Refresh monthly from Insights.
- `proof` — the four secondary numbers in the partnerships block.
- `formats` — the partnership formats. Deliberately no public pricing; rates are quoted
  per campaign over email.
- `process` — the five campaign steps in the How it runs row.
- `email`, `instagram`, `mediaKit`, `window` — self-explanatory.

## Assets in `public/`

| File | Purpose |
|---|---|
| `logo.png` | White falling-figure mark, transparent background |
| `og.png` | 1200x630 social share card |
| `escape-reality-media-kit.pdf` | Linked by the Download media kit button |

The media kit shipped here is the **no-rates** version, which is the right one for a
public page. Replace the file in `public/` whenever you refresh the kit, keeping the
same filename so the link never breaks.

## Fonts

Archivo and Instrument Sans are self-hosted through `@fontsource`, so the page makes no
request to Google Fonts. That is faster, avoids a render-blocking third-party request,
and keeps the page working regardless of network policy.

## Monthly upkeep

1. Pull the last 30 days from Instagram Insights.
2. Update `stats`, `proof` and `window` in `app/site.config.ts`.
3. Drop the refreshed media kit PDF into `public/`.
4. Commit and push. Vercel redeploys automatically.
