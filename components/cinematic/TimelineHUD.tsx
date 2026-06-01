"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { chronicle } from "@/lib/content";

const T = chronicle.timing;
const SPAN_START = T[1][0];
const SPAN_END = T[5][1];
const span = SPAN_END - SPAN_START;

const TICKS = [1, 2, 3, 4, 5].map((i) => {
  const mid = (T[i][0] + T[i][1]) / 2;
  return {
    pos: ((mid - SPAN_START) / span) * 100,
    year: chronicle.chapters[i].year ?? "",
  };
});

/**
 * The history timeline as a cinematic HUD: a year-axis you traverse as you walk
 * the corridor. The marker tracks scroll; era ticks light as the walk reaches
 * them.
 */
export function TimelineHUD({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: number;
}) {
  const fill = useTransform(progress, [SPAN_START, SPAN_END], [0, 1]);
  const markerLeft = useTransform(progress, (p) => {
    const v = (p - SPAN_START) / span;
    return `${Math.max(0, Math.min(1, v)) * 100}%`;
  });
  const opacity = useTransform(
    progress,
    [T[0][1] - 0.02, T[0][1] + 0.03, SPAN_END, SPAN_END + 0.04],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="relative h-10 w-full">
      <div className="absolute left-0 right-0 top-1 h-px bg-ink-700" />
      <motion.div className="absolute left-0 top-1 h-px origin-left bg-gold" style={{ scaleX: fill, width: "100%" }} />
      {TICKS.map((t, i) => {
        const lit = active >= i + 1;
        return (
          <div key={i} className="absolute top-0" style={{ left: `${t.pos}%` }}>
            <span
              className={`block h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-all duration-300 ${
                lit ? "border-gold bg-gold shadow-[0_0_10px_rgba(200,162,74,0.7)]" : "border-ink-600 bg-ink-950"
              }`}
            />
            <span
              className={`mt-2 block -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                active === i + 1 ? "text-gold" : "text-bone-faint"
              }`}
            >
              {t.year}
            </span>
          </div>
        );
      })}
      <motion.div style={{ left: markerLeft }} className="absolute top-1 -translate-y-1/2">
        <span className="block h-3 w-3 -translate-x-1/2 -translate-y-[1px] rounded-full bg-bone shadow-[0_0_12px_rgba(236,230,220,0.9)]" />
      </motion.div>
    </motion.div>
  );
}
