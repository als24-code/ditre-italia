# Ditre Italia — Next.js site

Interior-design / furniture landing page built with **Next.js (App Router)**, **GSAP + ScrollTrigger**, **Lenis** smooth scrolling and a single **BEM** stylesheet (`src/app/globals.css`).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Requires Node 18.18+.

## Structure

```
src/
  app/                 layout.tsx · page.tsx · globals.css (all BEM styles)
  data/content.ts      every string, nav item and team member
  lib/                 gsap.ts (plugin registration) · cx.ts (class joiner)
  hooks/
    useGsapContext     gsap.context wrapper with automatic cleanup
    useHoverTimeline   paused timeline that plays/reverses on hover
    useScrollAnimations  one data-attribute driven scroll engine
  components/
    ui/                MediaFrame · Marquee · Magnetic · CircleButton · Cursor
                       RollLink · NavList · ContactInfo · Logo · IconButton
                       Rosette · Text (SplitText, Statement, …) · SmoothScroll
    sections/          Header · Hero · Mission · Innovation · Values
                       Language · Banner · Team · Contact · Footer
public/images/         photographs cropped from the supplied design
```

## Reusable animation hooks

Add data attributes to any element inside a section that calls `useScrollAnimations(ref)`:

| attribute | effect |
| --- | --- |
| `data-reveal="words"` | words slide up from a mask |
| `data-reveal="scrub"` | words light up while scrolling |
| `data-reveal="fade"` | fade + rise (`data-delay` in seconds) |
| `data-reveal="image"` | clip-path wipe + inner zoom |
| `data-reveal="line"` | rule draws in from the left |
| `data-stagger` / `data-stagger-item` | staggered children |
| `data-parallax="7"` | scrubbed vertical drift |
| `data-spin="180"` | scrubbed rotation |
| `data-cursor="View"` | label shown in the custom cursor |

## Interactions

- **Scroll:** hero intro timeline, word reveals, scrubbed paragraph highlighting, image wipes and parallax, velocity-reactive INNOVATION marquee (speeds up, reverses and skews with scroll), rosette figure fanning out, banner zoom + rising glass card, staggered team cards.
- **Hover:** rolling nav links, magnetic circle buttons with arrow swap, value rows with sweeping fill, image zoom, banner card 3D tilt with counter-moving photo, spinning italic “O” in the contact headline, custom cursor bubble.
- All motion is disabled when the visitor prefers reduced motion.

## Images

Photographs were cropped from the supplied design. The banner photo had its overlaid copy and frosted card removed (the card and copy are rebuilt live in HTML/CSS). Because the source is a screenshot, replace the files in `public/images/` with full-resolution originals for production.
