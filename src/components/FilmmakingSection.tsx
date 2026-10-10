import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowUpRight, Sparkles } from 'lucide-react';
import { filmmakerContent } from '../data/content';
import type { FilmItem } from '../data/types';
import { FilmModal } from './FilmModal';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export const FilmmakingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ambientTextRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [activeFilmIndex, setActiveFilmIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const films: FilmItem[] = filmmakerContent.films;

  useEffect(() => {
    const mm = gsap.matchMedia();

    // DESKTOP: Master Pinned Horizontal Scroll with Multi-Layer Scrubbed Parallax
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const ambient = ambientTextRef.current;
      const progressLine = progressLineRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 140;

      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Layer 1: Ambient Background Typography (Slow Parallax: 0.35x speed)
      if (ambient) {
        horizontalTl.to(
          ambient,
          {
            x: () => -(getScrollDistance() * 0.35),
            ease: 'none',
          },
          0
        );
      }

      // Layer 2: Main Film Cards Track (1.0x speed)
      horizontalTl.to(
        track,
        {
          x: () => -(getScrollDistance()),
          ease: 'none',
        },
        0
      );

      // Layer 3: Inner Thumbnail Image Counter-Parallax (Windowing Effect inside 16:9 cards)
      const innerImages = track.querySelectorAll<HTMLElement>('.film-card-image');
      if (innerImages.length > 0) {
        horizontalTl.to(
          innerImages,
          {
            x: -80,
            ease: 'none',
          },
          0
        );
      }

      // Layer 4: Floating Badges Parallax Shift (1.3x speed)
      const floatingBadges = track.querySelectorAll<HTMLElement>('.film-floating-badge');
      if (floatingBadges.length > 0) {
        horizontalTl.to(
          floatingBadges,
          {
            x: 45,
            ease: 'none',
          },
          0
        );
      }

      // Layer 5: Scrubbed Cinema Reel Progress Line
      if (progressLine) {
        horizontalTl.to(
          progressLine,
          {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
          },
          0
        );
      }
    });

    // MOBILE / TABLET: Vertical Staggered Reveal
    mm.add('(max-width: 1023px)', () => {
      gsap.utils.toArray<HTMLElement>('.film-card-mobile').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const handleOpenFilm = (index: number) => {
    setActiveFilmIndex(index);
  };

  const handleCloseModal = () => {
    setActiveFilmIndex(null);
  };

  const handleNextFilm = () => {
    if (activeFilmIndex !== null) {
      setActiveFilmIndex((activeFilmIndex + 1) % films.length);
    }
  };

  // Calculate current active film index based on scroll progress for HUD
  const currentActiveFilm = Math.min(
    films.length - 1,
    Math.floor(scrollProgress * films.length)
  );

  return (
    <>
      <section
        id="filmmaking"
        ref={sectionRef}
        className="relative w-full h-auto lg:h-screen lg:max-h-screen bg-noble-black overflow-hidden flex flex-col justify-between py-6 sm:py-8 border-t border-deep-bronze/30 select-none"
        aria-label="Filmmaking Works Portfolio"
      >
        {/* PARALLAX LAYER 1: Ambient Giant Typography Running in Background */}
        <div
          ref={ambientTextRef}
          aria-hidden="true"
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none z-0 opacity-[0.035] font-playfair font-black text-[22vw] uppercase tracking-widest text-solo will-change-transform select-none"
        >
          CINEMA REEL · PRODUCER ARCHIVE · FEATURE FILMS · 35MM CINEMASCOPE · LÊ ĐẶNG ĐÀI TRANG · 
        </div>

        {/* Ambient Subtle Radial Gradient Backlight */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at ${25 + scrollProgress * 50}% 50%, rgba(212, 175, 55, 0.08), transparent 70%)`,
          }}
        />

        {/* SECTION HEADER: Stays fixed in place during pin */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-4 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-deep-bronze/40 pb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-montserrat text-xs tracking-cinema uppercase text-wainscot-green font-semibold">
                  ACT II — FILMMAKING
                </span>
                <div className="w-12 h-[1px] bg-olivia/50" />
              </div>
              <h2 className="font-playfair font-black text-3xl sm:text-5xl md:text-6xl text-solo uppercase tracking-tight">
                FILMMAKING <span className="text-hive-delight">ARCHIVE</span>
              </h2>
            </div>

            {/* Cine HUD / Progress Indicator */}
            <div className="flex items-center gap-6 self-start sm:self-end">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="font-montserrat text-[10px] tracking-widest uppercase text-wainscot-green">
                  CURRENT REEL
                </span>
                <span className="font-playfair font-bold text-base text-hive-delight">
                  0{currentActiveFilm + 1} / 0{films.length} · {films[currentActiveFilm]?.title}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-deep-bronze/40 border border-deep-bronze text-xs font-montserrat text-wainscot-green">
                <Sparkles className="w-3.5 h-3.5 text-hive-delight" />
                <span>5 FEATURE FILMS</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP: PINNED HORIZONTAL-SCROLL GALLERY TRACK WITH PARALLAX */}
        <div className="hidden lg:block relative z-10 w-full overflow-hidden my-auto py-6">
          <div
            ref={trackRef}
            className="horizontal-scroll-container flex items-center gap-12 pl-12 pr-32 will-change-transform"
          >
            {films.map((film, index) => (
              <div
                key={film.id}
                onClick={() => handleOpenFilm(index)}
                data-cursor="PLAY"
                className="group relative w-[560px] shrink-0 bg-[#151918]/90 backdrop-blur-sm border border-deep-bronze/70 rounded-sm overflow-hidden p-5 shadow-2xl hover:border-hive-delight/80 transition-all duration-500 cursor-pointer will-change-transform"
              >
                {/* 16:9 Thumbnail Image with Inner Counter-Parallax */}
                <div className="relative aspect-video w-full overflow-hidden rounded bg-black">
                  <div className="w-[125%] h-full -ml-[12.5%] overflow-hidden">
                    <img
                      src={film.thumbnail}
                      alt={film.title}
                      loading="lazy"
                      className="film-card-image w-full h-full object-cover contrast-[1.03] group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noble-black/95 via-noble-black/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                  {/* Center Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full bg-hive-delight/95 backdrop-blur-sm flex items-center justify-center text-noble-black shadow-gold-glow">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Index Number Badge */}
                  <div className="film-floating-badge absolute top-3 left-3 px-3 py-1 rounded bg-noble-black/85 backdrop-blur-md border border-deep-bronze/80 text-xs font-montserrat font-bold text-hive-delight shadow-lg">
                    {film.index}
                  </div>

                  {/* Laurel Tag */}
                  {film.laurel && (
                    <div className="film-floating-badge absolute top-3 right-3 max-w-[220px] truncate px-2.5 py-1 rounded bg-noble-black/85 backdrop-blur-md border border-olivia/40 text-[10px] font-montserrat text-solo/90 shadow-lg">
                      ★ {film.laurel}
                    </div>
                  )}

                  {/* Direct YouTube Button inside thumbnail bottom-right */}
                  {film.youtubeUrl && (
                    <a
                      href={film.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-red-950/80 hover:bg-red-700 text-solo text-[11px] font-montserrat font-medium border border-red-500/40 hover:border-red-400 transition-colors shadow-lg cursor-pointer"
                      title="Xem trailer trực tiếp trên YouTube"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
                      <span>TRAILER ↗</span>
                    </a>
                  )}
                </div>

                {/* Film Card Metadata */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-montserrat text-wainscot-green uppercase tracking-wider">
                    <span className="font-semibold">{film.year} · {film.role}</span>
                    <span className="text-solo/75 font-light">{film.genre}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-playfair font-black text-2xl text-solo group-hover:text-hive-delight transition-colors uppercase tracking-tight">
                      {film.title}
                    </h3>
                    {film.youtubeUrl ? (
                      <a
                        href={film.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 -mr-1 rounded-full text-wainscot-green hover:text-hive-delight hover:bg-deep-bronze/60 transition-all duration-300 group/arrow"
                        title="Xem trailer chính thức trên YouTube ↗"
                        aria-label={`Xem trailer ${film.title} trên YouTube`}
                      >
                        <ArrowUpRight className="w-5 h-5 group-hover/arrow:text-hive-delight group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5 transition-all duration-300" />
                      </a>
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-wainscot-green group-hover:text-hive-delight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    )}
                  </div>

                  <p className="font-montserrat text-xs text-wainscot-green/85 line-clamp-2 leading-relaxed pt-0.5">
                    {film.logline}
                  </p>

                  {/* Action Link Footer */}
                  <div className="pt-2 flex items-center justify-between text-xs font-montserrat border-t border-deep-bronze/40">
                    <span className="text-hive-delight font-semibold flex items-center gap-1 group-hover:underline">
                      CHI TIẾT & TRAILER
                    </span>
                    <span className="text-[11px] text-wainscot-green">
                      {film.duration} · {film.aspectRatio}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM HUD: Cinema Reel Scrubber Track */}
        <div className="hidden lg:block relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-3">
          <div className="flex items-center justify-between gap-6">
            <span className="font-montserrat text-[10px] tracking-widest uppercase text-wainscot-green">
              01 // NHẮM MẮT THẤY MÙA HÈ
            </span>

            {/* Continuous Golden Scrubber Line */}
            <div className="flex-1 h-[2px] bg-deep-bronze/60 relative overflow-hidden rounded-full">
              <div
                ref={progressLineRef}
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-olivia via-hive-delight to-hive-delight transform scale-x-0 will-change-transform"
              />
            </div>

            <span className="font-montserrat text-[10px] tracking-widest uppercase text-wainscot-green">
              05 // GIAO LỘ 8675
            </span>
          </div>
        </div>

        {/* MOBILE / TABLET: Vertical Stack Layout with Direct YouTube Actions */}
        <div className="lg:hidden relative z-10 max-w-2xl mx-auto px-6 pb-16 pt-4 space-y-8">
          {films.map((film, index) => (
            <div
              key={film.id}
              onClick={() => handleOpenFilm(index)}
              className="film-card-mobile bg-[#161a19] border border-deep-bronze/80 rounded-sm overflow-hidden p-4 shadow-xl active:border-hive-delight transition-colors"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded bg-black">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-noble-black/85 text-xs font-montserrat font-bold text-hive-delight border border-deep-bronze">
                  {film.index}
                </div>
                {film.youtubeUrl && (
                  <a
                    href={film.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/90 text-white text-[11px] font-montserrat font-semibold border border-red-500/50"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5 text-red-400" />
                    <span>TRAILER ↗</span>
                  </a>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-[10px] font-montserrat uppercase text-wainscot-green tracking-wider">
                  {film.year} · {film.role} · {film.genre}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-playfair font-black text-xl text-solo uppercase tracking-tight">
                    {film.title}
                  </h3>
                  {film.youtubeUrl ? (
                    <a
                      href={film.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-hive-delight font-montserrat uppercase font-semibold hover:underline shrink-0"
                      title="Xem trailer trên YouTube ↗"
                    >
                      <span>TRAILER ↗</span>
                    </a>
                  ) : (
                    <span className="text-xs text-hive-delight font-montserrat uppercase font-semibold">
                      XEM →
                    </span>
                  )}
                </div>
                <p className="font-montserrat text-xs text-wainscot-green/85 line-clamp-2 leading-relaxed">
                  {film.logline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Video Dossier Modal with YouTube Embed */}
      <FilmModal
        film={activeFilmIndex !== null ? films[activeFilmIndex] : null}
        onClose={handleCloseModal}
        onNext={handleNextFilm}
      />
    </>
  );
};
