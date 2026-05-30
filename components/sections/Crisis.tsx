import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { fadeRise, scaleIn, staggerParent } from "@/components/ui/motion";
import { crisis } from "@/lib/content";

// Deterministic size variation so the cloud reads as a cloud, not a list.
const SIZES = [
  "text-display-sm",
  "text-xl",
  "text-2xl",
  "text-lg",
  "text-display-sm",
  "text-xl",
  "text-2xl",
  "text-lg",
  "text-xl",
];

// Fixed pseudo-random delays (seconds) — symptoms "accumulate" out of order,
// but the sequence is stable across SSR/client so there's no hydration drift.
const JITTER = [0.12, 0.02, 0.22, 0.08, 0.18, 0.04, 0.25, 0.1, 0.15];

export function Crisis() {
  return (
    <Section className="bg-ink-900">
      <SectionHeading
        eyebrow={crisis.eyebrow}
        heading={crisis.heading}
        body={crisis.body}
        align="center"
        className="mb-14"
      />

      {/* Symptom cloud — accumulating, out-of-order */}
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {crisis.tags.map((tag, i) => (
          <Reveal
            key={tag}
            variants={scaleIn}
            delay={JITTER[i % JITTER.length]}
            as="span"
            className={`font-display ${SIZES[i % SIZES.length]} ${
              i % 3 === 0 ? "text-bone" : "text-bone-faint"
            } transition-colors duration-300 hover:text-gold`}
          >
            {tag}
            {i < crisis.tags.length - 1 ? (
              <span aria-hidden className="ml-6 text-gold/40">
                ·
              </span>
            ) : null}
          </Reveal>
        ))}
      </div>

      {/* Today's consequences */}
      <div className="mx-auto mt-20 max-w-3xl">
        <Reveal variants={fadeRise} className="mb-7 flex justify-center">
          <span className="text-eyebrow uppercase text-gold">
            {crisis.todayLabel}
          </span>
        </Reveal>
        <Stagger
          parentVariants={staggerParent(0.08)}
          as="ul"
          className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
        >
          {crisis.today.map((line) => (
            <Reveal
              key={line}
              variants={fadeRise}
              as="li"
              className="flex items-start gap-3 border-t border-ink-700 pt-4 text-bone-dim"
            >
              <span aria-hidden className="mt-1 text-gold/60">
                —
              </span>
              {line}
            </Reveal>
          ))}
        </Stagger>
      </div>

      {/* The paradox — the payoff line */}
      <Reveal variants={fadeRise} className="mx-auto mt-16 max-w-3xl text-center">
        <p className="font-display text-display-sm leading-tight text-bone">
          {crisis.paradox}
        </p>
      </Reveal>
    </Section>
  );
}
