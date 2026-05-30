import { Section } from "@/components/ui/Section";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeRise, scaleIn, staggerParent } from "@/components/ui/motion";
import { vision } from "@/lib/content";

/**
 * Beat 1 — the vision. Transitions out of the hero and sets the emotional
 * register for the whole story: a bold claim, one paragraph, then an oversized
 * low-opacity pull-quote with a gold ledger rule.
 */
export function Vision() {
  return (
    <Section id="vision">
      <Stagger parentVariants={staggerParent(0.1)} className="max-w-4xl">
        <Reveal variants={fadeRise} className="mb-6">
          <Eyebrow>{vision.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal variants={fadeRise} as="h2" className="text-display-lg text-bone max-w-[16ch]">
          {vision.heading}
        </Reveal>
        <Reveal
          variants={fadeRise}
          as="p"
          className="mt-7 max-w-measure text-lead text-bone-dim"
        >
          {vision.body}
        </Reveal>
      </Stagger>

      <Reveal variants={scaleIn} className="mt-16 md:mt-20">
        <figure className="relative pl-7 md:pl-10">
          <span
            aria-hidden
            className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent"
          />
          <span
            aria-hidden
            className="absolute -left-1 -top-6 select-none font-display text-7xl leading-none text-gold/20 md:text-8xl"
          >
            &ldquo;
          </span>
          <blockquote className="font-display text-display-md italic leading-tight text-bone/70">
            {vision.quote}
          </blockquote>
        </figure>
      </Reveal>
    </Section>
  );
}
