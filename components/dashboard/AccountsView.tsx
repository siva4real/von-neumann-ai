"use client";

import { Plus, TrendingUp, MoreHorizontal, Check } from "lucide-react";
import { accountsByProject } from "@/lib/dashboardData";
import type { Project } from "@/lib/dashboardData";

export function AccountsView({ project }: { project: Project }) {
  const accounts = accountsByProject[project.id] ?? [];
  const connected = accounts.filter((a) => a.connected);
  const available = accounts.filter((a) => !a.connected);

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
          <button className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]">
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
          {connected.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas">
                <a.icon size={20} className={a.color} />
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
                <span className="block truncate text-[12px] text-muted">{a.handle}</span>
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
              <button
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-primary"
                aria-label="Account options"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          ))}
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
              {available.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 rounded-2xl border border-dashed border-line bg-surface/60 p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas">
                    <a.icon size={20} className={`${a.color} opacity-60`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold tracking-tight text-primary">
                      {a.platform}
                    </span>
                    <span className="block truncate text-[12px] text-muted">
                      Not connected
                    </span>
                  </div>
                  <button className="rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-medium text-primary transition-colors hover:border-primary/25 hover:bg-canvas">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
