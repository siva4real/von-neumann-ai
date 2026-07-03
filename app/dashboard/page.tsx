"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ChatView } from "@/components/dashboard/ChatView";
import { AssetsView } from "@/components/dashboard/AssetsView";
import { AccountsView } from "@/components/dashboard/AccountsView";
import { PaidAdsView } from "@/components/dashboard/PaidAdsView";
import { Modal, Field, inputClass } from "@/components/dashboard/Modal";
import type { DashTab } from "@/components/dashboard/types";
import { useAuth } from "@/components/AuthProvider";
import { useProjects, useChats, createProject, createChat } from "@/lib/db";
import { seedWorkspace } from "@/lib/seed";
import { MessageSquarePlus } from "lucide-react";

function FullScreenSpinner() {
  return (
    <div className="grid h-dvh place-items-center bg-canvas">
      <span className="spectrum-bar h-6 w-6 animate-pulse rounded-md" />
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Auth guard — per-user data means unauthenticated users have nothing to show.
  useEffect(() => {
    if (!authLoading && !user) router.replace("/");
  }, [authLoading, user, router]);

  // Seed the workspace once, on first authenticated visit.
  useEffect(() => {
    if (user) seedWorkspace(user.uid).catch((e) => console.error("[seed]", e));
  }, [user]);

  const { data: projects, loading: projectsLoading } = useProjects();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashTab>("chat");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);

  const { data: chats, loading: chatsLoading } = useChats(activeProjectId);

  // Default the active project once projects arrive / the current one disappears.
  useEffect(() => {
    if (projects.length && !projects.some((p) => p.id === activeProjectId)) {
      setActiveProjectId(projects[0].id);
      setActiveChatId(null);
    }
  }, [projects, activeProjectId]);

  // Default the active chat when viewing the chat tab.
  useEffect(() => {
    if (activeTab !== "chat") return;
    if (chats.length && !chats.some((c) => c.id === activeChatId)) {
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId, activeTab]);

  const project = projects.find((p) => p.id === activeProjectId) ?? null;
  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    setActiveTab("chat");
    setActiveChatId(null);
  };

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setActiveTab("chat");
  };

  const newChat = async () => {
    if (!user || !activeProjectId) return;
    const id = await createChat(user.uid, activeProjectId);
    setActiveChatId(id);
    setActiveTab("chat");
  };

  const submitNewProject = async (name: string, handle: string) => {
    if (!user) return;
    const id = await createProject(user.uid, { name, handle });
    setShowNewProject(false);
    setActiveProjectId(id);
    setActiveTab("chat");
    setActiveChatId(null);
  };

  if (authLoading || !user) return <FullScreenSpinner />;
  // Wait for the initial projects load (covers the first-visit seed too).
  if (projectsLoading && projects.length === 0) return <FullScreenSpinner />;

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas text-primary">
      <Sidebar
        projects={projects}
        chats={chats}
        activeProjectId={activeProjectId}
        activeChatId={activeChatId}
        activeTab={activeTab}
        onSelectProject={selectProject}
        onSelectChat={selectChat}
        onNewChat={newChat}
        onSelectTab={setActiveTab}
        onNewProject={() => setShowNewProject(true)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-surface/70 px-5 backdrop-blur">
          <div className="flex min-w-0 items-center gap-2 text-[13px]">
            <span className="font-medium text-secondary">
              {project?.name ?? "—"}
            </span>
            <span className="text-muted">/</span>
            <span className="truncate font-medium text-primary">
              {activeTab === "chat"
                ? activeChat?.title ?? "New chat"
                : activeTab === "assets"
                ? "Assets"
                : activeTab === "accounts"
                ? "Manage accounts"
                : "Paid ads"}
            </span>
          </div>
        </header>

        {/* Active view */}
        <div className="min-h-0 flex-1">
          {!project ? (
            <div className="grid h-full place-items-center text-[14px] text-muted">
              No project selected.
            </div>
          ) : activeTab === "chat" ? (
            activeChat ? (
              <ChatView key={activeChat.id} project={project} chat={activeChat} />
            ) : chatsLoading ? (
              <div className="grid h-full place-items-center">
                <span className="spectrum-bar h-5 w-5 animate-pulse rounded-md" />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface ring-1 ring-line">
                  <MessageSquarePlus size={20} className="text-muted" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight text-primary">
                  No chats yet
                </h2>
                <p className="mt-1 max-w-xs text-[13.5px] text-secondary">
                  Start a conversation with the {project.name} agent.
                </p>
                <button
                  onClick={newChat}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-black active:scale-[0.99]"
                >
                  <MessageSquarePlus size={15} />
                  New chat
                </button>
              </div>
            )
          ) : activeTab === "assets" ? (
            <AssetsView key={project.id} project={project} />
          ) : activeTab === "accounts" ? (
            <AccountsView key={project.id} project={project} />
          ) : (
            <PaidAdsView key={project.id} project={project} />
          )}
        </div>
      </main>

      {showNewProject && (
        <NewProjectModal
          onClose={() => setShowNewProject(false)}
          onSubmit={submitNewProject}
        />
      )}
    </div>
  );
}

function NewProjectModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (name: string, handle: string) => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    try {
      await onSubmit(
        name.trim(),
        handle.trim() || "@" + name.trim().toLowerCase().replace(/\s+/g, "")
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="New project" onClose={onClose}>
      <Field label="Brand / project name">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Acme Studio"
          className={inputClass}
        />
      </Field>
      <Field label="Handle (optional)">
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="@acme.studio"
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
          {saving ? "Creating…" : "Create project"}
        </button>
      </div>
    </Modal>
  );
}
