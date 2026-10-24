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

**Color Notes (approved 2026-10-23):** Alternate cinematic navy with light editorial sections using the user's blue palette. Keep content, typography and interactions unchanged.

| Section | Background | Text / surfaces |
|---------|------------|-----------------|
| Hero, navigation, Filmmaking, footer | `#0A1B2E` | Existing pale-blue text and dark cards |
| About Me, Journey | `#F2F6FB` | Navy `#0A1B2E` headings, Storm Blue `#34506D` copy |
| Profile, Philosophy, Mission, production dossier | `#FFFFFF` | Cloud Blue `#C4D2E1` borders, subtle navy shadows |
| Contact | `#E1E8F0` | White form, navy CTA, Blue Slate `#557392` input borders/placeholders |

Implementation: `.section-light` scopes the legacy utility color tokens to light surfaces; `.theme-navy` restores dark tokens for the physical clapperboard and portrait overlay. Film dialogs, navigation and archive do not inherit light tokens. Biography uses uniform navy text at opacity 1, without scroll-driven color changes. Keyboard focus uses a visible dark outline on light surfaces.

**Emphasis refinement (approved 2026-10-23):** Names, headings and emphasized text on all light surfaces use the same Deep Navy `#0A1B2E`; do not use a lighter blue highlight. The scoped emphasis token matches the primary text token. Preserve existing underlines and font weights. All biography words stay the same navy during scrolling; emphasis underlines inherit that color. Other body copy, backgrounds and all dark sections remain unchanged.

### Typography

- **User approval (2026-10-24):** After comparing three actual-font previews, the user chose Lora. Continue using exactly two font families for both English and Vietnamese.
- **Heading Font:** Lora (variable weights 400–700), including italic for existing editorial quotes. Replaces Cormorant Garamond; no color, content or layout redesign.
- **Body and UI Font:** Be Vietnam Pro for paragraphs, navigation, labels, forms, email and timecodes.
- **Mood:** cinematic, editorial headings with clear, readable supporting text.
- **Loading:** Self-hosted WOFF2 subsets (Latin, Latin Extended, Vietnamese), `font-display: swap`; OFL licenses included. No third-party font requests at runtime.

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
