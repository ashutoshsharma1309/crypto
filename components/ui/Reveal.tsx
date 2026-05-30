"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";
import { fadeRise, inView } from "./motion";

interface RevealProps {
  children?: ReactNode;
  /** Variants to use; defaults to fade + rise. */
  variants?: Variants;
  className?: string;
  as?: ElementType;
  delay?: number;
}

/**
 * Scroll-triggered reveal. Fades + rises on enter; collapses to an instant
 * no-op under prefers-reduced-motion.
 */
export function Reveal({
  children,
  variants = fadeRise,
  className,
  as = "div",
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  parentVariants: Variants;
  as?: ElementType;
}

/** Container that orchestrates staggered child reveals. */
export function Stagger({
  children,
  className,
  parentVariants,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </MotionTag>
  );
}
