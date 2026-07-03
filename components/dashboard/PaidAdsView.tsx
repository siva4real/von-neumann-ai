"use client";

import { useState } from "react";
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Megaphone,
  Trash2,
} from "lucide-react";
import type { Project, AdCampaign, CampaignStatus } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";
import { useCampaigns, createCampaign, deleteCampaign } from "@/lib/db";
import { Modal, Field, inputClass } from "@/components/dashboard/Modal";

const statusDot: Record<CampaignStatus, string> = {
  active: "bg-teal",
  paused: "bg-muted",
  review: "bg-amber",
  ended: "bg-coral",
};

const statusLabel: Record<CampaignStatus, string> = {
  active: "Active",
  paused: "Paused",
  review: "In review",
  ended: "Ended",
};

export function PaidAdsView({ project }: { project: Project }) {
  const { user } = useAuth();
  const { data: campaigns } = useCampaigns(project.id);
  const [showNew, setShowNew] = useState(false);

  const stats = project.adStats ?? [];

  const remove = async (id: string) => {
    if (!user) return;
    await deleteCampaign(user.uid, project.id, id);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-primary">
              Paid ads
            </h2>
            <p className="text-[13px] text-secondary">
              Campaigns the agent runs and optimizes for {project.name}.
            </p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]"
          >
            <Plus size={15} />
            New campaign
          </button>
        </div>

        {/* Stat tiles */}
        {stats.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </span>
                <span className="mt-1.5 block text-2xl font-semibold tracking-tight text-primary">
                  {s.value}
                </span>
                <span
                  className={`mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium ${
                    s.positive ? "text-teal" : "text-coral"
                  }`}
                >
                  {s.delta !== "—" &&
                    (s.positive ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    ))}
                  {s.delta} vs prev. 30d
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Campaigns */}
        <div className="mt-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Campaigns
          </span>
        </div>

        {campaigns.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface/60 py-14 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-muted">
              <Megaphone size={20} />
            </span>
            <p className="mt-3 text-[14px] font-medium text-primary">No campaigns yet</p>
            <p className="text-[13px] text-secondary">
              Launch your first paid campaign to start acquiring customers.
            </p>
            <button
              onClick={() => setShowNew(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-line px-3.5 py-2 text-[13px] font-medium text-primary transition-colors hover:border-primary/25 hover:bg-canvas"
            >
              <Plus size={15} />
              New campaign
            </button>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
            {/* header row */}
            <div className="hidden grid-cols-[minmax(0,2.4fr)_1fr_1fr_1fr_0.9fr] gap-3 border-b border-line px-4 py-2.5 md:grid">
              {["Campaign", "Budget · Spend", "Impressions", "Clicks · CTR", "ROAS"].map(
                (h) => (
                  <span
                    key={h}
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                  >
                    {h}
                  </span>
                )
              )}
            </div>
            {campaigns.map((c, i) => (
              <div
                key={c.id}
                className={`group relative grid grid-cols-2 gap-3 px-4 py-3.5 md:grid-cols-[minmax(0,2.4fr)_1fr_1fr_1fr_0.9fr] md:items-center ${
                  i !== 0 ? "border-t border-line" : ""
                } transition-colors hover:bg-canvas/50`}
              >
                {/* name + status */}
                <div className="col-span-2 flex items-center gap-2.5 md:col-span-1">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot[c.status]}`} />
                  <div className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium text-primary">
                      {c.name}
                    </span>
                    <span className="block text-[11px] text-muted">
                      {c.platform} · {c.objective} · {statusLabel[c.status]}
                    </span>
                  </div>
                </div>

                {/* budget / spend with bar */}
                <div>
                  <span className="block text-[13px] font-medium text-primary">
                    {c.spend}
                  </span>
                  <span className="mb-1 block text-[11px] text-muted">{c.budget}</span>
                  <span className="block h-1 w-full overflow-hidden rounded-full bg-line">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-amber to-coral"
                      style={{ width: `${c.spendPct}%` }}
                    />
                  </span>
                </div>

                <span className="text-[13px] text-primary">{c.impressions}</span>

                <div>
                  <span className="block text-[13px] text-primary">{c.clicks}</span>
                  <span className="block text-[11px] text-muted">{c.ctr} CTR</span>
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-[13px] font-semibold ${
                    c.roas === "—" ? "text-muted" : "bg-teal/12 text-teal"
                  }`}
                >
                  {c.roas !== "—" && <ArrowUpRight size={12} />}
                  {c.roas}
                </span>

                <button
                  onClick={() => remove(c.id)}
                  className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-lg text-muted opacity-0 transition-all hover:bg-canvas hover:text-coral group-hover:opacity-100"
                  aria-label="Delete campaign"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showNew && (
        <NewCampaignModal
          onClose={() => setShowNew(false)}
          onCreate={async (input) => {
            if (!user) return;
            await createCampaign(user.uid, project.id, input);
            setShowNew(false);
          }}
        />
      )}
    </div>
  );
}

function NewCampaignModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (input: Omit<AdCampaign, "id" | "createdAt">) => void | Promise<void>;
}) {
  const platforms = ["Meta", "TikTok", "YouTube"];
  const objectives = ["Conversions", "Reach", "Sales", "Leads", "App Installs"];
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState(platforms[0]);
  const [objective, setObjective] = useState(objectives[0]);
  const [budget, setBudget] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    try {
      await onCreate({
        name: name.trim(),
        platform,
        objective,
        status: "review",
        budget: budget.trim() || "$50/day",
        spend: "$0",
        spendPct: 0,
        impressions: "—",
        clicks: "—",
        ctr: "—",
        roas: "—",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="New campaign" onClose={onClose}>
      <Field label="Campaign name">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Summer Launch — Prospecting"
          className={inputClass}
        />
      </Field>
      <Field label="Platform">
        <div className="flex gap-1.5">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-[12.5px] font-medium transition-colors ${
                platform === p
                  ? "border-primary/30 bg-canvas text-primary"
                  : "border-line text-secondary hover:text-primary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Objective">
        <select
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className={inputClass}
        >
          {objectives.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Daily budget">
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="$50/day"
          className={inputClass}
        />
      </Field>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl border border-line px-3.5 py-2 text-[13px] font-medium text-secondary transition-colors hover:text-primary"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!name.trim() || saving}
          className="rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99] disabled:opacity-40"
        >
          {saving ? "Creating…" : "Create campaign"}
        </button>
      </div>
    </Modal>
  );
}
