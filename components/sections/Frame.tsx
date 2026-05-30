import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { fadeRise, staggerParent } from "@/components/ui/motion";
import { frame } from "@/lib/content";

export function Frame() {
  return (
    <Section id="frame">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeading
          eyebrow={frame.eyebrow}
          heading={frame.heading}
          body={frame.body}
        />

        <Stagger
          parentVariants={staggerParent(0.1)}
          className="flex flex-col justify-center"
        >
          <Reveal variants={fadeRise} className="rule-ledger mb-2" />
          {frame.ledger.map((item) => (
            <Reveal key={item.kind} variants={fadeRise}>
              <div className="flex items-baseline justify-between gap-6 border-b border-ink-700 py-5">
                <span className="font-display text-display-sm text-bone">
                  {item.kind}
                </span>
                <span className="text-lead text-bone-dim">
                  {item.instrument}
                </span>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
