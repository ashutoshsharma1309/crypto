/**
 * Destiny Protocol — Design Tokens
 * ----------------------------------
 * A single source of truth for the visual identity.
 *
 * Concept: "the illuminated ledger." Warm archival ink as the base, bone-white
 * editorial type, and a single restrained gold-leaf accent that behaves like
 * gilding in a manuscript — used sparingly so it always carries meaning.
 *
 * These values are mirrored into tailwind.config.ts. Edit them here and keep
 * the two in sync; nothing else in the app hardcodes hex values.
 */

export const palette = {
  // Warm near-black base, layered for depth without glassmorphism.
  ink: {
    950: "#0A0908", // page base
    900: "#100E0C", // raised surface
    850: "#161311", // card base
    800: "#1E1A17", // card raised / borders-strong
    700: "#2A2521", // hairlines, dividers
    600: "#3A332D", // muted strokes
  },
  // Warm paper/bone for text — never pure white.
  bone: {
    DEFAULT: "#ECE6DC", // primary text
    dim: "#A79E90", // secondary text
    faint: "#6F685D", // tertiary / captions
  },
  // The single accent: gold leaf. One hue, a few stops.
  gold: {
    DEFAULT: "#C8A24A", // primary accent
    bright: "#E3BE63", // hover / highlight
    deep: "#8C6E2E", // pressed / borders
    wash: "rgba(200,162,74,0.08)", // tint fills
  },
  // A cold counter-signal used only for "danger / loss" history beats.
  patina: "#5E8C82",
} as const;

export const fonts = {
  display: "var(--font-display)",
  text: "var(--font-text)",
} as const;
