"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { GLASS, type HeroChip } from "@/lib/hero-data";
import type { HeroParallax } from "@/hooks/use-hero-parallax";

const BORDER = "rgba(255,255,255,.125)";
const BORDER_HOVER = "rgba(167,139,250,.5)";

/**
 * Glass chip with real brand icons (react-icons/si).
 * Three nodes, three jobs: the outer div is GSAP's (intro), the middle one is
 * the pointer parallax, the inner one floats, tilts and reacts to hover.
 */
export function HeroTechChip({
  chip,
  parallax,
  active,
}: {
  chip: HeroChip;
  parallax: HeroParallax;
  active: boolean;
}) {
  const { reduce, layers } = parallax;
  const floating = active && !reduce;
  const Tile = chip.tile?.icon;

  return (
    <div data-hero="float" className={cn("relative z-[7] md:absolute", chip.position)}>
      <motion.div style={reduce ? undefined : { x: layers.chips.x, y: layers.chips.y }}>
        <motion.div
          style={{ rotate: chip.tilt, borderColor: BORDER }}
          animate={floating ? { y: [0, -12, 0] } : { y: 0 }}
          transition={
            floating
              ? {
                  duration: chip.floatDuration,
                  delay: chip.floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
          whileHover={reduce ? undefined : { scale: 1.04, borderColor: BORDER_HOVER }}
          className={cn("flex items-center gap-3 rounded-2xl py-[11px] pl-3 pr-4", GLASS)}
        >
          {Tile && chip.tile && (
            <span
              className={cn(
                "grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px]",
                chip.tile.bordered && "border border-white/20"
              )}
              style={{ background: chip.tile.bg }}
            >
              <Tile className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
          )}

          {chip.stack && (
            <span className="flex shrink-0 items-center pl-0.5">
              {chip.stack.map(({ icon: Icon, color, bg }, i) => (
                <span
                  key={i}
                  className={cn(
                    "grid h-[22px] w-[22px] place-items-center rounded-full border border-white/15",
                    i > 0 && "-ml-2"
                  )}
                  style={{ background: bg, zIndex: chip.stack!.length - i }}
                >
                  <Icon className="h-3 w-3" style={{ color }} aria-hidden="true" />
                </span>
              ))}
            </span>
          )}

          <span className="flex flex-col whitespace-nowrap">
            <span className="text-[13px] font-semibold leading-tight text-hero-ink">
              {chip.title}
            </span>
            <span className="mt-0.5 text-[11px] leading-tight text-hero-dim">
              {chip.caption}
            </span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
