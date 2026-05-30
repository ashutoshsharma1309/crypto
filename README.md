# Destiny Protocol — Marketing Site

A production-grade, single-page narrative marketing site for **Destiny Protocol** —
the inheritance layer for digital wealth. The page reads as one continuous story,
top to bottom: it makes you feel the stakes (civilizational continuity) before it
ever explains the product (a non-custodial, encrypted crypto inheritance layer).

Built with Next.js (App Router), TypeScript, Tailwind, Framer Motion and Lenis.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Requires Node 18.17+ (developed on Node 22).

---

## Deploy to Vercel

This is a zero-config Vercel deployment.

1. Push the repo to GitHub/GitLab.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework preset
   (Next.js) is detected automatically.
3. Deploy. No environment variables are required.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

The OG image (`/opengraph-image`) and favicon (`/icon`) are generated on the edge
at request time via `next/og`; `robots.txt` and `sitemap.xml` are generated too.

---

## Editing content (no code required)

**All copy and every statistic live in one file:** [`lib/content.ts`](lib/content.ts).

It is fully typed and organized in narrative order — one exported object per
section (`hero`, `vision`, `frame`, `theBreak`, `history`, `crisis`, `flip`,
`architecture`, `flagship`, `market`, `build`, `why`, `scenarios`, `values`,
`bet`, `footer`).

Common edits:

- **Headline / paragraph** — change the `heading` / `body` strings.
- **A gold-leaf emphasis word** — the `gild` field (rendered in gilded gold).
- **A statistic** — edit the `Stat` object: `value`, `prefix`, `suffix`,
  `decimals`, `label`, and an optional honest `note` (e.g. a source).
- **A comparison-matrix cell** — `true` (✓), `false` (—), or `"partial"` (◐).
- **Contact emails / nav** — the `site` object at the top of the file.

### Data rule

Every number is a **real value** typed into `content.ts`. Counters animate from 0
on scroll, but the DOM (and SSR/no-JS output) always carries the true figure — no
stat ever renders as a permanent 0. Estimates and sourced figures are labelled via
the `note` field. If a number isn't known, omit the stat rather than fabricate one.

---

## Design system

The visual identity is **"the illuminated ledger"**: warm archival ink, bone-white
editorial type, and a single restrained gold-leaf accent used sparingly so it
always carries meaning.

- **Tokens** — [`lib/tokens.ts`](lib/tokens.ts) is the source of truth, mirrored
  into [`tailwind.config.ts`](tailwind.config.ts). No default Tailwind palette
  leaks in; nothing else hardcodes hex values.
- **Type** — Fraunces (editorial display) + Hanken Grotesk (clean grotesque body),
  loaded via `next/font` with a fluid clamp-based scale.
- **Spacing** — 8pt rhythm, ~1200px container, ~65ch body measure.
- **Section micro-pattern** — every section is `eyebrow → big claim → one
  paragraph → grid of cards`, built from shared primitives in `components/ui/`.

---

## Motion & accessibility

- Scroll-triggered fade+rise reveals with staggered card grids (transform/opacity
  only, 60fps).
- Two pinned "moment" sections: the **historical timeline** and the
  **comparison matrix** (sticky header row).
- The **History timeline** is dual-mode: on desktop (pointer + motion-OK) it
  **pins and scrubs horizontally** — the track translates left→right with scroll,
  a progress rail fills, and era nodes light at center. On mobile and under
  reduced-motion it falls back to a clean, semantic vertical progress-rail `<ol>`.
  (See [components/sections/History.tsx](components/sections/History.tsx).)
- Count-up stat counters animate on viewport enter to **real** values.
- A themed loader ("Cracking the vault", ~1.2s, skippable) rendered as a fixed
  overlay so it causes **no layout shift**.
- Smooth scrolling via Lenis, with eased in-page anchor navigation.
- **`prefers-reduced-motion` is fully respected** — all animation degrades to
  instant, Lenis is disabled, and the loader is skipped.
- Semantic HTML, keyboard-navigable, visible focus states, AA color contrast.

---

## Project structure

```
app/
  layout.tsx           Fonts, metadata, OG tags, global chrome (loader, header, scroll)
  page.tsx             The 15 sections assembled in narrative order
  globals.css          Base styles, design-token utilities, reduced-motion rules
  opengraph-image.tsx  Edge-generated 1200×630 social card
  icon.tsx             Edge-generated favicon
  robots.ts / sitemap.ts
lib/
  content.ts           ← all copy + stats (edit here)
  tokens.ts            design tokens
components/
  ui/                  shared primitives (Eyebrow, SectionHeading, CardGrid,
                       StatCounter, ComparisonMatrix, CTA, Reveal, Section)
  sections/            one component per narrative beat
  Header.tsx · Loader.tsx · SmoothScroll.tsx
```

---

## Notes

- The early-access form is a front-end stub (no backend wired up). Connect it to
  your provider of choice in [`components/sections/Bet.tsx`](components/sections/Bet.tsx).
- Testimonials and unverifiable figures from the source brief are intentionally
  omitted; only defensible, labelled numbers are shown.
