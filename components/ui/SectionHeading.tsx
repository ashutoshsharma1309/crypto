import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal, Stagger } from "./Reveal";
import { fadeRise, staggerParent } from "./motion";

interface SectionHeadingProps {
  eyebrow: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  /** Constrain the headline width for tighter ragging. */
  className?: string;
}

/**
 * The recurring micro-pattern: eyebrow → big claim headline → one paragraph.
 * This is the rhythm that makes every section feel produced.
 */
export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <Stagger
      parentVariants={staggerParent(0.1)}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <Reveal variants={fadeRise} className="mb-5">
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal
        variants={fadeRise}
        as="h2"
        className={`text-display-md text-bone ${
          align === "center" ? "max-w-3xl" : "max-w-[20ch]"
        }`}
      >
        {heading}
      </Reveal>
      {body ? (
        <Reveal
          variants={fadeRise}
          as="p"
          className={`mt-6 text-lead text-bone-dim max-w-measure ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {body}
        </Reveal>
      ) : null}
    </Stagger>
  );
}
