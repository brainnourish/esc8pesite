import Image from "next/image";
import { site } from "./site.config";

const arc = { fontFamily: "var(--font-archivo), system-ui, sans-serif" } as const;

function Mark({ size = 26 }: { size?: number }) {
  return (
    <Image src="/logo.png" alt="" width={size} height={size} priority
      style={{ height: size, width: "auto" }} />
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 style={arc} className="shrink-0 text-[0.7rem] font-bold uppercase tracking-[0.2em]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-[var(--color-rule)]" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1080px] px-6 sm:px-10">

      {/* ---------- header ---------- */}
      <header className="rule-b flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <Mark size={22} />
          <span style={arc} className="whitespace-nowrap text-[0.72rem] font-extrabold tracking-[0.13em] sm:text-[0.82rem]">
            ESCAPE REALITY
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer"
            className="lbl hidden transition-colors hover:text-white sm:inline">Instagram</a>
          <a href={`mailto:${site.email}?subject=Partnership%20enquiry`} className="lbl whitespace-nowrap transition-colors hover:text-white">Work with us</a>
        </nav>
      </header>

      {/* ---------- hero ---------- */}
      <section className="pt-16 pb-14 sm:pt-20 sm:pb-16">
        <Mark size={64} />
        <h1 style={arc}
          className="mt-9 text-[3rem] font-black uppercase leading-[0.94] tracking-[0.04em] sm:text-[4.5rem]">
          esc8pe<br />Reality
        </h1>
        <p style={arc} className="mt-6 text-[0.72rem] font-medium uppercase tracking-[0.36em] text-[var(--color-g60)]">
          {site.handle}
        </p>
        <div className="mt-8 h-0.5 w-11 bg-white" />
        <p className="mt-8 max-w-[34rem] text-[1.05rem] leading-[1.62] text-[var(--color-g80)]">
          A media brand for young people who live in{" "}
          <strong className="font-semibold text-white">gaming, technology, nostalgia and internet culture</strong>.
          Launched fifty days ago.{" "}
          <strong className="font-semibold text-white">60 million views last month</strong> against 113,000 followers.
        </p>
        <a href={`mailto:${site.email}?subject=Partnership%20enquiry`} style={arc}
          className="mt-9 inline-flex items-center gap-3 whitespace-nowrap bg-white px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-80">
          Work with us
        </a>
      </section>

      {/* ---------- stat strip ---------- */}
      <section className="statgrid rule-t grid grid-cols-2 md:grid-cols-4">
        {site.stats.map((s) => (
          <div key={s.label} className="px-5 py-7 first:pl-0 md:last:pr-0">
            <div style={arc} className="tnum text-[1.75rem] font-extrabold leading-none tracking-[-0.045em] sm:text-[2rem]">
              {s.value}
            </div>
            <div className="lbl mt-2.5">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ---------- work with us ---------- */}
      <section id="work" className="scroll-mt-8 pt-24">
        <SectionHead>Work with us</SectionHead>

        <h3 style={arc}
          className="max-w-[16ch] text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[3.4rem]">
          We do not run shoutouts.
        </h3>
        <p className="mt-7 max-w-[42rem] text-[1.05rem] leading-[1.65] text-[var(--color-g80)]">
          We build your product into a piece of content that works on its own, so the integration
          performs like organic instead of tanking the post. Concept, script and edit are handled in
          house. You get a hook back within 48 hours and a full performance report at 72 hours and
          7 days.
        </p>

        <div className="statgrid rule-t mt-12 grid grid-cols-2 md:grid-cols-4">
          {site.proof.map((p) => (
            <div key={p.label} className="px-5 py-7 first:pl-0 md:last:pr-0">
              <div style={arc} className="tnum text-[1.5rem] font-extrabold leading-none tracking-[-0.042em]">
                {p.value}
              </div>
              <div className="lbl mt-2.5">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- formats ---------- */}
      <section className="pt-20">
        <SectionHead>Formats</SectionHead>
        <div className="fmtgrid grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {site.formats.map((f) => (
            <div key={f.name} className="py-5">
              <div style={arc} className="text-[1rem] font-bold tracking-[-0.015em]">{f.name}</div>
              <p className="mt-2 min-h-[2.5rem] text-[0.88rem] leading-snug text-[var(--color-g60)]">{f.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[42rem] text-[0.88rem] leading-relaxed text-[var(--color-g45)]">
          Rates are quoted per campaign against your goal and launch window. Paid usage rights,
          whitelisting and category exclusivity are all available.
        </p>
      </section>

      {/* ---------- process ---------- */}
      <section className="pt-20">
        <SectionHead>How it runs</SectionHead>
        <ol className="procgrid rule-t grid grid-cols-2 md:grid-cols-5">
          {site.process.map((s) => (
            <li key={s.step} className="px-5 py-7 first:pl-0 md:last:pr-0">
              <div className="lbl">{s.step}</div>
              <div style={arc} className="mt-3 text-[1rem] font-bold tracking-[-0.015em]">{s.name}</div>
              <p className="mt-2 text-[0.82rem] leading-snug text-[var(--color-g45)]">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- closing CTA ---------- */}
      <section className="pt-20">
        <div className="bg-white px-8 py-12 text-black sm:px-12 sm:py-14">
          <p style={arc} className="text-[0.68rem] font-bold uppercase tracking-[0.235em] text-black/45">
            Availability
          </p>
          <h3 style={arc}
            className="mt-5 max-w-[18ch] text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem]">
            Two campaign slots open each month.
          </h3>
          <p className="mt-5 max-w-[36rem] text-[1rem] leading-[1.6] text-black/65">
            Send the product and the launch window. We will come back with a concept and pricing
            before you commit to anything.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${site.email}?subject=Partnership%20enquiry`} style={arc}
              className="inline-flex items-center justify-center whitespace-nowrap bg-black px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-80">
              {site.email}
            </a>
            <a href={site.mediaKit} target="_blank" rel="noopener noreferrer" style={arc}
              className="inline-flex items-center justify-center whitespace-nowrap border border-black/25 px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-colors hover:border-black">
              Download media kit
            </a>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="rule-t mt-24 flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Mark size={16} />
          <span className="lbl">Escape Reality</span>
        </div>
        <div className="flex items-center gap-6">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer"
            className="lbl transition-colors hover:text-white">{site.handle}</a>
          <span className="lbl">Insights: {site.window}</span>
        </div>
      </footer>
    </main>
  );
}
