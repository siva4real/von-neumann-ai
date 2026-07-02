import {
  Clapperboard,
  Share2,
  Bot,
  PhoneCall,
  BarChart3,
  ScanEye,
  type LucideIcon,
} from "lucide-react";

export const nav = {
  links: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Platform", href: "#platform" },
    { label: "Work", href: "#work" },
  ],
  cta: { label: "Book a call", href: "#contact" },
};

export const hero = {
  eyebrow: "AI Automation Agency",
  title: ["Automation that", "builds itself."],
  highlight: "builds itself.",
  subtitle:
    "von Neumann builds the AI that grows your audience and runs your operations — from viral video and hands-off social media to custom chatbots, AI receptionists, and computer-vision systems trained on your business.",
  primaryCta: { label: "Book a call", href: "#contact" },
  secondaryCta: { label: "Explore what we build", href: "#services" },
  install: "npx create-vn-agent@latest",
};

export const logos = [
  "Northwind",
  "Cortex Labs",
  "Meridian",
  "Halcyon",
  "Vantage",
  "Quanta",
  "Redshift",
  "Lumen",
];

export interface Capability {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const capabilities: Capability[] = [
  {
    icon: Clapperboard,
    title: "Viral video production",
    body: "We script, generate, and edit short-form video built to travel — hooks, captions, and cuts tuned to how each platform actually rewards content.",
  },
  {
    icon: Share2,
    title: "Social media on autopilot",
    body: "Your channels, run for you. Planning, posting, and community replies across every platform — a consistent presence without the daily grind.",
  },
  {
    icon: Bot,
    title: "Custom AI chatbots",
    body: "Assistants trained on your company's own knowledge that answer customers or your team accurately — around the clock, in your voice, wired into your tools.",
  },
  {
    icon: PhoneCall,
    title: "AI receptionist",
    body: "A voice agent that answers every call, books appointments, and routes requests — never misses a caller, never leaves anyone on hold.",
  },
  {
    icon: BarChart3,
    title: "Data analysis & insights",
    body: "We turn scattered business data into ongoing, decision-ready insight — the numbers that show what's working and exactly what to do next.",
  },
  {
    icon: ScanEye,
    title: "Computer vision units",
    body: "Vision systems that watch what matters — counting, inspecting, and monitoring in real time, deployed on-site or at the edge.",
  },
];

export interface Step {
  no: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    no: "01",
    title: "Map",
    body: "We learn your business and pinpoint the highest-leverage wins first — the content that should ship and the work that should run itself.",
  },
  {
    no: "02",
    title: "Build",
    body: "We design and deploy against your real tools, data, and brand — video engines, chatbots, receptionists, and vision systems, with humans in the loop where it counts.",
  },
  {
    no: "03",
    title: "Replicate",
    body: "Once a pattern works, it spreads. Each agent and format becomes the template for the next — leverage that compounds.",
  },
  {
    no: "04",
    title: "Operate",
    body: "We run it in production, watch every result, and keep tuning as your audience, your data, and your business evolve.",
  },
];

export const stats = [
  { value: "10k+", label: "tasks automated / day" },
  { value: "<1s", label: "median agent response" },
  { value: "99.9%", label: "pipeline uptime" },
  { value: "40+", label: "systems integrated" },
];

export const security = {
  eyebrow: "Trust & Control",
  title: "Your data. Your rules. Locked down by design.",
  body: "Your company's knowledge and customer data stay yours. Every agent runs in an isolated, least-privilege environment — only the endpoints it needs are exposed, every action is logged, and traffic is encrypted in transit.",
  points: [
    {
      title: "Least-privilege access",
      body: "Agents get exactly the permissions they need — nothing more — scoped per task and revocable instantly.",
    },
    {
      title: "Full audit trail",
      body: "Every decision and action is recorded, replayable, and reversible. Nothing happens off the record.",
    },
    {
      title: "SOC 2 aligned",
      body: "Built to meet SOC 2 standards for security, availability, and operational control from day one.",
    },
  ],
};

export const caseStudy = {
  eyebrow: "Case Study",
  client: "Meridian",
  body: "How a custom support chatbot and AI receptionist cleared Meridian's inbox backlog and cut response time by 74% — while never missing a call.",
  metrics: [
    { value: "74%", label: "faster response" },
    { value: "6,000+", label: "conversations handled" },
    { value: "3 wks", label: "to launch" },
  ],
};

export const manifesto = {
  lines: [
    "John von Neumann imagined machines that could build copies of themselves.",
    "That's what we build for your business —",
    "automation that replicates, compounds, and runs on its own.",
    "We call it work that does itself.",
  ],
};

export const footer = {
  columns: [
    {
      title: "Company",
      links: ["Services", "Process", "Work", "About", "Careers"],
    },
    {
      title: "Resources",
      links: ["Blog", "Docs", "Guides", "Changelog", "Status"],
    },
    {
      title: "Connect",
      links: ["LinkedIn", "GitHub", "X / Twitter", "Contact"],
    },
  ],
};
