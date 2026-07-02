import { stats } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

export function Platform() {
  return (
    <section id="platform" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="grid-lines relative overflow-hidden rounded-[28px] border border-ink-line bg-ink text-white">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle, #00bbff 0%, transparent 70%)",
              }}
            />

            <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  The platform underneath
                </div>
                <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-[44px]">
                  Built to run real work, at scale, under 1 second.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                  Every agent we ship runs on our edge orchestration layer —
                  event-driven, observable, and fault-tolerant. Fast enough for
                  live conversations, reliable enough for production.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-pill bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[0.98]"
                  >
                    Book a call
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-pill border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
                  >
                    See it live
                  </a>
                </div>
              </div>

              {/* latency compare card */}
              <div className="rounded-card border border-ink-line bg-ink-soft p-6">
                <div className="mb-6 font-mono text-[11px] uppercase tracking-widest text-white/40">
                  // end-to-end latency
                </div>
                <LatencyRow label="von Neumann edge" value="~500ms – 1.5s" pct={35} accent="#00bbff" />
                <LatencyRow label="Typical cloud stack" value="~1500 – 2500ms" pct={82} accent="#3a3a3a" />

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-ink-soft p-4">
                      <div className="text-2xl font-semibold tracking-tight">
                        {s.value}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-white/40">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LatencyRow({
  label,
  value,
  pct,
  accent,
}: {
  label: string;
  value: string;
  pct: number;
  accent: string;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-xs text-white/50">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: accent }}
        />
      </div>
    </div>
  );
}
