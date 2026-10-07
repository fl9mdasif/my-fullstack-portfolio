"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { GLASS, HERO_AVATARS, type HeroCard } from "@/lib/hero-data";
import type { HeroParallax } from "@/hooks/use-hero-parallax";

const BORDER = "rgba(255,255,255,.125)";
const BORDER_HOVER = "rgba(167,139,250,.5)";

/** Floating info card. Same three-node split as the chips. */
export function HeroGlassCard({
  card,
  parallax,
  active,
}: {
  card: HeroCard;
  parallax: HeroParallax;
  active: boolean;
}) {
  const { reduce, layers } = parallax;
  const floating = active && !reduce;
  const Icon = card.icon;

  return (
    <div data-hero="float" className={cn("absolute z-[8]", card.position)}>
      <motion.div style={reduce ? undefined : { x: layers.cards.x, y: layers.cards.y }}>
        <motion.div
          style={{ rotate: card.tilt, borderColor: BORDER }}
          animate={floating ? { y: [0, -12, 0] } : { y: 0 }}
          transition={
            floating
              ? {
                  duration: card.floatDuration,
                  delay: card.floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
          whileHover={reduce ? undefined : { scale: 1.04, borderColor: BORDER_HOVER }}
          className={cn(
            "rounded-3xl p-[18px] shadow-[0_30px_60px_rgba(0,0,0,.4)] backdrop-blur-2xl",
            GLASS
          )}
        >
          <span className="mb-3 grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-[linear-gradient(135deg,#a78bfa,#6b8cff)]">
            <Icon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
          </span>
          <p className="text-[17px] font-semibold leading-snug text-hero-ink">{card.title}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-hero-dim">{card.caption}</p>

          {/* {card.avatars && (
            <span className="mt-3.5 flex" aria-hidden="true">
              {HERO_AVATARS.map((bg, i) => (
                <span
                  key={bg}
                  className={cn(
                    "h-[26px] w-[26px] rounded-full border-2 border-black-100",
                    i > 0 && "-ml-2"
                  )}
                  style={{ background: bg }}
                />
              ))}
            </span>
          )} */}
        </motion.div>
      </motion.div>
    </div>
  );
}
