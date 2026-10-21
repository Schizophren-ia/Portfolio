import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const { journey: journeyYears, language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.journey-entry').forEach((entry) => {
        gsap.fromTo(entry, { opacity: 0, y: 24 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-deep-bronze/30 bg-noble-black py-20 sm:py-28"
      aria-label={t('Journey through the years')}
    >
      <div className="portfolio-container">
        <header className="mb-14 flex flex-col gap-8 border-b border-deep-bronze/40 pb-8 sm:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-montserrat text-xs font-semibold uppercase tracking-cinema text-wainscot-green">
                {t('ACT III — JOURNEY')}
              </span>
              <span className="h-px w-12 bg-olivia/50" aria-hidden="true" />
            </div>
            <h2 className="font-playfair text-4xl font-black uppercase tracking-tight text-solo sm:text-6xl">
              {language === 'vi' ? 'HÀNH TRÌNH' : 'MY'} <span className="text-hive-delight">{language === 'vi' ? 'CỦA TÔI' : 'JOURNEY'}</span>
            </h2>
            <p className="mt-4 font-montserrat text-sm leading-relaxed text-wainscot-green">
              {t('Places, moments and memories, collected along the way.')}
            </p>
          </div>
        </header>

        <ol className="space-y-14 sm:space-y-20">
          {journeyYears.map((entry) => (
            <li key={entry.year} className="journey-entry" aria-labelledby={'journey-year-' + entry.year}>
              <header className="mb-7 flex items-center justify-center gap-5 sm:mb-9 sm:gap-8">
                <span className="h-px w-12 bg-deep-bronze/70 sm:w-24" aria-hidden="true" />
                <div className="text-center">
                  <h3 id={'journey-year-' + entry.year} className="font-playfair text-4xl font-semibold leading-none text-hive-delight sm:text-5xl">
                    <time dateTime={String(entry.year)}>{entry.year}</time>
                  </h3>
                  <p className="mt-3 flex items-center justify-center gap-1.5 font-montserrat text-xs text-wainscot-green">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {entry.location}
                  </p>
                </div>
                <span className="h-px w-12 bg-deep-bronze/70 sm:w-24" aria-hidden="true" />
              </header>

              <div className={entry.photos.length > 1
                ? 'mx-auto grid max-w-3xl grid-cols-1 justify-items-center gap-6 md:grid-cols-2 sm:gap-8'
                : 'mx-auto max-w-[22rem]'}>
                {entry.photos.map((photo) => (
                  <figure key={photo.src} className="w-full max-w-[22rem]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-sm shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
                    />
                  </figure>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
