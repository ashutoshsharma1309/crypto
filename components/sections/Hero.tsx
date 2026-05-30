"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EASE } from "@/components/ui/motion";

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Ambient gold horizon — single accent, used sparingly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 110%, rgba(200,162,74,0.14), transparent 55%)",
        }}
      />
      {/* Faint ledger lines. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(236,230,220,0.035) 1px, transparent 1px)",
          backgroundSize: "calc(100%/6) 100%",
        }}
      />

      <div className="container-page relative py-20">
        <motion.div {...rise(0)}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          className="mt-7 max-w-[16ch] text-display-xl text-bone"
        >
          {hero.titleLead}{" "}
          <span className="text-gilded animate-gold-sweep">{hero.gild}</span>{" "}
          {hero.titleTail}
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-8 max-w-measure text-lead text-bone-dim"
        >
          {hero.sub}
        </motion.p>

        <motion.p
          {...rise(0.22)}
          className="mt-6 max-w-measure font-display text-display-sm text-bone"
        >
          {hero.reframe.lead}{" "}
          <span className="text-bone-dim">{hero.reframe.tail}</span>
        </motion.p>

        <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap gap-4">
          {hero.ctas.map((c) => (
            <CTA key={c.label} href={c.href} primary={c.primary}>
              {c.label}
            </CTA>
          ))}
        </motion.div>

        <motion.ul
          {...rise(0.4)}
          className="mt-14 flex flex-wrap gap-x-3 gap-y-3"
        >
          {hero.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-ink-700 px-4 py-1.5 text-xs uppercase tracking-wider text-bone-dim"
            >
              {chip}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Scroll hint */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-bone-faint"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          Scroll
        </motion.div>
      )}
    </section>
  );
}
