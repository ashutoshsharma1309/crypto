import type { Variants } from "framer-motion";

/**
 * Shared motion variants. All animation is transform/opacity only (60fps),
 * and every component pairs these with framer-motion's useReducedMotion so
 * they degrade to instant when the user asks for less motion.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeRiseSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Parent that staggers its children's `fadeRise`. */
export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Shared viewport config so reveals fire once, a little before fully in view. */
export const inView = { once: true, margin: "0px 0px -12% 0px" } as const;
