import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { fadeRise, staggerParent } from "@/components/ui/motion";
import { scenarios } from "@/lib/content";

export function Scenarios() {
  return (
    <Section>
      <SectionHeading
        eyebrow={scenarios.eyebrow}
        heading={scenarios.heading}
        body={scenarios.body}
        className="mb-14"
      />

      <Stagger parentVariants={staggerParent(0.08)} className="flex flex-col">
        {scenarios.people.map((p) => (
          <Reveal key={p.name} variants={fadeRise}>
            <div className="group grid items-center gap-4 border-t border-ink-700 py-8 md:grid-cols-[0.7fr_1.6fr_1fr] md:gap-10">
              <div>
                <h3 className="font-display text-display-sm text-bone">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-bone-faint">{p.context}</p>
              </div>
              <p className="text-lead text-bone-dim">{p.outcome}</p>
              <p className="font-display text-2xl text-gilded md:text-right">
                {p.metric}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-ink-700" />
      </Stagger>
    </Section>
  );
}
