import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { fadeRise, staggerParent } from "@/components/ui/motion";
import { flagship } from "@/lib/content";

export function Flagship() {
  return (
    <Section id="flagship">
      <SectionHeading
        eyebrow={flagship.eyebrow}
        heading={flagship.heading}
        body={flagship.body}
        className="mb-14"
      />

      {/* Three shock stats */}
      <Stagger
        parentVariants={staggerParent(0.12)}
        className="grid gap-px overflow-hidden rounded-card border border-ink-700 bg-ink-700 md:grid-cols-3"
      >
        {flagship.stats.map((stat) => (
          <Reveal key={stat.label} variants={fadeRise} className="bg-ink-850 p-8">
            <StatCounter stat={stat} />
          </Reveal>
        ))}
      </Stagger>

      {/* Six guarantees */}
      <Stagger
        parentVariants={staggerParent(0.06)}
        className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {flagship.guarantees.map((g) => (
          <Reveal
            key={g}
            variants={fadeRise}
            className="flex items-center gap-3 border-t border-ink-700 pt-4 text-bone"
          >
            <span aria-hidden className="text-gold">
              ✓
            </span>
            {g}
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
