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
