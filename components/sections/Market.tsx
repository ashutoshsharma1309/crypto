import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { fadeRise, staggerParent } from "@/components/ui/motion";
import { market } from "@/lib/content";

export function Market() {
  return (
    <Section className="bg-ink-900">
      <SectionHeading
        eyebrow={market.eyebrow}
        heading={market.heading}
        body={market.body}
        className="mb-14"
      />

      <Stagger
        parentVariants={staggerParent(0.08)}
        className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {market.stats.map((stat) => (
          <Reveal
            key={stat.label}
            variants={fadeRise}
            className="border-t border-ink-700 pt-6"
          >
            <StatCounter stat={stat} />
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
