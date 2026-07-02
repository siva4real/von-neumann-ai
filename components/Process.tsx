import { steps } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="process" className="border-y border-line bg-canvas py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="eyebrow mb-5">How it works</div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              From busywork to a system that replicates itself.
            </h2>
            <p className="mt-5 text-lg text-secondary">
              A tight, four-step loop. Each automation we ship becomes the
              blueprint for the next — so your leverage compounds over time.
            </p>
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[27px] top-2 bottom-2 w-px bg-line"
            />
            {steps.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.05}>
                <li className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface font-mono text-sm font-medium text-primary">
                    {s.no}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-secondary">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
