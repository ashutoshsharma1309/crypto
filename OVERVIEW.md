# Destiny Protocol — Project Overview

A production-grade, single-page marketing site for **Destiny Protocol** — the inheritance
layer for digital wealth (a non-custodial, encrypted, automatic crypto + asset inheritance
protocol). The page is a single continuous narrative that opens with a **cinematic,
scroll-driven movie** ("The Chronicle" — a walk through history's great losses toward a
golden Tower of Memory) and then unfolds the product story beat by beat.

This document summarizes the whole project: stack, architecture, the cinematic system, the
design system, content model, accessibility/performance, and how to run, edit and deploy.

> Companion docs: **[README.md](README.md)** (run/deploy + content-editing guide) and
> **[docs/STORYLINE.md](docs/STORYLINE.md)** (the narrative bible — world, characters, voice).

---

## 1. Tech stack

| Layer | Choice | Version | Why |
|-------|--------|---------|-----|
| Framework | **Next.js** (App Router, RSC) | 14.2.5 | Static prerender, file-based metadata/OG, edge image gen |
| Language | **TypeScript** | ^5.5.4 | Typed content config + components |
| UI runtime | **React** | ^18.3.1 | — |
| Styling | **Tailwind CSS** | ^3.4.7 | Custom design-token config (no default palette) |
| Animation | **Framer Motion** | ^11.3.19 | Scroll-linked motion, springs, variants, `useTransform` |
| Smooth scroll | **Lenis** | ^1.1.13 | Buttery inertial scrolling + eased anchor nav |
| Fonts | **next/font** (Google) | — | Fraunces (display) + Hanken Grotesk (text), self-hosted |
| Tooling | PostCSS, Autoprefixer, ESLint (`next/core-web-vitals`) | — | — |
| Deploy target | **Vercel** | — | Zero-config; edge OG/icon routes |

Runtime dependencies are intentionally minimal: `next`, `react`, `react-dom`,
`framer-motion`, `lenis`. Everything visual (including the cinematic) is hand-built from
SVG + CSS — **no image assets, no WebGL/3D libraries, no UI kit.**

Requires Node 18.17+ (developed on Node 22).

---

## 2. How it's organized

```
app/
  layout.tsx            Root layout: fonts, full metadata + OG, global chrome
                        (Loader, SmoothScroll, Header), grain overlay
  page.tsx              The narrative — all sections composed in order
  globals.css           Base styles, design-token utilities, keyframes,
                        reduced-motion rules
  opengraph-image.tsx   Edge-generated 1200×630 social card (next/og)
  icon.tsx              Edge-generated favicon (gilded diamond)
  robots.ts             robots.txt
  sitemap.ts            sitemap.xml

lib/
  content.ts            ← ALL copy + stats + chapter data, fully typed (edit here)
  tokens.ts             Design tokens (mirrored into tailwind.config.ts)

components/
  Header.tsx            Sticky nav; auto-hides while the cinematic fills the screen
  Loader.tsx            "Cracking the vault" intro (0→100%, skippable, no CLS)
  SmoothScroll.tsx      Lenis init + rAF loop + eased in-page anchor scrolling

  cinematic/            The opening movie ("The Chronicle")
    Diorama.tsx         Layered SVG/CSS world: establishing → POV → corridor → tower
    TimelineHUD.tsx     Year-axis HUD (48 BC → Now) that tracks scroll

  ui/                   Shared primitives
    Section.tsx           Section wrapper (max-width, gutter, vertical rhythm)
    Eyebrow.tsx           Small uppercase label
    SectionHeading.tsx    eyebrow → headline → paragraph (the section rhythm)
    CardGrid.tsx          Staggered grid of cards (+ optional chips / numbering)
    StatCounter.tsx       Count-up to REAL values on viewport enter
    ComparisonMatrix.tsx  "Others exist. None do this." sticky-header matrix
    CTA.tsx               Buttons (gold fill / ledger outline)
    Reveal.tsx            Scroll-reveal wrappers (Reveal / Stagger)
    Icon.tsx              Inline SVG icon set (zero-dep) for the pillars
    motion.ts             Shared variants (fadeRise, stagger, EASE, inView)
    useMediaQuery.ts      SSR-safe media-query hook (desktop detection)

  sections/            One component per narrative beat (see §6)

docs/
  STORYLINE.md          Narrative system prompt / bible
```

---

## 3. The cinematic opening ("The Chronicle")

The signature feature. A **pinned, scroll-driven movie** (1200vh of scroll) that plays
before the product content. Lives in [components/sections/Chronicle.tsx](components/sections/Chronicle.tsx)
+ [components/cinematic/](components/cinematic/).

**Three phases, one continuous shot** (driven by a single scroll `progress` value):

1. **Establishing (0–0.16)** — a lone traveler stands far off on a ledge beneath the distant
   tower. The camera pushes in.
2. **POV transition (~0.15)** — a gold flash and the line *"His path becomes yours"*; the
   camera enters the traveler.
3. **The Corridor (0.16–0.85)** — a first-person walk down a luminous perspective hall:
   converging rails + a streaming floor/ceiling light grid + edge speed-streaks sell the
   forward motion, while the **five great losses** approach as **monuments** (Alexandria
   colonnade, Rome arch, Maya pyramid, war obelisk, modern key-monolith) and fly past. A
   **year-axis Timeline HUD** (48 BC → Now) tracks your position; **Lethe's shadows** lurk at
   the sides.
4. **Arrival (0.85–1.0)** — the **Tower of Memory** rushes forward, blazes (bloom + god-rays
   + gold wash), and the closing line lands before handing off to the Hero.

**Engineering notes (why it's smooth):**
- **Spring-smoothed scroll** — the raw scroll progress is passed through `useSpring`, so all
  scrubbing is buttery; the raw value only drives the discrete chapter index + UI cues.
- **Transform/opacity only** — no animated `blur` or layout props (those were removed after
  profiling). Continuous animations are cheap CSS keyframes; scroll-linked ones are
  `useTransform` on motion values (no React re-render per frame).
- **Mouse-parallax camera** — a subtle perspective tilt + translate follows the cursor.
- **Measured perf:** ~58–59 fps average over a continuous scroll in headless software
  rendering (effectively a locked 60 on real GPU), with near-zero dropped frames.
- **Chapter timing** is data-driven via `chronicle.timing` in `content.ts`, shared by the
  Diorama, the HUD and the chrome so they stay in lockstep.

**Graceful degradation:** on screens `< 1024px` or with `prefers-reduced-motion`, the movie
is replaced by a clean, **semantic vertical timeline** (`<ol>` of the chapters with years) —
no pinning, no heavy animation.

---

## 4. Design system

Visual identity: **"the illuminated ledger"** — warm archival ink, bone-white editorial type,
and a single restrained gold-leaf accent used sparingly so it always carries meaning.

- **Tokens** live in [lib/tokens.ts](lib/tokens.ts) and are mirrored into
  [tailwind.config.ts](tailwind.config.ts). The Tailwind palette is **replaced, not
  extended**, so no default colors leak in. Nothing else hardcodes hex values.
  - `ink.{950–600}` — warm near-black surfaces
  - `bone` / `bone.dim` / `bone.faint` — warm off-white text
  - `gold` / `.bright` / `.deep` / `.wash` — the one accent
  - `patina` — a cold counter-signal (used for loss/danger beats)
- **Typography:** Fraunces (editorial display) + Hanken Grotesk (clean grotesque body),
  loaded via `next/font` with a **fluid clamp-based scale** (`display-xl/lg/md/sm`, `lead`,
  `eyebrow`).
- **Spacing & layout:** 8pt rhythm (`py-section`, `gutter`), ~1200px container, ~65ch body
  measure, `rounded-card`.
- **Section micro-pattern:** every section is `eyebrow → big claim headline → one paragraph
  → grid of cards`. That repetition is what makes it feel produced.
- **Texture:** a CSS-only paper grain overlay + gilded-text treatment + ledger hairline rule.

---

## 5. Content model (data-driven)

**All copy, every statistic, and the cinematic chapter data live in one typed file:**
[lib/content.ts](lib/content.ts). A non-developer can edit headlines, paragraphs, numbers
and narration without touching a component.

- Typed interfaces: `Stat`, `Card`, `HistoryRow`, `Scenario`, `MatrixRow`, `Chapter`.
- One export per section: `site`, `loader`, `hero`, `vision`, `frame`, `theBreak`,
  `chronicle`, `crisis`, `flip`, `architecture`, `flagship`, `market`, `build`, `why`,
  `scenarios`, `values`, `bet`, `footer`.
- `chronicle` holds the 7 chapters (prologue → 5 losses → rekindling) with `label`, `era`,
  `title`, `caption`, `year`, plus `timing` (progress windows) for the movie.

**Data rule (non-negotiable):** every number is a **real value**. Counters animate from 0 on
scroll but the DOM/SSR always carries the true figure (never a permanent 0). Estimates and
sourced figures are labelled (e.g. *FBI estimate*, *Crypto.com Global Report 2024*); unknown
numbers are omitted rather than fabricated. No lorem ipsum.

---

## 6. The narrative (page order)

The page reads top-to-bottom as one story (see [app/page.tsx](app/page.tsx)):

| # | Section | Beat |
|---|---------|------|
| 0 | **Chronicle** | Cinematic cold-open movie (history of loss → tower of Memory) |
| 1 | **Hero** | "Building the intelligent inheritance layer…" + CTAs + pillar chips |
| 2 | **Vision** | "A world where ownership outlasts the people who claim it" + pull-quote |
| 3 | **Frame** | The 5,000-year frame (land had deeds, money had wills…) |
| 4 | **Break** | "Then digital wealth broke all of it" |
| 5 | **Crisis** | The modern symptom cloud + "today" consequences + paradox |
| 6 | **Flip** | Proof by history — the winners who preserved knowledge |
| 7 | **Architecture** | Five pillars, one framework (icons + connective rail) |
| 8 | **Flagship** | Property Registry + 3 shock-stat counters + guarantees |
| 9 | **Market** | Count-up stat grid ($2.5T, 560M, 20% BTC lost, …) |
| 10 | **Build** | Four surfaces (app / console / contracts / chain) |
| 11 | **Why** | "Others exist. None do this." + horizontal comparison matrix |
| 12 | **Scenarios** | Five named people, five numeric outcomes |
| 13 | **Values** | Antithesis creed ("Truth over comfort", …) |
| 14 | **Bet** | Philosophical close + early-access CTA |
| 15 | **Footer** | Nav, contact, built-on chain |

The narrative world, characters (Mnema the Keeper, Lethe the Unmaking, Elias the first loss)
and voice are documented in **[docs/STORYLINE.md](docs/STORYLINE.md)**.

---

## 7. Accessibility & performance

- **`prefers-reduced-motion`** fully respected: animations degrade to instant, Lenis is
  disabled, the loader is skipped, and the cinematic falls back to the semantic timeline.
- **Semantic HTML**, keyboard-navigable, visible focus rings, alt/aria on decorative SVG
  (`aria-hidden`), AA color contrast.
- **60fps target:** transform/opacity-only animations; spring-smoothed scrubbing; no
  layout-thrashing scroll handlers.
- **No CLS** from the loader (fixed overlay) — stat counters render real values in SSR.
- **Statically prerendered** home route (`○`), edge-rendered OG/icon. First Load JS ≈ 151 kB.
- Targets **Lighthouse ≥ 95** across Performance / A11y / Best-Practices / SEO.
- Full metadata: title template, description, keywords, canonical, OpenGraph + Twitter card,
  theme-color, robots, sitemap.

---

## 8. Run, build, deploy

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint (next/core-web-vitals)
```

**Deploy to Vercel** — zero config: push to Git and import at vercel.com/new (Next.js preset
auto-detected), or `vercel --prod` from the CLI. No environment variables required.

> Tip: if a dev/prod server is already bound to port 3000, free it with
> `lsof -ti tcp:3000 | xargs kill -9` before `npm start`.

---

## 9. Editing guide (quick reference)

| Want to change… | Edit… |
|-----------------|-------|
| Any copy / headline / paragraph | [lib/content.ts](lib/content.ts) |
| A statistic (value/prefix/suffix/note) | the relevant `Stat` in `content.ts` |
| Cinematic narration / chapter years | `chronicle.chapters` in `content.ts` |
| Movie length / pacing | `TOTAL_VH` in [Chronicle.tsx](components/sections/Chronicle.tsx) |
| Movie chapter timing | `chronicle.timing` in `content.ts` |
| Colors / type scale / spacing | [lib/tokens.ts](lib/tokens.ts) + [tailwind.config.ts](tailwind.config.ts) |
| Comparison-matrix cells | `why.rows` (`true` / `false` / `"partial"`) in `content.ts` |
| Early-access form behavior | [components/sections/Bet.tsx](components/sections/Bet.tsx) (front-end stub) |

---

## 10. Status & notes

- **State:** complete, builds clean, deploy-ready. Bundle ≈ 151 kB First Load, statically
  prerendered, zero console errors.
- **Original art:** all visuals (including the cinematic) are hand-built SVG/CSS evocative of
  premium scroll sites — there are no licensed/hand-painted image assets. The Diorama's layer
  rig can accept real image art later if desired.
- **Front-end-only:** the early-access form is a stub; wire it to an email/CRM provider when
  ready. There is no backend.
- **No git repo** is initialized in this workspace; consider `git init` before deploying.
