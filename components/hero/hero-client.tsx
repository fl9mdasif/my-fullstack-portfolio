"use client";

import { useRef, type CSSProperties } from "react";
import { HERO_CARDS, HERO_CHIPS, HERO_SCALE } from "@/lib/hero-data";
import { useHeroParallax } from "@/hooks/use-hero-parallax";
import { useHeroIntro } from "@/hooks/use-hero-intro";
import { HeroBackground, HeroRings } from "./hero-background";
import { HeroCopy } from "./hero-copy";
import { HeroFooter } from "./hero-footer";
import { HeroGlassCard } from "./hero-glass-card";
import { HeroOutlineName } from "./hero-outline-name";
import { HeroPortrait } from "./hero-portrait";
import { HeroRotatingBadge } from "./hero-rotating-badge";
import { HeroTechChip } from "./hero-tech-chip";

/**
 * Hero root. Desktop is an absolute-positioned stage (offsets come from
 * lib/hero-data.ts). Below 768px the same children flow in one column:
 * copy, then the name with the portrait over it, then a row of chips.
 * `md:contents` is what lets the stage and chip wrappers vanish on desktop.
 */
export function HeroClient() {
  const root = useRef<HTMLElement>(null);
  const parallax = useHeroParallax(root);
  const { inView } = useHeroIntro(root, parallax.reduce);

  return (
    <section
      id="hero"
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-hidden bg-black-100 md:h-[clamp(860px,100svh,1000px)] lg:h-[100svh] lg:min-h-[620px]"
      style={{ "--hero-s": HERO_SCALE } as CSSProperties}
    >
      <HeroBackground />

      {/*
        From lg up the hero is exactly one screen tall. The composition is
        designed on a 1440 x 1000 stage; --hero-s shrinks it uniformly to fit
        shorter screens (a 768px laptop gets ~0.77) and the stage width is
        divided by the same factor so it still spans the viewport.
        Below lg this is a plain block / column and nothing is scaled.
      */}
      <div className="relative z-[1] mx-auto h-full w-full max-w-[1440px] max-md:flex max-md:flex-col lg:absolute lg:left-1/2 lg:top-0 lg:mx-0 lg:h-[1000px] lg:w-[min(calc(100%_/_var(--hero-s,1)),1440px)] lg:origin-top lg:[transform:translateX(-50%)_scale(var(--hero-s,1))]">
        <HeroRings />
        <HeroCopy parallax={parallax} />

        <div className="max-md:relative max-md:h-[min(100vw,440px)] md:contents">
          <HeroOutlineName parallax={parallax} />
          <HeroPortrait parallax={parallax} />
        </div>

        <div className="max-md:flex max-md:justify-center max-md:gap-3 max-md:px-4 max-md:pb-8 md:contents">
          {HERO_CHIPS.map((chip) => (
            <HeroTechChip key={chip.id} chip={chip} parallax={parallax} active={inView} />
          ))}
        </div>

        {HERO_CARDS.map((card) => (
          <HeroGlassCard key={card.id} card={card} parallax={parallax} active={inView} />
        ))}

        <HeroRotatingBadge />
        <HeroFooter />
      </div>
    </section>
  );
}
