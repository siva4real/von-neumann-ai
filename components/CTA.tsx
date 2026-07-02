import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-8 py-16 text-center md:px-16 md:py-24">
            <div aria-hidden className="spectrum-bar absolute inset-x-0 top-0 h-1" />
            <div className="eyebrow mx-auto mb-6 w-fit">Start building</div>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-[52px] md:leading-[1.05]">
              Let&apos;s find the work that should run itself.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-secondary">
              Book a 30-minute call. We&apos;ll map one workflow live and show
              you exactly what an agent would take off your plate.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:vonneumannaiautomation@gmail.com" className="btn-primary">
                Book a call
                <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn-ghost">
                Explore services
              </a>
            </div>
            <p className="mt-6 font-mono text-[12px] text-muted">
              vonneumannaiautomation@gmail.com
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
