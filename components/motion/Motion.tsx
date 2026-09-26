"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Every scroll animation for the services grid, the process spine and the
 * project stack. Renders nothing: it finds its work by selector after mount
 * and reverts on unmount, so the sections themselves stay plain markup.
 *
 * | Selector    | Handler            |
 * | ----------- | ------------------ |
 * | .svc-grid   | setupServiceCards  |
 * | #spine      | setupSpine         |
 * | #stack      | setupStack         |
 *
 * Rename a class or id in the markup and it must be renamed here too.
 */

const EASE = "power3.out";

/** Stroke drawing without DrawSVGPlugin: dasharray + dashoffset per path. */
function drawStrokes(root: Element, tl: gsap.core.Timeline, at: number) {
  const paths = Array.from(root.querySelectorAll<SVGPathElement>("path"));
  paths.forEach((p, i) => {
    const len = typeof p.getTotalLength === "function" ? p.getTotalLength() : 0;
    if (!len) return;
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    tl.to(
      p,
      { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
      at + i * 0.06
    );
  });
}

/* ---------- services ---------- */

function setupServiceCards(grid: HTMLElement, parallax: boolean) {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(".svc"));
  if (!cards.length) return;

  // Group cards into columns by left offset so each row plays left to right.
  const lefts = Array.from(
    new Set(cards.map((c) => Math.round(c.offsetLeft)))
  ).sort((a, b) => a - b);
  const colOf = (c: HTMLElement) => lefts.indexOf(Math.round(c.offsetLeft));

  cards.forEach((card) => {
    const col = Math.max(0, colOf(card));
    const icon = card.querySelector<HTMLElement>(".svc-ico");
    const text = card.querySelectorAll<HTMLElement>("h3, p, .svc-more");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 88%" },
      delay: col * 0.08,
    });

    tl.from(card, {
      y: 40,
      scale: 0.96,
      rotateX: 6,
      opacity: 0,
      duration: 0.7,
      ease: EASE,
    });

    if (icon) {
      tl.from(
        icon,
        { scale: 0.4, opacity: 0, duration: 0.5, ease: "back.out(2.2)" },
        0.15
      );
      const svg = icon.querySelector("svg");
      if (svg) drawStrokes(svg, tl, 0.35);
    }

    tl.from(
      text,
      { y: 14, opacity: 0, duration: 0.45, stagger: 0.06, ease: EASE },
      0.3
    );

    // Cards leaving the top shrink and dim.
    gsap.fromTo(
      card,
      { "--svc-s": 1, "--svc-b": 1 },
      {
        "--svc-s": 0.955,
        "--svc-b": 0.62,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 22%",
          end: "top top",
          scrub: true,
        },
      }
    );

    // Scroll-linked column depth. Stays on a custom property so it never
    // fights the entrance tween or the hover tilt over `transform`.
    if (parallax) {
      const depth = [26, -18, 14][col % 3] ?? 0;
      gsap.fromTo(
        card,
        { "--svc-py": depth + "px" },
        {
          "--svc-py": -depth + "px",
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  });
}

function setupServiceHover(grid: HTMLElement) {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(".svc"));
  const cleanups: (() => void)[] = [];

  cards.forEach((card) => {
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotationY: px * 6,
        rotationX: -py * 6,
        y: -6,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const leave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/* ---------- process: vertical spine ---------- */

function setupSpine(wrap: HTMLElement) {
  const fill = wrap.querySelector<HTMLElement>("#spine-fill");
  const steps = Array.from(wrap.querySelectorAll<HTMLElement>(".step"));
  if (!steps.length) return;

  if (fill) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  steps.forEach((step) => {
    const stub = step.querySelector<HTMLElement>(".step-stub");
    const node = step.querySelector<HTMLElement>(".step-node");
    const motion = step.querySelector<HTMLElement>(".step-motion");
    const inner = step.querySelectorAll<HTMLElement>(
      ".step-top, .step-title, .step-desc, .step-bar-row"
    );
    const bar = step.querySelector<HTMLElement>(".step-bar i");
    const fromLeft = step.classList.contains("is-left");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: step, start: "top 84%" },
    });

    if (stub) tl.from(stub, { scaleX: 0, duration: 0.35, ease: EASE }, 0);
    if (node)
      tl.from(node, { scale: 0, duration: 0.45, ease: "back.out(2)" }, 0.1);
    if (motion)
      tl.from(
        motion,
        { x: fromLeft ? 40 : -40, opacity: 0, duration: 0.6, ease: EASE },
        0.15
      );
    tl.from(
      inner,
      { y: 12, opacity: 0, duration: 0.4, stagger: 0.07, ease: EASE },
      0.3
    );
    if (bar) tl.from(bar, { scaleX: 0, duration: 0.7, ease: "power2.out" }, 0.5);

    // The step nearest the viewport centre is the active one.
    ScrollTrigger.create({
      trigger: step,
      start: "top 60%",
      end: "bottom 40%",
      onToggle: (self) => step.classList.toggle("active", self.isActive),
    });
  });
}

/* ---------- project stack ---------- */

function setupStack(stack: HTMLElement, scaleTo: number) {
  const items = Array.from(stack.querySelectorAll<HTMLElement>(".stack-item"));
  const counter = stack.querySelector<HTMLElement>("#stack-cur");
  if (!items.length) return;

  items.forEach((item, i) => {
    const card = item.querySelector<HTMLElement>(".stack-card");
    const inner = item.querySelectorAll<HTMLElement>(
      ".stack-cat, .stack-title, .stack-desc, .stack-tags, .stack-link"
    );
    const panel = item.querySelector<HTMLElement>(".stack-vis-inner");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: item, start: "top 85%" },
    });
    if (card) tl.from(card, { y: 60, opacity: 0, duration: 0.6, ease: EASE });
    tl.from(
      inner,
      { y: 16, opacity: 0, duration: 0.45, stagger: 0.07, ease: EASE },
      0.15
    );

    if (panel) {
      gsap.fromTo(
        panel,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // As the next card covers this one, shrink and dim it. A sticky element
    // reports its stuck position, so the trigger is the *next* item, whose
    // own position is never sticky-offset at that point.
    const next = items[i + 1];
    if (next && card) {
      gsap.fromTo(
        item,
        { "--stack-s": 1, "--stack-b": 1 },
        {
          "--stack-s": scaleTo,
          "--stack-b": 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    if (counter) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive)
            counter.textContent = String(i + 1).padStart(2, "0");
        },
      });
    }
  });
}

/* ---------- shell ---------- */

/** Sections that swap their markup after fetching fire this to rebuild triggers. */
export const MOTION_REFRESH = "motion:refresh";

export function Motion() {
  const [tick, setTick] = useState(0);

  // A section whose content arrives later (the project deck) replaces the DOM
  // these triggers were bound to, so the whole context is rebuilt on request.
  useEffect(() => {
    const onRefresh = () => setTick((t) => t + 1);
    window.addEventListener(MOTION_REFRESH, onRefresh);
    return () => window.removeEventListener(MOTION_REFRESH, onRefresh);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add("gsap-ready");

    // One failing section must never take the others — or the headlines —
    // down with it. Without this, a throw here leaves every `.reveal` stuck
    // at the inline opacity 0 that its `from` tween just set.
    const guard = (label: string, fn: () => void) => {
      try {
        fn();
      } catch (err) {
        console.error(`[Motion] ${label} failed:`, err);
      }
    };

    const ctx = gsap.context(() => {
      // Headlines and leads. `immediateRender: false` is the important part:
      // the element is only hidden at the moment its trigger fires, so if a
      // trigger never fires the headline simply stays visible instead of
      // sitting at opacity 0 forever.
      guard("reveal", () => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: EASE,
              immediateRender: false,
              scrollTrigger: { trigger: el, start: "top 95%", once: true },
            }
          );
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 621px)", () => {
        const grid = document.querySelector<HTMLElement>(".svc-grid");
        if (grid) guard("services (desktop)", () => setupServiceCards(grid, true));
      });

      mm.add("(max-width: 620px)", () => {
        const grid = document.querySelector<HTMLElement>(".svc-grid");
        if (grid) guard("services (mobile)", () => setupServiceCards(grid, false));
      });

      mm.add("(hover: hover) and (pointer: fine)", () => {
        const grid = document.querySelector<HTMLElement>(".svc-grid");
        if (!grid) return;
        let cleanup: (() => void) | undefined;
        guard("service hover", () => {
          cleanup = setupServiceHover(grid);
        });
        return () => cleanup?.();
      });

      const spine = document.querySelector<HTMLElement>("#spine");
      if (spine) guard("spine", () => setupSpine(spine));

      mm.add("(min-width: 768px)", () => {
        const stack = document.querySelector<HTMLElement>("#stack");
        if (stack) guard("stack (desktop)", () => setupStack(stack, 0.94));
      });

      mm.add("(max-width: 767px)", () => {
        const stack = document.querySelector<HTMLElement>("#stack");
        if (stack) guard("stack (mobile)", () => setupStack(stack, 0.97));
      });

      return () => mm.revert();
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      document.body.classList.remove("gsap-ready");
    };
  }, [tick]);

  return null;
}
