import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filmmakerContent } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slide0Ref = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  // Split bio text into individual word spans for scroll scrub brightening
  const bioWords: string[] = filmmakerContent.bio.paragraphs.join(' ').split(' ');

  // Update dynamic container height when activeSlide changes or on resize
  useEffect(() => {
    const updateHeight = () => {
      if (activeSlide === 0 && slide0Ref.current) {
        setContainerHeight(slide0Ref.current.offsetHeight);
      } else if (activeSlide === 1 && slide1Ref.current) {
        setContainerHeight(slide1Ref.current.offsetHeight);
      }
    };

    updateHeight();
    const timer = setTimeout(updateHeight, 50);
    window.addEventListener('resize', updateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeight);
    };
  }, [activeSlide]);

  // Refresh ScrollTrigger after slide transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 750);
    return () => clearTimeout(timer);
  }, [activeSlide]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Portrait Clip-Path wipe & slight parallax on scroll
      if (!prefersReducedMotion && imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            y: 20,
          },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Word-by-word scrub brightening from Wainscot Green to Solo
      if (!prefersReducedMotion && wordsContainerRef.current) {
        const words = wordsContainerRef.current.querySelectorAll('.bio-scrub-word');
        gsap.fromTo(
          words,
          {
            color: '#767863', // Darker Wainscot Green
            opacity: 0.35,
          },
          {
            color: '#CCD4D0', // Brilliant Solo text
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: wordsContainerRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Stats animated count-up numbers in Hive Delight
      if (statsContainerRef.current) {
        const statItems = statsContainerRef.current.querySelectorAll('.stat-item');
        statItems.forEach((item) => {
          const numEl = item.querySelector('.stat-number');
          const targetValue = parseInt(numEl?.getAttribute('data-value') || '0', 10);

          if (numEl && !isNaN(targetValue)) {
            const countObj = { val: 0 };
            gsap.to(countObj, {
              val: targetValue,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              onUpdate: () => {
                numEl.textContent = Math.floor(countObj.val).toString();
              },
            });
          }
        });
      }

      // 4. Skills & tools pills staggered fade-in
      if (skillsContainerRef.current) {
        const pills = skillsContainerRef.current.querySelectorAll('.skill-pill');
        gsap.fromTo(
          pills,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 bg-noble-black overflow-hidden border-t border-deep-bronze/30"
      aria-label="About the Filmmaker"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Act Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-montserrat text-xs tracking-cinema uppercase text-wainscot-green font-semibold">
            {filmmakerContent.bio.actLabel}
          </span>
          <div className="w-12 h-[1px] bg-olivia/50" />
        </div>

        {/* Two-Column Layout: Portrait Left, Text & Dossier Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Clean Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div ref={imageFrameRef} className="relative w-full max-w-sm sm:max-w-md">
              {/* Portrait Image Container - Natural sharpness, proper framing, avoid excessive zoom */}
              <div className="relative aspect-[4/5] max-h-[480px] overflow-hidden rounded-sm bg-noble-black border border-deep-bronze/80 shadow-2xl">
                <img
                  ref={imageRef}
                  src={filmmakerContent.profile.portraitImage}
                  alt={`${filmmakerContent.profile.fullName} Portrait`}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_15%] grayscale contrast-105 hover:grayscale-0 transition-all duration-700 ease-out will-change-transform"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Slide Switcher Controls, and Sliding Track */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Header: Title + Subtitle and Sleek Arrow Navigation */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-deep-bronze/50">
              <div className="shrink-0 min-w-0">
                <h2 className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-solo leading-none tracking-tight uppercase whitespace-nowrap">
                  ABOUT <span className="text-hive-delight">ME</span>
                </h2>
                <p className="mt-2 font-montserrat text-xs tracking-widest uppercase text-wainscot-green whitespace-nowrap">
                  {filmmakerContent.profile.location} · {filmmakerContent.profile.role}
                </p>
              </div>

              {/* Minimal Sleek Arrows & Slide Counter (No bulky tabs) */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-montserrat text-xs tracking-widest text-wainscot-green font-mono">
                  0{activeSlide + 1} / 02
                </span>
                <div className="flex items-center gap-1 p-0.5 rounded border border-deep-bronze/80 bg-noble-black/80">
                  <button
                    type="button"
                    onClick={() => setActiveSlide(0)}
                    disabled={activeSlide === 0}
                    aria-label="Slide trước (Statement)"
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-sm text-xs sm:text-sm text-solo hover:text-hive-delight hover:bg-deep-bronze/40 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlide(1)}
                    disabled={activeSlide === 1}
                    aria-label="Slide tiếp theo (Dossier & Stats)"
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-sm text-xs sm:text-sm text-solo hover:text-hive-delight hover:bg-deep-bronze/40 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Sliding Content Container with Side Arrows */}
            <div
              className="relative w-full overflow-hidden mt-6 transition-[min-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ minHeight: containerHeight ? `${containerHeight}px` : undefined }}
            >
              {/* Side Navigation Arrow: Left (visible when on Slide 1) */}
              <button
                type="button"
                onClick={() => setActiveSlide(0)}
                aria-label="Quay lại Statement"
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-noble-black/95 border border-deep-bronze hover:border-hive-delight text-solo hover:text-hive-delight flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
                  activeSlide === 0 ? 'opacity-0 pointer-events-none -translate-x-2' : 'opacity-90 hover:opacity-100 translate-x-0'
                }`}
              >
                ←
              </button>

              {/* Side Navigation Arrow: Right (visible when on Slide 0) */}
              <button
                type="button"
                onClick={() => setActiveSlide(1)}
                aria-label="Xem Hồ sơ & Thống kê"
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-noble-black/95 border border-deep-bronze hover:border-hive-delight text-solo hover:text-hive-delight flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
                  activeSlide === 1 ? 'opacity-0 pointer-events-none translate-x-2' : 'opacity-90 hover:opacity-100 translate-x-0'
                }`}
              >
                →
              </button>

              <div
                className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] items-start"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {/* SLIDE 0: Bio Statement ("since I was young...possible") */}
                <div
                  ref={slide0Ref}
                  className={`w-full shrink-0 transition-opacity duration-500 pr-10 pl-2 ${
                    activeSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Bio Paragraphs with scrub effect - Pure content */}
                  <div
                    ref={wordsContainerRef}
                    className="font-montserrat text-base sm:text-lg md:text-xl font-light leading-relaxed select-none"
                  >
                    {bioWords.map((word: string, index: number) => {
                      const isHighlight = filmmakerContent.bio.highlightWords.some((hw: string) =>
                        word.toLowerCase().includes(hw.toLowerCase())
                      );
                      return (
                        <span
                          key={index}
                          className={`bio-scrub-word inline-block mr-1.5 transition-colors duration-150 ${
                            isHighlight ? 'font-normal underline decoration-stone-ground/50 text-hive-delight/90' : ''
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* SLIDE 1: Producer Dossier & Stats */}
                <div
                  ref={slide1Ref}
                  className={`w-full shrink-0 transition-opacity duration-500 pl-10 pr-2 ${
                    activeSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >

                  {/* 4 Stats Cards */}
                  <div
                    ref={statsContainerRef}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-5"
                  >
                    {filmmakerContent.stats.map((stat, i: number) => (
                      <div key={i} className="stat-item flex flex-col">
                        <div className="flex items-baseline font-playfair font-black text-3xl sm:text-4xl text-hive-delight">
                          <span className="stat-number" data-value={stat.value}>
                            {stat.value}
                          </span>
                          <span className="text-stone-ground ml-0.5">{stat.suffix}</span>
                        </div>
                        <span className="mt-1 font-montserrat text-xs font-semibold text-solo uppercase tracking-wider">
                          {stat.label}
                        </span>
                        <span className="text-[10px] text-wainscot-green">
                          {stat.description}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Green Dot separator (as in design) */}
                  <div className="w-2.5 h-2.5 rounded-full bg-wainscot-green/80 mb-5" />

                  {/* 5 Key Profiles from Producer Dossier: Education, Language, Skills, Passport, Hobbies */}
                  <div ref={skillsContainerRef} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 1. EDUCATION */}
                      <div className="p-4 rounded-sm bg-deep-bronze/50 border border-deep-bronze/90 hover:border-hive-delight/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-hive-delight" />
                          <span className="text-[11px] font-montserrat uppercase tracking-wider text-hive-delight font-bold">
                            1. EDUCATION
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-solo/90 font-montserrat">
                          {filmmakerContent.aboutMeDetails.education.map((edu, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-stone-ground">•</span>
                              <span>{edu.institution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 2. LANGUAGE */}
                      <div className="p-4 rounded-sm bg-deep-bronze/50 border border-deep-bronze/90 hover:border-hive-delight/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-hive-delight" />
                          <span className="text-[11px] font-montserrat uppercase tracking-wider text-hive-delight font-bold">
                            2. LANGUAGE
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {filmmakerContent.aboutMeDetails.languages.map((lang, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-sm bg-noble-black/60 border border-deep-bronze text-solo text-xs font-montserrat"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. SKILLS */}
                    <div className="p-4 rounded-sm bg-deep-bronze/50 border border-deep-bronze/90 hover:border-hive-delight/40 transition-colors">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-hive-delight" />
                        <span className="text-[11px] font-montserrat uppercase tracking-wider text-hive-delight font-bold">
                          3. SKILLS
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {filmmakerContent.aboutMeDetails.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="skill-pill px-3 py-1 rounded-sm bg-deep-bronze border border-olivia/40 text-solo text-xs font-montserrat hover:border-hive-delight hover:text-hive-delight transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 4. PASSPORT */}
                      <div className="p-4 rounded-sm bg-deep-bronze/50 border border-deep-bronze/90 hover:border-hive-delight/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-hive-delight" />
                          <span className="text-[11px] font-montserrat uppercase tracking-wider text-hive-delight font-bold">
                            4. PASSPORT (COUNTRIES)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {filmmakerContent.aboutMeDetails.passport.map((country, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-noble-black/70 border border-deep-bronze/80 text-[11px] font-montserrat text-solo/90"
                            >
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 5. HOBBY */}
                      <div className="p-4 rounded-sm bg-deep-bronze/50 border border-deep-bronze/90 hover:border-hive-delight/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-hive-delight" />
                          <span className="text-[11px] font-montserrat uppercase tracking-wider text-hive-delight font-bold">
                            5. HOBBY
                          </span>
                        </div>
                        <ul className="space-y-1 text-xs text-solo/90 font-montserrat">
                          {filmmakerContent.aboutMeDetails.hobbies.map((hobby, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-hive-delight font-medium">•</span>
                              <span>
                                <strong className="text-solo font-semibold">{hobby.category}:</strong> {hobby.items}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
