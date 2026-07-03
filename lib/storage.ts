// Cloud Storage access layer — the file bytes behind the Asset metadata in
// Firestore.
//
// There is one physical bucket (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET); we carve it
// into two logical "buckets" by path prefix, each with its own rule in
// storage.rules:
//
//   1. User bucket    users/{uid}/projects/{pid}/assets/{objectId}/{filename}
//        Private, per-user + per-project. Mirrors the Firestore users/{uid}/…
//        tree and its rules — a signed-in user reads/writes only their own path.
//
//   2. Internal bucket  internal/assets/{objectId}/{filename}
//        A shared, org-owned library. Any signed-in user can read it; writes are
//        done server-side (Admin SDK / Firebase console), never from the client.
//        `uploadInternalAsset` exists for those trusted contexts.
"use client";

import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
  type StorageReference,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import type { AssetType } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Path builders                                                      */
/* ------------------------------------------------------------------ */

/** Root prefix for a project's user-uploaded assets. */
export const userAssetsPrefix = (uid: string, pid: string) =>
  `users/${uid}/projects/${pid}/assets`;

/** Root prefix for the shared internal library. */
export const internalAssetsPrefix = () => `internal/assets`;

/**
 * Strip characters that make object paths awkward and collapse whitespace, so a
 * stored object keeps a recognizable name without breaking the path.
 */
function safeName(name: string): string {
  const cleaned = name.replace(/[^\w.\-]+/g, "_").replace(/_+/g, "_");
  return cleaned.slice(0, 120) || "file";
}

/** A short, collision-resistant id used as the per-object folder. */
function objectId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ------------------------------------------------------------------ */
/*  File → metadata helpers                                            */
/* ------------------------------------------------------------------ */

/** Map a File's MIME type onto the dashboard's coarse AssetType buckets. */
export function assetTypeFromFile(file: File): AssetType {
  const m = file.type || "";
  if (m.startsWith("video/")) return "video";
  if (m.startsWith("image/")) return "image";
  if (m.startsWith("audio/")) return "audio";
  return "doc";
}

/** Human-readable byte count, e.g. 1536 → "1.5 KB". */
export function formatBytes(bytes: number): string {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const val = bytes / Math.pow(1024, i);
  return `${val >= 10 || i === 0 ? Math.round(val) : val.toFixed(1)} ${units[i]}`;
}

/* ------------------------------------------------------------------ */
/*  Uploads                                                            */
/* ------------------------------------------------------------------ */

/** What an upload resolves to — enough to render and later delete the object. */
export interface StoredFile {
  storagePath: string;
  downloadURL: string;
  contentType: string;
  /** raw byte size, and a formatted string for display */
  bytes: number;
  size: string;
}

type ProgressFn = (fraction: number) => void;

async function upload(
  destRef: StorageReference,
  file: File,
  onProgress?: ProgressFn
): Promise<StoredFile> {
  const task = uploadBytesResumable(destRef, file, {
    contentType: file.type || "application/octet-stream",
  });

  await new Promise<void>((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) =>
        onProgress?.(
          snap.totalBytes ? snap.bytesTransferred / snap.totalBytes : 0
        ),
      reject,
      () => resolve()
    );
  });

  const downloadURL = await getDownloadURL(task.snapshot.ref);
  return {
    storagePath: task.snapshot.ref.fullPath,
    downloadURL,
    contentType: task.snapshot.metadata.contentType || file.type || "",
    bytes: file.size,
    size: formatBytes(file.size),
  };
}

/** Upload a user's asset into their private per-project bucket. */
export function uploadUserAsset(
  uid: string,
  pid: string,
  file: File,
  onProgress?: ProgressFn
): Promise<StoredFile> {
  const path = `${userAssetsPrefix(uid, pid)}/${objectId()}/${safeName(file.name)}`;
  return upload(ref(storage, path), file, onProgress);
}

/**
 * Upload into the shared internal library. Client writes here are denied by
 * storage.rules — call this only from a trusted context (Admin SDK / a signed-in
 * admin whose uid the rules allow).
 */
export function uploadInternalAsset(
  file: File,
  onProgress?: ProgressFn
): Promise<StoredFile> {
  const path = `${internalAssetsPrefix()}/${objectId()}/${safeName(file.name)}`;
  return upload(ref(storage, path), file, onProgress);
}

/* ------------------------------------------------------------------ */
/*  Deletes                                                            */
/* ------------------------------------------------------------------ */

/**
 * Best-effort delete of a stored object. A missing object (already gone, or an
 * asset that never had a file) is treated as success so callers can delete the
 * metadata unconditionally.
 */
export async function deleteStoredObject(storagePath?: string): Promise<void> {
  if (!storagePath) return;
  try {
    await deleteObject(ref(storage, storagePath));
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === "storage/object-not-found") return;
    console.error("[storage] delete failed", storagePath, err);
  }
}

/**
 * Delete every stored object under a project's asset prefix. Used when a project
 * is wiped (see lib/purge.ts) so no orphaned files are left behind.
 */
export async function deleteUserProjectAssets(
  uid: string,
  pid: string
): Promise<void> {
  const root = ref(storage, userAssetsPrefix(uid, pid));
  await deleteTree(root);
}

/** Recursively delete a storage folder (listAll is one level at a time). */
async function deleteTree(dir: StorageReference): Promise<void> {
  let listing;
  try {
    listing = await listAll(dir);
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === "storage/object-not-found") return;
    throw err;
  }
  await Promise.all(listing.items.map((item) => deleteObject(item).catch(() => {})));
  await Promise.all(listing.prefixes.map((sub) => deleteTree(sub)));
}
