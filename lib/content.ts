import {
  Clapperboard,
  Bot,
  PhoneCall,
  ScanEye,
  type LucideIcon,
} from "lucide-react";

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

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface Service {
  tag: string;
  icon: LucideIcon;
  title: string;
  body: string;
  features?: string[];
  cards?: ServiceFeature[];
}

export const services: {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Service[];
} = {
  eyebrow: "What we do",
  title: "Two ways we put AI to work.",
  subtitle:
    "One team, two pillars. We create the content that grows your audience and build the custom automations that quietly run the rest — designed, deployed, and managed end to end.",
  items: [
    {
      tag: "Service 01",
      icon: Clapperboard,
      title: "Social Media Agent",
      body: "An agent that owns your entire social presence. It creates, edits, and posts video, then manages your accounts day to day — a consistent, on-brand feed that runs without anyone lifting a finger.",
      features: [
        "Scripts, generates, and edits short-form video",
        "Publishes on a schedule across every platform",
        "Manages accounts and community, fully hands-off",
      ],
    },
    {
      tag: "Service 02",
      icon: Bot,
      title: "Custom Automations",
      body: "Bespoke AI systems built around your business and deployed against your real tools, data, and workflows.",
      cards: [
        {
          icon: Bot,
          title: "Knowledge assistants",
          body: "AI assistants with deep, specific knowledge of your company — helping your customers and your own team, around the clock.",
        },
        {
          icon: PhoneCall,
          title: "Receptionists & lead agents",
          body: "AI receptionists and messaging agents that answer, qualify, and manage every lead so none slip through.",
        },
        {
          icon: ScanEye,
          title: "Computer-vision edge devices",
          body: "Custom vision hardware deployed on-site and wired straight into your AI — watching, counting, and inspecting in real time.",
        },
      ],
    },
  ],
};
