import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/ui/CardGrid";
import { build } from "@/lib/content";

export function Build() {
  return (
    <Section>
      <SectionHeading
        eyebrow={build.eyebrow}
        heading={build.heading}
        body={build.body}
        className="mb-14"
      />
      <CardGrid cards={build.surfaces} cols="md:grid-cols-2" />
    </Section>
  );
}
