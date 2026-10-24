import type Lenis from 'lenis';

let controller: Lenis | null = null;

export function registerSmoothScroll(instance: Lenis) {
  controller = instance;
  return () => {
    if (controller === instance) controller = null;
  };
}

export function getSmoothScroll() {
  return controller;
}

/** All in-page navigation uses the same controller as wheel scrolling. */
export function scrollToSection(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (controller) {
    // Lenis reads scroll-padding-top, kept in sync with the real header height.
    controller.scrollTo(target, { immediate: reducedMotion });
  } else {
    target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }
}
