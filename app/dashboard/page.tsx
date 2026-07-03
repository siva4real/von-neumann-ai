"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ChatView } from "@/components/dashboard/ChatView";
import { AssetsView } from "@/components/dashboard/AssetsView";
import { AccountsView } from "@/components/dashboard/AccountsView";
import { PaidAdsView } from "@/components/dashboard/PaidAdsView";
import type { DashTab } from "@/components/dashboard/types";
import { projects, chatsByProject, type Chat } from "@/lib/dashboardData";

let newChatSeq = 0;

export default function DashboardPage() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [activeTab, setActiveTab] = useState<DashTab>("chat");
  const [activeChatId, setActiveChatId] = useState(
    chatsByProject[projects[0].id][0].id
  );
  // ephemeral "new" chats created in-session, keyed by project
  const [draftChats, setDraftChats] = useState<Record<string, Chat>>({});

  const project = projects.find((p) => p.id === activeProjectId) ?? projects[0];

  const activeChat = useMemo<Chat>(() => {
    const saved = chatsByProject[activeProjectId]?.find((c) => c.id === activeChatId);
    if (saved) return saved;
    const draft = draftChats[activeChatId];
    if (draft) return draft;
    return chatsByProject[activeProjectId][0];
  }, [activeProjectId, activeChatId, draftChats]);

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    setActiveTab("chat");
    setActiveChatId(chatsByProject[id][0].id);
  };

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setActiveTab("chat");
  };

  const newChat = () => {
    const id = `draft-${activeProjectId}-${newChatSeq++}`;
    setDraftChats((prev) => ({
      ...prev,
      [id]: { id, title: "New chat", updatedAt: "now", messages: [] },
    }));
    setActiveChatId(id);
    setActiveTab("chat");
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas text-primary">
      <Sidebar
        activeProjectId={activeProjectId}
        activeChatId={activeChatId}
        activeTab={activeTab}
        onSelectProject={selectProject}
        onSelectChat={selectChat}
        onNewChat={newChat}
        onSelectTab={setActiveTab}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-surface/70 px-5 backdrop-blur">
          <div className="flex min-w-0 items-center gap-2 text-[13px]">
            <span className="font-medium text-secondary">{project.name}</span>
            <span className="text-muted">/</span>
            <span className="truncate font-medium text-primary">
              {activeTab === "chat"
                ? activeChat.title
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
          {activeTab === "chat" && (
            <ChatView key={activeChat.id} project={project} chat={activeChat} />
          )}
          {activeTab === "assets" && <AssetsView key={project.id} project={project} />}
          {activeTab === "accounts" && <AccountsView key={project.id} project={project} />}
          {activeTab === "ads" && <PaidAdsView key={project.id} project={project} />}
        </div>
      </main>
    </div>
  );
}
