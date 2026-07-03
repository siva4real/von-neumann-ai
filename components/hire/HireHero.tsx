"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, BadgeCheck } from "lucide-react";
import { hireHero } from "@/lib/hireContent";

export function HireHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* soft spectrum glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[900px] -translate-x-1/2 opacity-[0.22] blur-[90px]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #ffab2a, #ff8866, #bb88ff, #00bbff, #77dddd, #ffab2a)",
        }}
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            {hireHero.eyebrow}
          </motion.div>

          <h1 className="text-balance text-[40px] font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-[64px]">
            {hireHero.title.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 * i }}
                className="block"
              >
                {line.includes(hireHero.highlight) ? (
                  <>
                    {line.split(hireHero.highlight)[0]}
                    <span className="spectrum-text">{hireHero.highlight}</span>
                    {line.split(hireHero.highlight)[1]}
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-secondary"
          >
            {hireHero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href={hireHero.brandCta.href} className="btn-primary">
              {hireHero.brandCta.label}
              <ArrowRight size={16} />
            </a>
            <a href={hireHero.creatorCta.href} className="btn-ghost">
              {hireHero.creatorCta.label}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
          >
            {hireHero.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold tracking-tight">
                  {s.value}
                </dt>
                <dd className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}

function HeroPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.5, 0.4, 1] }}
      className="relative"
    >
      <div className="grid-lines overflow-hidden rounded-card border border-ink-line bg-ink text-white shadow-2xl shadow-black/20">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-white/50">
            brief.match.ts
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulseline rounded-full bg-emerald-400" />
            matching
          </span>
        </div>

        {/* body — a brief being matched to creators */}
        <div className="px-5 py-5">
          <div className="rounded-xl border border-ink-line bg-ink-soft p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              Open brief
            </div>
            <p className="mt-1.5 text-[15px] font-medium text-white/90">
              3× UGC videos — skincare launch
            </p>
            <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-white/60">
                $800 budget
              </span>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-white/60">
                short-form
              </span>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-white/60">
                7-day turnaround
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <MatchRow name="Maya O." role="UGC · Beauty" match={98} from="#ffab2a" to="#ff8866" />
            <MatchRow name="Sofia R." role="UGC · Lifestyle" match={94} from="#77dddd" to="#00bbff" />
            <MatchRow name="Diego S." role="Video · Brand" match={89} from="#00bbff" to="#77dddd" />
          </div>
        </div>

        {/* footer strip */}
        <div className="flex items-center justify-between border-t border-ink-line px-5 py-3 font-mono text-[11px] text-white/40">
          <span>18 creators matched</span>
          <span>avg. 4.9 ★</span>
        </div>
      </div>

      {/* floating verified chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl shadow-black/5 sm:flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-amber/15 text-amber">
          <BadgeCheck size={18} />
        </span>
        <div>
          <div className="text-[13px] font-semibold leading-tight">
            Every creator vetted
          </div>
          <div className="font-mono text-[11px] text-muted">
            portfolio + ID verified
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MatchRow({
  name,
  role,
  match,
  from,
  to,
}: {
  name: string;
  role: string;
  match: number;
  from: string;
  to: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-1 py-1">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-ink"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-white/90">
          {name}
        </div>
        <div className="truncate font-mono text-[11px] text-white/40">
          {role}
        </div>
      </div>
      <span className="flex items-center gap-1 font-mono text-[12px] text-emerald-400">
        <Star size={11} className="fill-emerald-400" />
        {match}%
      </span>
    </div>
  );
}
