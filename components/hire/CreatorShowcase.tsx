import { Star, MapPin } from "lucide-react";
import { categories, featuredCreators } from "@/lib/hireContent";
import { Reveal } from "@/components/Reveal";

export function CreatorShowcase() {
  return (
    <section id="creators" className="py-24 md:py-28">
      <div className="container-x">
        {/* categories */}
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">Browse by craft</div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            The whole content team, on demand.
          </h2>
          <p className="mt-5 text-lg text-secondary">
            Whatever the deliverable, there&apos;s a vetted creator ready to make
            it. Filter by craft, niche, budget, and turnaround.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <div className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5">
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl border transition-colors"
                  style={{
                    color: c.color,
                    borderColor: `${c.color}33`,
                    background: `${c.color}12`,
                  }}
                >
                  <c.icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {c.name}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary">
                  {c.blurb}
                </p>
                <span className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {c.count}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* featured creators */}
        <div className="mt-24 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-5">Featured talent</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A few of the creators ready to work.
            </h2>
          </div>
          <a href="#join" className="btn-ghost">
            See all creators
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCreators.map((cr, i) => (
            <Reveal key={cr.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5">
                {/* gradient cover */}
                <div
                  className="relative h-24"
                  style={{
                    background: `linear-gradient(120deg, ${cr.from}, ${cr.to})`,
                  }}
                >
                  <span className="absolute right-4 top-4 rounded-pill bg-black/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {cr.role}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6">
                  {/* avatar overlapping the cover */}
                  <span
                    className="-mt-8 grid h-16 w-16 place-items-center rounded-2xl border-4 border-surface text-xl font-semibold text-ink shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${cr.from}, ${cr.to})`,
                    }}
                  >
                    {cr.name
                      .split(" ")
                      .map((n) => n.charAt(0))
                      .join("")}
                  </span>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {cr.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[13px] font-medium">
                      <Star size={13} className="fill-amber text-amber" />
                      {cr.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-3 text-[13px] text-secondary">
                    <span>{cr.niche}</span>
                    <span className="inline-flex items-center gap-1 text-muted">
                      <MapPin size={12} />
                      {cr.location}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cr.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-pill bg-canvas px-2.5 py-1 font-mono text-[11px] text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                    <div>
                      <div className="text-[14px] font-semibold">{cr.rate}</div>
                      <div className="font-mono text-[11px] text-muted">
                        {cr.jobs} jobs completed
                      </div>
                    </div>
                    <a
                      href="#join"
                      className="rounded-pill bg-ink px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.98]"
                    >
                      Hire
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
