import { HERO_COPY } from "@/lib/hero-data";

/** Two small captions in the bottom corners. Desktop only. */
export function HeroFooter() {
  return (
    <>
      <div className="pointer-events-none absolute bottom-11 left-14 z-[6] hidden text-[12.5px] leading-relaxed text-hero-dim lg:block">
        <span className="mb-3 block h-px w-7 bg-white/25" aria-hidden="true" />
        {HERO_COPY.footerLeft.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-11 right-14 z-[6] hidden text-right text-[12.5px] leading-relaxed text-hero-dim lg:block">
        {HERO_COPY.footerRight.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </>
  );
}
