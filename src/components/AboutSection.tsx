import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clapperboard, Globe2, GraduationCap, Heart, Languages, Sparkles } from 'lucide-react';
import { filmmakerContent } from '../data/content';
import { ambientSound } from '../utils/ambientAudio';

gsap.registerPlugin(ScrollTrigger);

const StatCounter: React.FC<{ targetValue: number; active: boolean; index: number }> = ({ targetValue, active, index }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current || !active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spanRef.current.textContent = targetValue.toString();
      return;
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: targetValue,
      duration: 2.3,
      delay: index * 0.08,
      ease: 'power2.out',
      onUpdate: () => {
        if (spanRef.current) spanRef.current.textContent = Math.floor(counter.value).toString();
      },
      onComplete: () => {
        if (spanRef.current) spanRef.current.textContent = targetValue.toString();
      },
    });

    return () => {
      tween.kill();
    };
  }, [active, index, targetValue]);

  return <span ref={spanRef}>0</span>;
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const dossierRef = useRef<HTMLDivElement>(null);
  const clapRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  const lastSoundTimeRef = useRef(0);

  const bioWords = filmmakerContent.bio.paragraphs.join(' ').split(' ');

  const playClap = () => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current > 900) {
      ambientSound.playShutterSound(0.045);
      lastSoundTimeRef.current = now;
    }
    if (!clapRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline().to(clapRef.current, { rotate: -8, duration: 0.18, ease: 'power2.out' }).to(clapRef.current, { rotate: 0, duration: 0.24, ease: 'bounce.out' });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && bioRef.current) {
        gsap.fromTo(bioRef.current.querySelectorAll('.bio-word'), { color: '#7A8CA6', opacity: 0.42 }, {
          color: '#F2F6FB', opacity: 1, stagger: 0.025,
          scrollTrigger: { trigger: bioRef.current, start: 'top 78%', end: 'bottom 45%', scrub: 0.5 },
        });
      }

      if (dossierRef.current) {
        gsap.fromTo(dossierRef.current.querySelectorAll('.dossier-reveal'), { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: {
            trigger: dossierRef.current,
            start: 'top 78%',
            once: true,
            onEnter: () => {
              setStatsActive(true);
              if (!prefersReducedMotion) playClap();
            },
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden border-t border-deep-bronze/30 bg-noble-black py-20 sm:py-28" aria-label="About the Filmmaker">
      <div className="portfolio-container">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-montserrat text-xs font-semibold uppercase tracking-cinema text-wainscot-green">{filmmakerContent.bio.actLabel}</span>
          <span className="h-px w-12 bg-olivia/50" />
        </div>

        {/* Portrait, profile and biography remain one unified block. */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="group relative mx-auto aspect-[4/5] max-h-[500px] w-full max-w-md overflow-hidden border border-deep-bronze/90 bg-black shadow-2xl">
              <img src={filmmakerContent.profile.portraitImage} alt={`${filmmakerContent.profile.fullName} portrait`} className="h-full w-full object-cover object-[center_15%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-noble-black/80 via-transparent to-noble-black/10" />
              <div className="absolute inset-4 border border-solo/15" />
              <div className="absolute right-6 top-6 flex items-center gap-2 bg-noble-black/80 px-2 py-1 font-mono text-[9px] text-solo">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> REC
              </div>
            </div>

            {/* Profile section centered directly beneath the photo with generous row spacing */}
            <div className="mx-auto mt-7 flex w-full max-w-md flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-hive-delight" />
                <p className="font-montserrat text-xs font-bold uppercase tracking-widest text-hive-delight">Profile</p>
                <span className="h-1.5 w-1.5 rounded-full bg-hive-delight" />
              </div>

              <div className="w-full rounded border border-deep-bronze/60 bg-[#112A46]/35 p-5 shadow-lg backdrop-blur-sm sm:p-6">
                <dl className="space-y-4 font-montserrat text-xs sm:text-sm">
                  <div className="grid min-h-8 grid-cols-[minmax(7rem,auto)_minmax(0,1fr)] items-center gap-4 border-b border-deep-bronze/40 pb-4">
                    <dt className="flex items-center gap-2 text-left uppercase tracking-wider text-wainscot-green">
                      <span className="text-hive-delight">•</span> Name:
                    </dt>
                    <dd className="break-words text-right font-semibold leading-relaxed text-solo">Le Dang Dai Trang</dd>
                  </div>
                  <div className="grid min-h-8 grid-cols-[minmax(7rem,auto)_minmax(0,1fr)] items-center gap-4 pt-0.5">
                    <dt className="flex items-center gap-2 text-left uppercase tracking-wider text-wainscot-green">
                      <span className="text-hive-delight">•</span> Occupation:
                    </dt>
                    <dd className="break-words text-right font-semibold leading-relaxed text-solo">{filmmakerContent.profile.role}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-3 font-montserrat text-[10px] font-semibold uppercase tracking-cinema text-stone-ground">Get to know me</p>
            <h2 className="border-b border-deep-bronze/50 pb-6 font-playfair text-4xl font-black uppercase leading-none tracking-tight text-solo sm:text-6xl">
              ABOUT <span className="text-hive-delight">ME</span>
            </h2>
            <div ref={bioRef} className="about-bio-copy mt-8 font-montserrat text-base font-light leading-relaxed sm:text-lg md:text-xl">
              {bioWords.map((word, index) => {
                const highlighted = filmmakerContent.bio.highlightWords.some((item) => word.toLowerCase().includes(item.toLowerCase()));
                return (
                  <React.Fragment key={index}>
                    <span className={`bio-word ${highlighted ? 'font-normal text-hive-delight underline decoration-stone-ground/50' : ''}`}>{word}</span>
                    {index < bioWords.length - 1 ? ' ' : ''}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-deep-bronze/60 bg-[#112A46] p-5">
                <p className="font-playfair text-lg font-bold text-hive-delight">My Philosophy</p>
                <p className="mt-2 font-montserrat text-xs leading-relaxed text-wainscot-green text-justify">Connect creativity with honest emotion so every frame carries meaning beyond the screen.</p>
              </div>
              <div className="border border-deep-bronze/60 bg-[#112A46] p-5">
                <p className="font-playfair text-lg font-bold text-hive-delight">The Mission</p>
                <p className="mt-2 font-montserrat text-xs leading-relaxed text-wainscot-green text-justify">Transform ideas on paper into vivid films that reach audiences through the language of cinema.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Former slide 2: clapperboard, statistics and dossier now live together. */}
        <div ref={dossierRef} className="relative mt-20 overflow-hidden border border-deep-bronze/60 bg-[#112A46] p-5 shadow-2xl sm:p-8 lg:mt-28 lg:p-10">
          <div aria-hidden="true" className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_28%_32%,rgba(241,195,76,0.18),transparent_38%)]" />
          <div className="dossier-reveal relative mb-8 flex flex-col gap-3 border-b border-deep-bronze/50 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-montserrat text-[10px] uppercase tracking-cinema text-stone-ground">Production dossier</p>
              <h3 className="mt-2 font-playfair text-3xl font-black uppercase text-solo sm:text-5xl">Behind the <span className="text-hive-delight">Clapperboard</span></h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-wainscot-green">Scene 02 · Take 01</span>
          </div>

          <div className="relative grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-9">
            <div className="dossier-reveal lg:col-span-5">
              <button type="button" onClick={playClap} className="group block w-full text-left" aria-label="Animate clapperboard">
                <div ref={clapRef} className="clapper-top origin-bottom-left border-2 border-solo/80 bg-solo p-2 shadow-xl">
                  <div className="h-12 border border-noble-black/40 bg-[repeating-linear-gradient(135deg,#1e2524_0,#1e2524_38px,#ccd4d0_38px,#ccd4d0_72px)] transition-transform group-hover:-translate-y-0.5" />
                </div>
                <div className="border-2 border-solo/80 bg-noble-black shadow-2xl">
                  <div className="grid grid-cols-3 border-b border-solo/40 font-mono text-[9px] uppercase tracking-wider text-wainscot-green">
                    <span className="border-r border-solo/30 p-3">Prod. Portfolio</span>
                    <span className="border-r border-solo/30 p-3">Roll 02</span>
                    <span className="p-3">Take 01</span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <Clapperboard className="mb-7 h-9 w-9 text-hive-delight" />
                    <p className="font-playfair text-3xl font-black uppercase leading-tight text-solo sm:text-4xl">Lê Đặng<br /><span className="text-hive-delight">Đài Trang</span></p>
                    <div className="mt-8 space-y-3 border-t border-deep-bronze/70 pt-5 font-mono text-[10px] uppercase tracking-widest text-wainscot-green">
                      <div className="flex items-start justify-between gap-4"><span>Role</span><strong className="min-w-0 text-right leading-relaxed text-solo">{filmmakerContent.profile.role}</strong></div>
                      <div className="flex justify-between"><span>Location</span><strong className="text-solo">Ho Chi Minh City</strong></div>
                      <div className="flex justify-between"><span>Format</span><strong className="text-solo">Cinema · Digital</strong></div>
                    </div>
                  </div>
                </div>
              </button>

              <div className="mt-5 grid grid-cols-2 gap-px bg-deep-bronze/60">
                {filmmakerContent.stats.map((stat, index) => (
                  <div key={stat.label} className={`bg-[#0A1B2E] p-4 sm:p-5 ${index === filmmakerContent.stats.length - 1 && filmmakerContent.stats.length % 2 !== 0 ? 'col-span-2' : ''}`}>
                    <div className="font-playfair text-3xl font-black text-hive-delight sm:text-4xl"><StatCounter targetValue={stat.value} active={statsActive} index={index} /><span className="text-stone-ground">{stat.suffix}</span></div>
                    <p className="mt-1 font-montserrat text-[10px] font-semibold uppercase tracking-wider text-solo">{stat.label}</p>
                    <p className="mt-1 text-[9px] text-wainscot-green">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <article className="dossier-reveal border border-deep-bronze/70 bg-noble-black/80 p-5">
                  <h4 className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-hive-delight"><GraduationCap className="h-4 w-4" />Education</h4>
                  <ul className="mt-4 space-y-3 font-montserrat text-xs leading-relaxed text-solo/90">
                    {filmmakerContent.aboutMeDetails.education.map((item) => <li key={item.institution} className="border-l border-stone-ground pl-3">{item.institution}</li>)}
                  </ul>
                </article>
                <article className="dossier-reveal border border-deep-bronze/70 bg-noble-black/80 p-5">
                  <h4 className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-hive-delight"><Languages className="h-4 w-4" />Languages</h4>
                  <div className="mt-4 flex flex-wrap gap-2">{filmmakerContent.aboutMeDetails.languages.map((item) => <span key={item} className="border border-deep-bronze bg-[#0A1B2E] px-3 py-1.5 font-montserrat text-xs text-solo">{item}</span>)}</div>
                </article>
              </div>

              <article className="dossier-reveal border border-deep-bronze/70 bg-noble-black/80 p-5 sm:p-6">
                <h4 className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-hive-delight"><Sparkles className="h-4 w-4" />Skills</h4>
                <div className="mt-4 flex flex-wrap gap-2">{filmmakerContent.aboutMeDetails.skills.map((item) => <span key={item} className="border border-olivia/50 bg-deep-bronze/40 px-3 py-1.5 font-montserrat text-xs text-solo transition-colors hover:border-hive-delight hover:text-hive-delight">{item}</span>)}</div>
              </article>

              <div className="grid gap-5 sm:grid-cols-2">
                <article className="dossier-reveal border border-deep-bronze/70 bg-noble-black/80 p-5">
                  <h4 className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-hive-delight"><Globe2 className="h-4 w-4" />Passport</h4>
                  <div className="mt-4 flex flex-wrap gap-2">{filmmakerContent.aboutMeDetails.passport.map((item) => <span key={item} className="font-mono text-[10px] uppercase tracking-wider text-solo">· {item}</span>)}</div>
                </article>
                <article className="dossier-reveal border border-deep-bronze/70 bg-noble-black/80 p-5">
                  <h4 className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-hive-delight"><Heart className="h-4 w-4" />Hobbies</h4>
                  <ul className="mt-4 space-y-2 font-montserrat text-xs text-solo/90">{filmmakerContent.aboutMeDetails.hobbies.map((item) => <li key={item.category}><strong className="text-solo">{item.category}:</strong> <span className="text-wainscot-green">{item.items}</span></li>)}</ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
