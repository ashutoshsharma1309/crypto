import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { fadeRise, staggerParent } from "@/components/ui/motion";
import { architecture } from "@/lib/content";

/**
 * Beat 5 — the architecture. Pillars are presented as one coordinated system:
 * each card carries an icon + index, and a faint baseline runs beneath the row
 * to read as a shared substrate rather than isolated features.
 */
export function Architecture() {
  return (
    <Section id="architecture" className="bg-ink-900">
      <SectionHeading
        eyebrow={architecture.eyebrow}
        heading={architecture.heading}
        body={architecture.body}
        className="mb-14"
      />

      <div className="relative">
        {/* Connective rail — the "one framework" cue: a shared substrate the
            pillars hang from, sitting just above the grid. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-px left-6 right-6 z-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <Stagger
          parentVariants={staggerParent(0.08)}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-5"
        >
          {architecture.pillars.map((pillar) => (
            <Reveal
              key={pillar.title}
              variants={fadeRise}
              className="group relative flex flex-col bg-ink-850 p-7 transition-colors duration-500 hover:bg-ink-800"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-gold transition-colors duration-500 group-hover:border-gold/50">
                  <Icon name={pillar.icon ?? ""} className="h-5 w-5" />
                </span>
                <span className="font-display text-xl text-gold/50">
                  {pillar.kicker}
                </span>
              </div>
              <h3 className="mt-6 text-display-sm text-bone">{pillar.title}</h3>
              <p className="mt-3 text-bone-dim leading-relaxed">{pillar.body}</p>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
