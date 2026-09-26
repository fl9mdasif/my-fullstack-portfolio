# Portable Components Guide

Three scroll-animated sections built for Interactive Software Care, written so they can be dropped into another Next.js project:

1. **Service cards** — a responsive card grid with a per-card entrance, SVG stroke drawing, cursor tilt and a scroll-linked column parallax.
2. **Process spine** — a vertical timeline whose cards alternate left and right along a spine that fills as you scroll.
3. **Project stack** — a sticky deck where each card slides up and lands on top of the previous one.

All three are plain CSS plus GSAP. **No Tailwind classes are used inside them**, so they work in any styling setup. Everything below assumes you copy files as-is; where a name must change, it is called out.

---

## 1. Prerequisites

| Requirement | Version used here | Notes |
|---|---|---|
| React | 19 | Server Components supported but not required |
| Next.js | 16 (App Router) | Only needed for `next/image` and `next/link`. See §7 to drop them. |
| GSAP | 3.15 | `gsap`, `ScrollTrigger`, `DrawSVGPlugin` |
| TypeScript | 5.9 | Optional — strip the types for a JS project |

```bash
npm install gsap
```

Since GSAP 3.13 every plugin, including `DrawSVGPlugin`, ships free in the public `gsap` package. No Club membership or private registry is needed.

Optional helpers used by the copied files:

```bash
npm install clsx tailwind-merge   # only for cn(); see §7 for a 3-line replacement
```

Browser support: the components rely on CSS custom properties, `color-mix()`, `position: sticky` and the `translate` / `scale` properties. That means Chrome/Edge 111+, Firefox 113+, Safari 16.4+. There is no fallback for older browsers other than the reduced-motion path.

---

## 2. Files to copy

### Shared by all three

| File | Purpose |
|---|---|
| `components/motion/Motion.tsx` | Every animation lives here. One client component per page. |
| `components/ui/Icon.tsx` | Inline SVG icon set. DrawSVG needs real inline SVG, not `<img>`. |
| `lib/utils.ts` | `cn()`, `categoryName()`, `categoryId()` |
| CSS tokens | `app/globals.css` lines 1–128 (see §3) |
| CSS shared bits | `app/globals.css` lines 180–340 — `.eyebrow`, `.btn`, `.section`, `.sec-head`, `.grad`, `.reveal` |
| CSS reduced motion | `app/globals.css` from `/* ---------- reduced motion ---------- */` to the end |

### Per component

| Component | Files | CSS block in `app/globals.css` |
|---|---|---|
| Service cards | `components/sections/ServiceCard.tsx`, `lib/cloudinary.ts` | `/* ---------- services ---------- */` (lines 781–933) |
| Process spine | `components/sections/Pipeline.tsx`, `components/ui/SectionHead.tsx` | `/* ---------- process: vertical spine ---------- */` (lines 934–1217) |
| Project stack | `components/sections/ProjectStack.tsx`, `components/ui/CldImg.tsx` | `/* ---------- project stack ---------- */` (lines 1362–1597) |

Line numbers are a starting point, not a contract. Each block begins at its `/* ---------- name ---------- */` comment and ends where the next one starts; copy between those comments.

`Motion.tsx` contains animations for other sections too (hero, counters, generic reveals). Copy the whole file and delete what you don't need — each block is clearly separated — or copy only `setupServiceCards`, `setupSpine`, `setupStack` and the small shell in §4.

---

## 3. Design tokens

Every component reads CSS variables. Define these on `:root` before anything else, or nothing will render correctly.

```css
:root {
  --bg: #06070a;
  --surface: #0d0f15;
  --surface-2: #12151d;
  --border: rgba(255, 255, 255, 0.085);
  --border-strong: rgba(255, 255, 255, 0.16);
  --text: #f4f6fa;
  --text-mid: #b4bccb;
  --text-dim: #8590a2;
  --violet: #6c5cff;
  --violet-dim: rgba(108, 92, 255, 0.14);
  --acid: #2ee6c5;
  --acid-dim: rgba(46, 230, 197, 0.12);
  --danger: #ff6b81;

  --display: "Space Grotesk", system-ui, sans-serif;
  --body: "Inter", system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, monospace;

  --sp-1: 8px;  --sp-2: 16px; --sp-3: 24px; --sp-4: 32px;
  --sp-5: 48px; --sp-6: 64px; --sp-7: 96px;
  --radius: 14px;
  --radius-lg: 22px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  color-scheme: dark;
}
```

**Rebranding:** change `--acid` and `--violet` and all three components follow, including the process spine gradient and the stack's per-card accents. The one place the brand colours are also written in JavaScript is the spine ramp in `Pipeline.tsx`:

```ts
const ACID = [46, 230, 197];
const VIOLET = [108, 92, 255];
```

Keep those two arrays in sync with the CSS values.

**Fonts:** the tokens point at `--font-display` / `--font-body` / `--font-mono` in this project, which `next/font` defines in `app/layout.tsx`. If you are not using `next/font`, replace the three font tokens with plain family names as shown above and load the fonts however you normally do.

These sections assume a dark background. On a light theme you would need to re-tune the card gradients (`rgba(255,255,255,.045)`) and the border alphas, not just the tokens.

---

## 4. Wiring up the motion

`Motion.tsx` is a client component that renders nothing. It scans the DOM after mount, sets everything up, and reverts on unmount.

```tsx
// any page
import { Motion } from "@/components/motion/Motion";

export default function Page() {
  return (
    <>
      {/* sections here */}
      <Motion />
    </>
  );
}
```

Rules:

- **Render it once per page, as the last element.** Its cleanup must run before React removes the DOM it animates.
- **It finds work by selector**, not by props:

  | Selector | Handler |
  |---|---|
  | `.svc-grid` | `setupServiceCards` |
  | `#spine` | `setupSpine` |
  | `#stack` | `setupStack` |

  Rename a class or id in the markup and you must rename it in `Motion.tsx` too.
- **Sections stay Server Components.** They only carry class names and data attributes, so content is still server-rendered and indexable.
- On mount it adds `gsap-ready` to `<body>`, which is what makes `.reveal` elements start hidden. Without JS they stay visible — that's deliberate.

If you only want one of the three, delete the other `setup*` functions and their call sites inside the `gsap.context()` block.

---

## 5. The components

### 5.1 Service cards

```tsx
import { ServicesGrid } from "@/components/sections/ServiceCard";

<ServicesGrid services={services} />
```

Data shape (only these fields are read):

```ts
type TService = {
  _id: string;
  title: string;
  slug: string;            // used for the href and to guess the icon
  shortDescription: string;
  icon?: string;           // icon key, or an image URL
};
```

- The **first card spans two columns** (`wide`). Change that in `ServicesGrid` where it passes `wide={i === 0}`.
- Grid: 3 columns, 2 below 940px, 1 below 620px.
- `icon` may be one of `web`, `ecommerce`, `app`, `uiux`, `saas`, `fullstack`, `ai`, `chatbot`; or an `https://` image URL; or empty, in which case the icon is guessed from the slug by `resolveServiceIcon()` in `Icon.tsx`.
- Cards link to `/services/<slug>`. Change that one line in `ServiceCard` for a different route.

Motion:

| Part | Behaviour |
|---|---|
| Entrance | Card rises (y 40, scale .96, slight rotateX) at `top 88%`, delayed by column index so each row plays left to right |
| Icon | Tile pops in with `back.out(2.2)`, then its SVG strokes draw with DrawSVG |
| Text | Title, description, link stagger 0.06s |
| Scroll depth | Each column drifts at a different speed via `--svc-py`, aligning when the grid is centred (≥621px only) |
| Exit | Cards leaving the top shrink to .955 and dim to .62 brightness |
| Hover | ±3° tilt toward the cursor, 6px lift, gradient hairline sweeps the top edge (fine pointers only) |

### 5.2 Process spine

```tsx
import { Pipeline } from "@/components/sections/Pipeline";

<Pipeline />
```

Content is a `STEPS` array at the top of the file — edit it there. Each entry is `{ icon, t, d }` where `icon` is a key in `Icon.tsx`.

- Desktop: cards alternate left/right of a centre spine, joined by a stub and a node dot.
- Below 768px: the spine moves to the left edge and cards stack full width.
- Per-step accent interpolates from `--acid` at step 1 to `--violet` at the last step.
- The progress bar on each card is `(index + 1) / total`.

Motion per step, triggered at `top 84%`: stub draws (scaleX), node pops (`back.out(2)`), card slides in from the spine side, inner elements stagger, then the bar fills. The spine fill itself is scrubbed to section progress. The card nearest the viewport centre gets `.active`.

> **Changing the number of steps:** the CSS pins each card to a grid row with `nth-child(1)` … `nth-child(10)` rules so the two columns interleave. If you use more or fewer than 10 steps, extend or trim that list — otherwise extra cards collapse onto one row.

### 5.3 Project stack

```tsx
import { ProjectStack } from "@/components/sections/ProjectStack";

<ProjectStack items={projects} />
```

Data shape:

```ts
type TPortfolioItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  thumbnail: string;                          // optional; gradient shows when empty
  category?: { name: string } | string | null; // rendered as the label
};
```

- Add a 4th or 5th card by passing more items. Index, sticky offset and accent all come from DOM order — no code changes.
- Accents cycle through violet, acid, acid (`ACCENTS` in the file). Gradients cycle through `w1`, `w2`, `w3`, which must exist in your CSS — they are in the work-card block:

  ```css
  .w1 { background: linear-gradient(145deg, #4a3bd4, #6c5cff 55%, #241c66); }
  .w2 { background: linear-gradient(145deg, #0e8f79, #2ee6c5 60%, #0b4d42); }
  .w3 { background: linear-gradient(145deg, #3b2f9e, #2ee6c5 120%, #151238); }
  ```

- Cards stick at `96px + index * 18px` (`88px + index * 10px` on mobile). If your header is taller, change `--stack-top` on `.stack`.
- The sticky `01 / 03` counter sits bottom-right and updates as each card takes the top.

Motion: entrance y 60 at 0.6s, inner stagger, panel parallax (`yPercent` -8 to 8), and as the next card covers it the current card scrubs `--stack-s` 1 → .94 (.97 mobile) and `--stack-b` 1 → .55.

> **Sticky is fragile.** `position: sticky` silently stops working if *any* ancestor has `overflow: hidden`, `overflow: auto`, or a `transform` / `filter` / `contain` that creates a containing block. If the deck scrolls past instead of sticking, walk up the tree — that is nearly always the cause. In this project the stack deliberately sits outside the `.process` wrapper, which has `overflow: hidden`.

---

## 6. Conventions worth keeping

**Scroll effects use CSS variables, not `transform`.** Entrance tweens, hover tilt and scroll-linked depth would otherwise fight over the same property and cancel each other out. The split is:

| Owner | Property |
|---|---|
| GSAP entrance / hover tilt | `transform` (`x`, `y`, `scale`, `rotationX/Y`) |
| Scroll-linked depth | `--svc-py` → `translate`, `--stack-s` → `scale`, `--stack-b` → `filter` |

If you add a new scroll effect to these cards, keep it on a custom property.

**Sticky elements need derived trigger points.** A sticky card reports its stuck position, so `start: "top top"` never fires for it. `setupStack` computes each card's natural offset from the non-sticky list plus the heights above it, and passes `invalidateOnRefresh: true` so the numbers survive a resize. Reuse that helper rather than trusting element positions.

**Breakpoints go through `gsap.matchMedia()`**, never `ScrollTrigger.matchMedia()` (deprecated since 3.12). Each `mm.add()` returns its own cleanup and the whole thing is reverted on unmount.

**Accessibility, already handled — don't regress it:**

- `prefers-reduced-motion: reduce` short-circuits `Motion.tsx` before any animation is created, and the CSS drops sticky positioning and hides the counter. Everything renders in its final state.
- Content is visible with JS disabled: elements animate *from* a visible state, and `.reveal` only hides once `body.gsap-ready` exists.
- Cards are real `<article>` elements inside `<ol>`; step numbers and percentages are real text.
- Decorative layers carry `aria-hidden="true"`.
- Keep focus rings intact (`:focus-visible` in the shared block).

---

## 7. Removing the Next.js dependency

The components are Next-flavoured in three small places:

| What | Where | Replacement |
|---|---|---|
| `next/link` | `ServiceCard`, `ProjectStack`, `Pipeline` | Plain `<a href>` |
| `next/image` | `components/ui/CldImg.tsx` | `<img>` with `loading="lazy"`, keeping the wrapper's `position: relative` |
| Cloudinary URL helper | `lib/cloudinary.ts` | Delete `cld()` and pass URLs straight through |

`cn()` can be replaced with:

```ts
export const cn = (...v: (string | false | null | undefined)[]) => v.filter(Boolean).join(" ");
```

That only drops Tailwind class de-duplication, which these components don't use.

---

## 8. Post-copy checklist

1. `npm install gsap` (plus `clsx` and `tailwind-merge`, or swap `cn()`).
2. Paste the tokens from §3 into your global stylesheet, above everything.
3. Copy the shared CSS block, the reduced-motion block, and the block(s) for the components you took.
4. Copy the component files plus `Motion.tsx`, `Icon.tsx` and `lib/utils.ts`.
5. Fix the import alias — everything here imports from `@/`. Either add that path alias to `tsconfig.json`, or rewrite the imports.
6. Render `<Motion />` once, at the end of the page.
7. Verify:
   - Cards are visible with JavaScript disabled.
   - With "reduce motion" on in the OS, nothing animates and the stack is a plain list.
   - No horizontal scrollbar at 320px.
   - The deck actually sticks — if not, check for `overflow: hidden` on an ancestor.
   - Resize across 620px, 768px and 940px; ScrollTrigger recalculates on refresh.

## 9. Known limits

- The process spine's grid rows are hard-coded for 10 steps (§5.2).
- Service card column parallax is disabled below 621px, where cards are a single column.
- `DrawSVGPlugin` only animates stroked SVG shapes. Filled icons (`quote`, `star` in `Icon.tsx`) are skipped, and image icons can't draw at all.
- The stack assumes a roughly uniform card height; wildly different heights make the peeking edges uneven.
- Colours are tuned for a dark background; a light theme needs the card gradients re-tuned, not just new tokens.
