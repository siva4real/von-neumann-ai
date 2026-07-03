import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireHero } from "@/components/hire/HireHero";
import { CreatorShowcase } from "@/components/hire/CreatorShowcase";
import { AudienceSplit } from "@/components/hire/AudienceSplit";
import { HowItWorks } from "@/components/hire/HowItWorks";
import { JoinForm } from "@/components/hire/JoinForm";

export const metadata: Metadata = {
  title: "Hire Creators — von Neumann Marketplace",
  description:
    "A two-sided creator marketplace. Brands hire vetted videographers, photographers, and UGC creators on demand — and creators sign up to get discovered, booked, and paid.",
  openGraph: {
    title: "Hire Creators — von Neumann Marketplace",
    description:
      "Hire vetted videographers, photographers, and UGC creators — or sign up to get hired.",
    type: "website",
  },
};

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main>
        <HireHero />
        <CreatorShowcase />
        <AudienceSplit />
        <HowItWorks />
        <JoinForm />
      </main>
      <Footer />
    </>
  );
}
