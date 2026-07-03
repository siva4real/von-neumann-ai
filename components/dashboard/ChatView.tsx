"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Sparkles,
  Video,
  Image as ImageIcon,
  FileText,
  Wand2,
} from "lucide-react";
import {
  suggestedPrompts,
  type ChatMessage,
  type ChatAttachment,
  type Chat,
} from "@/lib/dashboardData";
import type { Project } from "@/lib/dashboardData";

function AttachmentChip({ a }: { a: ChatAttachment }) {
  const Icon = a.kind === "video" ? Video : a.kind === "image" ? ImageIcon : FileText;
  return (
    <div className="mt-3 inline-flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3 py-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber to-violet text-white">
        <Icon size={15} />
      </span>
      <span>
        <span className="block text-[13px] font-medium text-primary">{a.title}</span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {a.kind} · attached
        </span>
      </span>
    </div>
  );
}

function Bubble({ m, project }: { m: ChatMessage; project: Project }) {
  const isUser = m.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      {isUser ? (
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-semibold text-white">
          M
        </span>
      ) : (
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface ring-1 ring-line">
          <span className="spectrum-bar h-3.5 w-3.5 rounded-[3px]" />
        </span>
      )}

      <div className={`max-w-[75%] ${isUser ? "text-right" : ""}`}>
        <div className="mb-1 flex items-center gap-2 text-[11px] text-muted">
          {!isUser && <span className="font-medium text-secondary">Agent</span>}
          {isUser && <span className="font-medium text-secondary">You</span>}
          <span>{m.time}</span>
        </div>
        <div
          className={`inline-block whitespace-pre-line rounded-2xl px-4 py-2.5 text-left text-[14px] leading-relaxed ${
            isUser
              ? "bg-ink text-white"
              : "border border-line bg-surface text-primary"
          }`}
        >
          {m.content}
          {m.attachments?.map((a) => (
            <AttachmentChip key={a.title} a={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChatView({ project, chat }: { project: Project; chat: Chat }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // reset thread when switching chat
  useEffect(() => {
    setMessages(chat.messages);
    setDraft("");
    setThinking(false);
  }, [chat.id, chat.messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: value, time: now },
    ]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "agent",
          content:
            "On it — I'll draft a plan for that, generate the first cut, and drop the assets in your project folder. You'll get a preview to approve before anything goes live.",
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      ]);
    }, 1100);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Thread */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-8">
          {messages.length === 0 && !thinking && (
            <div className="flex flex-col items-center py-16 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface ring-1 ring-line">
                <span className="spectrum-bar h-5 w-5 rounded-md" />
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-primary">
                New chat · {project.name}
              </h2>
              <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-secondary">
                Ask the agent to plan content, generate and edit video, schedule
                posts, or analyze performance for this project.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <Bubble key={m.id} m={m} project={project} />
          ))}

          {thinking && (
            <div className="flex gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface ring-1 ring-line">
                <span className="spectrum-bar h-3.5 w-3.5 rounded-[3px]" />
              </span>
              <div className="inline-flex items-center gap-1.5 rounded-2xl border border-line bg-surface px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-pulseline rounded-full bg-muted"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-line bg-surface/70 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          {messages.length <= 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3 py-1.5 text-[12.5px] text-secondary transition-colors hover:border-amber/40 hover:text-primary"
                >
                  <Sparkles size={12} className="text-amber" />
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-line bg-surface shadow-sm transition-colors focus-within:border-primary/25">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              rows={1}
              placeholder={`Message the ${project.name} agent…`}
              className="max-h-40 w-full resize-none bg-transparent px-4 pt-3.5 text-[14px] leading-relaxed text-primary placeholder:text-muted focus:outline-none"
            />
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12.5px] text-secondary transition-colors hover:bg-canvas hover:text-primary"
                  aria-label="Attach file"
                >
                  <Paperclip size={15} />
                  Attach
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12.5px] text-secondary transition-colors hover:bg-canvas hover:text-primary">
                  <Wand2 size={15} />
                  Generate video
                </button>
              </div>
              <button
                onClick={() => send(draft)}
                disabled={!draft.trim()}
                className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-white transition-all enabled:hover:bg-black enabled:active:scale-95 disabled:opacity-30"
                aria-label="Send"
              >
                <ArrowUp size={16} strokeWidth={2.25} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted">
            The agent can create, edit, schedule and post content. It always previews before publishing.
          </p>
        </div>
      </div>
    </div>
  );
}
