import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { fadeRise, staggerParent } from "@/components/ui/motion";
import { values } from "@/lib/content";

/** The antithesis list: conviction stated as "X over Y" trade-offs. */
export function Values() {
  return (
    <Section className="bg-ink-900">
      <SectionHeading
        eyebrow={values.eyebrow}
        heading={values.heading}
        align="center"
        className="mb-14"
      />
      <Stagger
        parentVariants={staggerParent(0.08)}
        className="mx-auto grid max-w-4xl grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2"
      >
        {values.lines.map(([a, b]) => (
          <Reveal
            key={a}
            variants={fadeRise}
            className="flex items-baseline gap-3 border-b border-ink-700 pb-5"
          >
            <span className="font-display text-display-sm text-bone">{a}</span>
            <span className="text-sm uppercase tracking-[0.2em] text-bone-faint">
              over
            </span>
            <span className="font-display text-display-sm text-bone-faint line-through decoration-ink-600">
              {b}
            </span>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
