import React, { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Film, Play, Sparkles } from 'lucide-react';
import { filmmakerContent } from '../data/content';
import { archiveFilms } from '../data/archiveData';
import type { FilmCategory, FilmItem } from '../data/types';
import { FilmModal } from './FilmModal';

const categories: { id: FilmCategory; label: string; note: string }[] = [
  { id: 'movie', label: 'MOVIE', note: 'Feature films' },
  { id: 'short-film', label: 'SHORT FILM', note: 'Narrative & branded stories' },
  { id: 'tvc', label: 'TVC', note: 'Commercial films' },
  { id: 'house-rule', label: 'HOUSE RULE', note: 'Cinema etiquette films' },
  { id: 'mv', label: 'MV', note: 'Music videos' },
  { id: 'ai-film', label: 'AI FILM', note: 'AI-crafted visual experiments' },
];

type IndexedFilm = FilmItem & { archiveIndex: number };

const FilmCard: React.FC<{
  film: IndexedFilm;
  onOpen: () => void;
  className?: string;
}> = ({ film, onOpen, className = '' }) => (
  <article
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`Xem ${film.title}`}
    className={`archive-card group relative cursor-pointer overflow-hidden border border-deep-bronze/60 bg-[#112A46] shadow-xl transition-all duration-300 hover:border-hive-delight/80 hover:-translate-y-1 focus-within:border-hive-delight ${className}`}
    data-cursor="PLAY"
  >
    <div className="relative aspect-video overflow-hidden bg-black">
      {film.mediaType === 'local-video' && film.videoUrl ? (
        <video
          src={film.videoUrl}
          poster={film.thumbnail}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`Preview ${film.title}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onMouseEnter={(event) => void event.currentTarget.play()}
          onMouseLeave={(event) => {
            event.currentTarget.pause();
            event.currentTarget.currentTime = 0;
          }}
        />
      ) : (
        <img
          src={film.thumbnail}
          alt={film.title}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('maxresdefault.jpg')) {
              target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
            }
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-noble-black via-noble-black/15 to-transparent" />
      <span className="absolute left-2.5 top-2.5 border border-deep-bronze/80 bg-noble-black/90 px-2 py-1 font-mono text-[10px] text-hive-delight">
        {film.index}
      </span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hive-delight text-noble-black shadow-gold-glow">
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </span>
      </div>
    </div>

    <div className="p-3.5 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-3 font-montserrat text-[9px] uppercase tracking-widest text-wainscot-green">
        <span>{film.year} · {film.role}</span>
        <span className="truncate text-right">{film.genre}</span>
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

const ScrollableShelf: React.FC<{
  films: IndexedFilm[];
  onOpen: (archiveIndex: number) => void;
}> = ({ films, onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = Math.max(300, containerRef.current.clientWidth * 0.75);
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="scrollbar-none flex w-full snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 pt-1 sm:gap-6"
      >
        {films.map((film) => (
          <div key={film.id} className="w-full max-w-[360px] shrink-0 snap-start">
            <FilmCard film={film} onOpen={() => onOpen(film.archiveIndex)} className="w-full" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        <button
          type="button"
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          className="flex h-8 w-8 items-center justify-center rounded border border-deep-bronze/70 bg-[#112A46]/60 text-wainscot-green hover:border-hive-delight hover:text-hive-delight disabled:opacity-25 disabled:pointer-events-none transition-colors"
          aria-label="Previous items"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          className="flex h-8 w-8 items-center justify-center rounded border border-deep-bronze/70 bg-[#112A46]/60 text-wainscot-green hover:border-hive-delight hover:text-hive-delight disabled:opacity-25 disabled:pointer-events-none transition-colors"
          aria-label="Next items"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
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
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-montserrat text-xs font-semibold uppercase tracking-cinema text-wainscot-green">ACT II — FILMMAKING</span>
                <span className="h-px w-12 bg-olivia/50" />
              </div>
              <h2 className="font-playfair text-4xl font-black uppercase tracking-tight text-solo sm:text-6xl">
                FILMMAKING <span className="text-hive-delight">ARCHIVE</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 border border-deep-bronze/70 bg-deep-bronze/20 px-4 py-2 font-montserrat text-xs uppercase tracking-widest text-wainscot-green">
              <Film className="h-4 w-4 text-hive-delight" />
              <span>{allFilms.length} selected works</span>
            </div>
          </div>
          <p className="mt-5 max-w-2xl font-montserrat text-sm leading-relaxed text-wainscot-green text-justify">
            A continuous production reel across feature films, short-form storytelling, commercials and music culture. Hover to pause · Drag or swipe to explore.
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
                <div className="portfolio-container mb-6 flex items-end justify-between gap-5">
                  <div className="flex items-baseline gap-3 sm:gap-5">
                    <span className="font-mono text-xs text-stone-ground">0{categoryIndex + 1}</span>
                    <div>
                      <h3 id={`archive-${category.id}`} className="font-playfair text-2xl font-black uppercase tracking-tight text-solo sm:text-4xl">{category.label}</h3>
                      <p className="mt-1 font-montserrat text-[10px] uppercase tracking-widest text-wainscot-green">{category.note}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-hive-delight">{String(indexed.length).padStart(2, '0')} WORKS</span>
                </div>

                <div className="portfolio-container">
                  {indexed.length === 0 ? (
                    <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-deep-bronze/80 bg-[#112A46]/70 text-center">
                      <Sparkles className="mb-4 h-6 w-6 text-hive-delight" />
                      <p className="font-playfair text-2xl uppercase text-solo">New work in development</p>
                      <span className="mt-2 font-montserrat text-[10px] uppercase tracking-cinema text-wainscot-green">Coming soon</span>
                    </div>
                  ) : category.id === 'movie' ? (
                    /* Center incomplete rows so movie cards keep equal left and right margins. */
                    <div className="movie-grid">
                      {indexed.map((film) => (
                        <div key={film.id} className="movie-grid-cell">
                          <FilmCard
                            film={film}
                            onOpen={() => setActiveFilmIndex(film.archiveIndex)}
                            className="h-full w-full"
                          />
                        </div>
                      ))}
                    </div>
                  ) : indexed.length <= 3 ? (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 ${indexed.length === 3 ? 'lg:grid-cols-3' : ''} gap-6 sm:gap-7`}>
                      {indexed.map((film) => (
                        <FilmCard
                          key={film.id}
                          film={film}
                          onOpen={() => setActiveFilmIndex(film.archiveIndex)}
                          className="w-full"
                        />
                      ))}
                    </div>
                  ) : (
                    /* Shelves with > 3 items: smooth horizontal scroll with Prev/Next buttons, perfectly bounded within max-w-7xl */
                    <ScrollableShelf films={indexed} onOpen={setActiveFilmIndex} />
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
