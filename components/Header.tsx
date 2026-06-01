"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/content";

/** Sticky header: transparent over the hero, ledger-solid once scrolled. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Hide the nav while the cinematic Chronicle fills the screen — let the
  // movie's own chrome take over.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const cine = document.querySelector("[data-cinematic]");
      if (cine) {
        const r = cine.getBoundingClientRect();
        setHidden(r.top <= 4 && r.bottom >= window.innerHeight - 4);
      } else {
        setHidden(false);
      }
    };
    onScroll();
    const t1 = setTimeout(onScroll, 150);
    const t2 = setTimeout(onScroll, 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${
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
