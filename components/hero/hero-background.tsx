import { HERO_BACKGROUND } from "@/lib/hero-data";

/** Glows + masked grid (z-0). Static, so it stays a server component. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0" style={{ background: HERO_BACKGROUND.glows }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: HERO_BACKGROUND.grid,
          backgroundSize: "64px 64px",
          WebkitMaskImage: HERO_BACKGROUND.gridMask,
          maskImage: HERO_BACKGROUND.gridMask,
        }}
      />
    </div>
  );
}

/**
 * Two concentric rings behind the portrait (z-2). The inner one carries a
 * cyan dot that GSAP orbits (`data-hero="orbit"`). Centred with margins, not
 * a transform, because GSAP scales these on the way in.
 */
export function HeroRings() {
  return (
    <>
      <div
        aria-hidden="true"
        data-hero="ring"
        className="pointer-events-none absolute bottom-[-330px] left-1/2 z-[2] -ml-[450px] hidden aspect-square w-[900px] md:block"
      >
        <div className="absolute inset-0 rounded-full border border-[rgba(167,139,250,.25)]" />
        <div data-hero="orbit" className="absolute inset-0">
          <span className="absolute left-1/2 top-[-4px] -ml-1 h-2 w-2 rounded-full bg-hero-cyan shadow-[0_0_16px_#22d3ee]" />
        </div>
      </div>
      <div
        aria-hidden="true"
        data-hero="ring"
        className="pointer-events-none absolute bottom-[-470px] left-1/2 z-[2] -ml-[590px] hidden aspect-square w-[1180px] md:block"
      >
        <div className="absolute inset-0 rounded-full border border-[rgba(107,140,255,.14)]" />
      </div>
    </>
  );
}
