// Firestore-friendly domain types for the dashboard.
//
// These mirror the shapes in `lib/dashboardData.ts` (which now serves only as the
// seed source), with two deliberate differences:
//   1. `SocialAccount.iconKey` is a string instead of a `LucideIcon` component —
//      components can't be stored in Firestore. Views map the key back to an icon.
//   2. Docs carry `createdAt` (and chats `updatedAtTs`) Firestore Timestamps used for
//      ordering, while the existing human display strings (`lastActive`, chat
//      `updatedAt` label, asset `date`, message `time`) are kept for rendering.
import type { Timestamp } from "firebase/firestore";

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export interface AdStat {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

export interface Project {
  id: string;
  name: string;
  /** short brand handle shown under the name */
  handle: string;
  /** tailwind gradient stops for the avatar chip */
  gradient: string;
  /** two-letter monogram */
  monogram: string;
  lastActive: string;
  unread?: number;
  /** paid-ads summary tiles, stored inline on the project */
  adStats?: AdStat[];
  createdAt?: Timestamp;
  /** manual ordering in the project rail (lower = higher) */
  order?: number;
}

/* ------------------------------------------------------------------ */
/*  Chat                                                               */
/* ------------------------------------------------------------------ */

export interface ChatAttachment {
  title: string;
  kind: "video" | "image" | "doc";
}

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  time: string;
  attachments?: ChatAttachment[];
  createdAt?: Timestamp;
}

export interface Chat {
  id: string;
  title: string;
  /** display label, e.g. "2m ago" */
  updatedAt: string;
  /** sortable recency key */
  updatedAtTs?: Timestamp;
  createdAt?: Timestamp;
}

/* ------------------------------------------------------------------ */
/*  Assets                                                             */
/* ------------------------------------------------------------------ */

export type AssetType = "video" | "image" | "audio" | "doc";
export type AssetStatus = "ready" | "processing" | "draft";

export interface Asset {
  id: string;
  title: string;
  type: AssetType;
  gradient: string;
  status: AssetStatus;
  duration?: string;
  size: string;
  uploadedBy: string;
  date: string;
  platform: string[];
  tags: string[];
  description: string;
  transcript?: string;
  createdAt?: Timestamp;
  /* --- Cloud Storage backing (absent on metadata-only/seed assets) --- */
  /** full object path in the bucket, used for download + delete */
  storagePath?: string;
  /** long-lived download URL for rendering/downloading the file */
  downloadURL?: string;
  /** stored MIME type */
  contentType?: string;
}

/* ------------------------------------------------------------------ */
/*  Connected accounts                                                 */
/* ------------------------------------------------------------------ */

/** Stable key mapped to a Lucide icon component in the view layer. */
export type AccountIconKey =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "x"
  | "linkedin"
  | "facebook";

export interface SocialAccount {
  id: string;
  platform: string;
  iconKey: AccountIconKey;
  handle: string;
  followers: string;
  growth: string;
  connected: boolean;
  color: string;
  createdAt?: Timestamp;
}

/* ------------------------------------------------------------------ */
/*  Paid ads                                                           */
/* ------------------------------------------------------------------ */

export type CampaignStatus = "active" | "paused" | "review" | "ended";

export interface AdCampaign {
  id: string;
  name: string;
  platform: string;
  objective: string;
  status: CampaignStatus;
  budget: string;
  spend: string;
  spendPct: number;
  impressions: string;
  clicks: string;
  ctr: string;
  roas: string;
  createdAt?: Timestamp;
}
