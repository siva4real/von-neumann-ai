import { logos } from "@/lib/content";

export function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <section className="border-y border-line bg-canvas py-10">
      <div className="container-x">
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Trusted by teams shipping AI into production
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-secondary/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
