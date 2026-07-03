"use client";

import { useEffect, useState } from "react";
import { AuthButton } from "./AuthButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white">
            <span className="spectrum-bar h-3 w-3 rounded-[3px]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            von Neumann
          </span>
        </a>

        <AuthButton />
      </nav>
    </header>
  );
}
