// One-time per-user workspace seeding.
//
// On a user's first authenticated visit we copy the demo dataset from
// `lib/dashboardData.ts` into their Firestore tree so the dashboard is populated
// instead of empty. Guarded by a `seeded` flag on the user doc (plus an in-memory
// lock) so it runs exactly once per account.
"use client";

import { doc, getDoc, setDoc, Timestamp, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  userDoc,
  projectsCol,
  chatsCol,
  messagesCol,
  assetsCol,
  accountsCol,
  campaignsCol,
} from "@/lib/db";
import type { AccountIconKey } from "@/lib/types";
import {
  projects as demoProjects,
  chatsByProject,
  assetsByProject,
  accountsByProject,
  campaignsByProject,
  adStatsByProject,
} from "@/lib/dashboardData";

const iconKeyForPlatform: Record<string, AccountIconKey> = {
  Instagram: "instagram",
  TikTok: "tiktok",
  YouTube: "youtube",
  X: "x",
  LinkedIn: "linkedin",
  Facebook: "facebook",
};

// Prevent a duplicate seed from React's double-invoked effects in dev.
const inFlight = new Set<string>();

export async function seedWorkspace(uid: string): Promise<void> {
  if (inFlight.has(uid)) return;
  inFlight.add(uid);
  try {
    const uref = userDoc(uid);
    const snap = await getDoc(uref);
    if (snap.exists() && snap.data().seeded) return;

    const batch = writeBatch(db);
    const nowMs = Date.now();

    demoProjects.forEach((project, pi) => {
      const { id: pid, ...projectRest } = project;
      batch.set(doc(projectsCol(uid), pid), {
        ...projectRest,
        order: pi,
        adStats: adStatsByProject[pid] ?? [],
        createdAt: Timestamp.fromMillis(nowMs - pi * 1000),
      });

      // Chats (newest-first in the demo arrays) + their messages.
      (chatsByProject[pid] ?? []).forEach((chat, ci) => {
        const { id: cid, messages, ...chatRest } = chat;
        const chatMs = nowMs - ci * 60_000;
        batch.set(doc(chatsCol(uid, pid), cid), {
          ...chatRest,
          updatedAtTs: Timestamp.fromMillis(chatMs),
          createdAt: Timestamp.fromMillis(chatMs),
        });
        messages.forEach((m, mi) => {
          const { id: mid, ...msgRest } = m;
          // ascending, ending just before the chat's updatedAtTs
          const ms = chatMs - (messages.length - 1 - mi) * 1000;
          batch.set(doc(messagesCol(uid, pid, cid), mid), {
            ...msgRest,
            createdAt: Timestamp.fromMillis(ms),
          });
        });
      });

      // Assets (newest-first in the demo arrays).
      (assetsByProject[pid] ?? []).forEach((asset, ai) => {
        const { id: aid, ...assetRest } = asset;
        batch.set(doc(assetsCol(uid, pid), aid), {
          ...assetRest,
          createdAt: Timestamp.fromMillis(nowMs - ai * 60_000),
        });
      });

      // Connected accounts — store an iconKey instead of the icon component.
      (accountsByProject[pid] ?? []).forEach((account, ni) => {
        batch.set(doc(accountsCol(uid, pid), account.id), {
          platform: account.platform,
          handle: account.handle,
          followers: account.followers,
          growth: account.growth,
          connected: account.connected,
          color: account.color,
          iconKey: iconKeyForPlatform[account.platform] ?? "instagram",
          createdAt: Timestamp.fromMillis(nowMs + ni * 1000),
        });
      });

      // Paid campaigns.
      (campaignsByProject[pid] ?? []).forEach((campaign, qi) => {
        const { id: caid, ...campaignRest } = campaign;
        batch.set(doc(campaignsCol(uid, pid), caid), {
          ...campaignRest,
          createdAt: Timestamp.fromMillis(nowMs + qi * 1000),
        });
      });
    });

    await batch.commit();
    await setDoc(uref, { seeded: true, seededAt: Timestamp.now() }, { merge: true });
  } catch (err) {
    // allow a later retry if seeding failed midway
    inFlight.delete(uid);
    throw err;
  }
}
