"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Users,
  Megaphone,
  FolderOpen,
  Settings,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import type { Project, Chat } from "@/lib/types";
import type { DashTab } from "./types";

/* --------------------------------------------------------------- */
/*  Far-left rail — switch between projects                         */
/* --------------------------------------------------------------- */

function ProjectRail({
  projects,
  activeProjectId,
  onSelectProject,
  onNewProject,
}: {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
}) {
  const { user } = useAuth();

  return (
    <div className="flex h-full w-[68px] shrink-0 flex-col items-center border-r border-line bg-canvas py-4">
      <Link
        href="/"
        className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white transition-transform hover:scale-105"
        aria-label="von Neumann — back to site"
      >
        <span className="spectrum-bar h-3.5 w-3.5 rounded-[3px]" />
      </Link>

      <div className="mt-4 h-px w-7 bg-line" />

      <div className="mt-4 flex flex-1 flex-col items-center gap-2 overflow-y-auto">
        {projects.map((p) => {
          const active = p.id === activeProjectId;
          return (
            <button
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              title={p.name}
              className="group relative flex items-center justify-center"
            >
              <span
                className={`absolute -left-4 h-6 w-1 rounded-r-full bg-primary transition-all ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${p.gradient} text-[12px] font-bold text-white shadow-sm transition-all ${
                  active
                    ? "ring-2 ring-primary/70 ring-offset-2 ring-offset-canvas"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {p.monogram}
              </span>
              {p.unread ? (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber px-1 text-[10px] font-bold text-ink ring-2 ring-canvas">
                  {p.unread}
                </span>
              ) : null}
            </button>
          );
        })}

        <button
          onClick={onNewProject}
          className="mt-1 grid h-10 w-10 place-items-center rounded-xl border border-dashed border-line text-muted transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="New project"
          title="New project"
        >
          <Plus size={18} />
        </button>
      </div>

      <Link
        href="/"
        className="mt-3 grid h-9 w-9 place-items-center rounded-xl text-muted transition-colors hover:bg-surface hover:text-primary"
        aria-label="Back to site"
      >
        <ArrowLeft size={16} />
      </Link>
      {user?.photoURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.photoURL}
          alt=""
          className="mt-2 h-8 w-8 rounded-full object-cover ring-1 ring-line"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="mt-2 grid h-8 w-8 place-items-center rounded-full bg-ink text-[12px] font-semibold text-white">
          {(user?.displayName || user?.email || "M").charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Project panel — the active project's own section               */
/* --------------------------------------------------------------- */

function ProjectPanel({
  project,
  chats,
  activeChatId,
  activeTab,
  onSelectChat,
  onNewChat,
  onSelectTab,
}: {
  project: Project | null;
  chats: Chat[];
  activeChatId: string | null;
  activeTab: DashTab;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onSelectTab: (tab: DashTab) => void;
}) {
  const { user } = useAuth();

  const library: { key: DashTab; label: string; icon: typeof Users }[] = [
    { key: "assets", label: "Assets", icon: FolderOpen },
    { key: "accounts", label: "Manage accounts", icon: Users },
    { key: "ads", label: "Paid ads", icon: Megaphone },
  ];

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-line bg-surface">
      {/* Project header */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${
            project?.gradient ?? "from-violet to-cyan"
          } text-[12px] font-bold text-white shadow-sm`}
        >
          {project?.monogram ?? "··"}
        </span>
        <div className="min-w-0">
          <span className="block truncate text-[14px] font-semibold leading-tight tracking-tight text-primary">
            {project?.name ?? "Loading…"}
          </span>
          <span className="block truncate text-[11px] text-muted">
            {project?.handle ?? ""}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-2">
        {/* New chat */}
        <div className="pt-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-xl bg-ink px-3 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]"
          >
            <Plus size={15} strokeWidth={2.25} />
            New chat
          </button>
        </div>

        {/* Chats */}
        <span className="px-1 pb-1.5 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Chats
        </span>
        <div className="flex flex-col gap-0.5">
          {chats.map((c) => {
            const active = activeTab === "chat" && c.id === activeChatId;
            return (
              <button
                key={c.id}
                onClick={() => onSelectChat(c.id)}
                className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${
                  active ? "bg-canvas" : "hover:bg-canvas/70"
                }`}
              >
                <MessageSquare
                  size={14}
                  className={active ? "text-primary" : "text-muted"}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[13px] ${
                      active ? "font-medium text-primary" : "text-primary/85"
                    }`}
                  >
                    {c.title}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] text-muted">{c.updatedAt}</span>
              </button>
            );
          })}
        </div>

        {/* Library / sections */}
        <span className="px-1 pb-1.5 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Project
        </span>
        <div className="flex flex-col gap-0.5">
          {library.map((item) => {
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-canvas text-primary"
                    : "text-secondary hover:bg-canvas/70 hover:text-primary"
                }`}
              >
                <item.icon size={15} strokeWidth={1.9} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* User footer */}
      <div className="border-t border-line p-2.5">
        <div className="flex items-center gap-2.5 rounded-xl px-1.5 py-1">
          {user?.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoURL}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">
              {(user?.displayName || user?.email || "M").charAt(0).toUpperCase()}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] font-medium text-primary">
              {user?.displayName || "Maya Chen"}
            </span>
            <span className="block truncate text-[10.5px] text-muted">
              {user?.email || "maya@studio.co"}
            </span>
          </span>
          <button
            className="grid h-7 w-7 place-items-center rounded-lg text-muted transition-colors hover:bg-canvas hover:text-primary"
            aria-label="Settings"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------- */

export function Sidebar(props: {
  projects: Project[];
  chats: Chat[];
  activeProjectId: string | null;
  activeChatId: string | null;
  activeTab: DashTab;
  onSelectProject: (id: string) => void;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onSelectTab: (tab: DashTab) => void;
  onNewProject: () => void;
}) {
  const project =
    props.projects.find((p) => p.id === props.activeProjectId) ?? null;

  return (
    <>
      <ProjectRail
        projects={props.projects}
        activeProjectId={props.activeProjectId}
        onSelectProject={props.onSelectProject}
        onNewProject={props.onNewProject}
      />
      <ProjectPanel
        project={project}
        chats={props.chats}
        activeChatId={props.activeChatId}
        activeTab={props.activeTab}
        onSelectChat={props.onSelectChat}
        onNewChat={props.onNewChat}
        onSelectTab={props.onSelectTab}
      />
    </>
  );
}
