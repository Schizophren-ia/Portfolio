import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FilmmakingSection } from './components/FilmmakingSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Setup Lenis Smooth Scroll integrated cleanly with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Track active section for top navigation
  useEffect(() => {
    const sections = ['hero', 'about', 'filmmaking', 'experiences', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-noble-black text-solo overflow-x-hidden selection:bg-stone-ground/30 selection:text-hive-delight">
      {/* 0. Cinematic Preloader with letterbox bars and 0->100 count */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* 35mm Analog Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Custom Trailing Cinematic Cursor */}
      <CustomCursor />

      {/* Top Fixed Navigation & Timecode Tracker */}
      <Navigation activeSection={activeSection} />

      {/* Main Single Page Narrative Stream */}
      <main>
        {/* Act 0 / Prologue: Hero Scene */}
        <HeroSection />

        {/* Act I: About Me */}
        <AboutSection />

        {/* Act II: Filmmaking Horizontal Archive */}
        <FilmmakingSection />

        {/* Act III: Experiences & Timeline */}
        <ExperienceSection />

        {/* Act IV: Ending Credits & Contact */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
