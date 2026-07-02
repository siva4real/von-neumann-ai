import { capabilities } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Capabilities() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">What we do</div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            AI that grows your audience and runs your operations.
          </h2>
          <p className="mt-5 text-lg text-secondary">
            Two pillars, one team. We create content that spreads and build the
            automations that quietly handle the rest — designed, deployed, and
            managed end to end.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="group h-full bg-surface p-7 transition-colors hover:bg-canvas">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-canvas text-primary transition-colors group-hover:border-amber/40">
                  <c.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-secondary">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
