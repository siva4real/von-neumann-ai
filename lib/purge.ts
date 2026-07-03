// One-time removal of the seeded demo dataset from a user's Firestore tree.
//
// Early builds copied the mock dataset from `lib/dashboardData.ts` into every
// user's workspace (see `lib/seed.ts`). This deletes that mock data back out for
// accounts that were seeded before the cutoff below, targeting only the known
// demo project ids so any real projects the user created are left untouched.
// Guarded by a `purged` flag on the user doc (plus an in-memory lock) so it runs
// exactly once per account.
"use client";

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  writeBatch,
  type DocumentReference,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  userDoc,
  projectDoc,
  chatsCol,
  messagesCol,
  assetsCol,
  accountsCol,
  campaignsCol,
} from "@/lib/db";
import { projects as demoProjects } from "@/lib/dashboardData";

// Accounts seeded at or after this instant keep their demo data (genuinely new
// signups still get the walkthrough); anything seeded earlier is mock data that
// predates this change and gets purged. Milliseconds since epoch, UTC.
const PURGE_CUTOFF_MS = Date.parse("2026-07-03T18:00:00Z");

// The ids the seeder writes for the demo projects.
const DEMO_PROJECT_IDS = demoProjects.map((p) => p.id);

// Prevent a duplicate purge from React's double-invoked effects in dev.
const inFlight = new Set<string>();

// Firestore batches cap at 500 writes; commit in safe chunks.
async function deleteRefs(refs: DocumentReference[]): Promise<void> {
  for (let i = 0; i < refs.length; i += 400) {
    const batch = writeBatch(db);
    refs.slice(i, i + 400).forEach((ref) => batch.delete(ref));
    await batch.commit();
  }
}

async function purgeProject(uid: string, pid: string): Promise<void> {
  // Chats — delete each chat's messages subcollection first, then the chats.
  const chatSnap = await getDocs(chatsCol(uid, pid));
  for (const chat of chatSnap.docs) {
    const msgSnap = await getDocs(messagesCol(uid, pid, chat.id));
    await deleteRefs(msgSnap.docs.map((m) => m.ref));
  }
  await deleteRefs(chatSnap.docs.map((c) => c.ref));

  // Flat subcollections.
  for (const col of [assetsCol, accountsCol, campaignsCol]) {
    const snap = await getDocs(col(uid, pid));
    await deleteRefs(snap.docs.map((d) => d.ref));
  }

  // Finally the project document itself.
  await deleteRefs([projectDoc(uid, pid)]);
}

export async function purgeDemoData(uid: string): Promise<void> {
  if (inFlight.has(uid)) return;
  inFlight.add(uid);
  try {
    const uref = userDoc(uid);
    const snap = await getDoc(uref);
    if (!snap.exists()) return;

    const data = snap.data();
    if (data.purged) return; // already cleaned

    // Only purge accounts seeded before the cutoff (i.e. pre-existing mock data).
    const seededAt: Timestamp | undefined = data.seededAt;
    const seededMs = seededAt?.toMillis?.() ?? 0;
    if (!data.seeded || seededMs >= PURGE_CUTOFF_MS) {
      // Nothing to purge, but record the flag so we don't re-check every visit.
      await setDoc(uref, { purged: true }, { merge: true });
      return;
    }

    for (const pid of DEMO_PROJECT_IDS) {
      await purgeProject(uid, pid);
    }

    await setDoc(
      uref,
      { purged: true, purgedAt: Timestamp.now() },
      { merge: true }
    );
  } catch (err) {
    // allow a later retry if the purge failed midway
    inFlight.delete(uid);
    throw err;
  }
}
