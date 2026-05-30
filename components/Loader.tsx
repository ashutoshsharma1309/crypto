"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loader } from "@/lib/content";

/**
 * Themed intro reveal: a vault counter ticks 0 → 100 ("Cracking the vault"),
 * then the panel lifts away. ~1.2s, skippable (click / key / scroll), and
 * rendered as a fixed overlay so it can never cause layout shift (no CLS).
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1200;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      cancelAnimationFrame(raf);
      setCount(100);
      setDone(true);
    };

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-8 px-6 text-center">
            <span className="text-eyebrow uppercase text-gold animate-flicker">
              {loader.brand}
            </span>

            <div className="font-display text-[clamp(4rem,18vw,11rem)] leading-none text-bone tabular-nums">
              {count}
              <span className="text-gold">%</span>
            </div>

            <div className="flex w-56 flex-col gap-3">
              <div className="h-px w-full overflow-hidden bg-ink-700">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  style={{ originX: 0 }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-bone-faint">
                {loader.label}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
