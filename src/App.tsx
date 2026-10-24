import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerSmoothScroll } from './utils/smoothScroll';

import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FilmmakingSection } from './components/FilmmakingSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Setup Lenis Smooth Scroll integrated cleanly with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      // One interpolation loop; Lenis also honors live reduced-motion changes.
      lerp: 0.12,
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Preserve native touch scrolling and momentum.
    });

    const unregisterSmoothScroll = registerSmoothScroll(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      unregisterSmoothScroll();
      lenis.destroy();
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

      {/* Top Fixed Navigation & Timecode Tracker */}
      <Navigation />

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
