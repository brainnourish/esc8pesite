import type { Metadata } from "next";
import Image from "next/image";
import { site } from "../site.config";
import { categories } from "./data";

const arc = { fontFamily: "var(--font-archivo), system-ui, sans-serif" } as const;

export const metadata: Metadata = {
  title: "50 free websites",
  description: "The best 50 free, beautiful, useful websites. From Esc8pe Reality.",
  openGraph: {
    title: "50 free websites · Escape Reality",
    description: "The best 50 free, beautiful, useful websites. Tap any name to open it.",
    url: `${site.url}/50`,
    siteName: "Escape Reality",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function FiftyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[1080px] px-6 sm:px-10">
      <header className="rule-b flex items-center justify-between py-6">
        <a href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={22} height={22} priority
            style={{ height: 22, width: "auto" }} />
          <span style={arc} className="whitespace-nowrap text-[0.72rem] font-extrabold tracking-[0.13em] sm:text-[0.82rem]">
            ESC8PE REALITY
          </span>
        </a>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer"
          className="lbl transition-colors hover:text-white">{site.handle}</a>
      </header>

      <section className="pt-14 pb-10 sm:pt-20 sm:pb-14">
        <p style={arc} className="text-[0.72rem] font-medium uppercase tracking-[0.36em] text-[var(--color-g60)]">
          {site.handle}
        </p>
        <h1 style={arc}
          className="mt-6 max-w-[12ch] text-[2.6rem] font-black uppercase leading-[0.94] tracking-[0.04em] sm:text-[4rem]">
          50 free websites
        </h1>
        <p className="mt-7 max-w-[32rem] text-[1.05rem] leading-[1.62] text-[var(--color-g80)]">
          The best free, beautiful, useful websites. Tap any name to open it.
        </p>
      </section>

      {categories.map((cat) => (
        <section key={cat.name} className="pt-6 pb-4">
          <div className="mb-4 flex items-center gap-4">
            <h2 style={arc} className="shrink-0 text-[0.7rem] font-bold uppercase tracking-[0.2em]">
              {cat.name}
            </h2>
            <div className="h-px flex-1 bg-[var(--color-rule)]" />
          </div>
          <ul>
            {cat.sites.map((s) => (
              <li key={s.n} className="rule-t">
                <a href={`https://${s.host}`} target="_blank" rel="noopener noreferrer"
                  className="flex gap-4 py-5 transition-colors hover:text-white">
                  <span style={arc} className="w-8 shrink-0 text-[0.72rem] font-bold tracking-[0.08em] text-[var(--color-g45)]">
                    {s.n}
                  </span>
                  <span className="min-w-0">
                    <span style={arc} className="block text-[1rem] font-bold tracking-[-0.015em] underline-offset-2">
                      {s.host}
                    </span>
                    <span className="mt-1 block text-[0.88rem] leading-snug text-[var(--color-g60)]">
                      {s.detail}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="pt-16 pb-20">
        <div className="bg-white px-8 py-12 text-black sm:px-12 sm:py-14">
          <p style={arc} className="text-[0.68rem] font-bold uppercase tracking-[0.235em] text-black/45">
            Have any suggestions?
          </p>
          <h3 style={arc}
            className="mt-5 max-w-[16ch] text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-[2.4rem]">
            Reply and tell us what to add.
          </h3>
          <p className="mt-5 max-w-[32rem] text-[1rem] leading-[1.6] text-black/65">
            Send this to someone who would also use these.
          </p>
        </div>
      </section>
    </main>
  );
}
