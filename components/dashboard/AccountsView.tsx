"use client";

import { useState } from "react";
import {
  Plus,
  TrendingUp,
  MoreHorizontal,
  Check,
  Unplug,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  Linkedin,
  Facebook,
  type LucideIcon,
} from "lucide-react";
import type { Project, SocialAccount, AccountIconKey } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";
import { useAccounts, setAccountConnected, addAccount } from "@/lib/db";
import { Modal, Field, inputClass } from "@/components/dashboard/Modal";

const iconFor: Record<AccountIconKey, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  x: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
};

// platform → default iconKey + brand-ish text color, used when adding accounts.
const platformMeta: Record<string, { iconKey: AccountIconKey; color: string }> = {
  Instagram: { iconKey: "instagram", color: "text-coral" },
  TikTok: { iconKey: "tiktok", color: "text-primary" },
  YouTube: { iconKey: "youtube", color: "text-coral" },
  X: { iconKey: "x", color: "text-primary" },
  LinkedIn: { iconKey: "linkedin", color: "text-blue" },
  Facebook: { iconKey: "facebook", color: "text-blue" },
};

export function AccountsView({ project }: { project: Project }) {
  const { user } = useAuth();
  const { data: accounts } = useAccounts(project.id);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const connected = accounts.filter((a) => a.connected);
  const available = accounts.filter((a) => !a.connected);

  const setConnected = async (id: string, value: boolean) => {
    if (!user) return;
    setMenuId(null);
    await setAccountConnected(user.uid, project.id, id, value);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-primary">
              Manage accounts
            </h2>
            <p className="text-[13px] text-secondary">
              Social profiles the agent posts to for {project.name}.
            </p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]"
          >
            <Plus size={15} />
            Connect account
          </button>
        </div>

        {/* Connected */}
        <div className="mt-6 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Connected
          </span>
          <span className="text-[11px] text-muted">· {connected.length}</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {connected.map((a) => {
            const Icon = iconFor[a.iconKey] ?? Instagram;
            return (
              <div
                key={a.id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas">
                  <Icon size={20} className={a.color} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold tracking-tight text-primary">
                      {a.platform}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal/15 px-1.5 py-0.5 text-[10px] font-medium text-teal">
                      <Check size={9} strokeWidth={3} /> Live
                    </span>
                  </div>
                  <span className="block truncate text-[12px] text-muted">
                    {a.handle}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[15px] font-semibold tracking-tight text-primary">
                    {a.followers}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal">
                    <TrendingUp size={11} />
                    {a.growth}
                  </span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setMenuId(menuId === a.id ? null : a.id)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-primary"
                    aria-label="Account options"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {menuId === a.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMenuId(null)}
                      />
                      <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lg shadow-black/10">
                        <button
                          onClick={() => setConnected(a.id, false)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-secondary transition-colors hover:bg-canvas hover:text-coral"
                        >
                          <Unplug size={14} />
                          Disconnect
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {connected.length === 0 && (
            <p className="text-[13px] text-muted">No accounts connected yet.</p>
          )}
        </div>

        {/* Available */}
        {available.length > 0 && (
          <>
            <div className="mt-8 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Available to connect
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {available.map((a) => {
                const Icon = iconFor[a.iconKey] ?? Instagram;
                return (
                  <div
                    key={a.id}
                    className="flex items-center gap-4 rounded-2xl border border-dashed border-line bg-surface/60 p-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas">
                      <Icon size={20} className={`${a.color} opacity-60`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold tracking-tight text-primary">
                        {a.platform}
                      </span>
                      <span className="block truncate text-[12px] text-muted">
                        Not connected
                      </span>
                    </div>
                    <button
                      onClick={() => setConnected(a.id, true)}
                      className="rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-medium text-primary transition-colors hover:border-primary/25 hover:bg-canvas"
                    >
                      Connect
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {showAdd && (
        <AddAccountModal
          onClose={() => setShowAdd(false)}
          onAdd={async (input) => {
            if (!user) return;
            await addAccount(user.uid, project.id, input);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

function AddAccountModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (input: Omit<SocialAccount, "id" | "createdAt">) => void | Promise<void>;
}) {
  const platforms = Object.keys(platformMeta);
  const [platform, setPlatform] = useState(platforms[0]);
  const [handle, setHandle] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!handle.trim() || saving) return;
    setSaving(true);
    try {
      const meta = platformMeta[platform];
      await onAdd({
        platform,
        iconKey: meta.iconKey,
        color: meta.color,
        handle: handle.trim(),
        followers: "0",
        growth: "—",
        connected: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Connect account" onClose={onClose}>
      <Field label="Platform">
        <div className="grid grid-cols-3 gap-1.5">
          {platforms.map((p) => {
            const Icon = iconFor[platformMeta[p].iconKey];
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[12px] font-medium transition-colors ${
                  platform === p
                    ? "border-primary/30 bg-canvas text-primary"
                    : "border-line text-secondary hover:text-primary"
                }`}
              >
                <Icon size={14} />
                {p}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Handle">
        <input
          autoFocus
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="@yourbrand"
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
          disabled={!handle.trim() || saving}
          className="rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99] disabled:opacity-40"
        >
          {saving ? "Connecting…" : "Connect"}
        </button>
      </div>
    </Modal>
  );
}
