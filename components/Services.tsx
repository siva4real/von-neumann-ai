import { services } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Check } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">{services.eyebrow}</div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {services.title}
          </h2>
          <p className="mt-5 text-lg text-secondary">{services.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-8 transition-colors hover:border-primary/15 md:p-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-canvas text-primary transition-colors group-hover:border-amber/40">
                    <s.icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                  {s.body}
                </p>

                {s.features && (
                  <ul className="mt-7 space-y-3.5 border-t border-line pt-7">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/15 text-amber">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-[15px] leading-relaxed text-primary">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.cards && (
                  <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
                    {s.cards.map((c) => (
                      <div key={c.title} className="bg-surface p-5">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-canvas text-primary">
                            <c.icon size={17} strokeWidth={1.75} />
                          </div>
                          <h4 className="text-[15px] font-semibold tracking-tight">
                            {c.title}
                          </h4>
                        </div>
                        <p className="mt-2.5 text-[14px] leading-relaxed text-secondary">
                          {c.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
