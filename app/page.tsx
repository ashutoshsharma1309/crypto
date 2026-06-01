import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Frame } from "@/components/sections/Frame";
import { Break } from "@/components/sections/Break";
import { Chronicle } from "@/components/sections/Chronicle";
import { Crisis } from "@/components/sections/Crisis";
import { Flip } from "@/components/sections/Flip";
import { Architecture } from "@/components/sections/Architecture";
import { Flagship } from "@/components/sections/Flagship";
import { Market } from "@/components/sections/Market";
import { Build } from "@/components/sections/Build";
import { Why } from "@/components/sections/Why";
import { Scenarios } from "@/components/sections/Scenarios";
import { Values } from "@/components/sections/Values";
import { Bet } from "@/components/sections/Bet";
import { Footer } from "@/components/sections/Footer";

/**
 * The page opens like a movie: a cinematic cold-open (the Chronicle) plays
 * first, then the product story unfolds beat by beat. Order is the message.
 */
export default function Home() {
  return (
    <>
      <Chronicle /> {/* 0 — cinematic cold open (the history, as a movie) */}
      <Hero /> {/* 1 — cosmic hook */}
      <Vision /> {/* 1.5 — the vision + pull-quote */}
      <Frame /> {/* 2 — the 5,000-year frame */}
      <Break /> {/* 3 — the break */}
      <Crisis /> {/* 5 — modern crisis symptom cloud */}
      <Flip /> {/* 6 — proof by history */}
      <Architecture /> {/* 7 — the architecture */}
      <Flagship /> {/* 8 — flagship product */}
      <Market /> {/* 9 — market sizing */}
      <Build /> {/* 10 — what we build */}
      <Why /> {/* 11 — differentiation + matrix */}
      <Scenarios /> {/* 12 — named human scenarios */}
      <Values /> {/* 13 — antithesis values */}
      <Bet /> {/* 14 — the bet + CTA */}
      <Footer /> {/* 15 — footer */}
    </>
  );
}
