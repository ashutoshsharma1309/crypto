"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { Stat } from "@/lib/content";

function format(n: number, decimals = 0) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Animated count-up. Ticks from 0 to the REAL value on viewport enter.
 * Under reduced motion (or before mount) it renders the final value directly —
 * it never gets stuck at 0.
 */
export function StatCounter({ stat }: { stat: Stat }) {
  const { value, decimals = 0, prefix = "", suffix = "", label, note } = stat;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  // Render the REAL value for SSR / no-JS / crawlers; the client count-up
  // restarts from 0 only when the stat scrolls into view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-display text-display-sm md:text-display-md leading-none text-bone tabular-nums">
        <span className="text-gold">{prefix}</span>
        {format(display, decimals)}
        <span className="text-gold">{suffix}</span>
      </div>
      <p className="mt-3 text-sm leading-snug text-bone-dim max-w-[28ch]">
        {label}
      </p>
      {note ? (
        <p className="mt-1.5 text-xs uppercase tracking-wider text-bone-faint">
          {note}
        </p>
      ) : null}
    </div>
  );
}
