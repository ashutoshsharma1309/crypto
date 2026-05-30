"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeRise } from "@/components/ui/motion";
import { bet } from "@/lib/content";

export function Bet() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // No backend in this marketing build — capture is a front-end stub.
    setSent(true);
  };

  return (
    <Section id="bet" className="border-t border-ink-700">
      {/* Philosophical close */}
      <div className="mx-auto max-w-4xl text-center">
        <Reveal variants={fadeRise} className="mb-7 flex justify-center">
          <Eyebrow>{bet.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal
          variants={fadeRise}
          as="h2"
          className="text-display-lg text-bone"
        >
          {bet.quote}
        </Reveal>
        <Reveal
          variants={fadeRise}
          as="p"
          className="mx-auto mt-8 max-w-measure text-lead text-bone-dim"
        >
          {bet.body}
        </Reveal>
      </div>

      {/* CTA card */}
      <Reveal variants={fadeRise}>
        <div
          id="join"
          className="card-surface mx-auto mt-16 max-w-2xl scroll-mt-24 rounded-card p-8 text-center md:p-12"
        >
          <h3 className="font-display text-display-md text-bone">
            {bet.cta.heading}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-bone-dim">{bet.cta.sub}</p>

          {sent ? (
            <p
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-wash px-6 py-3 text-gold"
              role="status"
            >
              ✓ You&rsquo;re on the list. We&rsquo;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={bet.cta.placeholder}
                className="w-full rounded-full border border-ink-600 bg-ink-950 px-5 py-3.5 text-bone placeholder:text-bone-faint focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-bright"
              >
                {bet.cta.button}
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-bone-faint">{bet.cta.fineprint}</p>
        </div>
      </Reveal>
    </Section>
  );
}
