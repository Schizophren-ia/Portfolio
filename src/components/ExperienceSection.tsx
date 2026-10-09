import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, MapPin } from 'lucide-react';
import { filmmakerContent } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelinePathRef = useRef<HTMLDivElement>(null);

  const experiences = filmmakerContent.experiences;
  const awards = filmmakerContent.awards;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Scrubbed vertical drawing timeline line
      if (timelinePathRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          timelinePathRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Timeline cards and node dots entrance
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
      const cards = gsap.utils.toArray<HTMLElement>('.timeline-card');

      cards.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        const node = nodes[index];

        if (!prefersReducedMotion) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isLeft ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
                onEnter: () => {
                  if (node) {
                    node.classList.add('node-active');
                  }
                },
              },
            }
          );
        } else {
          gsap.set(card, { opacity: 1, x: 0 });
          if (node) node.classList.add('node-active');
        }
      });

      // 3. Awards laurels stagger reveal
      if (!prefersReducedMotion) {
        gsap.fromTo(
          '.award-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#awards-subrow',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-noble-black overflow-hidden border-t border-deep-bronze/30"
      aria-label="Directorial Experiences and Milestones"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Act Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-montserrat text-xs tracking-cinema uppercase text-wainscot-green font-semibold">
            ACT III — EXPERIENCES
          </span>
          <div className="w-12 h-[1px] bg-olivia/50" />
        </div>

        <h2 className="font-playfair font-black text-4xl sm:text-5xl md:text-6xl text-solo uppercase tracking-tight mb-4">
          PRODUCER <span className="text-hive-delight">JOURNEY</span>
        </h2>
        <p className="font-montserrat text-xs sm:text-sm text-wainscot-green max-w-xl mb-20 tracking-wide">
          Production coordination, formal film university training, and international cinema expeditions across Asia and the world.
        </p>

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Base Background Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-deep-bronze/40" />

          {/* Self-Drawing Animated Line with Gradient Hive Delight -> Stone Ground -> Olivia */}
          <div
            ref={timelinePathRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-hive-delight via-stone-ground to-olivia shadow-[0_0_8px_rgba(241,195,76,0.6)]"
            style={{ willChange: 'transform' }}
          />

          {/* Entries */}
          <div className="space-y-16 sm:space-y-24">
            {experiences.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot in Hive Delight */}
                  <div
                    className="timeline-node absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-noble-black border-2 border-deep-bronze transition-all duration-500 flex items-center justify-center [&.node-active]:border-hive-delight [&.node-active]:bg-hive-delight [&.node-active]:shadow-gold-glow"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-noble-black opacity-0 transition-opacity duration-300 [.node-active_&]:opacity-100" />
                  </div>

                  {/* Spacer for other side on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Container with Deep Bronze elevated surface */}
                  <div
                    className={`timeline-card ml-10 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pr-14' : 'md:pl-14'
                    }`}
                  >
                    <div className="bg-deep-bronze/30 border border-deep-bronze/80 p-6 sm:p-7 rounded-sm shadow-bronze-surface hover:border-olivia/80 transition-colors">
                      {/* Year Range & Location */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-deep-bronze/60 border border-deep-bronze text-hive-delight font-montserrat font-bold text-xs tracking-wider uppercase rounded">
                          {item.period}
                        </span>
                        <span className="text-[11px] font-montserrat text-wainscot-green flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-ground" />
                          {item.location}
                        </span>
                      </div>

                      {/* Role & Studio */}
                      <h3 className="font-playfair font-black text-xl sm:text-2xl text-solo uppercase tracking-tight">
                        {item.role}
                      </h3>
                      <p className="font-montserrat font-semibold text-xs tracking-wider uppercase text-wainscot-green mt-1">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="font-montserrat text-xs sm:text-sm text-solo/80 mt-3 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Bullet Achievements */}
                      <ul className="mt-4 pt-4 border-t border-deep-bronze/40 space-y-2">
                        {item.achievements.map((ach: string, achIdx: number) => (
                          <li
                            key={achIdx}
                            className="flex items-start gap-2.5 text-xs font-montserrat text-wainscot-green"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-hive-delight mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Festivals & Awards Laurel Sub-Row */}
        <div id="awards-subrow" className="mt-28 pt-16 border-t border-deep-bronze/40">
          <div className="text-center mb-10">
            <span className="font-montserrat text-xs tracking-cinema uppercase text-wainscot-green">
              ACCOLADES & FESTIVAL LAURELS
            </span>
            <h3 className="font-playfair font-black text-2xl sm:text-3xl text-solo uppercase tracking-tight mt-1">
              RECOGNITION IN <span className="text-hive-delight">EXCELLENCE</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {awards.map((award, i) => (
              <div
                key={i}
                className="award-card bg-deep-bronze/20 border border-deep-bronze/60 p-5 rounded-sm hover:border-hive-delight/60 transition-colors flex items-start gap-4 shadow-bronze-surface"
              >
                {/* Laurel Emblem Icon */}
                <div className="w-10 h-10 rounded-full bg-deep-bronze/50 border border-olivia/50 flex items-center justify-center shrink-0 text-hive-delight">
                  <Award className="w-5 h-5 fill-hive-delight/15" />
                </div>

                <div>
                  <div className="text-[11px] font-montserrat font-bold text-hive-delight uppercase tracking-wider">
                    {award.name} · {award.year}
                  </div>
                  <div className="font-playfair font-bold text-base text-solo mt-0.5">
                    {award.category}
                  </div>
                  <div className="text-[11px] font-montserrat text-wainscot-green italic mt-0.5">
                    Film: "{award.project}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
