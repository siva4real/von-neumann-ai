import { manifesto } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-white md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px]"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, #ffab2a, #bb88ff, #00bbff, #77dddd, #ffab2a)",
        }}
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span className="spectrum-bar h-1.5 w-1.5 rounded-full" />
            Manifesto
          </div>
          <div className="space-y-2">
            {manifesto.lines.map((line, i) => (
              <Reveal key={line} delay={i * 0.08}>
                <p
                  className={`text-balance text-2xl font-medium leading-snug tracking-tight md:text-[34px] ${
                    i === manifesto.lines.length - 1
                      ? "spectrum-text"
                      : "text-white/85"
                  }`}
                >
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
