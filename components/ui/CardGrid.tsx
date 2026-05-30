import type { Card } from "@/lib/content";
import { Reveal, Stagger } from "./Reveal";
import { fadeRise, staggerParent } from "./motion";

interface CardGridProps {
  cards: Card[];
  /** Tailwind columns class for the grid at md+ . */
  cols?: string;
  /** Show the kicker as a large gold index. */
  numbered?: boolean;
  className?: string;
}

/** A staggered grid of cards — the closing move of most sections. */
export function CardGrid({
  cards,
  cols = "md:grid-cols-2 lg:grid-cols-3",
  numbered = false,
  className = "",
}: CardGridProps) {
  return (
    <Stagger
      parentVariants={staggerParent(0.07)}
      className={`grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ink-700 bg-ink-700 ${cols} ${className}`}
    >
      {cards.map((card) => (
        <Reveal
          key={card.title}
          variants={fadeRise}
          className="group relative flex flex-col bg-ink-850 p-7 transition-colors duration-500 hover:bg-ink-800"
        >
          {card.kicker ? (
            <span
              className={
                numbered
                  ? "mb-5 font-display text-2xl text-gold/70"
                  : "mb-3 text-eyebrow uppercase text-gold"
              }
            >
              {card.kicker}
            </span>
          ) : null}
          <h3 className="text-display-sm text-bone">{card.title}</h3>
          <p className="mt-3 text-bone-dim leading-relaxed">{card.body}</p>
          {card.chips ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {card.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-ink-700 px-3 py-1 text-xs uppercase tracking-wider text-bone-faint transition-colors duration-300 group-hover:border-gold/40 group-hover:text-gold"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold/60 transition-transform duration-500 ease-editorial group-hover:scale-x-100"
          />
        </Reveal>
      ))}
    </Stagger>
  );
}
