"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { inView } from "@/components/ui/motion";
import { history, type HistoryRow } from "@/lib/content";

const N = history.rows.length;
const EASE = [0.22, 1, 0.36, 1] as const;

function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

/* ================================================================== *
 *  DESKTOP — pinned horizontal gallery (ivress-style)
 *  Full-screen panels slide left as you scroll; a ghosted numeral
 *  layer behind them moves slower for parallax depth.
 * ================================================================== */

function HistoryHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Deterministic vw translation — no measurement, so it can never be empty.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(N - 1) * 100}vw`]
  );
  // Background ghost numerals drift at 55% speed → parallax depth.
  const bgX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(N - 1) * 55}vw`]
  );
  const railScaleX = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(p * (N - 1)))));
  });

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative border-y border-ink-700"
      style={{ height: `${N * 100}vh` }}
      aria-label={history.heading}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Parallax ghost-numeral layer */}
        <motion.div
          aria-hidden
          style={{ x: bgX }}
          className="absolute inset-0 flex"
        >
          {history.rows.map((row, i) => (
            <div
              key={row.event}
              className="flex h-full w-screen shrink-0 items-center justify-center"
            >
              <span className="select-none font-display text-[42vw] leading-none text-ink-800/70">
                {num(i)}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Vignette so panel text stays legible over the ghost numerals */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 50%, transparent 30%, rgba(10,9,8,0.55) 100%)",
          }}
        />

        {/* Foreground panels */}
        <motion.ol style={{ x }} className="relative flex h-full">
          {history.rows.map((row, i) => (
            <Panel key={row.event} row={row} i={i} active={i === active} />
          ))}
        </motion.ol>

        {/* Pinned heading (top-left) */}
        <div className="pointer-events-none absolute left-0 right-0 top-0">
          <div className="container-page pt-24">
            <Eyebrow>{history.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-[18ch] text-display-sm text-bone">
              {history.heading}
            </h2>
          </div>
        </div>

        {/* Pinned progress rail + index counter (bottom) */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-page pb-10">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-display text-2xl text-bone tabular-nums">
                <span className="text-gold">{num(active)}</span>
                <span className="text-bone-faint"> / {num(N - 1)}</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-bone-faint">
                Scroll to advance
              </span>
            </div>
            <div className="relative h-px w-full bg-ink-700">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-gold"
                style={{ scaleX: railScaleX }}
              />
              <div className="absolute inset-0 flex items-center justify-between">
                {history.rows.map((row, i) => (
                  <span
                    key={row.event}
                    className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                      i <= active
                        ? "border-gold bg-gold shadow-[0_0_14px_rgba(200,162,74,0.7)]"
                        : "border-ink-600 bg-ink-950"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  row,
  i,
  active,
}: {
  row: HistoryRow;
  i: number;
  active: boolean;
}) {
  // Masked reveal: title rises out of a clip when its panel is centered.
  const reveal = {
    initial: { y: "110%" },
    active: { y: "0%" },
  };

  return (
    <li className="flex h-full w-screen shrink-0 items-center justify-center px-gutter">
      <div
        className={`max-w-2xl transition-all duration-700 ease-editorial ${
          active ? "opacity-100 blur-0" : "opacity-40 blur-[1px]"
        }`}
      >
        <p className="font-display text-sm tracking-[0.2em] text-bone-faint">
          {num(i)} — {num(N - 1)}
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
          {row.era}
        </p>

        <h3 className="mt-3 overflow-hidden">
          <motion.span
            className="block font-display text-display-lg leading-[1.02] text-bone"
            variants={reveal}
            initial="initial"
            animate={active ? "active" : "initial"}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {row.event}
          </motion.span>
        </h3>

        <motion.p
          className="mt-5 max-w-measure text-lead text-bone-dim"
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }}
          transition={{ duration: 0.6, ease: EASE, delay: active ? 0.15 : 0 }}
        >
          {row.impact}
        </motion.p>
      </div>
    </li>
  );
}

/* ================================================================== *
 *  MOBILE / REDUCED-MOTION — semantic vertical progress-rail timeline
 * ================================================================== */

function HistoryVertical({ animate }: { animate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const spine = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section id="history" ref={ref} className="relative border-y border-ink-700">
      <div className="container-page grid gap-10 py-section lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
          <Eyebrow>{history.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display-md text-bone">{history.heading}</h2>
          <p className="mt-6 max-w-measure text-lead text-bone-dim">
            {history.body}
          </p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-ink-700" />
          {animate && (
            <motion.div
              className="absolute left-[5px] top-2 w-px bg-gold"
              style={{ height: spine }}
            />
          )}

          <ol className="space-y-12">
            {history.rows.map((row, i) => (
              <motion.li
                key={row.event}
                className="relative"
                initial={animate ? { opacity: 0, y: 22 } : false}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={inView}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-gold bg-ink-950"
                />
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  {row.era}
                </p>
                <h3 className="mt-2 font-display text-display-sm text-bone">
                  {row.event}
                </h3>
                <p className="mt-2 text-bone-dim">{row.impact}</p>
                <span className="mt-3 inline-block font-display text-sm text-bone-faint">
                  {num(i)} / {num(N - 1)}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- chooser ----- */

export function History() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop && !reduce) return <HistoryHorizontal />;
  return <HistoryVertical animate={!reduce} />;
}
