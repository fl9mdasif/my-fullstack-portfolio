# Reusable UI — Services Cards, Project Stack, Process Spine

Design, animation, hover and scroll behaviour of the three scroll-animated
sections in this portfolio, written so they can be lifted into another project.

Everything is **plain CSS + GSAP ScrollTrigger**. No Tailwind classes are used
inside the three sections, so they drop into any styling setup.

| Section | Component | CSS block | Motion handler | Root selector |
|---|---|---|---|---|
| Services cards | `components/sections/ServiceCard.tsx` | `/* ---------- services ---------- */` | `setupServiceCards`, `setupServiceHover` | `.svc-grid` |
| Process spine | `components/sections/Pipeline.tsx` | `/* ---------- process: vertical spine ---------- */` | `setupSpine` | `#spine` |
| Project stack | `components/sections/ProjectStack.tsx` | `/* ---------- project stack ---------- */` | `setupStack` | `#stack` |

Supporting files: `components/motion/Motion.tsx` (all animation),
`components/ui/Icon.tsx` (stroke-only inline SVG), `components/ui/SectionHead.tsx`,
`components/ui/CldImg.tsx`, `app/sections.css` (tokens + all three blocks).

---

## 1. Files to copy

```
app/sections.css                       # tokens, shared bits, 3 blocks, reduced motion
components/motion/Motion.tsx           # every animation
components/ui/Icon.tsx                 # inline SVG set + resolveServiceIcon()
components/ui/SectionHead.tsx          # eyebrow + headline + one-line lead
components/ui/CldImg.tsx               # img wrapper (project stack only)
components/sections/ServiceCard.tsx    # ServicesGrid + ServiceCard
components/sections/Pipeline.tsx       # STEPS array lives at the top of the file
components/sections/ProjectStack.tsx   # takes items[]
utils/cn.ts                            # clsx + tailwind-merge, or 3-line replacement
utils/sections.ts                      # categoryName(), toPortfolioItem()
types/sections.ts                      # TService, TPortfolioItem
```

Dependency: `npm install gsap` (3.13+). Nothing else. `DrawSVGPlugin` is **not**
used — stroke drawing is done by hand (see §5.2).

Import `sections.css` once, after the global stylesheet:

```tsx
// app/layout.tsx
import "./globals.css";
import "./sections.css";
```

---

## 2. Design tokens

All three sections read these. Define them on `:root` before anything else.

```css
:root {
  --bg: #06091f;              /* page background */
  --surface: #0d1024;         /* card background */
  --surface-2: #12162e;       /* tag / chip background */
  --line: rgba(255,255,255,.10);
  --line-strong: rgba(255,255,255,.18);

  --text: #f4f6fa;
  --text-mid: #bec1dd;
  --text-dim: #8a92ab;

  --violet: #cbacf9;          /* primary accent */
  --violet-deep: #a78bfa;
  --violet-dim: rgba(203,172,249,.14);
  --acid: #38bdf8;            /* secondary accent (cyan) */
  --acid-dim: rgba(56,189,248,.12);

  --sp-1: 8px;  --sp-2: 16px; --sp-3: 24px; --sp-4: 32px;
  --sp-5: 48px; --sp-6: 64px; --sp-7: 96px;

  --rad: 14px;
  --rad-lg: 22px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --mono: ui-monospace, "JetBrains Mono", SFMono-Regular, Menlo, monospace;
}
```

**Naming warning.** Tailwind already puts `--border`, `--radius`, `--accent` and
`--background` on `:root` (via `addVariablesForColors` and the shadcn base
layer). Colliding with those breaks `border-border` and friends. That is why the
tokens here are `--line` / `--line-strong` and `--rad` / `--rad-lg`.

`--accent` **is** used, but only as a per-element inline style
(`style={{ "--accent": … }}` on `.step` and `.stack-item`), which shadows the
root value inside that element. Never read `var(--accent)` outside those trees.

**Rebrand:** change `--violet` and `--acid`. Everything follows, including the
spine gradient and per-card accents. Two places repeat the colours and must stay
in sync:

```ts
// components/sections/Pipeline.tsx — the spine accent ramp
const ACID   = [56, 189, 248];   // --acid
const VIOLET = [203, 172, 249];  // --violet
```

```css
/* app/sections.css — the project stack panel gradients */
.w1 { background: linear-gradient(145deg, #4a3bd4, #a78bfa 55%, #241c66); }
.w2 { background: linear-gradient(145deg, #0e6f9f, #38bdf8 60%, #0b2f4d); }
.w3 { background: linear-gradient(145deg, #3b2f9e, #38bdf8 120%, #151238); }
```

All three blocks assume a **dark background**. A light theme needs the card
gradients (`rgba(255,255,255,.045)`) and border alphas re-tuned, not just new
token values.

Browser floor: `color-mix()`, `position: sticky`, and the independent
`translate` / `scale` properties → Chrome/Edge 111+, Firefox 113+, Safari 16.4+.

---

## 3. The one rule that keeps the animations from fighting

Three different things want to move the same card: the entrance tween, the hover
tilt, and the scroll-linked depth. If all three wrote to `transform`, they would
overwrite each other. The split is strict:

| Owner | Property |
|---|---|
| GSAP entrance + hover tilt | `transform` (`x`, `y`, `scale`, `rotationX/Y`) |
| Scroll-linked depth | `--svc-py` → `translate` |
| Scroll-linked shrink | `--stack-s` → `scale` |
| Scroll-linked dim | `--stack-b`, `--svc-b` → `filter: brightness()` |
| Cursor glow position | `--mx`, `--my` → `radial-gradient` position |

```css
.svc {
  translate: 0 var(--svc-py, 0px);   /* GSAP scrub writes the variable */
  scale: var(--svc-s, 1);
  filter: brightness(var(--svc-b, 1));
}
```

**Any new scroll effect on these cards goes on a custom property, not on
`transform`.**

---

## 4. Section 1 — Services cards

### 4.1 Markup contract

```tsx
<div className="svc-grid">
  <a className="svc wide">        {/* first card spans 2 columns */}
    <span className="num">01</span>
    <div className="svc-ico"><svg>…</svg></div>
    <h3>Title</h3>
    <p>Short description</p>
    <span className="svc-more">Let&apos;s talk <svg/></span>
  </a>
  …
</div>
```

### 4.2 Layout

- Grid `repeat(3, minmax(0,1fr))`, gap `--sp-3`, `perspective: 1200px` on the
  grid so the card tilt reads as 3D.
- `.svc.wide { grid-column: span 2 }` — passed as `wide={i === 0}` in
  `ServicesGrid`.
- Card: `min-height: 236px`, `--rad-lg` radius, 1px `--line` border,
  `overflow: hidden`, `transform-style: preserve-3d`.
- Background is two layers: a top-left white wash plus the surface colour.

```css
background:
  radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,.045), transparent 60%),
  var(--surface);
```

- Breakpoints: 2 columns ≤940px, 1 column ≤620px (where `.wide` drops to
  `span 1`).

### 4.3 Layers inside the card

Order matters because the glow is an absolutely positioned pseudo-element:

| Layer | z-index |
|---|---|
| `.svc::after` — cursor glow | 0 |
| `.svc > *` — all content | 1 |
| `.svc::before` — top hairline | 2 |

Without `.svc > * { position: relative; z-index: 1 }` the positioned glow paints
over the text.

### 4.4 Hover

Three things happen at once.

**1. Cursor-following radial glow** (`::after`):

```css
.svc::after {
  background: radial-gradient(
    260px circle at var(--mx, 50%) var(--my, 20%),
    rgba(203,172,249,.16),          /* violet core */
    rgba(56,189,248,.07) 42%,       /* cyan mid */
    transparent 68%
  );
  opacity: 0;
  transition: opacity .45s var(--ease);
}
.svc:hover::after,
.svc:focus-visible::after { opacity: 1; }
```

`--mx` / `--my` are written in px by the global `[data-spot]` listener (§8, rule
5) — straight through `style.setProperty`, **not** a tween, since a tween per
pointer event is wasted work. The defaults (`50% 20%`) mean the glow still works on plain CSS hover if
the motion layer never runs.

**2. Gradient hairline sweeping the top edge** (`::before`): a 1px
`transparent → violet → acid → transparent` line that animates
`translateX(-100%) → 0` over `.7s` while fading in over `.3s`.

**3. 3D tilt** — GSAP, fine pointers only:

```ts
rotationY: px * 6,      // px, py = cursor offset from centre, -0.5…0.5
rotationX: -py * 6,     // so ±3° each way
y: -6,                  // 6px lift
duration: .4, ease: "power2.out", overwrite: "auto"
```

Reset on `pointerleave` (`.5s`). The whole hover block is inside
`mm.add("(hover: hover) and (pointer: fine)")`, so touch devices never get it.

Plus: border goes `--line → --line-strong`, and the `.svc-more` arrow slides
`translateX(4px)`.

### 4.5 Scroll effects

**Entrance**, per card, at `top 88%`:

```ts
y: 40, scale: .96, rotateX: 6, opacity: 0, duration: .7, ease: "power3.out"
delay: columnIndex * 0.08          // each row plays left to right
```

Column index is derived from `Math.round(card.offsetLeft)`, so it keeps working
when the grid reflows — no hard-coded column count.

Then, on the same timeline: icon tile pops in at `0.15s`
(`scale: .4 → 1`, `ease: "back.out(2.2)"`), its SVG strokes draw from `0.35s`,
and the text (`h3, p, .svc-more`) staggers `0.06s` from `0.3s`.

**Exit dim** — scrubbed, `top 22%` → `top top`:

```
--svc-s: 1 → .955      (scale)
--svc-b: 1 → .62       (brightness)
```

**Column parallax** — scrubbed over the whole grid
(`top bottom` → `bottom top`), depths `[26, -18, 14]px` by column index,
animating `--svc-py` from `+depth` to `-depth`, so the columns align when the
grid is centred. Disabled below 621px, where there is only one column.

---

## 5. Section 2 — Process spine (the tree)

### 5.1 Markup contract

```tsx
<div className="spine-wrap" id="spine">
  <div className="spine"><i id="spine-fill" /></div>
  <ol className="steps">
    <li className="step is-left" style={{ "--accent": "rgb(…)", "--pct": "10%" }}>
      <span className="step-stub" />
      <span className="step-node" />
      <div className="step-motion">
        <article className="step-card">
          <div className="step-top"><span className="step-num">01.</span><svg className="step-ico"/></div>
          <h3 className="step-title">…</h3>
          <p className="step-desc">…</p>
          <div className="step-bar-row">
            <span className="step-bar"><i /></span>
            <span className="step-pct">10%</span>
          </div>
        </article>
      </div>
    </li>
    …
  </ol>
</div>
```

`.step-motion` exists purely so GSAP can slide the card horizontally without
touching `.step`, which owns the absolute positioning of the stub and node.

### 5.2 Layout

The zigzag comes from **half-height grid rows**, not from one row per card.

```css
.spine-wrap {
  --card-w: 380px;  --card-h: 200px;  --gap-y: 28px;
  --row: calc((var(--card-h) + var(--gap-y)) / 2);   /* half a step */
  --stub: 48px;     --node: 14px;
}
.steps {
  display: grid;
  grid-template-columns: minmax(0,1fr) calc(var(--stub) * 2) minmax(0,1fr);
  grid-auto-rows: var(--row);
}
.step { grid-row: span 2; width: min(var(--card-w), 100%); height: var(--card-h); align-self: center; }
.step.is-left  { grid-column: 1; justify-self: end; }
.step.is-right { grid-column: 3; justify-self: start; }
.step:nth-child(n) { grid-row: n / span 2; }   /* written out for 1…10 */
```

Every step starts one half-row after the previous one and spans two rows, so a
left card and the right card after it overlap vertically by half a card. That
is what produces the interleaved zigzag. The middle column is `stub * 2` wide,
so the spine sits exactly in the centre of it.

> **Changing the step count:** extend or trim the `nth-child` list. With more
> steps than rules, the extra cards collapse onto one row.

- Cards are **fixed size** (`--card-w` × `--card-h`): 380×200, 320×224 at
  ≤1024px. Content must fit; the bar row is pinned to the bottom with
  `margin-top: auto`, so every card ends on the same line.
- Spine: 2px, `left: 50%`, inset `top`/`bottom` by `var(--row)` so it starts and
  ends at the centre of the first and last card. The fill `<i id="spine-fill">`
  carries `linear-gradient(180deg, var(--acid), var(--violet))`, a soft
  two-layer `color-mix` glow, and `transform-origin: top`.
- Stub and node are centred on the card with `top: 50%`. The stub is
  `var(--stub)` wide and grows outward from the spine (`transform-origin: 100%`
  on the left side, `0` on the right).
- Node: `--node` (14px) dot, 6px dim ring (`--accent-dim`), glow when the step
  is `.active`. Positioned with `left`/`right` calc — **never
  `translateX(-50%)`**, because GSAP animates `scale` on this element and would
  overwrite a CSS transform.
- `.step` derives `--accent-dim` (16%) and `--accent-soft` (32%) from the
  inline `--accent` with `color-mix`.
- Per-step accent comes from JS, interpolating `--acid → --violet` across the
  step list:

```ts
const accentAt = (i: number) => {
  const t = i / (STEPS.length - 1);
  const [r, g, b] = ACID.map((c, k) => Math.round(c + (VIOLET[k] - c) * t));
  return `rgb(${r} ${g} ${b})`;
};
```

- Progress bar fill width is `var(--pct)`, set inline as `(i + 1) / total`.
- Section background: none (it sits on the page background, so it matches the
  other sections), plus a 44px grid-line pattern
  (`--grid-line`) on `.process::before`, faded by a radial mask. `isolation:
  isolate` + `z-index: -1` keeps the pattern behind the content.
- Mobile ≤767px: `--spine-x: 9px`, wrap gets `padding-left`, spine moves to the
  left edge with a fade mask, `.steps` becomes one column (`gap: 16px`), cards
  grow to their content (`min-height: 176px`), stub points left.

### 5.3 Card and active state

Glass card: `linear-gradient(170deg, var(--glass-top), var(--glass-bot))`,
`backdrop-filter: blur(12px)`, 1px `--line` border, `--rad` radius.

- **Hover:** lifts 4px, border becomes `--accent-soft`, and a cursor spotlight
  fades in (`.step-card::after`, `radial-gradient(260px circle at var(--mx)
  var(--my), var(--accent-dim), transparent 65%)`).
- **Active** (card nearest the viewport centre): same lift and border, plus a
  7% accent tint in the gradient and a glowing node.
- The lift is on `.step-card`; the GSAP entrance is on the `.step-motion`
  wrapper. Two elements, two transforms, no fight.

Typography: step number `1.9rem / 700` in the accent colour, title uppercase
`1.04rem / 700`, description `.88rem`, percent `.66rem` mono.

### 5.4 Scroll effects

**Spine fill** — scrubbed (`scrub: 0.8`) over `.steps`, `top 75%` →
`bottom 84%`, `scaleY: 0 → 1`, `invalidateOnRefresh: true`.

**Per step**, one timeline at `top 84%` with
`toggleActions: "play none none reverse"` (replays backwards on scroll-up).
Steps run in sequence with overlaps:

| Step | What |
|---|---|
| 1 | stub draws, `scaleX: 0 → 1`, `.35s` |
| 2 | node pops, `scale: 0 → 1`, `back.out(2)`, `.4s` |
| 3 (`-=0.15`) | card slides in from the spine side: `x: ±40`, `scale: .96 → 1`, `opacity: 0 → 1`, `.65s` |
| 4 (`-=0.3`) | `.step-num, .step-ico, .step-title, .step-desc` stagger `0.05s` |
| 5 (`+=0.15`) | progress bar fills, `scaleX: 0 → 1`, `.6s` |

Slide direction: `is-right` slides from `-40`, `is-left` from `+40`. In the
stacked mobile layout every card uses `-40`, which is why `setupSpine` takes a
`stacked` argument and is registered in two `matchMedia` branches (≥768px and
≤767px).

**Active step:** one `ScrollTrigger` on `.steps` (`top 60%` → `bottom 40%`).
On every update it picks the step whose centre is nearest the viewport centre
and moves the `.active` class to it. One class, one owner.

### 5.5 Stroke drawing without DrawSVGPlugin

Icons must be **stroke-only inline SVG** (`fill="none"`, real `<path>` elements).
Filled shapes and `<img>` cannot draw. The helper measures each path and animates
the dash offset:

```ts
function drawStrokes(root: Element, tl: gsap.core.Timeline, at: number) {
  root.querySelectorAll<SVGPathElement>("path").forEach((p, i) => {
    const len = p.getTotalLength?.() ?? 0;
    if (!len) return;
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    tl.to(p, { strokeDashoffset: 0, duration: .5, ease: "power2.inOut" }, at + i * .06);
  });
}
```

---

## 6. Section 3 — Project stack (sticky deck)

### 6.1 Markup contract

```tsx
<div className="stack" id="stack">
  <ol className="stack-list">
    <li className="stack-item" style={{ "--i": i, "--accent": "var(--violet)" }}>
      <article className="stack-card">
        <div className="stack-body">
          <span className="stack-cat">01 · CATEGORY</span>
          <h3 className="stack-title">…</h3>
          <ul className="stack-tags"><li>Next.js</li>…</ul>
          <p className="stack-desc">…</p>
          <a className="stack-link">View case study <svg/></a>
        </div>
        <div className="stack-vis w1">
          <div className="stack-vis-inner"><img /></div>
        </div>
      </article>
    </li>
    …
  </ol>
  <div className="stack-counter"><b id="stack-cur">01</b><span>/ 04</span></div>
</div>
```

`--i` is the index; the CSS uses it for the sticky offset, so adding a card needs
no code change. Accents cycle `[violet, acid, acid]`, gradients cycle `w1 w2 w3`.

### 6.2 Layout

```css
.stack-card {
  display: grid;
  grid-template-columns: 30% minmax(0, 1fr);   /* info | image */
  height: clamp(460px, 60vh, 580px);
  overflow: hidden;
  border-radius: var(--rad-lg);
  box-shadow: 0 30px 70px -50px rgba(0,0,0,.9);
}
```

- Info column: `justify-content: flex-start`, `gap: 10px`, divider on its right
  edge. Title clamped to 3 lines at `clamp(18px, 1.5vw, 23px)`; description
  clamped to 4 lines. **Clamping is what keeps every card in the deck the same
  height.**
- `.stack-link` has `margin-top: 4px` and `align-self: flex-start`. It must
  **not** use `margin-top: auto` — the card bottom is exactly the strip the next
  sticky card slides over, so a bottom-pinned button disappears mid-scroll.
- Image cell: `.stack-vis-inner { position: absolute; inset: -12% 0 }` — taller
  than its frame, which is the travel room the parallax needs.
- Counter: `position: sticky; bottom: var(--sp-3)`, `margin-left: auto`,
  blurred pill.
- Mobile ≤767px: one column, image first at `aspect-ratio: 4/3`, `height: auto`,
  description clamp drops to 3 lines.

### 6.3 The sticky mechanics

```css
.stack-item {
  position: sticky;
  top: calc(var(--stack-top) + var(--i) * 18px);   /* 96px + 18px per card */
  scale: var(--stack-s, 1);
  filter: brightness(var(--stack-b, 1));
}
```

Mobile uses `88px + var(--i) * 10px`. Change `--stack-top` on `.stack` if the
header is taller.

> **Sticky is fragile.** `position: sticky` silently stops working if *any*
> ancestor has `overflow: hidden`, `overflow: auto`, or a `transform` / `filter`
> / `contain` that creates a containing block. In this project the page wrapper
> had to move from `overflow-hidden` to `overflow-x-clip` (which leaves the
> vertical axis `visible`) and the deck is rendered **outside** every
> `max-w-*` wrapper. If the deck scrolls past instead of sticking, walk up the
> tree — that is nearly always the cause.

### 6.4 Scroll effects

**Entrance** at `top 85%`: card `y: 60`, `opacity: 0 → 1`, `.6s`, then inner
elements (`.stack-cat, .stack-title, .stack-desc, .stack-tags, .stack-link`)
stagger `0.07s` from `0.15s`.

**Image parallax** — scrubbed `top bottom` → `bottom top`,
`yPercent: -8 → 8`, `invalidateOnRefresh: true`.

**Shrink and dim as the next card covers it** — scrubbed:

```
--stack-s: 1 → .94   (.97 on mobile)
--stack-b: 1 → .55
```

The trigger is the **next** item, `top bottom` → `top top`. This is the
important detail: a sticky element reports its *stuck* position, so
`start: "top top"` on the card itself never fires. Deriving the range from the
following item, which is not stuck yet at that moment, is what makes it correct.

**Counter** updates via a `ScrollTrigger` per item (`top 40%` → `bottom 40%`,
`onToggle`) writing the padded index into `#stack-cur`.

---

## 7. Shared section chrome

```tsx
<section className="section services" id="services">
  <div className="wrap">
    <SectionHead
      eyebrow="What I do"
      title={<>Services built around <span className="accent">shipping</span></>}
      lead="One line under the headline."
    />
    …
  </div>
</section>
```

- `.section` — `padding: var(--sp-7) 0`.
- `.wrap` — `max-width: 1280px`, side padding `--sp-2`, `--sp-5` from 640px.
- `.sec-head` — centred, `max-width: 720px`, `margin-bottom: var(--sp-6)`.
- `.eyebrow` — mono, 11px, `letter-spacing: .16em`, uppercase, violet pill.
- `.sec-head h2` — `clamp(28px, 5vw, 46px)`, `text-wrap: balance`.
- `.sec-head .accent` — the highlighted word, `--violet`.
- `.reveal` — headline elements animate `y: 24, opacity: 0 → 1` at `top 95%`,
  `once: true`.

Because the navbar is fixed, anchor targets carry `scroll-margin-top: 96px`.

---

## 8. Wiring the motion layer

```tsx
export default function Page() {
  return (
    <>
      {/* sections */}
      <Motion />   {/* last element */}
    </>
  );
}
```

Rules:

1. **Render `<Motion />` once per page, last.** Its cleanup must run before React
   removes the DOM it animates.
2. **It finds work by selector**, not props — `.svc-grid`, `#spine`, `#stack`.
   Rename a class or id in the markup and it must be renamed in `Motion.tsx`.
3. Sections themselves stay plain markup (server-renderable), carrying only
   class names, ids and inline custom properties.
4. Breakpoints go through **`gsap.matchMedia()`**, never the deprecated
   `ScrollTrigger.matchMedia()`. Each `mm.add()` returns its own cleanup, and
   the whole context is reverted on unmount.

```ts
const mm = gsap.matchMedia();
mm.add("(min-width: 621px)", () => { /* parallax on */ });
mm.add("(max-width: 620px)", () => { /* parallax off */ });
mm.add("(hover: hover) and (pointer: fine)", () => setupServiceHover(grid));
mm.add("(min-width: 768px)", () => setupSpine(spine, false));
mm.add("(max-width: 767px)", () => setupSpine(spine, true));   // stacked layout
mm.add("(min-width: 768px)", () => setupStack(stack, 0.94));
mm.add("(max-width: 767px)", () => setupStack(stack, 0.97));
return () => mm.revert();
```

5. **One global listener drives every cursor spotlight.** Any element with a
   `data-spot` attribute gets `--mx` / `--my` (pointer position in px, relative
   to the element) from a single passive `pointermove` listener on `document`.
   The CSS `::after` glow on `.svc` and `.step-card` reads them. It lives in its
   own `useEffect` so it also runs under reduced motion. Do not add per-card
   pointer handlers for the glow.

### 8.1 Two safety patterns worth keeping

**Per-section `try/catch`.** One failing section must not take the others down.
Without it, a throw anywhere in the effect leaves every `.reveal` stuck at the
inline `opacity: 0` its own tween had just set — the headlines vanish and the
cause is invisible.

```ts
const guard = (label: string, fn: () => void) => {
  try { fn(); } catch (err) { console.error(`[Motion] ${label} failed:`, err); }
};
```

**`immediateRender: false` on reveal tweens.** The element is hidden only at the
moment its trigger fires, so a trigger that never fires leaves content
*visible* instead of invisible. Never hide `.reveal` from CSS — one such rule is
a single point of failure for every headline on the page.

### 8.2 Content that arrives later

If a section fetches its content, the motion layer will have bound its triggers
to the loading skeleton and the real nodes get nothing. The fix is a refresh
signal:

```ts
// Motion.tsx
export const MOTION_REFRESH = "motion:refresh";
const [tick, setTick] = useState(0);
useEffect(() => {
  const onRefresh = () => setTick((t) => t + 1);
  window.addEventListener(MOTION_REFRESH, onRefresh);
  return () => window.removeEventListener(MOTION_REFRESH, onRefresh);
}, []);
useEffect(() => { /* full setup */ }, [tick]);   // rebuilt on signal
```

```ts
// the fetching section
useEffect(() => {
  if (isLoading || !items.length) return;
  const id = requestAnimationFrame(() => window.dispatchEvent(new Event(MOTION_REFRESH)));
  return () => cancelAnimationFrame(id);
}, [isLoading, items.length]);
```

Also keep the skeleton's markup shape identical to the real card, or the layout
jumps when data lands.

---

## 9. Accessibility — already handled, do not regress

- `prefers-reduced-motion: reduce` short-circuits `Motion.tsx` **before any
  animation is created**. The CSS block drops sticky positioning, clears
  `translate` / `scale` / `filter`, hides the deck counter and kills transitions.
  Everything renders in its final state.
- Content is visible with JavaScript disabled: elements animate *from* a visible
  state, and no CSS rule hides them.
- Real semantics: `<article>` cards inside `<ol>`, step numbers and percentages
  as real text, `aria-label` on the progress bars, `aria-labelledby` linking each
  card to its heading.
- Decorative layers carry `aria-hidden="true"` (spine, stub, node, image panel,
  counter).
- `:focus-visible` rings on `.svc` and `.stack-link`; the service glow also
  triggers on focus, not only hover.

---

## 10. Gotchas, in the order they will bite

1. **`overflow: hidden` on any ancestor kills the sticky deck.** Use
   `overflow-x: clip` if horizontal clipping is needed, and keep the deck out of
   clipped wrappers.
2. **Do not hide animated content from CSS.** See §8.1.
3. **Token names collide with Tailwind's** `--border`, `--radius`, `--accent`,
   `--background`. See §2.
4. **Never mix CSS `transform` with GSAP `transform`** on the same element —
   `.step-node` positions with `left`/`right`, not `translateX(-50%)`.
5. **Sticky elements need derived trigger points.** See §6.4.
6. **The spine's grid rows are hard-coded for 10 steps.** See §5.2.
7. **`--i` must be a unitless number** in the inline style — React writes custom
   properties raw, so `calc(var(--i) * 18px)` works.
8. **Icons must be stroked, inline SVG** or nothing draws. See §5.5.
9. **Cursor parallax is disabled below 621px** and hover effects only exist for
   `(hover: hover) and (pointer: fine)`.
10. **Rich text from a CMS or editor** shows up raw in these cards if not
    flattened — the deck description runs through `htmlToText()` in the adapter.

---

## 11. Post-copy checklist

1. `npm install gsap`.
2. Paste the tokens (§2) at the top of the global stylesheet; rename any that
   collide with the framework in use.
3. Copy `sections.css` (shared + the blocks needed + reduced motion) and import
   it in the layout.
4. Copy the component files plus `Motion.tsx`, `Icon.tsx`, `cn()` and the types.
5. Fix the `@/` import alias, or rewrite the imports.
6. Render `<Motion />` once, last on the page.
7. Verify:
   - cards visible with JavaScript disabled;
   - OS "reduce motion" on → nothing animates, deck is a plain list;
   - no horizontal scrollbar at 320px;
   - the deck actually sticks (if not, hunt the `overflow` ancestor);
   - resize across 620px, 768px and 940px — ScrollTrigger recalculates on
     refresh;
   - console has no `[Motion] … failed:` line.
