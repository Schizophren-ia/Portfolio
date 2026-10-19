import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Film, Image as ImageIcon, Play, Sparkles } from 'lucide-react';
import { filmmakerContent } from '../data/content';
import { archiveFilms } from '../data/archiveData';
import type { FilmCategory, FilmItem } from '../data/types';
import { FilmModal } from './FilmModal';
import { FilmThumbnail } from './FilmThumbnail';

const categories: { id: FilmCategory; label: string; note: string }[] = [
  { id: 'movie', label: 'MOVIE', note: 'Feature films' },
  { id: 'short-film', label: 'SHORT FILM', note: 'Narrative & branded stories' },
  { id: 'tvc', label: 'TVC', note: 'Commercial films' },
  { id: 'house-rule', label: 'HOUSE RULE', note: 'Cinema etiquette films' },
  { id: 'mv', label: 'MV', note: 'Music videos' },
  { id: 'ai-film', label: 'AI FILM', note: 'AI-crafted visual experiments' },
];

type IndexedFilm = FilmItem & { archiveIndex: number };

const MARQUEE_SPEED_PX_PER_SECOND = 40;

const previewAspectRatio = (film: FilmItem) => film.thumbnailAspectRatio ?? (film.mediaType === 'local-video' ? 3 / 4 : 16 / 9);

const FilmCard: React.FC<{
  film: IndexedFilm;
  onOpen: () => void;
  className?: string;
  decorative?: boolean;
}> = ({ film, onOpen, className = '', decorative = false }) => (
  <article
    onClick={onOpen}
    onKeyDown={decorative ? undefined : (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    role={decorative ? undefined : 'button'}
    tabIndex={decorative ? -1 : 0}
    aria-label={decorative ? undefined : `Xem ${film.title}`}
    aria-hidden={decorative || undefined}
    className={`archive-card group relative cursor-pointer overflow-hidden border border-deep-bronze/60 bg-[#112A46] shadow-xl transition-colors duration-300 hover:border-hive-delight/80 focus-within:border-hive-delight ${className}`}
  >
    <div className="archive-card-media relative overflow-hidden bg-black">
      <FilmThumbnail
        key={film.id}
        film={film}
        decorative={decorative}
        className="absolute inset-0 block h-full w-full object-cover"
      />
      {film.mediaType !== 'poster' && film.category !== 'ai-film' && <div className="absolute inset-0 bg-gradient-to-t from-noble-black via-noble-black/15 to-transparent" />}
      <span className="absolute left-2.5 top-2.5 border border-deep-bronze/80 bg-noble-black/90 px-2 py-1 font-mono text-[10px] text-hive-delight">
        {film.index}
      </span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hive-delight text-noble-black shadow-gold-glow">
          {film.mediaType === 'poster' ? <ImageIcon className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
        </span>
      </div>
    </div>

    <div className="p-3.5 sm:p-4">
      <div className="mb-2 flex min-w-0 items-center justify-between gap-3 font-montserrat text-[9px] uppercase tracking-widest text-wainscot-green">
        <span className="shrink-0">{film.year} · {film.role}</span>
        <span className="min-w-0 truncate text-right">{film.genre}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] font-playfair text-base font-black uppercase leading-tight text-solo transition-colors group-hover:text-hive-delight sm:text-lg">
          {film.title}
        </h3>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-stone-ground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  </article>
);

const AutoScrollShelf: React.FC<{
  films: IndexedFilm[];
  onOpen: (archiveIndex: number) => void;
  speedPixelsPerSecond?: number;
}> = ({ films, onOpen, speedPixelsPerSecond = MARQUEE_SPEED_PX_PER_SECOND }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const previousDistanceRef = useRef(0);
  const [repeats, setRepeats] = useState(1);
  const speed = Number.isFinite(speedPixelsPerSecond) && speedPixelsPerSecond > 0 ? speedPixelsPerSecond : MARQUEE_SPEED_PX_PER_SECOND;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    const sequence = sequenceRef.current;
    if (!viewport || !track || !group || !sequence) return;
    const measure = () => {
      const sequenceWidth = sequence.getBoundingClientRect().width;
      if (!sequenceWidth) return;
      const requiredRepeats = Math.max(1, Math.ceil(viewport.clientWidth / sequenceWidth));
      if (requiredRepeats !== repeats) {
        setRepeats(requiredRepeats);
        return;
      }

      // The group includes every internal gap and the trailing boundary gap.
      // Both groups have the same children; the track itself has no gap/padding.
      const distance = group.getBoundingClientRect().width;
      if (!distance) return;
      // Equal physical velocity for all shelves, regardless of their loop length.
      const duration = distance / speed;
      const previousDistance = previousDistanceRef.current;
      const animation = track.getAnimations()[0];
      const elapsed = Number(animation?.currentTime ?? 0);
      const previousDuration = Number(animation?.effect?.getTiming().duration ?? duration * 1000);
      const offset = previousDistance && previousDuration
        ? ((elapsed % previousDuration + previousDuration) % previousDuration) / previousDuration * previousDistance
        : 0;

      track.style.setProperty('--archive-distance', `${distance}px`);
      track.style.setProperty('--archive-duration', `${duration}s`);
      // Keep the current pixel offset on resize, even when the repeat count changes.
      const updatedAnimation = track.getAnimations()[0];
      if (updatedAnimation) updatedAnimation.currentTime = (offset % distance) / distance * duration * 1000;
      previousDistanceRef.current = distance;
      track.dataset.ready = 'true';
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(sequence);
    observer.observe(group);
    return () => observer.disconnect();
  }, [films.length, repeats, speed]);

  const renderGroup = (copy: boolean) => (
    <div ref={!copy ? groupRef : undefined} className="archive-marquee-group" aria-hidden={copy || undefined}>
      {Array.from({ length: repeats }, (_, repeat) => (
        <div
          key={repeat}
          ref={!copy && repeat === 0 ? sequenceRef : undefined}
          className="archive-marquee-sequence"
          aria-hidden={copy || repeat > 0 || undefined}
        >
          {films.map((film) => (
            <div
              key={film.id}
              className={`archive-marquee-card${film.mediaType === 'poster' ? ' archive-marquee-poster' : ''}`}
              style={{ '--archive-aspect': previewAspectRatio(film) } as React.CSSProperties}
            >
              <FilmCard
                film={film}
                onOpen={() => onOpen(film.archiveIndex)}
                className="h-full w-full"
                decorative={copy || repeat > 0}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-w-0">
      <div ref={viewportRef} className="archive-marquee" aria-label="Dải phim tự động cuộn">
        <div ref={trackRef} className="archive-marquee-track" data-ready="false">
          {renderGroup(false)}
          {renderGroup(true)}
        </div>
      </div>
    </div>
  );
};

export const FilmmakingSection: React.FC = () => {
  const [activeFilmIndex, setActiveFilmIndex] = useState<number | null>(null);

  const allFilms = useMemo<IndexedFilm[]>(() => {
    const combined: FilmItem[] = [
      ...filmmakerContent.films.map((film) => ({ ...film, category: 'movie' as const })),
      ...archiveFilms,
    ];

    return combined.map((film, archiveIndex) => ({ ...film, archiveIndex }));
  }, []);

  const activeFilm = activeFilmIndex === null ? null : allFilms[activeFilmIndex];

  const handleNextFilm = () => {
    if (activeFilmIndex === null) return;
    const category = allFilms[activeFilmIndex].category;
    const categoryIndexes = allFilms
      .filter((film) => film.category === category)
      .map((film) => film.archiveIndex);
    const current = categoryIndexes.indexOf(activeFilmIndex);
    setActiveFilmIndex(categoryIndexes[(current + 1) % categoryIndexes.length]);
  };

  return (
    <>
      <section id="filmmaking" className="relative overflow-hidden border-t border-deep-bronze/30 bg-noble-black py-20 sm:py-28" aria-label="Filmmaking Works Portfolio">
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-12 whitespace-nowrap font-playfair text-[18vw] font-black uppercase tracking-widest text-solo opacity-[0.025]">
          CINEMA ARCHIVE · CINEMA ARCHIVE
        </div>

        <header className="portfolio-container relative z-10 mb-14">
          <div className="flex flex-col gap-5 border-b border-deep-bronze/40 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-montserrat text-xs font-semibold uppercase tracking-cinema text-wainscot-green">ACT II — FILMMAKING</span>
                <span className="h-px w-12 bg-olivia/50" />
              </div>
              <h2 className="font-playfair text-4xl font-black uppercase tracking-tight text-solo sm:text-6xl">
                FILMMAKING <span className="text-hive-delight">ARCHIVE</span>
              </h2>
            </div>
            <div className="flex w-fit max-w-full items-center gap-3 border border-deep-bronze/70 bg-deep-bronze/20 px-4 py-2 font-montserrat text-xs uppercase tracking-widest text-wainscot-green">
              <Film className="h-4 w-4 shrink-0 text-hive-delight" aria-hidden="true" />
              <span>{allFilms.length} selected works</span>
            </div>
          </div>
          <p className="mt-5 max-w-2xl font-montserrat text-sm leading-relaxed text-wainscot-green text-justify">
            A continuous production reel across feature films, short-form storytelling, commercials and music culture.
          </p>
        </header>

        <div className="relative z-10 space-y-16 sm:space-y-20">
          {categories.map((category, categoryIndex) => {
            const categoryFilms = allFilms.filter((film) => film.category === category.id);
            const indexed = categoryFilms.map((film, index) => ({
              ...film,
              index: `${String(index + 1).padStart(2, '0')}/${String(categoryFilms.length).padStart(2, '0')}`,
            }));

            return (
              <section key={category.id} aria-labelledby={`archive-${category.id}`}>
                <div className="portfolio-container mb-6 flex min-w-0 items-end justify-between gap-4 sm:gap-5">
                  <div className="flex min-w-0 items-baseline gap-3 sm:gap-5">
                    <span className="shrink-0 font-mono text-xs text-stone-ground">0{categoryIndex + 1}</span>
                    <div className="min-w-0">
                      <h3 id={`archive-${category.id}`} className="font-playfair text-2xl font-black uppercase tracking-tight text-solo sm:text-4xl">{category.label}</h3>
                      <p className="mt-1 font-montserrat text-[10px] uppercase tracking-widest text-wainscot-green">{category.note}</p>
                    </div>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-right font-mono text-xs text-hive-delight">{String(indexed.length).padStart(2, '0')} WORKS</span>
                </div>

                <div className="portfolio-container">
                  {indexed.length === 0 ? (
                    <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-deep-bronze/80 bg-[#112A46]/70 text-center">
                      <Sparkles className="mb-4 h-6 w-6 text-hive-delight" />
                      <p className="font-playfair text-2xl uppercase text-solo">New work in development</p>
                      <span className="mt-2 font-montserrat text-[10px] uppercase tracking-cinema text-wainscot-green">Coming soon</span>
                    </div>
                  ) : category.id === 'ai-film' ? (
                    <div className="archive-static-gallery">
                      {indexed.map((film) => (
                        <div
                          key={film.id}
                          className="archive-marquee-card"
                          style={{ '--archive-aspect': previewAspectRatio(film) } as React.CSSProperties}
                        >
                          <FilmCard film={film} onOpen={() => setActiveFilmIndex(film.archiveIndex)} className="h-full w-full" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* CSS animates between two identically measured groups. */
                    <AutoScrollShelf films={indexed} onOpen={setActiveFilmIndex} />
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <FilmModal film={activeFilm} onClose={() => setActiveFilmIndex(null)} onNext={handleNextFilm} />
    </>
  );
};
