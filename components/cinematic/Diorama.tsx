"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { chronicle } from "@/lib/content";

/**
 * The opening movie's world. Three cinematic phases driven by one (already
 * spring-smoothed) scroll `progress` (0→1):
 *   0.00–0.16  ESTABLISHING — a lone traveler, far off, beneath the tower.
 *   ~0.15      POV — a flash; his path becomes yours.
 *   0.16–0.85  THE CORRIDOR — a first-person walk down a luminous hall of
 *              memory: a perspective floor/ceiling grid and edge speed-streaks
 *              stream toward you while the five great losses approach as
 *              monuments on the central path. Nothing opaque crosses the frame.
 *   0.85–1.00  ARRIVAL — the tower of Memory fills the frame.
 *
 * Performance: transform + opacity only — no animated blur or layout props.
 */

const rand = (n: number) => {
  const x = Math.sin(n * 99.137) * 43758.5453;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 64 }, (_, i) => ({
  x: rand(i + 1) * 100,
  y: rand(i + 7) * 70,
  r: 0.4 + rand(i + 13) * 1.2,
  d: rand(i + 19) * 4,
}));
const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  x: rand(i + 31) * 100,
  delay: rand(i + 41) * 9,
  dur: 7 + rand(i + 53) * 9,
  s: 1 + rand(i + 61) * 2.4,
}));
const DUST = Array.from({ length: 14 }, (_, i) => ({
  x: rand(i + 71) * 100,
  y: 28 + rand(i + 83) * 60,
  delay: rand(i + 91) * 12,
  dur: 12 + rand(i + 97) * 12,
  s: 1 + rand(i + 101) * 1.6,
}));
const FLOOR_RUNGS = Array.from({ length: 9 }, (_, i) => i / 9);
const CEIL_RUNGS = Array.from({ length: 9 }, (_, i) => i / 9 + 0.05);
const STREAKS = Array.from({ length: 8 }, (_, i) => ({
  offset: i / 8,
  side: i % 2 === 0 ? -1 : 1,
}));
const T = chronicle.timing;

/* ---------------------------------------------- streaming corridor grid ---- */

function Rung({
  progress,
  offset,
  dir,
}: {
  progress: MotionValue<number>;
  offset: number;
  dir: 1 | -1;
}) {
  const SPEED = 5;
  const d = useTransform(progress, (p) => {
    const v = (p * SPEED + offset) % 1;
    return v < 0 ? v + 1 : v;
  });
  const ez = useTransform(d, (v) => Math.pow(v, 2.1));
  const y = useTransform(ez, (v) => `${(dir * v * 52).toFixed(1)}vh`);
  const scaleX = useTransform(ez, [0, 1], [0.06, 6.4]);
  const opacity = useTransform(d, [0, 0.1, 0.78, 1], [0, 0.5, 0.34, 0]);
  return (
    <motion.div
      style={{ y, scaleX, opacity }}
      className="absolute left-1/2 top-[44%] h-px w-[46vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/55 to-transparent"
    />
  );
}

function Streak({
  progress,
  offset,
  side,
}: {
  progress: MotionValue<number>;
  offset: number;
  side: number;
}) {
  const SPEED = 5;
  const d = useTransform(progress, (p) => {
    const v = (p * SPEED + offset) % 1;
    return v < 0 ? v + 1 : v;
  });
  const ez = useTransform(d, (v) => Math.pow(v, 1.9));
  const x = useTransform(ez, (v) => `${((0.16 + v) * side * 60).toFixed(1)}vw`);
  const scaleY = useTransform(ez, [0, 1], [0.2, 6]);
  const opacity = useTransform(d, [0, 0.08, 0.72, 1], [0, 0.55, 0.4, 0]);
  return (
    <motion.div
      style={{ x, scaleY, opacity }}
      className="absolute left-1/2 top-[40%] h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/45 to-transparent"
    />
  );
}

/* --------------------------------------------------------- history monument */

function Station({
  progress,
  range,
  index,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  index: number;
  children: React.ReactNode;
}) {
  const [s, e] = range;
  const vStart = s - 0.085;
  const vEnd = e + 0.02;
  const lp = useTransform(progress, (p) => {
    const v = (p - vStart) / (vEnd - vStart);
    return v < 0 ? 0 : v > 1 ? 1 : v;
  });
  const ez = useTransform(lp, (v) => Math.pow(v, 1.95));
  const scale = useTransform(ez, [0, 1], [0.18, 4]);
  const y = useTransform(ez, (v) => `${(v * 40).toFixed(2)}vh`);
  const drift = index % 2 ? 4 : -4;
  const x = useTransform(ez, (v) => `${(v * drift).toFixed(2)}vw`);
  const opacity = useTransform(lp, [0, 0.12, 0.74, 0.96], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex: 30 + index }}
      className="absolute left-1/2 top-[40%] -translate-x-1/2 will-change-transform"
    >
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(227,190,99,0.16), transparent 66%)" }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/* ----------------------------------------------------------- Lethe shadow -- */

function ShadowFly({
  progress,
  center,
  side,
}: {
  progress: MotionValue<number>;
  center: number;
  side: number;
}) {
  const vStart = center - 0.11;
  const vEnd = center + 0.07;
  const lp = useTransform(progress, (p) => {
    const v = (p - vStart) / (vEnd - vStart);
    return v < 0 ? 0 : v > 1 ? 1 : v;
  });
  const ez = useTransform(lp, (v) => Math.pow(v, 1.8));
  const scale = useTransform(ez, [0, 1], [0.25, 2.4]);
  const x = useTransform(ez, (v) => `${((0.4 + v) * side * 42).toFixed(2)}vw`);
  const y = useTransform(ez, (v) => `${(v * 26).toFixed(2)}vh`);
  const opacity = useTransform(lp, [0, 0.2, 0.7, 1], [0, 0.7, 0.7, 0]);
  return (
    <motion.div style={{ x, y, scale, opacity, zIndex: 12 }} className="absolute left-1/2 top-[42%] -translate-x-1/2">
      <ShadowEyes />
    </motion.div>
  );
}

function ShadowEyes() {
  return (
    <div className="relative h-28 w-40">
      <div className="absolute inset-0 rounded-[50%]" style={{ background: "radial-gradient(58% 58% at 50% 45%, #030305 0%, rgba(3,3,5,0.7) 52%, transparent 76%)" }} />
      <span className="absolute left-[38%] top-[42%] h-3 w-1.5 -rotate-12 rounded-full bg-bone shadow-[0_0_12px_rgba(236,230,220,0.9)]" style={{ animation: "eyeflick 3.4s ease-in-out infinite" }} />
      <span className="absolute left-[54%] top-[42%] h-3 w-1.5 rotate-12 rounded-full bg-bone shadow-[0_0_12px_rgba(236,230,220,0.9)]" style={{ animation: "eyeflick 3.4s ease-in-out 0.3s infinite" }} />
    </div>
  );
}

/* --------------------------------------------------------- era monuments SVG */

function Monument({ index }: { index: number }) {
  const common = "drop-shadow-[0_0_20px_rgba(200,162,74,0.35)]";
  if (index === 1)
    return (
      <svg width="240" height="220" viewBox="0 0 240 220" className={common} aria-hidden>
        <rect x="20" y="40" width="200" height="14" fill="#211C3A" />
        <path d="M30 40 L120 14 L210 40 Z" fill="#2A2448" />
        {[40, 80, 120, 160, 200].map((cx) => (
          <rect key={cx} x={cx - 8} y="54" width="16" height="140" fill="#1B1730" stroke="#473C6A" strokeWidth="1" />
        ))}
        <rect x="20" y="194" width="200" height="12" fill="#211C3A" />
        <circle cx="120" cy="120" r="22" fill="#E3BE63" opacity="0.6" />
        <path d="M120 102 q11 16 0 30 q-11 -14 0 -30" fill="#F2D27E" opacity="0.9" />
      </svg>
    );
  if (index === 2)
    return (
      <svg width="240" height="220" viewBox="0 0 240 220" className={common} aria-hidden>
        <path d="M40 200 L40 70 a80 80 0 0 1 160 0 L200 200 L168 200 L168 78 a48 48 0 0 0 -96 0 L72 200 Z" fill="#211C3A" stroke="#473C6A" strokeWidth="1.5" />
        <path d="M150 26 l28 -14 l10 22 l-26 12 Z" fill="#2A2448" />
        <rect x="40" y="200" width="160" height="12" fill="#211C3A" />
        <path d="M96 120 L110 150 L100 152 L86 122 Z" fill="#0E0C1A" />
      </svg>
    );
  if (index === 3)
    return (
      <svg width="240" height="220" viewBox="0 0 240 220" className={common} aria-hidden>
        <polygon points="120,30 175,80 65,80" fill="#2A2448" />
        <rect x="60" y="80" width="120" height="34" fill="#221D3C" />
        <rect x="44" y="114" width="152" height="34" fill="#1E1934" />
        <rect x="28" y="148" width="184" height="40" fill="#1A152C" />
        <rect x="108" y="60" width="24" height="20" fill="#E3BE63" opacity="0.55" />
        <rect x="28" y="186" width="184" height="10" fill="#211C3A" />
      </svg>
    );
  if (index === 4)
    return (
      <svg width="240" height="220" viewBox="0 0 240 220" className={common} aria-hidden>
        <path d="M104 196 L104 60 L120 30 L136 60 L136 196 Z" fill="#211C3A" stroke="#473C6A" strokeWidth="1.2" />
        <path d="M120 40 L112 90 L126 130 L116 196" stroke="#0C0A18" strokeWidth="2" fill="none" />
        <path d="M60 170 l20 -8 l6 16 l-22 8 Z" fill="#1E1934" />
        <path d="M168 150 l22 -6 l4 18 l-22 8 Z" fill="#1E1934" />
        <path d="M40 196 l30 -6 l4 10 l-32 6 Z" fill="#1A152C" />
        <rect x="84" y="196" width="72" height="10" fill="#211C3A" />
      </svg>
    );
  return (
    <svg width="240" height="220" viewBox="0 0 240 220" className={common} aria-hidden>
      <rect x="84" y="24" width="72" height="172" rx="4" fill="#1B1632" stroke="#473C6A" strokeWidth="1.4" />
      <circle cx="120" cy="92" r="16" fill="none" stroke="#E3BE63" strokeWidth="4" opacity="0.75" />
      <rect x="116" y="104" width="8" height="40" fill="#E3BE63" opacity="0.75" />
      <rect x="124" y="128" width="14" height="6" fill="#E3BE63" opacity="0.75" />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={150 + k * 6} y={60 + k * 22} width="6" height="6" fill="#322B52" />
      ))}
      <rect x="80" y="196" width="80" height="10" fill="#211C3A" />
    </svg>
  );
}

/* ---------------------------------------------------------------- traveler -- */

function Traveler() {
  return (
    <div className="relative" style={{ animation: "walkbob 2.8s ease-in-out infinite" }}>
      <svg className="absolute -left-24 top-1 h-10 w-28 overflow-visible" viewBox="0 0 120 40" aria-hidden>
        <defs>
          <linearGradient id="scarf2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#E3BE63" />
          </linearGradient>
        </defs>
        <path d="M0 24 C 30 8, 60 30, 92 14 L 100 20 C 64 38, 32 16, 4 32 Z" fill="url(#scarf2)" style={{ animation: "scarfwave 3.2s ease-in-out infinite" }} />
      </svg>
      <svg width="34" height="80" viewBox="0 0 34 80" aria-hidden className="drop-shadow-[0_0_8px_rgba(227,190,99,0.4)]">
        <path d="M17 4 c5 0 8 4 8 9 c0 4 -2 7 -4 9 l4 4 c4 4 6 12 6 22 l0 30 c-6 4 -18 4 -24 0 l0 -30 c0 -10 2 -18 6 -22 l4 -4 c-2 -2 -4 -5 -4 -9 c0 -5 3 -9 8 -9 Z" fill="#050506" />
        <circle cx="17" cy="13" r="6" fill="#0A0A0C" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------- tower -- */

function Tower({ glow }: { glow: MotionValue<number> }) {
  return (
    <div className="relative">
      <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[52vh] w-[52vh]" style={{ background: "radial-gradient(circle, rgba(231,196,109,0.72) 0%, rgba(200,162,74,0.24) 32%, transparent 68%)", animation: "bloompulse 5s ease-in-out infinite" }} />
      </motion.div>
      <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[110vh] w-[110vh]" style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(227,190,99,0.08) 18deg, transparent 38deg, rgba(200,162,74,0.06) 62deg, transparent 92deg, rgba(227,190,99,0.07) 140deg, transparent 184deg, rgba(200,162,74,0.06) 240deg, transparent 300deg)", animation: "rayspin 70s linear infinite" }} />
      </motion.div>
      <svg width="130" height="260" viewBox="0 0 130 260" className="relative drop-shadow-[0_0_26px_rgba(227,190,99,0.6)]" aria-hidden>
        <defs>
          <linearGradient id="towerGradC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDF0CF" />
            <stop offset="50%" stopColor="#D8AE55" />
            <stop offset="100%" stopColor="#7A5E27" />
          </linearGradient>
        </defs>
        <g fill="url(#towerGradC)">
          <path d="M65 4 L78 48 L52 48 Z" />
          <rect x="56" y="48" width="18" height="178" />
          <path d="M47 94 L56 70 L56 226 L47 226 Z" opacity="0.85" />
          <path d="M83 94 L74 70 L74 226 L83 226 Z" opacity="0.85" />
          <rect x="41" y="222" width="48" height="32" />
        </g>
        <g fill="#FFF6E0">
          <rect x="63" y="80" width="4" height="12" rx="2" />
          <rect x="63" y="112" width="4" height="12" rx="2" />
          <rect x="63" y="144" width="4" height="12" rx="2" />
        </g>
      </svg>
      <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-[254px] h-24 w-6 -translate-x-1/2 blur-[3px]" aria-hidden>
        <div className="h-full w-full" style={{ background: "linear-gradient(180deg, rgba(216,174,85,0.55), transparent)" }} />
      </motion.div>
    </div>
  );
}

/* ================================================================= DIORAMA == */

export function Diorama({ progress }: { progress: MotionValue<number> }) {
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 45, damping: 18, mass: 0.7 });
  const my = useSpring(myRaw, { stiffness: 45, damping: 18, mass: 0.7 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mxRaw.set((e.clientX / window.innerWidth - 0.5) * 2);
      myRaw.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mxRaw, myRaw]);

  const rotateY = useTransform(mx, [-1, 1], [4, -4]);
  const rotateX = useTransform(my, [-1, 1], [-3, 3]);
  const camX = useTransform(mx, (v) => `${v * 14}px`);
  const camY = useTransform(my, (v) => `${v * 10}px`);

  const estOpacity = useTransform(progress, [0, 0.1, 0.16], [1, 1, 0]);
  const estScale = useTransform(progress, [0, 0.16], [1, 1.4]);
  const corridorOpacity = useTransform(progress, [0.1, 0.19], [0, 1]);

  const towerScale = useTransform(progress, [0.18, 0.85, 1], [0.34, 0.95, 4.6]);
  const towerGlow = useTransform(progress, [0.18, 1], [0.45, 1]);
  const wash = useTransform(progress, [0.9, 1], [0, 0.45]);
  const estTowerGlow = useTransform(progress, [0, 0.16], [0.7, 0.2]);

  // Single warm grade for the approach to Memory.
  const warmGrade = useTransform(progress, [0.45, 1], [0, 0.3]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-950" style={{ perspective: 1500 }}>
      <div className="absolute inset-0" style={{ animation: "idlesway 13s ease-in-out infinite" }}>
        <motion.div className="absolute inset-0" style={{ rotateX, rotateY, x: camX, y: camY }}>
          {/* Sky */}
          <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg,#070710 0%,#0C0C18 34%,#0E0B10 60%,#080606 100%)" }} />
          <div className="absolute inset-0 z-0" aria-hidden style={{ background: "radial-gradient(40% 30% at 30% 22%, rgba(60,52,110,0.22), transparent 70%), radial-gradient(36% 28% at 74% 30%, rgba(90,60,40,0.18), transparent 70%)" }} />

          {/* Stars */}
          <svg className="absolute inset-0 z-[1] h-full w-full" viewBox="0 0 100 70" preserveAspectRatio="xMidYMin slice" aria-hidden>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.16} fill="#EDE8E0" opacity={0.55} style={{ animation: `twk 3.6s ease-in-out ${s.d}s infinite` }} />
            ))}
          </svg>

          {/* ESTABLISHING WIDE SHOT */}
          <motion.div style={{ opacity: estOpacity, scale: estScale }} className="absolute inset-0 z-[5]">
            <svg className="absolute bottom-0 left-0 h-[60%] w-full blur-[1.5px]" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" aria-hidden>
              <path d="M0 400 L0 250 L160 170 L320 230 L470 130 L640 220 L820 120 L1000 215 L1180 150 L1360 225 L1520 165 L1600 210 L1600 400 Z" fill="#131324" />
            </svg>
            <div className="absolute bottom-[34%] left-[63%]">
              <motion.div style={{ opacity: estTowerGlow }} className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full">
                <div className="h-full w-full" style={{ background: "radial-gradient(circle, rgba(231,196,109,0.55), transparent 70%)" }} />
              </motion.div>
              <svg width="40" height="84" viewBox="0 0 120 240" aria-hidden className="drop-shadow-[0_0_16px_rgba(227,190,99,0.6)]">
                <path d="M60 2 L72 44 L48 44 Z M52 44 h16 v166 h-16 Z M38 206 h44 v30 h-44 Z" fill="#D8AE55" />
              </svg>
            </div>
            <svg className="absolute bottom-0 left-0 h-[26vh] w-full" viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
              <path d="M0 220 L0 90 C 240 60 520 120 760 96 C 1040 70 1320 130 1600 100 L1600 220 Z" fill="#070608" />
            </svg>
            <div className="absolute bottom-[27%] left-[33%]">
              <Traveler />
            </div>
          </motion.div>

          {/* THE CORRIDOR */}
          <motion.div style={{ opacity: corridorOpacity }} className="absolute inset-0 z-[6]">
            {/* vanishing-point haze */}
            <div className="absolute left-1/2 top-[44%] z-[1] h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2" aria-hidden style={{ background: "radial-gradient(circle, rgba(120,96,150,0.10), transparent 64%)" }} />

            {/* perspective rails */}
            <svg className="absolute inset-0 z-[2] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="rail" x1="0.5" y1="0.44" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#C8A24A" stopOpacity="0" />
                  <stop offset="100%" stopColor="#C8A24A" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <g stroke="url(#rail)" strokeWidth="0.15" vectorEffect="non-scaling-stroke">
                <line x1="50" y1="44" x2="-4" y2="104" />
                <line x1="50" y1="44" x2="104" y2="104" />
                <line x1="50" y1="44" x2="-4" y2="-4" />
                <line x1="50" y1="44" x2="104" y2="-4" />
              </g>
            </svg>

            {/* floor glow */}
            <div className="absolute inset-x-0 bottom-0 z-[2] h-[56%]" aria-hidden>
              <div className="mx-auto h-full w-full" style={{ background: "radial-gradient(46% 100% at 50% 100%, rgba(231,196,109,0.16), transparent 62%)" }} />
            </div>

            {/* streaming floor + ceiling grid */}
            <div className="absolute inset-0 z-[3]" aria-hidden>
              {FLOOR_RUNGS.map((o, i) => (
                <Rung key={`f${i}`} progress={progress} offset={o} dir={1} />
              ))}
              {CEIL_RUNGS.map((o, i) => (
                <Rung key={`c${i}`} progress={progress} offset={o} dir={-1} />
              ))}
            </div>

            {/* edge speed-streaks */}
            <div className="absolute inset-0 z-[4]" aria-hidden>
              {STREAKS.map((s, i) => (
                <Streak key={i} progress={progress} offset={s.offset} side={s.side} />
              ))}
            </div>

            {/* guiding orb */}
            <div className="absolute left-1/2 top-[44%] z-[7]" aria-hidden style={{ animation: "orbfloat 4s ease-in-out infinite" }}>
              <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_8px_rgba(227,190,99,0.55)]" />
            </div>

            {/* central tower */}
            <motion.div style={{ scale: towerScale, zIndex: 8 }} className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 will-change-transform">
              <Tower glow={towerGlow} />
            </motion.div>

            {/* lurking shadows (kept to the sides) */}
            <ShadowFly progress={progress} center={0.36} side={-1} />
            <ShadowFly progress={progress} center={0.64} side={1} />

            {/* the five history monuments on the path */}
            {T.slice(1, 6).map((range, i) => (
              <Station key={i} progress={progress} range={range} index={i + 1}>
                <Monument index={i + 1} />
              </Station>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Dust motes */}
      <div className="pointer-events-none absolute inset-0 z-[17]" aria-hidden>
        {DUST.map((d, i) => (
          <span key={i} className="absolute rounded-full bg-bone/40" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animation: `dustfloat ${d.dur}s linear ${d.delay}s infinite` }} />
        ))}
      </div>

      {/* Colour grade (warm approach to Memory) */}
      <motion.div style={{ opacity: warmGrade }} className="pointer-events-none absolute inset-0 z-[18] bg-[#E3BE63] mix-blend-soft-light" aria-hidden />

      <Flash progress={progress} />

      {/* Embers */}
      <div className="pointer-events-none absolute inset-0 z-[20]" aria-hidden>
        {EMBERS.map((e, i) => (
          <span key={i} className="absolute bottom-[-5%] rounded-full bg-gold/70" style={{ left: `${e.x}%`, width: e.s, height: e.s, animation: `ember ${e.dur}s linear ${e.delay}s infinite` }} />
        ))}
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[21]" aria-hidden style={{ background: "radial-gradient(125% 95% at 50% 44%, transparent 54%, rgba(4,3,2,0.7) 100%)" }} />

      {/* End gold wash */}
      <motion.div style={{ opacity: wash }} className="pointer-events-none absolute inset-0 z-[22]" aria-hidden>
        <div className="h-full w-full" style={{ background: "radial-gradient(80% 70% at 50% 52%, rgba(231,196,109,0.5), transparent 75%)" }} />
      </motion.div>
    </div>
  );
}

function Flash({ progress }: { progress: MotionValue<number> }) {
  const flash = useTransform(progress, [0.125, 0.15, 0.185], [0, 0.72, 0]);
  return (
    <motion.div style={{ opacity: flash }} className="pointer-events-none absolute inset-0 z-[19]" aria-hidden>
      <div className="h-full w-full" style={{ background: "radial-gradient(55% 55% at 50% 46%, rgba(255,240,205,0.85), rgba(231,196,109,0.25) 52%, transparent 74%)" }} />
    </motion.div>
  );
}
