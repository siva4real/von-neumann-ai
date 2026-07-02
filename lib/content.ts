import {
  Workflow,
  Bot,
  Plug,
  Gauge,
  ShieldCheck,
  Radio,
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
    "von Neumann designs, deploys, and operates AI agents that run your workflows end to end — self-replicating systems that scale from a single task to your whole operation.",
  primaryCta: { label: "Book a call", href: "#contact" },
  secondaryCta: { label: "See how it works", href: "#process" },
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
    icon: Workflow,
    title: "Workflow automation",
    body: "We map the busywork and hand it to agents — intake, routing, data entry, reporting, follow-ups. The work runs itself.",
  },
  {
    icon: Bot,
    title: "Custom AI agents",
    body: "Purpose-built agents that reason over your data, call your tools, and take action with human checkpoints where it matters.",
  },
  {
    icon: Plug,
    title: "Systems integration",
    body: "One unified layer across your CRM, inbox, docs, and databases. Your stack, connected and orchestrated end to end.",
  },
  {
    icon: Gauge,
    title: "Real-time operations",
    body: "Event-driven pipelines that respond the moment something changes — no polling, no lag, no dropped work.",
  },
  {
    icon: ShieldCheck,
    title: "Governed by design",
    body: "Every action is scoped, logged, and reversible. Approvals, audit trails, and guardrails baked into every deployment.",
  },
  {
    icon: Radio,
    title: "Fully managed",
    body: "We don't just ship and leave. We monitor, tune, and evolve your agents as your business changes.",
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
    body: "We audit your workflows and find the highest-leverage tasks to automate first — measured in hours saved, not hype.",
  },
  {
    no: "02",
    title: "Build",
    body: "We design and deploy agents against your real tools and data, with guardrails and human approvals wired in.",
  },
  {
    no: "03",
    title: "Replicate",
    body: "Once a pattern works, it spreads. Each agent becomes the template for the next — automation that compounds.",
  },
  {
    no: "04",
    title: "Operate",
    body: "We run it in production, monitor every action, and keep improving as your business and your stack evolve.",
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
  body: "Every agent runs in an isolated, least-privilege environment. Only the endpoints it needs are exposed, every action is logged, and traffic is encrypted in transit.",
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
  body: "How we helped Meridian's ops team clear a 6,000-ticket backlog and cut response time by 74% with a fleet of support agents.",
  metrics: [
    { value: "74%", label: "faster response" },
    { value: "6,000+", label: "tickets cleared" },
    { value: "3 wks", label: "to production" },
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
