// Firestore data access: collection refs, real-time React hooks, and mutations.
//
// Everything is scoped under users/{uid}/…, matching the security rules. Hooks read
// `uid` from the auth context and subscribe with onSnapshot so views update live.
"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type CollectionReference,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import type {
  AdCampaign,
  Asset,
  Chat,
  ChatMessage,
  Project,
  SocialAccount,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Collection / document refs                                         */
/* ------------------------------------------------------------------ */

export const userDoc = (uid: string) => doc(db, "users", uid);

export const projectsCol = (uid: string) =>
  collection(db, "users", uid, "projects");
export const projectDoc = (uid: string, pid: string) =>
  doc(db, "users", uid, "projects", pid);

export const chatsCol = (uid: string, pid: string) =>
  collection(projectDoc(uid, pid), "chats");
export const chatDoc = (uid: string, pid: string, cid: string) =>
  doc(chatsCol(uid, pid), cid);

export const messagesCol = (uid: string, pid: string, cid: string) =>
  collection(chatDoc(uid, pid, cid), "messages");

export const assetsCol = (uid: string, pid: string) =>
  collection(projectDoc(uid, pid), "assets");
export const accountsCol = (uid: string, pid: string) =>
  collection(projectDoc(uid, pid), "accounts");
export const campaignsCol = (uid: string, pid: string) =>
  collection(projectDoc(uid, pid), "campaigns");

/* ------------------------------------------------------------------ */
/*  Display-string helpers                                             */
/* ------------------------------------------------------------------ */

export function formatClock(d: Date = new Date()) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function monogramOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Generic real-time subscription hook                                */
/* ------------------------------------------------------------------ */

function useCollectionData<T>(
  makeQuery: (uid: string) => CollectionReference<DocumentData> | null,
  constraints: QueryConstraint[],
  deps: unknown[]
): { data: T[]; loading: boolean } {
  const { user } = useAuth();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setData([]);
      setLoading(false);
      return;
    }
    const base = makeQuery(user.uid);
    if (!base) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = onSnapshot(
      query(base, ...constraints),
      (snap) => {
        setData(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) }) as T)
        );
        setLoading(false);
      },
      (err) => {
        console.error("[db] snapshot error", err);
        setLoading(false);
      }
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, ...deps]);

  return { data, loading };
}

/* ------------------------------------------------------------------ */
/*  Read hooks                                                         */
/* ------------------------------------------------------------------ */

export function useProjects() {
  return useCollectionData<Project>(
    (uid) => projectsCol(uid),
    [orderBy("order", "asc")],
    []
  );
}

export function useChats(pid: string | null) {
  return useCollectionData<Chat>(
    (uid) => (pid ? chatsCol(uid, pid) : null),
    [orderBy("updatedAtTs", "desc")],
    [pid]
  );
}

export function useMessages(pid: string | null, cid: string | null) {
  return useCollectionData<ChatMessage>(
    (uid) => (pid && cid ? messagesCol(uid, pid, cid) : null),
    [orderBy("createdAt", "asc")],
    [pid, cid]
  );
}

export function useAssets(pid: string | null) {
  return useCollectionData<Asset>(
    (uid) => (pid ? assetsCol(uid, pid) : null),
    [orderBy("createdAt", "desc")],
    [pid]
  );
}

export function useAccounts(pid: string | null) {
  return useCollectionData<SocialAccount>(
    (uid) => (pid ? accountsCol(uid, pid) : null),
    [orderBy("createdAt", "asc")],
    [pid]
  );
}

export function useCampaigns(pid: string | null) {
  return useCollectionData<AdCampaign>(
    (uid) => (pid ? campaignsCol(uid, pid) : null),
    [orderBy("createdAt", "asc")],
    [pid]
  );
}

/* ------------------------------------------------------------------ */
/*  Mutations                                                          */
/* ------------------------------------------------------------------ */

export async function createProject(
  uid: string,
  input: { name: string; handle: string; gradient?: string }
) {
  const ref = await addDoc(projectsCol(uid), {
    name: input.name,
    handle: input.handle,
    gradient: input.gradient || "from-violet to-cyan",
    monogram: monogramOf(input.name),
    lastActive: "just now",
    // sort after seeded projects (which use small order values)
    order: Date.now(),
    adStats: [],
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function createChat(uid: string, pid: string, title = "New chat") {
  const now = Timestamp.now();
  const ref = await addDoc(chatsCol(uid, pid), {
    title,
    updatedAt: "now",
    updatedAtTs: now,
    createdAt: now,
  });
  return ref.id;
}

export async function renameChat(
  uid: string,
  pid: string,
  cid: string,
  title: string
) {
  await updateDoc(chatDoc(uid, pid, cid), { title });
}

export async function appendMessage(
  uid: string,
  pid: string,
  cid: string,
  input: Pick<ChatMessage, "role" | "content"> &
    Partial<Pick<ChatMessage, "attachments">>
) {
  const now = Timestamp.now();
  const msg: DocumentData = {
    role: input.role,
    content: input.content,
    time: formatClock(now.toDate()),
    createdAt: now,
  };
  if (input.attachments && input.attachments.length) {
    msg.attachments = input.attachments;
  }
  await addDoc(messagesCol(uid, pid, cid), msg);
  // bump parent chat recency so it floats to the top of the list
  await updateDoc(chatDoc(uid, pid, cid), {
    updatedAt: "just now",
    updatedAtTs: now,
  });
}

export async function createAsset(
  uid: string,
  pid: string,
  input: Omit<Asset, "id" | "createdAt">
) {
  const ref = await addDoc(assetsCol(uid, pid), {
    ...input,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function deleteAsset(uid: string, pid: string, aid: string) {
  await deleteDoc(doc(assetsCol(uid, pid), aid));
}

export async function addAccount(
  uid: string,
  pid: string,
  input: Omit<SocialAccount, "id" | "createdAt">
) {
  const ref = await addDoc(accountsCol(uid, pid), {
    ...input,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function setAccountConnected(
  uid: string,
  pid: string,
  acid: string,
  connected: boolean
) {
  await updateDoc(doc(accountsCol(uid, pid), acid), { connected });
}

export async function createCampaign(
  uid: string,
  pid: string,
  input: Omit<AdCampaign, "id" | "createdAt">
) {
  const ref = await addDoc(campaignsCol(uid, pid), {
    ...input,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function deleteCampaign(uid: string, pid: string, caid: string) {
  await deleteDoc(doc(campaignsCol(uid, pid), caid));
}

// re-export for callers that want to build timestamps (e.g. seeding)
export { serverTimestamp, Timestamp };
