import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Capabilities } from "@/components/Capabilities";
import { Process } from "@/components/Process";
import { Platform } from "@/components/Platform";
import { Security } from "@/components/Security";
import { CaseStudy } from "@/components/CaseStudy";
import { Manifesto } from "@/components/Manifesto";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <Capabilities />
        <Process />
        <Platform />
        <Security />
        <CaseStudy />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
