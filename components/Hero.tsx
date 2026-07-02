"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40">
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
            {hero.eyebrow}
          </motion.div>

          <h1 className="text-balance text-[42px] font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-[68px]">
            {hero.title.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 * i }}
                className="block"
              >
                {line === hero.highlight ? (
                  <span className="spectrum-text">{line}</span>
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
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </a>
            <a href={hero.secondaryCta.href} className="btn-ghost">
              {hero.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-6 inline-flex items-center gap-3 rounded-pill border border-line bg-surface px-4 py-2 font-mono text-[13px] text-secondary"
          >
            <span className="text-muted">$</span>
            <span className="text-primary">{hero.install}</span>
            <Copy size={14} className="text-muted" />
          </motion.div>
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
            agent.run.ts
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulseline rounded-full bg-emerald-400" />
            live
          </span>
        </div>

        {/* code body */}
        <div className="code-scroll overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
          <pre className="text-white/85">
            <span className="text-[#bb88ff]">const</span> agent ={" "}
            <span className="text-[#00bbff]">vn</span>.
            <span className="text-[#ffab2a]">deploy</span>({"{"}
            {"\n"} name: <span className="text-[#77dddd]">&quot;ops-runner&quot;</span>,
            {"\n"} tools: [inbox, crm, sheets],
            {"\n"} onEvent: <span className="text-[#ffab2a]">handle</span>,
            {"\n"}
            {"}"});
          </pre>

          <div className="mt-5 space-y-2.5">
            <LogLine tag="task" color="#00bbff" text="new lead — Acme Corp" />
            <LogLine tag="plan" color="#bb88ff" text="enrich · qualify · route" />
            <LogLine tag="act" color="#ffab2a" text="drafted reply, updated CRM" />
            <LogLine tag="done" color="#28c840" text="handed to human · 820ms" />
          </div>
        </div>

        {/* footer strip */}
        <div className="flex items-center justify-between border-t border-ink-line px-5 py-3 font-mono text-[11px] text-white/40">
          <span>3 agents active</span>
          <span>uptime 99.9%</span>
        </div>
      </div>

      {/* floating stat chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl shadow-black/5 sm:block"
      >
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
          hours saved / wk
        </div>
        <div className="text-2xl font-semibold">312</div>
      </motion.div>
    </motion.div>
  );
}

function LogLine({
  tag,
  color,
  text,
}: {
  tag: string;
  color: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-12 shrink-0 rounded px-1.5 py-0.5 text-center text-[10px] uppercase"
        style={{ color, background: `${color}1a` }}
      >
        {tag}
      </span>
      <span className="text-white/70">{text}</span>
    </div>
  );
}
