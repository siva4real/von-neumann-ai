import {
  Video,
  Camera,
  Sparkles,
  TrendingUp,
  FileText,
  Wand2,
  Handshake,
  PlayCircle,
  UserPlus,
  Search,
  CalendarCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const hireHero = {
  eyebrow: "Creator Marketplace",
  title: ["Hire creators who make", "your brand impossible", "to scroll past."],
  highlight: "impossible",
  subtitle:
    "A two-sided marketplace for the people behind the feed. Brands hire vetted videographers, photographers, and UGC creators on demand — and creators sign up to get discovered, booked, and paid.",
  brandCta: { label: "Hire creators", href: "#join" },
  creatorCta: { label: "Apply as a creator", href: "#join" },
  stats: [
    { value: "2,400+", label: "vetted creators" },
    { value: "48 hrs", label: "avg. time to booked" },
    { value: "4.9/5", label: "client rating" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export interface Category {
  icon: LucideIcon;
  name: string;
  blurb: string;
  /** brand accent hex */
  color: string;
  count: string;
}

export const categories: Category[] = [
  {
    icon: Video,
    name: "Videographers",
    blurb: "Cinematic brand films, event coverage, and scroll-stopping short-form edits.",
    color: "#00bbff",
    count: "820 creators",
  },
  {
    icon: Camera,
    name: "Photographers",
    blurb: "Product, lifestyle, and editorial shoots that make your catalog look premium.",
    color: "#bb88ff",
    count: "640 creators",
  },
  {
    icon: Sparkles,
    name: "UGC Creators",
    blurb: "Authentic, native-feeling content built to convert — not just to look pretty.",
    color: "#ffab2a",
    count: "710 creators",
  },
  {
    icon: TrendingUp,
    name: "Influencers",
    blurb: "Reach and trust with engaged audiences across every major platform.",
    color: "#ff8866",
    count: "230 creators",
  },
];

/* ------------------------------------------------------------------ */
/*  Audience split (For brands / For creators)                         */
/* ------------------------------------------------------------------ */

export const audience = {
  brand: {
    key: "brand" as const,
    label: "I want to hire",
    heading: "Talent, matched to your brief in hours.",
    body: "Skip the DMs and endless back-and-forth. Post what you need, get matched with creators who fit your budget and aesthetic, and approve the ones you love.",
    points: [
      "Browse vetted, portfolio-backed creators",
      "Transparent rates — no hidden agency markup",
      "Milestone payments, released only when you approve",
      "Usage rights and licensing sorted up front",
    ],
    cta: { label: "Post a brief", href: "#join" },
  },
  creator: {
    key: "creator" as const,
    label: "I want to get hired",
    heading: "Do the work you love. We bring the clients.",
    body: "Build a profile once and get in front of brands actively looking to book. Set your own rates, choose your projects, and get paid on time — every time.",
    points: [
      "A profile that shows off your best work",
      "Inbound briefs matched to your niche",
      "You set the rate — keep what you earn",
      "Fast, guaranteed payouts after delivery",
    ],
    cta: { label: "Create your profile", href: "#join" },
  },
};

/* ------------------------------------------------------------------ */
/*  Featured creators (mock)                                           */
/* ------------------------------------------------------------------ */

export interface Creator {
  name: string;
  role: string;
  niche: string;
  location: string;
  rating: number;
  jobs: number;
  rate: string;
  /** two-color gradient for the avatar */
  from: string;
  to: string;
  tags: string[];
}

export const featuredCreators: Creator[] = [
  {
    name: "Maya Okafor",
    role: "UGC Creator",
    niche: "Beauty & Skincare",
    location: "Lagos, NG",
    rating: 4.9,
    jobs: 128,
    rate: "from $240 / video",
    from: "#ffab2a",
    to: "#ff8866",
    tags: ["Short-form", "Unboxings", "Tutorials"],
  },
  {
    name: "Diego Santos",
    role: "Videographer",
    niche: "Travel & Lifestyle",
    location: "Lisbon, PT",
    rating: 5.0,
    jobs: 74,
    rate: "from $1,200 / day",
    from: "#00bbff",
    to: "#77dddd",
    tags: ["Cinematic", "Drone", "Editing"],
  },
  {
    name: "Priya Nair",
    role: "Photographer",
    niche: "Product & Food",
    location: "Mumbai, IN",
    rating: 4.8,
    jobs: 156,
    rate: "from $520 / shoot",
    from: "#bb88ff",
    to: "#0099ff",
    tags: ["Studio", "Lifestyle", "Editorial"],
  },
  {
    name: "Jordan Blake",
    role: "Influencer",
    niche: "Fitness & Wellness",
    location: "Austin, US",
    rating: 4.9,
    jobs: 92,
    rate: "from $900 / post",
    from: "#ff8866",
    to: "#bb88ff",
    tags: ["340K reach", "Reels", "Reviews"],
  },
  {
    name: "Sofia Rossi",
    role: "UGC Creator",
    niche: "Home & Interior",
    location: "Milan, IT",
    rating: 5.0,
    jobs: 61,
    rate: "from $310 / video",
    from: "#77dddd",
    to: "#00bbff",
    tags: ["Voiceover", "Styling", "How-to"],
  },
  {
    name: "Kai Tanaka",
    role: "Videographer",
    niche: "Tech & Gadgets",
    location: "Tokyo, JP",
    rating: 4.9,
    jobs: 88,
    rate: "from $1,000 / day",
    from: "#0099ff",
    to: "#bb88ff",
    tags: ["Product films", "Motion", "Color"],
  },
];

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */

export interface Step {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const brandSteps: Step[] = [
  {
    icon: FileText,
    title: "Post your brief",
    body: "Tell us the deliverable, budget, and vibe. Takes about two minutes.",
  },
  {
    icon: Wand2,
    title: "Get matched",
    body: "We surface a shortlist of creators who fit your niche and price range.",
  },
  {
    icon: Handshake,
    title: "Review & book",
    body: "Compare portfolios and rates, then hire with one click and a secure deposit.",
  },
  {
    icon: PlayCircle,
    title: "Receive content",
    body: "Get your files, approve the work, and release payment. Rights included.",
  },
];

export const creatorSteps: Step[] = [
  {
    icon: UserPlus,
    title: "Build your profile",
    body: "Upload your best work, set your niche, and name your own rates.",
  },
  {
    icon: Search,
    title: "Get discovered",
    body: "Matching briefs land in your inbox — no cold pitching required.",
  },
  {
    icon: CalendarCheck,
    title: "Book the gig",
    body: "Accept the projects you want and lock in the deposit before you shoot.",
  },
  {
    icon: Wallet,
    title: "Get paid",
    body: "Deliver, get approved, and receive a fast, guaranteed payout.",
  },
];
