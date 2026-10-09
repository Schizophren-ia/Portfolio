import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import { filmmakerContent } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const viewfinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline on page load (SplitText-style masked reveal)
      const entranceTl = gsap.timeline({ delay: 0.2 });

      entranceTl
        .fromTo(
          viewfinderRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }
        )
        .fromTo(
          '.hero-reveal-line',
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          locationRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.3'
        );

      // 2. Smooth parallax camera zoom as user scrolls into the next section (no pinning, no empty gap)
      gsap.to(videoBgRef.current, {
        yPercent: 15,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroWrapperRef}
      className="relative w-full min-h-screen bg-noble-black overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-8"
      aria-label="Cinematic Hero Presentation"
    >
      {/* Full-Bleed Looping Muted Video Background with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-noble-black pointer-events-none">
        <video
          ref={videoBgRef}
          autoPlay
          loop
          muted
          playsInline
          poster={filmmakerContent.profile.heroPoster}
          className="w-full h-full object-cover origin-center opacity-40 will-change-transform"
        >
          <source src={filmmakerContent.profile.heroVideo} type="video/mp4" />
        </video>

        {/* Master Noble Black Gradient Overlay for High Contrast Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-noble-black via-noble-black/60 to-noble-black/75" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-noble-black/40 to-noble-black" />
      </div>

      {/* Cinematic Viewfinder Viewport: Sits cleanly below navigation bar and centers all hero content at dead center */}
      <div
        ref={viewfinderRef}
        className="relative z-20 w-full max-w-[94vw] 2xl:max-w-7xl mx-auto my-auto mt-24 sm:mt-28 md:mt-30 mb-8 sm:mb-10 px-4 sm:px-10 md:px-14 py-8 sm:py-12 md:py-14 flex flex-col items-center justify-center text-center select-none"
      >
        {/* 4 Extended Camera Frame Corners (Anchored cleanly within viewport bounds, safely below navbar) */}
        {/* Top-Left Corner */}
        <div className="absolute top-0 left-0 w-10 sm:w-16 md:w-24 h-10 sm:h-16 md:h-24 border-t-2 border-l-2 border-stone-ground/75 pointer-events-none" />
        {/* Top-Right Corner */}
        <div className="absolute top-0 right-0 w-10 sm:w-16 md:w-24 h-10 sm:h-16 md:h-24 border-t-2 border-r-2 border-stone-ground/75 pointer-events-none" />
        {/* Bottom-Left Corner */}
        <div className="absolute bottom-0 left-0 w-10 sm:w-16 md:w-24 h-10 sm:h-16 md:h-24 border-b-2 border-l-2 border-stone-ground/75 pointer-events-none" />
        {/* Bottom-Right Corner */}
        <div className="absolute bottom-0 right-0 w-10 sm:w-16 md:w-24 h-10 sm:h-16 md:h-24 border-b-2 border-r-2 border-stone-ground/75 pointer-events-none" />

        {/* Center Crosshair Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="w-6 h-[1px] bg-hive-delight" />
          <div className="w-[1px] h-6 bg-hive-delight -mt-3 ml-3" />
        </div>

        {/* 1. Typography: LÊ ĐẶNG ĐÀI TRANG on 1 single line, unified golden Hive Delight */}
        <h1
          ref={headlineRef}
          className="font-playfair font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase tracking-tight text-hive-delight text-glow leading-none select-none whitespace-nowrap"
        >
          <div className="overflow-hidden py-1">
            <span className="hero-reveal-line inline-block">
              {filmmakerContent.profile.fullName}
            </span>
          </div>
        </h1>

        {/* 2. PRODUCER */}
        <p
          ref={subtitleRef}
          className="mt-4 sm:mt-5 font-montserrat font-bold text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-hive-delight"
        >
          {filmmakerContent.profile.role}
        </p>

        {/* 3. HO CHI MINH CITY, VIETNAM */}
        <p
          ref={locationRef}
          className="mt-2 font-montserrat font-medium text-xs sm:text-sm tracking-[0.22em] uppercase text-wainscot-green"
        >
          {filmmakerContent.profile.location}
        </p>

        {/* 4. Story Pillars: Story about me · Story about film · Story about dream */}
        <div
          ref={taglineRef}
          className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 font-montserrat text-xs sm:text-sm text-solo/90 tracking-widest uppercase"
        >
          {filmmakerContent.profile.storyPillars.map((story, idx) => (
            <React.Fragment key={story}>
              <span className="px-3.5 py-1 rounded bg-deep-bronze/50 border border-deep-bronze text-solo hover:text-hive-delight transition-colors">
                {story}
              </span>
              {idx < filmmakerContent.profile.storyPillars.length - 1 && (
                <span className="text-hive-delight font-bold">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 5. Two CTAs: View my work & Get in touch */}
        <div
          ref={ctaGroupRef}
          className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#filmmaking"
            className="px-8 py-3.5 bg-hive-delight text-noble-black font-montserrat font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-stone-ground transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-lg flex items-center gap-2"
            data-cursor="PLAY"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            VIEW MY WORK
          </a>

          <a
            href="#contact"
            className="px-8 py-3.5 border border-solo text-solo font-montserrat font-medium text-xs tracking-widest uppercase rounded-sm hover:border-stone-ground hover:bg-stone-ground hover:text-noble-black transition-all duration-300 backdrop-blur-sm"
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Scroll To Begin Indicator - In-flow below buttons */}
        <div
          ref={scrollIndicatorRef}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-2 pointer-events-none select-none text-wainscot-green"
        >
          <span className="font-montserrat text-[10px] tracking-cinema uppercase text-wainscot-green/80">
            SCROLL TO BEGIN
          </span>
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-hive-delight via-stone-ground to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};
