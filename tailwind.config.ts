import type { Config } from "tailwindcss";

/**
 * Tailwind is configured from scratch — no default palette leaks in.
 * Colors mirror lib/tokens.ts. The type scale is fluid (clamp-based) so
 * headlines breathe on desktop and stay readable on phones.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Replace, don't extend, the color palette.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: {
        950: "#0A0908",
        900: "#100E0C",
        850: "#161311",
        800: "#1E1A17",
        700: "#2A2521",
        600: "#3A332D",
      },
      bone: {
        DEFAULT: "#ECE6DC",
        dim: "#A79E90",
        faint: "#6F685D",
      },
      gold: {
        DEFAULT: "#C8A24A",
        bright: "#E3BE63",
        deep: "#8C6E2E",
        wash: "rgba(200,162,74,0.08)",
      },
      patina: "#5E8C82",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        text: ["var(--font-text)", "system-ui", "sans-serif"],
      },
      // Fluid editorial type scale.
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.22em" }],
        "display-xl": [
          "clamp(2.75rem, 1.2rem + 6.4vw, 6.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 1.3rem + 4vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.018em" },
        ],
        "display-md": [
          "clamp(1.75rem, 1.2rem + 2.4vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.012em" },
        ],
        "display-sm": [
          "clamp(1.35rem, 1.05rem + 1.3vw, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.008em" },
        ],
        lead: [
          "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)",
          { lineHeight: "1.55" },
        ],
      },
      spacing: {
        // 8pt rhythm helpers for section padding.
        section: "clamp(5rem, 3rem + 8vw, 9rem)",
        gutter: "clamp(1.25rem, 0.5rem + 3vw, 3rem)",
      },
      maxWidth: {
        container: "1200px",
        measure: "65ch",
      },
      borderRadius: {
        card: "14px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "gold-sweep": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.86" },
        },
      },
      animation: {
        "gold-sweep": "gold-sweep 6s linear infinite",
        flicker: "flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
