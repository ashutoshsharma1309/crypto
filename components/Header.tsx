"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/content";

/** Sticky header: transparent over the hero, ledger-solid once scrolled. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-ink-700 bg-ink-950/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg tracking-tight text-bone"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rotate-45 border border-gold bg-gold/30"
          />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-bone-dim transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#join"
          className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink-950"
        >
          Early access
        </Link>
      </div>
    </header>
  );
}
