import {
  Instagram,
  Youtube,
  Music2,
  Twitter,
  Linkedin,
  Facebook,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

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
}

export const projects: Project[] = [
  {
    id: "aurora",
    name: "Aurora Skincare",
    handle: "@aurora.glow",
    gradient: "from-amber to-coral",
    monogram: "AS",
    lastActive: "2m ago",
    unread: 2,
  },
  {
    id: "northpeak",
    name: "North Peak Coffee",
    handle: "@northpeak.co",
    gradient: "from-coral to-violet",
    monogram: "NP",
    lastActive: "1h ago",
  },
  {
    id: "lumen",
    name: "Lumen Fitness",
    handle: "@lumen.move",
    gradient: "from-violet to-cyan",
    monogram: "LF",
    lastActive: "Yesterday",
  },
  {
    id: "harbor",
    name: "Harbor & Co.",
    handle: "@harborandco",
    gradient: "from-cyan to-teal",
    monogram: "HC",
    lastActive: "3d ago",
  },
];

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
}

export interface Chat {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export const chatsByProject: Record<string, Chat[]> = {
  aurora: [
    {
      id: "vitc-launch",
      title: "Vitamin C serum launch",
      updatedAt: "2m ago",
      messages: [
        {
          id: "m1",
          role: "user",
          content:
            "We're launching the new Vitamin C serum next week. Can you put together a week of short-form content to build hype?",
          time: "9:41 AM",
        },
        {
          id: "m2",
          role: "agent",
          content:
            "Love it. Here's a 5-day teaser plan leading into launch — each is a 20–30s vertical video tuned for Reels + TikTok:\n\n• Mon — “The 3am glow test” (before/after hook)\n• Tue — Ingredient breakdown, fast cuts\n• Wed — Founder story, raw iPhone look\n• Thu — UGC-style “what I noticed in 7 days”\n• Fri — Launch reveal + link sticker\n\nI drafted the first script and generated a rough cut for Monday. Want to review it?",
          time: "9:41 AM",
          attachments: [{ title: "Mon — 3am Glow Test (rough cut)", kind: "video" }],
        },
        {
          id: "m3",
          role: "user",
          content: "The rough cut looks great. Make the hook punchier and schedule it for 6pm.",
          time: "9:44 AM",
        },
        {
          id: "m4",
          role: "agent",
          content:
            "Done. I tightened the first 1.5s to “You've been using Vitamin C wrong.” and queued it for Monday 6:00 PM across Instagram Reels and TikTok. I'll auto-generate 3 caption variants and A/B the thumbnail. You'll get a summary once it's live.",
          time: "9:45 AM",
        },
      ],
    },
    {
      id: "blog-to-reels",
      title: "Repurpose blog → 3 Reels",
      updatedAt: "Yesterday",
      messages: [
        {
          id: "m1",
          role: "user",
          content:
            "Here's our new blog post on the 'skin barrier'. Can you turn it into 3 Reels?",
          time: "4:12 PM",
          attachments: [{ title: "Blog — Protect your skin barrier", kind: "doc" }],
        },
        {
          id: "m2",
          role: "agent",
          content:
            "Great source material. I pulled three hooks out of it:\n\n1. “Your skincare is destroying your skin barrier” (myth-bust)\n2. “The 3-step barrier repair routine” (how-to)\n3. “What a damaged barrier actually looks like” (educational)\n\nI'll storyboard all three and generate the first one now.",
          time: "4:13 PM",
        },
      ],
    },
    {
      id: "june-recap",
      title: "June recap + July plan",
      updatedAt: "3d ago",
      messages: [
        {
          id: "m1",
          role: "agent",
          content:
            "Here's June at a glance: 22 posts, +6.1k followers, best performer was the “golden hour” carousel. I've drafted a July calendar that leans into that format. Want to review it?",
          time: "Mon",
        },
      ],
    },
  ],
  northpeak: [
    {
      id: "restock",
      title: "Single-origin restock",
      updatedAt: "1h ago",
      messages: [
        {
          id: "m1",
          role: "agent",
          content:
            "Morning! Your single-origin restock drops Friday. I noticed your weekend posts get 2.3× the saves — want me to build the campaign around a Saturday reveal instead?",
          time: "8:02 AM",
        },
        {
          id: "m2",
          role: "user",
          content: "Yeah let's do Saturday. Keep the cozy handheld look.",
          time: "8:15 AM",
        },
      ],
    },
    {
      id: "gift-guide",
      title: "Holiday gift guide",
      updatedAt: "5d ago",
      messages: [
        {
          id: "m1",
          role: "user",
          content: "Start thinking about a holiday gift-guide series for us.",
          time: "Tue",
        },
        {
          id: "m2",
          role: "agent",
          content:
            "On it. I'd run a 4-part “gifts for the coffee person in your life” series, each pairing a bag with a brewing tool. I'll draft the first concept.",
          time: "Tue",
        },
      ],
    },
  ],
  lumen: [
    {
      id: "perf-review",
      title: "Monthly performance review",
      updatedAt: "Yesterday",
      messages: [
        {
          id: "m1",
          role: "user",
          content: "How did last month's content perform overall?",
          time: "Yesterday",
        },
        {
          id: "m2",
          role: "agent",
          content:
            "Strong month. 18 posts published, +12.4k followers (+8.1%), and a 4.2% average engagement rate — up from 3.1%. Your “form check” series drove 61% of new follows. I'd double down on it. Want a full breakdown in Assets?",
          time: "Yesterday",
        },
      ],
    },
    {
      id: "form-check-scripts",
      title: "Form Check series scripts",
      updatedAt: "2d ago",
      messages: [
        {
          id: "m1",
          role: "user",
          content: "Write the next 3 Form Check episodes — squat, deadlift, overhead press.",
          time: "Sat",
        },
        {
          id: "m2",
          role: "agent",
          content:
            "Done — three tight scripts with a common structure: a wrong-way cold open, the one cue that fixes it, then a 3-second payoff. Drafts are in Assets for review.",
          time: "Sat",
        },
      ],
    },
  ],
  harbor: [
    {
      id: "onboarding",
      title: "Onboarding & first campaign",
      updatedAt: "3d ago",
      messages: [
        {
          id: "m1",
          role: "agent",
          content:
            "Welcome to Harbor & Co. I've analyzed your existing feed and brand kit. Ready when you are — tell me the first campaign you'd like to run.",
          time: "3d ago",
        },
      ],
    },
  ],
};

export const suggestedPrompts = [
  "Plan next week's content",
  "Draft a launch teaser",
  "Summarize last month's performance",
  "Turn this blog post into 3 Reels",
];

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
}

export const assetsByProject: Record<string, Asset[]> = {
  aurora: [
    {
      id: "a1",
      title: "Mon — 3am Glow Test (rough cut)",
      type: "video",
      gradient: "from-amber via-coral to-violet",
      status: "ready",
      duration: "0:27",
      size: "48.2 MB",
      uploadedBy: "Agent",
      date: "Jul 1, 2026",
      platform: ["Reels", "TikTok"],
      tags: ["launch", "serum", "hook-test"],
      description:
        "Vertical teaser opening on a dim bathroom shot, hard cut to a bright morning reveal. Auto-captioned, trending audio matched.",
      transcript:
        "You've been using Vitamin C wrong.\nMost serums oxidize before they even touch your skin.\nSo we sealed ours in single-dose capsules — fresh, every morning.\nSeven days. That's all it took.\nLaunching Friday. Set a reminder.",
    },
    {
      id: "a2",
      title: "Ingredient Breakdown B-roll",
      type: "video",
      gradient: "from-coral to-amber",
      status: "processing",
      duration: "0:19",
      size: "31.7 MB",
      uploadedBy: "Maya (you)",
      date: "Jul 1, 2026",
      platform: ["Reels"],
      tags: ["b-roll", "ingredients"],
      description:
        "Macro shots of the serum texture and droplet close-ups. Being stabilized and color-graded to match brand LUT.",
      transcript: "— transcript will be generated once processing completes —",
    },
    {
      id: "a3",
      title: "Founder Story — raw iPhone",
      type: "video",
      gradient: "from-violet to-coral",
      status: "ready",
      duration: "0:41",
      size: "92.0 MB",
      uploadedBy: "Maya (you)",
      date: "Jun 30, 2026",
      platform: ["TikTok", "Shorts"],
      tags: ["founder", "story", "ugc"],
      description:
        "Unpolished handheld monologue from the founder about why the product exists. Kept intentionally raw for authenticity.",
      transcript:
        "I started Aurora because every serum I tried burned my skin.\nTurns out the problem wasn't me — it was the formula sitting on a shelf for months.\nWe fixed that. And I want to show you exactly how.",
    },
    {
      id: "a4",
      title: "Brand Kit — Summer 2026",
      type: "doc",
      gradient: "from-teal to-cyan",
      status: "ready",
      size: "2.4 MB",
      uploadedBy: "Maya (you)",
      date: "Jun 28, 2026",
      platform: ["Reference"],
      tags: ["brand", "guidelines", "palette"],
      description:
        "Color palette, typography, tone-of-voice notes and logo lockups for the summer campaign. The agent references this for every generation.",
    },
    {
      id: "a5",
      title: "Golden-hour product stills",
      type: "image",
      gradient: "from-amber to-teal",
      status: "ready",
      size: "18.9 MB",
      uploadedBy: "Agent",
      date: "Jun 27, 2026",
      platform: ["Feed", "Stories"],
      tags: ["product", "photography"],
      description:
        "A set of 12 golden-hour product photographs generated and upscaled for feed posts and story backgrounds.",
    },
    {
      id: "a6",
      title: "Launch VO — draft narration",
      type: "audio",
      gradient: "from-cyan to-violet",
      status: "draft",
      duration: "0:33",
      size: "1.1 MB",
      uploadedBy: "Agent",
      date: "Jun 27, 2026",
      platform: ["Reels", "TikTok"],
      tags: ["voiceover", "launch"],
      description:
        "AI voiceover draft for the launch reveal in the brand's warm, calm tone. Awaiting approval before final mix.",
      transcript:
        "Fresh, sealed, and finally — the way Vitamin C was meant to feel. Aurora. Friday.",
    },
  ],
  northpeak: [
    {
      id: "a1",
      title: "Saturday Reveal — teaser",
      type: "video",
      gradient: "from-coral to-violet",
      status: "processing",
      duration: "0:22",
      size: "40.1 MB",
      uploadedBy: "Agent",
      date: "Jul 2, 2026",
      platform: ["Reels", "TikTok"],
      tags: ["restock", "single-origin"],
      description: "Cozy handheld pour-over sequence with steam close-ups for the Saturday restock reveal.",
      transcript: "— transcript will be generated once processing completes —",
    },
    {
      id: "a2",
      title: "Roastery Ambience Pack",
      type: "audio",
      gradient: "from-amber to-coral",
      status: "ready",
      duration: "1:04",
      size: "2.0 MB",
      uploadedBy: "Maya (you)",
      date: "Jun 29, 2026",
      platform: ["Reference"],
      tags: ["audio", "ambience"],
      description: "Original roastery room tone for use under organic, non-trending audio posts.",
    },
  ],
  lumen: [
    {
      id: "a1",
      title: "Form Check — Ep. 04",
      type: "video",
      gradient: "from-violet to-cyan",
      status: "ready",
      duration: "0:38",
      size: "71.3 MB",
      uploadedBy: "Agent",
      date: "Jun 30, 2026",
      platform: ["Reels", "Shorts"],
      tags: ["form-check", "series", "top-performer"],
      description: "Split-screen form correction with on-screen callouts. Highest-saving format this month.",
      transcript:
        "Knees caving in? That's not weakness — it's a cue you're missing.\nDrive through the outside of your foot. Watch what happens.",
    },
    {
      id: "a2",
      title: "June Performance Report",
      type: "doc",
      gradient: "from-cyan to-teal",
      status: "ready",
      size: "3.8 MB",
      uploadedBy: "Agent",
      date: "Jul 1, 2026",
      platform: ["Reference"],
      tags: ["analytics", "monthly"],
      description: "Full month breakdown: reach, follows by format, best posting windows and recommended focus.",
    },
  ],
  harbor: [
    {
      id: "a1",
      title: "Brand Audit — starting point",
      type: "doc",
      gradient: "from-teal to-cyan",
      status: "ready",
      size: "5.2 MB",
      uploadedBy: "Agent",
      date: "Jun 30, 2026",
      platform: ["Reference"],
      tags: ["audit", "onboarding"],
      description: "Analysis of the existing feed, voice and top competitors — the baseline for Harbor's first campaign.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Connected accounts                                                 */
/* ------------------------------------------------------------------ */

export interface SocialAccount {
  id: string;
  platform: string;
  icon: LucideIcon;
  handle: string;
  followers: string;
  growth: string;
  connected: boolean;
  color: string;
}

export const accountsByProject: Record<string, SocialAccount[]> = {
  aurora: [
    { id: "ig", platform: "Instagram", icon: Instagram, handle: "@aurora.glow", followers: "84.2k", growth: "+3.1%", connected: true, color: "text-coral" },
    { id: "tt", platform: "TikTok", icon: Music2, handle: "@aurora.glow", followers: "126k", growth: "+9.4%", connected: true, color: "text-primary" },
    { id: "yt", platform: "YouTube", icon: Youtube, handle: "Aurora Skincare", followers: "12.8k", growth: "+1.2%", connected: true, color: "text-coral" },
    { id: "x", platform: "X", icon: Twitter, handle: "@auroraglow", followers: "5.4k", growth: "+0.6%", connected: false, color: "text-primary" },
    { id: "in", platform: "LinkedIn", icon: Linkedin, handle: "Aurora Skincare", followers: "2.1k", growth: "—", connected: false, color: "text-blue" },
    { id: "fb", platform: "Facebook", icon: Facebook, handle: "Aurora Skincare", followers: "9.7k", growth: "+0.4%", connected: true, color: "text-blue" },
  ],
  northpeak: [
    { id: "ig", platform: "Instagram", icon: Instagram, handle: "@northpeak.co", followers: "41.6k", growth: "+2.2%", connected: true, color: "text-coral" },
    { id: "tt", platform: "TikTok", icon: Music2, handle: "@northpeak.co", followers: "58.3k", growth: "+5.8%", connected: true, color: "text-primary" },
    { id: "yt", platform: "YouTube", icon: Youtube, handle: "North Peak Coffee", followers: "3.4k", growth: "+0.9%", connected: false, color: "text-coral" },
    { id: "fb", platform: "Facebook", icon: Facebook, handle: "North Peak Coffee", followers: "6.2k", growth: "+0.3%", connected: true, color: "text-blue" },
  ],
  lumen: [
    { id: "ig", platform: "Instagram", icon: Instagram, handle: "@lumen.move", followers: "165k", growth: "+8.1%", connected: true, color: "text-coral" },
    { id: "tt", platform: "TikTok", icon: Music2, handle: "@lumen.move", followers: "302k", growth: "+11.3%", connected: true, color: "text-primary" },
    { id: "yt", platform: "YouTube", icon: Youtube, handle: "Lumen Fitness", followers: "44.9k", growth: "+4.0%", connected: true, color: "text-coral" },
    { id: "x", platform: "X", icon: Twitter, handle: "@lumenmove", followers: "18.2k", growth: "+2.1%", connected: true, color: "text-primary" },
  ],
  harbor: [
    { id: "ig", platform: "Instagram", icon: Instagram, handle: "@harborandco", followers: "22.4k", growth: "—", connected: true, color: "text-coral" },
    { id: "in", platform: "LinkedIn", icon: Linkedin, handle: "Harbor & Co.", followers: "8.9k", growth: "—", connected: true, color: "text-blue" },
  ],
};

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
}

export interface AdStat {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

export const adStatsByProject: Record<string, AdStat[]> = {
  aurora: [
    { label: "Spend (30d)", value: "$8,420", delta: "+18%", positive: true },
    { label: "Impressions", value: "1.9M", delta: "+24%", positive: true },
    { label: "Avg. CTR", value: "2.8%", delta: "+0.4pt", positive: true },
    { label: "Blended ROAS", value: "4.1×", delta: "+0.6×", positive: true },
  ],
  northpeak: [
    { label: "Spend (30d)", value: "$2,150", delta: "+6%", positive: true },
    { label: "Impressions", value: "410k", delta: "+11%", positive: true },
    { label: "Avg. CTR", value: "1.9%", delta: "-0.2pt", positive: false },
    { label: "Blended ROAS", value: "3.2×", delta: "+0.1×", positive: true },
  ],
  lumen: [
    { label: "Spend (30d)", value: "$21,900", delta: "+31%", positive: true },
    { label: "Impressions", value: "6.4M", delta: "+40%", positive: true },
    { label: "Avg. CTR", value: "3.4%", delta: "+0.7pt", positive: true },
    { label: "Blended ROAS", value: "5.3×", delta: "+1.1×", positive: true },
  ],
  harbor: [
    { label: "Spend (30d)", value: "$0", delta: "—", positive: true },
    { label: "Impressions", value: "—", delta: "—", positive: true },
    { label: "Avg. CTR", value: "—", delta: "—", positive: true },
    { label: "Blended ROAS", value: "—", delta: "—", positive: true },
  ],
};

export const campaignsByProject: Record<string, AdCampaign[]> = {
  aurora: [
    { id: "c1", name: "Vitamin C Launch — Prospecting", platform: "Meta", objective: "Conversions", status: "active", budget: "$150/day", spend: "$3,180", spendPct: 71, impressions: "820k", clicks: "23.1k", ctr: "2.8%", roas: "4.6×" },
    { id: "c2", name: "Serum Retargeting — 7d viewers", platform: "TikTok", objective: "Conversions", status: "active", budget: "$90/day", spend: "$1,940", spendPct: 58, impressions: "540k", clicks: "19.4k", ctr: "3.6%", roas: "5.9×" },
    { id: "c3", name: "Founder Story — Awareness", platform: "Meta", objective: "Reach", status: "review", budget: "$60/day", spend: "$0", spendPct: 0, impressions: "—", clicks: "—", ctr: "—", roas: "—" },
    { id: "c4", name: "Spring Bundle — Evergreen", platform: "Meta", objective: "Sales", status: "paused", budget: "$40/day", spend: "$1,300", spendPct: 100, impressions: "310k", clicks: "6.2k", ctr: "2.0%", roas: "2.9×" },
  ],
  northpeak: [
    { id: "c1", name: "Single-Origin Restock", platform: "Meta", objective: "Conversions", status: "active", budget: "$50/day", spend: "$980", spendPct: 65, impressions: "210k", clicks: "4.1k", ctr: "1.9%", roas: "3.4×" },
    { id: "c2", name: "Subscription — Retargeting", platform: "Meta", objective: "Sales", status: "paused", budget: "$30/day", spend: "$1,170", spendPct: 100, impressions: "180k", clicks: "3.0k", ctr: "1.7%", roas: "3.0×" },
  ],
  lumen: [
    { id: "c1", name: "Form Check Series — Prospecting", platform: "TikTok", objective: "App Installs", status: "active", budget: "$400/day", spend: "$9,600", spendPct: 80, impressions: "3.1M", clicks: "108k", ctr: "3.5%", roas: "5.8×" },
    { id: "c2", name: "Membership — Meta Advantage+", platform: "Meta", objective: "Conversions", status: "active", budget: "$300/day", spend: "$7,200", spendPct: 72, impressions: "2.2M", clicks: "71k", ctr: "3.2%", roas: "5.1×" },
    { id: "c3", name: "Challenge Signup — YouTube", platform: "YouTube", objective: "Leads", status: "active", budget: "$180/day", spend: "$5,100", spendPct: 61, impressions: "1.1M", clicks: "22k", ctr: "2.0%", roas: "4.4×" },
  ],
  harbor: [],
};
