"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HERO_DEPTH, HERO_SCROLL } from "@/lib/hero-data";

export type Layer = { x: MotionValue<number>; y: MotionValue<number> };

/** Pointer position (-0.5..0.5, smoothed) mapped to a pixel offset. */
function usePointerLayer(
  sx: MotionValue<number>,
  sy: MotionValue<number>,
  amplitude: number,
  direction: 1 | -1
): Layer {
  const a = amplitude * direction;
  return {
    x: useTransform(sx, [-0.5, 0.5], [-a, a]),
    y: useTransform(sy, [-0.5, 0.5], [-a, a]),
  };
}

/**
 * Pointer + scroll motion for the hero. Framer Motion only: these values go
 * on the *middle* wrapper of each layer, never on the node GSAP animates.
 *
 * - `reduce`: user prefers reduced motion, so nothing here should be applied.
 * - `pointerEnabled`: fine pointer on a >=768px screen. Touch gets no parallax.
 */
export function useHeroParallax(ref: RefObject<HTMLElement>) {
  const reduce = useReducedMotion() ?? false;
  const [pointerEnabled, setPointerEnabled] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 20 });
  const sy = useSpring(py, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px)"
    );
    const update = () => setPointerEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pointerEnabled) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    const leave = () => {
      px.set(0);
      py.set(0);
    };

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      leave();
    };
  }, [pointerEnabled, ref, px, py]);

  // The outline name moves against the pointer, everything in front follows.
  const name = usePointerLayer(sx, sy, HERO_DEPTH.name, -1);
  const portraitPointer = usePointerLayer(sx, sy, HERO_DEPTH.portrait, 1);
  const chips = usePointerLayer(sx, sy, HERO_DEPTH.chips, 1);
  const cards = usePointerLayer(sx, sy, HERO_DEPTH.cards, 1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollPortrait = useTransform(scrollYProgress, [0, 1], [0, HERO_SCROLL.portrait]);
  const scrollName = useTransform(scrollYProgress, [0, 1], [0, HERO_SCROLL.name]);
  const copyOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  // Pointer and scroll offsets share one `y` per layer.
  const nameY = useTransform([name.y, scrollName], (v: number[]) => v[0] + v[1]);
  const portraitY = useTransform(
    [portraitPointer.y, scrollPortrait],
    (v: number[]) => v[0] + v[1]
  );

  return {
    reduce,
    pointerEnabled,
    copyOpacity,
    layers: {
      name: { x: name.x, y: nameY } satisfies Layer,
      portrait: { x: portraitPointer.x, y: portraitY } satisfies Layer,
      chips,
      cards,
    },
  };
}

export type HeroParallax = ReturnType<typeof useHeroParallax>;
