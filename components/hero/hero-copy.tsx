"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Play } from "lucide-react";
import { HERO_COPY, HERO_LINKS } from "@/lib/hero-data";
import type { HeroParallax } from "@/hooks/use-hero-parallax";

const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-hero-violet focus-visible:ring-offset-2 focus-visible:ring-offset-black-100";

/**
 * Badge, eyebrow, sub copy and CTAs. Each block is tagged `data-hero="copy"`
 * so GSAP can stagger them in; the wrapper fades slightly on scroll (Framer).
 */
export function HeroCopy({ parallax }: { parallax: HeroParallax }) {
  const { reduce, copyOpacity } = parallax;
  const hover = reduce ? undefined : { scale: 1.03 };
  const tap = reduce ? undefined : { scale: 0.97 };

  return (
    <motion.div
      style={reduce ? undefined : { opacity: copyOpacity }}
      className="relative z-[6] flex flex-col items-center px-5 text-center max-md:pt-28 md:absolute md:inset-x-0 md:top-[112px]"
    >
      {/* <div
        data-hero="copy"
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.125)] bg-[rgba(17,25,40,.55)] px-4 py-1.5 text-[11.5px] uppercase tracking-[.14em] text-hero-muted backdrop-blur-xl"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hero-green opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-hero-green" />
        </span>
        {HERO_COPY.badge}
      </div> */}

      <div data-hero="copy" className="mt-[22px] flex items-center gap-3 sm:gap-4">
        <span
          aria-hidden="true"
          className="hidden h-px w-[42px] bg-gradient-to-r from-transparent to-hero-violet sm:block"
        />
        <span className="text-xs uppercase tracking-[.32em] text-hero-muted">
          {HERO_COPY.eyebrow}
        </span>
        <span className="font-serif text-[40px] italic leading-none text-white">
          {HERO_COPY.name}
        </span>
        <span
          aria-hidden="true"
          className="hidden h-px w-[42px] bg-gradient-to-r from-hero-cyan to-transparent sm:block"
        />
      </div>

      <p
        data-hero="copy"
        className="mt-3.5 max-w-[600px] text-base leading-[1.6] text-hero-muted"
      >
        {HERO_COPY.sub}
      </p>

      <div
        data-hero="copy"
        className="mt-[22px] flex flex-wrap items-center justify-center gap-3"
      >
        <motion.div whileHover={hover} whileTap={tap}>
          <a
            href={HERO_LINKS.work.href}
            className={`group inline-flex items-center gap-2 rounded-full bg-white px-6 py-[13px] text-sm font-semibold text-black-100 shadow-[0_8px_30px_rgba(167,139,250,.35)] ${FOCUS}`}
          >
            {HERO_LINKS.work.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>
        <motion.div whileHover={hover} whileTap={tap}>
          <Link
            href={HERO_LINKS.contact.href}
            className={`inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.125)] bg-[rgba(17,25,40,.55)] px-6 py-[13px] text-sm font-semibold text-hero-ink backdrop-blur-xl ${FOCUS}`}
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            {HERO_LINKS.contact.label}
          </Link>
        </motion.div>
       
      </div> 

      <a
        data-hero="copy"
        href={HERO_LINKS.cv.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] text-hero-dim transition-colors hover:text-hero-ink ${FOCUS}`}
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        {HERO_LINKS.cv.label}
      </a>
    </motion.div>
  );
}
