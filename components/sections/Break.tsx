import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeRise } from "@/components/ui/motion";
import { theBreak } from "@/lib/content";

export function Break() {
  return (
    <Section className="border-y border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal variants={fadeRise} className="mb-7 flex justify-center">
          <Eyebrow>{theBreak.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal variants={fadeRise} as="h2" className="text-display-lg text-bone">
          {theBreak.lead}{" "}
          <span className="text-gilded">{theBreak.gild}</span>
        </Reveal>
        <Reveal
          variants={fadeRise}
          as="p"
          className="mx-auto mt-8 max-w-measure text-lead text-bone-dim"
        >
          {theBreak.body}
        </Reveal>
      </div>
    </Section>
  );
}
