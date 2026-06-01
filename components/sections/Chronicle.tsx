"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Diorama } from "@/components/cinematic/Diorama";
import { TimelineHUD } from "@/components/cinematic/TimelineHUD";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { inView } from "@/components/ui/motion";
import { chronicle } from "@/lib/content";

const CH = chronicle.chapters;
const N = CH.length;
const T = chronicle.timing;
const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const TOTAL_VH = 1200;

const activeFrom = (p: number) => {
  for (let i = 0; i < T.length; i++) if (p < T[i][1]) return i;
  return T.length - 1;
};

/* ================================================================== *
 *  DESKTOP — the movie
 * ================================================================== */

function ChronicleCinematic() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Spring-smoothed progress drives ALL visual motion → buttery scrubbing.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.0004,
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);
  const povOpacity = useTransform(scrollYProgress, [0.11, 0.15, 0.2], [0, 1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(activeFrom(p)));

  const ch = CH[active];
  const isPrologue = active === 0;
  const isArrival = active === N - 1;

  return (
    <section
      id="history"
      ref={ref}
      data-cinematic
      className="relative bg-ink-950"
      style={{ height: `${TOTAL_VH}vh` }}
      aria-label="The Chronicle — a walk through what was lost"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Diorama progress={progress} />

        {/* POV transition cue */}
        <motion.div
          style={{ opacity: povOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden
        >
          <span className="font-display text-display-sm italic text-bone/90">
            {chronicle.povCue}
          </span>
        </motion.div>

        {/* ---- Cinematic chrome ---- */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between px-gutter pt-7 md:pt-9">
            <AnimatePresence mode="wait">
              <motion.span
                key={ch.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-display text-xl tracking-wide text-bone md:text-2xl"
              >
                {ch.label}
              </motion.span>
            </AnimatePresence>

            <span className="font-display text-sm tracking-[0.35em] text-bone-dim">
              {chronicle.brand.toUpperCase()}
            </span>

            <span aria-hidden className="flex items-end gap-[3px] pt-2 text-bone-faint">
              <span className="mr-2 text-xs uppercase tracking-[0.25em]">Sound</span>
              {[6, 12, 8, 14, 9].map((h, i) => (
                <span key={i} className="w-[2px] bg-bone-dim" style={{ height: h, animation: `eq 1.1s ease-in-out ${i * 0.12}s infinite` }} />
              ))}
            </span>
          </div>

          <div className="mt-auto px-gutter pb-10 md:pb-12">
            <div className="container-page">
              <div className="flex items-end justify-between gap-8">
                <span className="shrink-0 font-display text-5xl leading-none tabular-nums text-bone md:text-7xl">
                  <span className="text-gold">{pad(active + 1)}</span>
                  <span className="text-2xl text-bone-faint md:text-4xl"> / {pad(N)}</span>
                </span>

                <div className="max-w-2xl flex-1 text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      {isPrologue || isArrival ? (
                        <h2 className="font-display text-display-md leading-tight text-bone">
                          {ch.title}
                        </h2>
                      ) : (
                        <p className="text-xs uppercase tracking-[0.3em] text-gold">
                          {ch.era} — {ch.title}
                        </p>
                      )}
                      <p className={`mx-auto mt-4 max-w-xl text-lead ${isPrologue || isArrival ? "text-bone-dim" : "text-bone"}`}>
                        {ch.caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <span className="hidden w-24 shrink-0 md:block" />
              </div>

              <div className="mt-7">
                <TimelineHUD progress={progress} active={active} />
              </div>
            </div>
          </div>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-bone-faint"
            aria-hidden
          >
            <span className="text-xs uppercase tracking-[0.35em]">{chronicle.hint}</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="text-gold">
              ↓
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 *  MOBILE / REDUCED-MOTION — semantic vertical chapters
 * ================================================================== */

function ChronicleStatic({ animate }: { animate: boolean }) {
  return (
    <section id="history" className="relative overflow-hidden border-y border-ink-700 bg-ink-950 py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(70% 50% at 80% 10%, rgba(200,162,74,0.12), transparent 60%), linear-gradient(180deg,#06060A,#080706)" }}
      />
      <div className="container-page relative">
        <Eyebrow>{chronicle.eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] text-display-md text-bone">{CH[0].title}</h2>
        <p className="mt-5 max-w-measure text-lead text-bone-dim">{CH[0].caption}</p>

        <ol className="relative mt-14 space-y-12 pl-8">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-ink-700" />
          {CH.slice(1, 6).map((c, i) => (
            <motion.li
              key={c.title}
              className="relative"
              initial={animate ? { opacity: 0, y: 22 } : false}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={inView}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span aria-hidden className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-gold bg-ink-950" />
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                {c.year} · {c.label}
              </p>
              <h3 className="mt-2 font-display text-display-sm text-bone">{c.title}</h3>
              <p className="mt-2 text-bone-dim">{c.caption}</p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-12 max-w-measure font-display text-display-sm text-gilded">
          {CH[N - 1].caption}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- chooser ----- */

export function Chronicle() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (isDesktop && !reduce) return <ChronicleCinematic />;
  return <ChronicleStatic animate={!reduce} />;
}
