# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Filmmaker Portfolio
**Generated:** 2026-10-14 17:31:25
**Category:** General
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 5/10 (Standard) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0A1B2E` | `--color-primary` |
| On Primary | `#F2F6FB` | `--color-on-primary` |
| Secondary | `#112A46` | `--color-secondary` |
| On Secondary | `#F2F6FB` | `--color-on-secondary` |
| Accent/CTA | `#C4D2E1` | `--color-accent` |
| On Accent/CTA | `#0A1B2E` | `--color-on-accent` |
| Background | `#0A1B2E` | `--color-background` |
| Foreground | `#F2F6FB` | `--color-foreground` |
| Card | `#112A46` | `--color-card` |
| Card Foreground | `#F2F6FB` | `--color-card-foreground` |
| Muted | `#1B3B5A` | `--color-muted` |
| Muted Foreground | `#A1B2C4` | `--color-muted-foreground` |
| Border | `#34506D` | `--color-border` |
| Destructive | `#B85C6F` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#C4D2E1` | `--color-ring` |

**Color Notes (approved 2026-10-24):** Use a light Mist Blue navigation bar above a uniformly navy portfolio. This replaces the alternating light/dark section scheme at the user's request. Preserve typography, layout and interactions.

| Section | Background | Text / surfaces |
|---------|------------|-----------------|
| Navigation and mobile menu | `#E1E8F0` | Deep Navy `#0A1B2E` text/icons, Blue Slate control borders |
| Hero, About Me, Filmmaking, Journey, Contact, footer | `#0A1B2E` | Pale text `#F2F6FB`, supporting text `#A1B2C4` |
| Profile, Philosophy, Mission, production dossier, contact form | `#112A46` | Pale text, Storm Blue `#34506D` borders |
| Contact inputs | `#0A1B2E` | Pale text, Foggy Blue placeholder, Dusk Blue border, Cloud Blue focus |

Implementation: `.navigation-light` alone scopes legacy utility tokens to the light header and drawer; remove the former `.section-light` and white-card styles. `.navy-card` supplies Midnight Blue card surfaces; all main sections inherit the global dark palette. The navigation stays solid Mist Blue at the top and after scrolling. Active navigation uses an underline; the current EN/VI language is underlined so its state does not rely on a different text color. Keyboard focus is navy on the light header and Cloud Blue on dark inputs.

**Navigation refinement (approved 2026-10-24):** Keep Mist Blue `#E1E8F0`, not Cloud Blue. Increase existing header UI text by 2px (desktop links 14px, drawer links 16px). Active links are semibold with a 2px navy underline and `aria-current="location"`; reserve the bold label width to avoid layout movement. EN/VI is text-only with no persistent border/background, retaining the active-language underline, a 44px-high hit area and keyboard-only focus indicator. Remove archive/category aggregate `Selected Works`/`Works` count labels in both languages; keep individual film indices and carousel accessibility labels.

**Emphasis:** Preserve existing underlines and font weights. Biography words use a uniform pale color on navy and do not change color on scroll. Do not introduce isolated light content sections; light UI controls and original photographic artwork are not section backgrounds.

### Typography

- **User approval (2026-10-24):** After comparing three actual-font previews, the user chose Lora. Continue using exactly two font families for both English and Vietnamese.
- **Heading Font:** Lora (variable weights 400–700), including italic for existing editorial quotes. Replaces Cormorant Garamond; no color, content or layout redesign.
- **Body and UI Font:** Be Vietnam Pro for paragraphs, navigation, labels, forms, email and timecodes.
- **Mood:** cinematic, editorial headings with clear, readable supporting text.
- **Loading:** Self-hosted WOFF2 subsets (Latin, Latin Extended, Vietnamese), `font-display: swap`; OFL licenses included. No third-party font requests at runtime.
- **Hero glyph safety (approved 2026-10-24):** Retain Lora, the responsive font size and masked entrance animation. Use a 1.2 line-height with a font-relative reveal-mask padding of `0.16em` vertically and `0.08em` horizontally; avoid `leading-none` plus fixed `4px` padding, which clipped Vietnamese accents at desktop sizes. Verify actual glyph-ink bounds inside the mask after animation, not just horizontal overflow.

**Shared CSS token:**
```css
--font-heading: 'Lora', Georgia, 'Times New Roman', serif;
--font-body: 'Be Vietnam Pro', Arial, sans-serif;
--font-portfolio: var(--font-body);
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #C4D2E1;
  color: #0A1B2E;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #F2F6FB;
  border: 1px solid #557392;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #112A46;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #34506D;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #C4D2E1;
  outline: none;
  box-shadow: 0 0 0 3px #C4D2E133;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: #112A46;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** Hero + Features + CTA

- **Conversion Strategy:** Deep CTA placement. For CTA label text, verify at least 4.5:1 against the button fill; use 7:1 only when the product explicitly targets AAA normal-text contrast. Keep focus and component boundaries independently visible. Disable hero parallax under reduced motion and render its static final state.
- **CTA Placement:** Hero (sticky) + Bottom
- **Section Order:** Hero with headline/image > Value prop > Key features (3-5) > CTA section > Footer

---

## Motion

**Scroll/navigation performance (approved 2026-10-24):** Use one Lenis interpolation loop synchronized with GSAP; no competing CSS smooth scrolling. Keep native touch momentum and honor live reduced-motion preferences. Header/hero anchor actions use the shared scroll controller. Determine the current section from cached section starts and a reading line below the actual fixed-header height, independent of section length. Re-measure on section/header resize (including EN/VI reflow); use one scheduled animation frame for scroll updates. Update progress with `scaleX`, timecode directly at no more than 24Hz, and React state only when the selected section/collapsed state changes. Do not rerender the archive on each scroll event.

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)


### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
