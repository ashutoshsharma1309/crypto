import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/ui/CardGrid";
import { flip } from "@/lib/content";

export function Flip() {
  return (
    <Section>
      <SectionHeading
        eyebrow={flip.eyebrow}
        heading={flip.heading}
        body={flip.body}
        className="mb-14"
      />
      <CardGrid cards={flip.cards} cols="md:grid-cols-2 lg:grid-cols-4" />
    </Section>
  );
}
