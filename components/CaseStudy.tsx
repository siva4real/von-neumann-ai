import { caseStudy } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

export function CaseStudy() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 md:p-12">
                <div className="eyebrow mb-6">{caseStudy.eyebrow}</div>
                <div className="text-2xl font-semibold tracking-tight text-secondary">
                  {caseStudy.client}
                </div>
                <p className="mt-4 max-w-lg text-balance text-2xl font-medium leading-snug tracking-tight md:text-[28px]">
                  {caseStudy.body}
                </p>

                <div className="mt-9 grid max-w-md grid-cols-3 gap-6">
                  {caseStudy.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="spectrum-text text-3xl font-semibold tracking-tight md:text-4xl">
                        {m.value}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="btn-ghost mt-9"
                >
                  Read the case study
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* visual panel */}
              <div className="grid-lines relative min-h-[280px] bg-ink p-8 text-white">
                <div className="flex h-full flex-col justify-between font-mono text-[13px]">
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="h-1.5 w-1.5 animate-pulseline rounded-full bg-emerald-400" />
                    support-fleet · 12 agents
                  </div>
                  <div className="space-y-2.5">
                    <Bubble side="in" text="Where's my order #40982?" />
                    <Bubble side="out" text="Shipped — arriving Thu. Tracking sent ✦" />
                    <Bubble side="in" text="Can I change the address?" />
                    <Bubble side="out" text="Updated. Flagged for human review." />
                  </div>
                  <div className="text-white/40">resolved in 820ms · 0 escalations</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Bubble({ side, text }: { side: "in" | "out"; text: string }) {
  const out = side === "out";
  return (
    <div className={`flex ${out ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[12px] leading-snug ${
          out
            ? "bg-cyan/15 text-cyan"
            : "bg-white/10 text-white/80"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
