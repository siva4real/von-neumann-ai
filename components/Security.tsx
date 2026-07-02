import { security } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Lock, ScrollText, BadgeCheck } from "lucide-react";

const icons = [Lock, ScrollText, BadgeCheck];

export function Security() {
  return (
    <section className="border-y border-line bg-canvas py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">{security.eyebrow}</div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {security.title}
          </h2>
          <p className="mt-5 text-lg text-secondary">{security.body}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {security.points.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="card h-full p-7">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-ink text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-secondary">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
