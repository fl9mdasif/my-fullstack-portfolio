"use client";

import { motion } from "framer-motion";
import { HERO_BRAND_GRADIENT, HERO_COPY } from "@/lib/hero-data";
import type { HeroParallax } from "@/hooks/use-hero-parallax";

/**
 * The signature element: "AL AZAD" as an outline, no fill (only a ~4% tint
 * after the draw animation). GSAP draws `[data-hero=stroke]`; Framer moves
 * the wrapper for parallax. The real heading is the sr-only <h1>.
 */
export function HeroOutlineName({ parallax }: { parallax: HeroParallax }) {
  const { reduce, layers } = parallax;

  return (
    <>
      <h1 id="hero-title" className="sr-only">
        {HERO_COPY.h1}
      </h1>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-4 z-[3] mx-auto w-[94vw] md:top-[318px] md:w-[88vw] lg:w-[min(1010px,74vw)]"
      >
        <motion.div style={reduce ? undefined : { x: layers.name.x, y: layers.name.y }}>
          <svg
            viewBox="0 0 1010 290"
            className="block w-full overflow-visible"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="hero-outline-gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="1010"
                y2="0"
              >
                {HERO_BRAND_GRADIENT.map((s) => (
                  <stop key={s.offset} offset={s.offset} stopColor={s.color} />
                ))}
              </linearGradient>
            </defs>
            <text
              data-hero="stroke"
              x="505"
              y="252"
              textAnchor="middle"
              fontSize="272"
              fontWeight="900"
              // Pin the text to the box so the width can never overflow it,
              // whichever font the browser ends up using.
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="#a78bfa"
              fillOpacity={0.04}
              stroke="url(#hero-outline-gradient)"
              strokeWidth="1.6"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ letterSpacing: "-0.055em" }}
            >
              {HERO_COPY.outline}
            </text>
          </svg>
        </motion.div>
      </div>
    </>
  );
}
