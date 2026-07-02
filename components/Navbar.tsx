"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-secondary transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href={nav.cta.href} className="btn-primary">
            {nav.cta.label}
          </a>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-line md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-secondary hover:bg-black/5 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {nav.cta.label}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
