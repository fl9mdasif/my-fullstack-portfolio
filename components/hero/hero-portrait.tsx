"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_COPY, HERO_IMAGE } from "@/lib/hero-data";
import type { HeroParallax } from "@/hooks/use-hero-parallax";

/**
 * Transparent portrait, no circle, no border. The source is cropped hard at
 * the chest, so a bottom mask fades it out. Width follows the hero height so
 * the face keeps landing just under the outline name (about y=450 at the
 * 1000px reference) instead of climbing onto the buttons on shorter screens.
 */
export function HeroPortrait({ parallax }: { parallax: HeroParallax }) {
  const { reduce, layers } = parallax;

  return (
    <div
      data-hero="portrait"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] mx-auto w-full md:w-[min(560px,80vw)] lg:w-[660px]"
    >
      <motion.div style={reduce ? undefined : { x: layers.portrait.x, y: layers.portrait.y }}>
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_COPY.portraitAlt}
          width={HERO_IMAGE.width}
          height={HERO_IMAGE.height}
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 560px, 660px"
          className="block h-auto w-full select-none [-webkit-mask-image:linear-gradient(#000_78%,transparent_100%)] [filter:drop-shadow(0_30px_60px_rgba(107,140,255,.35))_contrast(1.04)] [mask-image:linear-gradient(#000_78%,transparent_100%)]"
        />
      </motion.div>
    </div>
  );
}
