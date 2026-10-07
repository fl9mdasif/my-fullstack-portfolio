import { HERO_COPY } from "@/lib/hero-data";

const SIZE = 110;
const C = SIZE / 2;
const R = 47;
const CIRCUMFERENCE = 2 * Math.PI * R;
const PATH = `M${C},${C} m-${R},0 a${R},${R} 0 1,1 ${2 * R},0 a${R},${R} 0 1,1 -${2 * R},0`;

/**
 * Circular text badge. GSAP spins the outer div (`data-hero="spin"`).
 * `textLength` stretches the string to exactly one lap, so the text always
 * closes the circle whatever font renders it.
 */
export function HeroRotatingBadge() {
  return (
    <div
      aria-hidden="true"
      data-hero="spin"
      className="pointer-events-none absolute right-[92px] top-[130px] z-[4] hidden h-[110px] w-[110px] lg:block"
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" focusable="false">
        <defs>
          <path id="hero-badge-path" d={PATH} />
        </defs>
        <text fontSize="7.6" fontWeight="600" fill="#bec1dd">
          <textPath
            href="#hero-badge-path"
            textLength={CIRCUMFERENCE}
            lengthAdjust="spacing"
          >
            {HERO_COPY.ringText}
          </textPath>
        </text>
        {/* four-point star */}
        <path
          d={`M${C} ${C - 10} L${C + 2.2} ${C - 2.2} L${C + 10} ${C} L${C + 2.2} ${C + 2.2} L${C} ${C + 10} L${C - 2.2} ${C + 2.2} L${C - 10} ${C} L${C - 2.2} ${C - 2.2} Z`}
          fill="#a78bfa"
        />
      </svg>
    </div>
  );
}
