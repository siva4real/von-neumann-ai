import { brandSteps, creatorSteps, type Step } from "@/lib/hireContent";
import { Reveal } from "@/components/Reveal";

export function HowItWorks() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="grid-lines overflow-hidden rounded-[28px] border border-ink-line bg-ink px-8 py-16 text-white md:px-14 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="eyebrow mx-auto mb-5 w-fit text-white/50">
                How it works
              </div>
              <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                From brief to booked in four steps.
              </h2>
              <p className="mt-5 text-lg text-white/60">
                The same simple flow, whichever side you&apos;re on.
              </p>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Track title="For brands" steps={brandSteps} accent="#00bbff" />
              <Track title="For creators" steps={creatorSteps} accent="#ffab2a" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Track({
  title,
  steps,
  accent,
}: {
  title: string;
  steps: Step[];
  accent: string;
}) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: accent }}
        />
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/60">
          {title}
        </span>
      </div>

      <ol className="relative space-y-8 border-l border-ink-line pl-8">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span
              className="absolute -left-[41px] grid h-5 w-5 place-items-center rounded-full border border-ink-line bg-ink text-[10px] font-semibold"
              style={{ color: accent }}
            >
              {i + 1}
            </span>
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                style={{ background: `${accent}1a`, color: accent }}
              >
                <s.icon size={17} strokeWidth={1.75} />
              </span>
              <h3 className="text-[15px] font-semibold tracking-tight">
                {s.title}
              </h3>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-white/55">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
