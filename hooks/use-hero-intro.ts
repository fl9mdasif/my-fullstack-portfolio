"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * GSAP owns the OUTER wrapper of every hero element: the intro, the orbit dot
 * and the badge spin. Framer Motion owns the nodes inside (float, hover,
 * parallax), so the two libraries never write `transform` on the same node.
 *
 * Elements are found by `data-hero` attribute inside `root`:
 *   copy | ring | portrait | float | stroke | orbit | spin
 *
 * Everything is visible in the server HTML. GSAP only hides an element in a
 * layout effect, right before it animates it in, so a failed script can never
 * leave the hero blank. With reduced motion nothing here runs at all.
 */
export function useHeroIntro(root: RefObject<HTMLElement>, reduce: boolean) {
  const loops = useRef<gsap.core.Tween[]>([]);
  const [inView, setInView] = useState(true);

  useGSAP(
    () => {
      if (reduce) return;
      const q = gsap.utils.selector(root);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
        q("[data-hero=copy]"),
        { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
        0.1
      )
        .from(
          q("[data-hero=ring]"),
          { scale: 0.92, autoAlpha: 0, duration: 1.2, stagger: 0.15 },
          0.4
        )
        .from(
          q("[data-hero=portrait]"),
          { y: 60, scale: 1.04, autoAlpha: 0, duration: 1.2, ease: "expo.out" },
          0.5
        )
        .from(
          q("[data-hero=float]"),
          {
            scale: 0.85,
            autoAlpha: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            stagger: 0.08,
          },
          1.0
        );

      // Outline name: draw the stroke, then ease in a very faint fill.
      const stroke = q("[data-hero=stroke]")[0];
      if (stroke) {
        gsap.set(stroke, {
          strokeDasharray: 3000,
          strokeDashoffset: 3000,
          fillOpacity: 0,
        });
        tl.to(
          stroke,
          {
            strokeDashoffset: 0,
            duration: 2.6,
            ease: "power2.inOut",
            onComplete: () => {
              // A dash pattern would leave gaps in longer outlines.
              gsap.set(stroke, { strokeDasharray: "none" });
              gsap.to(stroke, { fillOpacity: 0.04, duration: 0.8 });
            },
          },
          0.3
        );
      }

      loops.current = [
        ...q("[data-hero=orbit]").map((el) =>
          gsap.to(el, { rotation: 360, duration: 40, ease: "none", repeat: -1 })
        ),
        ...q("[data-hero=spin]").map((el) =>
          gsap.to(el, { rotation: 360, duration: 18, ease: "none", repeat: -1 })
        ),
      ];

      return () => {
        loops.current = [];
      };
    },
    { scope: root, dependencies: [reduce] }
  );

  // Pause the endless loops (and the Framer floats, via `inView`) offscreen.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  useEffect(() => {
    loops.current.forEach((t) => (inView ? t.resume() : t.pause()));
  }, [inView]);

  return { inView };
}
