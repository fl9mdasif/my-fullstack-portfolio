import type { SVGProps } from "react";

/**
 * Inline SVG icon set. DrawSVGPlugin can only animate stroked geometry,
 * so every path here is stroke-only — no fills, no <img>.
 */
const PATHS: Record<string, string[]> = {
  // ---- services ----
  web: ["M3 5.5h18v13H3z", "M3 9.5h18", "M6 7.5h.01", "M8.5 7.5h.01", "M11 7.5h.01"],
  ecommerce: ["M3 5h2.2l2.3 9.5h9.6L19 8H6.2", "M10 19.5a1 1 0 1 0 0-.01", "M17 19.5a1 1 0 1 0 0-.01"],
  app: ["M7.5 2.5h9a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z", "M10.5 18.5h3"],
  uiux: ["M4 4h16v12H4z", "M4 20h7", "M9 16v4", "M8 8h5", "M8 11.5h8"],
  saas: ["M7 18.5a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.3 9.6A3.7 3.7 0 0 1 17 18.5z", "M12 12v5", "M9.8 14.4 12 12l2.2 2.4"],
  fullstack: ["M12 2.8 21 7.4l-9 4.6-9-4.6z", "M3 12.2l9 4.6 9-4.6", "M3 16.8l9 4.6 9-4.6"],
  ai: ["M8.5 4.5h7a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4z", "M9.5 9.5h5v5h-5z", "M12 2v2.5", "M12 19.5V22", "M2 12h2.5", "M19.5 12H22"],
  chatbot: ["M4 5.5h16v10H12l-5 4v-4H4z", "M9 10.5h.01", "M12 10.5h.01", "M15 10.5h.01"],
  // ---- pipeline ----
  scope: ["M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z", "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", "M12 11.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"],
  research: ["M10.8 4a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6z", "M15.8 15.8 20.5 20.5"],
  plan: ["M5 4.5h14v15H5z", "M8.5 2.8v3.4", "M15.5 2.8v3.4", "M5 9.5h14", "M8.5 13h3", "M8.5 16.2h7"],
  architect: ["M4 20V9.2L12 3.5l8 5.7V20", "M9.5 20v-6h5v6", "M4 20h16"],
  context: ["M4.5 4.5h6v6h-6z", "M13.5 4.5h6v6h-6z", "M4.5 13.5h6v6h-6z", "M13.5 13.5h6v6h-6z"],
  review: ["M9 3.5h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9", "M9 3.5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h3", "M8.5 9.5 11 12l4.5-4.5"],
  test: ["M9 3.5h6", "M10 3.5v6.2L5.8 17a3 3 0 0 0 2.6 4.5h7.2A3 3 0 0 0 18.2 17L14 9.7V3.5", "M7.4 14.5h9.2"],
  ship: ["M12 21.5S5 17 5 10.8a7 7 0 0 1 14 0C19 17 12 21.5 12 21.5z", "M12 7.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"],
  scale: ["M4 19.5h16", "M7 19.5V13", "M12 19.5V8.5", "M17 19.5V4.5"],
  // ---- ui ----
  arrow: ["M4 12h15", "M13.5 6.5 20 12l-6.5 5.5"],
  spark: ["M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.2l-1.8-5.6L4.5 10.8 10.2 9z"],
};

const SLUG_HINTS: [RegExp, string][] = [
  [/(^|-)(ai|ml|llm|gpt|intelligence)/, "ai"],
  [/(bot|chat|support)/, "chatbot"],
  [/(shop|store|commerce|cart|ecom)/, "ecommerce"],
  [/(mobile|app|android|ios|native)/, "app"],
  [/(ui|ux|design|figma|brand)/, "uiux"],
  [/(saas|dashboard|platform|cloud|devops)/, "saas"],
  [/(full|mern|backend|api|node)/, "fullstack"],
  [/(web|site|landing|next|frontend)/, "web"],
];

/** Pick an icon key: explicit key wins, else guess from the slug, else `web`. */
export function resolveServiceIcon(icon?: string, slug = ""): string {
  if (icon && PATHS[icon]) return icon;
  const s = slug.toLowerCase();
  for (const [re, key] of SLUG_HINTS) if (re.test(s)) return key;
  return "web";
}

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: string;
  strokeWidth?: number;
};

export function Icon({ name, strokeWidth = 1.6, ...rest }: IconProps) {
  const paths = PATHS[name] ?? PATHS.web;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
