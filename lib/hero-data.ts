import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { Sparkles, Zap, type LucideIcon } from "lucide-react";

/* Everything editable in the hero lives here: copy, links, chips, cards and
   where they sit. Position strings are Tailwind classes, which is why
   tailwind.config.ts scans ./lib. */

export const HERO_COPY = {
  h1: "Md Asif Al Azad, Full Stack Developer",
  badge: "Available for opportunities",
  eyebrow: "Hey, this is",
  name: "Md Asif",
  sub: "I craft intuitive front-end experiences and robust back-end systems, turning ideas into complete, scalable web products.",
  outline: "AL AZAD",
  portraitAlt: "Md Asif Al Azad, full stack developer",
  ringText: "FULLSTACK ENGINEER  •  AVAILABLE FOR WORK  •",
  footerLeft: ["Based in Dhaka - 1216, Bangladesh .", "2+ years building for the web."],
  footerRight: ["Less noise.", "More shipped."],
} as const;

export const HERO_LINKS = {
  work: { label: "Show my work", href: "#work" },
  contact: { label: "Hire me", href: "/contact" },
  cv: {
    label: "Download CV",
    href: "https://drive.google.com/file/d/1i646oIYPByDGPNfZFZ31iFBu3i6Z5WtN/view?usp=sharing",
  },
} as const;

export const HERO_IMAGE = {
  src: "/hero-image2.png",
  width: 515,
  height: 485,
} as const;

/**
 * Scale for the 1440 x 1000 desktop stage (lg and up), as a unitless number.
 * Height-driven: a 1000px-tall screen is 1, a 768px laptop ~0.77, floored at
 * 0.62. On screens taller than 1000px it grows (up to 1.4) but never past
 * what the viewport width allows, so nothing is clipped sideways.
 * tan(atan2(a, b)) is the CSS way to turn a length ratio into a plain number.
 */
export const HERO_SCALE =
  "clamp(0.62, min(tan(atan2(100svh, 1000px)), max(1, tan(atan2(100vw, 1440px)))), 1.4)";

/** Pointer-parallax amplitude in px, by depth. */
export const HERO_DEPTH = {
  name: 14,
  portrait: 10,
  chips: 24,
  cards: 16,
} as const;

/** Scroll-linked travel in px. */
export const HERO_SCROLL = { portrait: -60, name: 80 } as const;

export const HERO_BRAND_GRADIENT = [
  { offset: "0%", color: "#a78bfa" },
  { offset: "50%", color: "#6b8cff" },
  { offset: "100%", color: "#22d3ee" },
] as const;

export const HERO_BACKGROUND = {
  glows: [
    "radial-gradient(60% 50% at 50% 78%, rgba(107,140,255,.28), transparent)",
    "radial-gradient(40% 35% at 18% 12%, rgba(167,139,250,.20), transparent)",
    "radial-gradient(35% 30% at 88% 20%, rgba(34,211,238,.12), transparent)",
  ].join(","),
  grid:
    "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
  gridMask: "radial-gradient(70% 70% at 50% 40%, #000 30%, transparent)",
} as const;

/** Shared glass surface (chips and cards). */
export const GLASS =
  "border border-[rgba(255,255,255,.125)] bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(17,25,40,.55)_45%)] backdrop-blur-xl shadow-[0_24px_50px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.12)]";

export type StackIcon = { icon: IconType; color: string; bg: string };

export type HeroChip = {
  id: string;
  title: string;
  caption: string;
  /** Single rounded icon tile. */
  tile?: { icon: IconType; bg: string; bordered?: boolean };
  /** Overlapping circular icons (MERN). */
  stack?: StackIcon[];
  tilt: number;
  floatDuration: number;
  floatDelay: number;
  /** Tailwind position classes, mobile-first. */
  position: string;
};

export const HERO_CHIPS: HeroChip[] = [
  {
    id: "typescript",
    title: "TypeScript",
    caption: "Type-safe by default",
    tile: { icon: SiTypescript, bg: "#3178C6" },
    tilt: -6,
    floatDuration: 6.4,
    floatDelay: 0,
    position:
      "md:left-6 md:top-[470px] lg:left-[calc(50%_-_400px)] lg:top-[640px]",
  },
  {
    id: "nextjs",
    title: "Next.js",
    caption: "Fast, SEO-ready apps",
    tile: { icon: SiNextdotjs, bg: "#000000", bordered: true },
    tilt: 5,
    floatDuration: 6.9,
    floatDelay: 0.8,
    position:
      "md:left-auto md:right-6 md:top-[510px] lg:right-auto lg:left-[calc(50%_+_230px)] lg:top-[640px]",
  },
  {
    id: "mern",
    title: "MERN Stack",
    caption: "End to end delivery",
    stack: [
      { icon: SiMongodb, color: "#47A248", bg: "#0b1020" },
      { icon: SiExpress, color: "#ffffff", bg: "#000000" },
      { icon: SiReact, color: "#61DAFB", bg: "#0b1020" },
      { icon: SiNodedotjs, color: "#5FA04E", bg: "#0b1020" },
    ],
    tilt: 4,
    floatDuration: 7,
    floatDelay: 1.4,
    position: "hidden lg:block lg:left-[calc(50%_-_430px)] lg:top-[800px]",
  },
  {
    id: "docker",
    title: "Learning Docker",
    caption: "Shipping with DevOps",
    tile: { icon: SiDocker, bg: "#2496ED" },
    tilt: -4,
    floatDuration: 6.6,
    floatDelay: 2.1,
    position: "hidden lg:block lg:left-[calc(50%_+_250px)] lg:top-[800px]",
  },
];

export type HeroCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  caption: string;
  avatars?: boolean;
  tilt: number;
  floatDuration: number;
  floatDelay: number;
  position: string;
};

export const HERO_CARDS: HeroCard[] = [
  {
    id: "ideas",
    icon: Zap,
    title: "Ideas to shipped",
    caption: "Design, build and deploy, one engineer, full stack.",
    tilt: -5,
    floatDuration: 7,
    floatDelay: 0.4,
    position:
      "hidden md:block md:left-6 md:top-[650px] md:w-[190px] lg:left-14 lg:top-[630px] lg:w-[230px]",
  },
  {
    id: "open",
    icon: Sparkles,
    title: "Open for projects.",
    caption: "Share your idea and I will reply with a clear plan.",
    avatars: true,
    tilt: 5,
    floatDuration: 6.5,
    floatDelay: 1.2,
    position:
      "hidden md:block md:right-6 md:top-[650px] md:w-[190px] lg:right-14 lg:top-[630px] lg:w-[230px]",
  },
];

export const HERO_AVATARS = [
  "linear-gradient(135deg,#a78bfa,#6b8cff)",
  "linear-gradient(135deg,#6b8cff,#22d3ee)",
  "linear-gradient(135deg,#22d3ee,#34d399)",
] as const;
