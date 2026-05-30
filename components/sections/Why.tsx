import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/ui/CardGrid";
import { ComparisonMatrix } from "@/components/ui/ComparisonMatrix";
import { Reveal } from "@/components/ui/Reveal";
import { fadeRise } from "@/components/ui/motion";
import { why } from "@/lib/content";

export function Why() {
  return (
    <Section id="why" className="bg-ink-900">
      <SectionHeading
        eyebrow={why.eyebrow}
        heading={why.heading}
        body={why.body}
        className="mb-14"
      />

      <CardGrid
        cards={why.pillars}
        cols="md:grid-cols-2 lg:grid-cols-4"
        className="mb-16"
      />

      <Reveal variants={fadeRise} className="mb-6">
        <p className="text-eyebrow uppercase text-bone-faint">
          Destiny vs. every alternative
        </p>
      </Reveal>
      <Reveal variants={fadeRise}>
        <ComparisonMatrix columns={why.columns} rows={why.rows} />
      </Reveal>
    </Section>
  );
}
