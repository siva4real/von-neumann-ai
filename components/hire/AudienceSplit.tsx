"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { audience } from "@/lib/hireContent";

type Key = "brand" | "creator";

export function AudienceSplit() {
  const [active, setActive] = useState<Key>("brand");
  const data = audience[active];

  return (
    <section id="how" className="py-24 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mx-auto mb-5 w-fit">Two sides, one platform</div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Whichever side you&apos;re on, it just works.
          </h2>
        </div>

        {/* toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-pill border border-line bg-surface p-1">
            {(Object.keys(audience) as Key[]).map((k) => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`relative rounded-pill px-5 py-2 text-sm font-medium transition-colors ${
                  active === k ? "text-white" : "text-secondary hover:text-primary"
                }`}
              >
                {active === k && (
                  <motion.span
                    layoutId="audience-pill"
                    className="absolute inset-0 -z-10 rounded-pill bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {audience[k].label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.21, 0.5, 0.4, 1] }}
            className="mx-auto mt-12 grid max-w-4xl items-center gap-10 rounded-[28px] border border-line bg-surface p-8 md:grid-cols-2 md:p-12"
          >
            <div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                {data.heading}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                {data.body}
              </p>
              <a href={data.cta.href} className="btn-primary mt-8">
                {data.cta.label}
                <ArrowRight size={16} />
              </a>
            </div>

            <ul className="space-y-3.5 md:border-l md:border-line md:pl-10">
              {data.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/15 text-amber">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-primary">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
