"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { audience } from "@/lib/hireContent";

type Key = "brand" | "creator";

export function JoinForm() {
  const [active, setActive] = useState<Key>("brand");
  const [sent, setSent] = useState(false);

  const isBrand = active === "brand";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now this just confirms intent locally — no backend wired yet.
    setSent(true);
  };

  const switchTo = (k: Key) => {
    setActive(k);
    setSent(false);
  };

  return (
    <section id="join" className="py-24 md:py-32">
      <div className="container-x">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-12 md:px-14 md:py-16">
          <div aria-hidden className="spectrum-bar absolute inset-x-0 top-0 h-1" />

          <div className="mx-auto max-w-xl text-center">
            <div className="eyebrow mx-auto mb-6 w-fit">Get started</div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-[44px] md:leading-[1.05]">
              {isBrand ? "Post a brief, meet your creators." : "Join as a creator."}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-secondary">
              {isBrand
                ? "Tell us what you need. We'll match you with vetted talent, usually within 48 hours."
                : "Set up your profile and start receiving briefs matched to your niche."}
            </p>
          </div>

          {/* toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-pill border border-line bg-canvas p-1">
              {(["brand", "creator"] as Key[]).map((k) => (
                <button
                  key={k}
                  onClick={() => switchTo(k)}
                  className={`relative rounded-pill px-5 py-2 text-sm font-medium transition-colors ${
                    active === k ? "text-white" : "text-secondary hover:text-primary"
                  }`}
                >
                  {active === k && (
                    <motion.span
                      layoutId="join-pill"
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
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-10 max-w-md rounded-card border border-line bg-canvas px-6 py-10 text-center"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <CheckCircle2 size={26} />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  You&apos;re on the list.
                </h3>
                <p className="mt-2 text-[14px] text-secondary">
                  Thanks — we&apos;ll reach out to{" "}
                  {isBrand ? "get your brief live" : "finish your profile"} shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost mt-6"
                >
                  Submit another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="mx-auto mt-10 grid max-w-md gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" placeholder="Alex Rivera" />
                  <Field
                    label={isBrand ? "Company" : "Handle / site"}
                    placeholder={isBrand ? "Acme Co." : "@yourhandle"}
                  />
                </div>
                <Field label="Email" type="email" placeholder="you@email.com" />

                {isBrand ? (
                  <Select
                    label="What do you need?"
                    options={[
                      "UGC videos",
                      "Videographer",
                      "Photographer",
                      "Influencer campaign",
                      "Not sure yet",
                    ]}
                  />
                ) : (
                  <Select
                    label="Your craft"
                    options={[
                      "UGC Creator",
                      "Videographer",
                      "Photographer",
                      "Influencer",
                    ]}
                  />
                )}

                <button type="submit" className="btn-primary mt-2 w-full">
                  {isBrand ? "Post my brief" : "Create my profile"}
                  <ArrowRight size={16} />
                </button>
                <p className="text-center font-mono text-[11px] text-muted">
                  No spam. We&apos;ll only email about your{" "}
                  {isBrand ? "brief" : "profile"}.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-[15px] text-primary outline-none transition-colors placeholder:text-muted focus:border-primary/30 focus:bg-surface"
      />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <select
        required
        defaultValue=""
        className="w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-[15px] text-primary outline-none transition-colors focus:border-primary/30 focus:bg-surface"
      >
        <option value="" disabled>
          Select one…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
