import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Image as ImageIcon, Pause, Play, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';
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

const tvcClosingOrder = [
  'hack-tet-mon-ngon',
  'hack-tet-truyen-thong',
  'xmen-24-gio-sach-gau-ep1',
  'xmen-24-gio-sach-gau-ep2',
];

const getCategoryFilms = (films: IndexedFilm[], category: FilmCategory | undefined) => {
  const selected = films.filter((film) => film.category === category);
  if (category !== 'short-film' && category !== 'tvc') return selected;

  const priority = (film: IndexedFilm) => {
    if (category === 'short-film') {
      return film.id === 'vu-dieu-tinh-yeu' ? 0 : film.id === 'minh-echoes-of-doves-wings' ? 1 : 2;
    }
    // Keep the requested closing group together, after the date-sorted TVCs.
    const closingIndex = tvcClosingOrder.indexOf(film.id);
    return closingIndex < 0 ? 0 : closingIndex + 1;
  };

  // Same-year works retain their existing order; undated works follow dated ones.
  // This shared order also drives Next Reel in the film details.
  return selected.sort((a, b) => priority(a) - priority(b) || (Number(b.year) || 0) - (Number(a.year) || 0));
};

const previewAspectRatio = (film: FilmItem) => film.thumbnailAspectRatio ?? (film.mediaType === 'local-video' ? 3 / 4 : 16 / 9);

const FilmCard: React.FC<{
  film: IndexedFilm;
  onOpen: () => void;
  className?: string;
  posterPreview?: boolean;
  renderThumbnail?: boolean;
}> = ({ film, onOpen, className = '', posterPreview = false, renderThumbnail = true }) => {
  const { t } = useLanguage();
  return (
  <article
    data-film-id={film.id}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={t('View {title}', { title: film.title })}
    style={{ '--archive-aspect': posterPreview ? 2 / 3 : previewAspectRatio(film) } as React.CSSProperties}
    className={`archive-card group relative min-w-0 cursor-pointer overflow-hidden border border-deep-bronze/60 bg-[#112A46] shadow-xl transition-colors duration-300 hover:border-hive-delight/80 focus-visible:border-hive-delight motion-reduce:transition-none ${className}`}
  >
    <div className="archive-card-media relative overflow-hidden bg-black">
      {renderThumbnail && <FilmThumbnail
        key={film.id}
        film={posterPreview ? { ...film, thumbnail: film.posterImage ?? film.thumbnail, thumbnailScale: undefined } : film}
        loading={posterPreview ? 'eager' : 'lazy'}
        className={`absolute inset-0 block h-full w-full ${posterPreview || film.mediaType === 'poster' ? 'object-contain' : 'object-cover'}`}
      />}
      {!posterPreview && film.mediaType !== 'poster' && film.category !== 'ai-film' && <div className="absolute inset-0 bg-gradient-to-t from-noble-black via-noble-black/15 to-transparent" />}
      <span className="absolute left-2.5 top-2.5 border border-deep-bronze/80 bg-noble-black/90 px-2 py-1 font-mono text-[10px] text-hive-delight">
        {film.index}
      </span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hive-delight text-noble-black shadow-gold-glow">
          {film.mediaType === 'poster' ? <ImageIcon className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
        </span>
      </div>
    </div>

    <div className="archive-caption p-3.5 sm:p-4">
      <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 font-montserrat text-[10px] uppercase tracking-wider text-wainscot-green">
        <span className="whitespace-nowrap">{film.year}</span>
        <span>{film.genre}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h4 className="archive-title min-w-0 min-h-[2.5rem] font-playfair font-bold uppercase leading-snug text-solo transition-colors group-hover:text-hive-delight">
          {film.title}
        </h4>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-stone-ground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  </article>
  );
};

const MovieCarousel: React.FC<{
  films: IndexedFilm[];
  onOpen: (archiveIndex: number) => void;
  isModalOpen: boolean;
}> = ({ films, onOpen, isModalOpen }) => {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const postersRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(() => document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const autoplayAllowed = !paused && !focused && !pageHidden && !reducedMotion && visible && !isModalOpen;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageHidden(document.hidden);
    // Start only once the actual posters are substantially in view, below the navbar.
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.45);
    }, { threshold: [0, 0.45], rootMargin: '-80px 0px -5% 0px' });
    if (postersRef.current) observer.observe(postersRef.current);
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoplayAllowed || films.length < 2) return;
    const timeout = window.setTimeout(() => setPosition((index) => (index + 1) % films.length), 1500);
    return () => window.clearTimeout(timeout);
  }, [position, autoplayAllowed, films.length]);

  const current = films.length ? position % films.length : 0;
  const film = films[current];
  if (!film) return null;
  const move = (step: number) => setPosition((index) => (index + step + films.length) % films.length);

  return (
    <div
      ref={carouselRef}
      className="movie-carousel relative mx-auto w-full max-w-5xl"
      role="region"
      aria-roledescription={t('carousel')}
      aria-label={t('Movie collection')}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <div className="movie-carousel-stage relative isolate overflow-hidden">
        <div ref={postersRef} className="movie-carousel-posters" aria-hidden="true">
          {films.map((poster, index) => {
            let offset = (index - current + films.length) % films.length;
            if (offset > films.length / 2) offset -= films.length;
            return (
              <div
                key={poster.id}
                data-poster-id={poster.id}
                data-position={offset}
                className="movie-carousel-poster"
                style={{
                  transform: `translate3d(${-50 + offset * 65}%, 0, 0) scale(${offset === 0 ? 1 : 0.82})`,
                  opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.35 : 0,
                  zIndex: offset === 0 ? 3 : Math.abs(offset) === 1 ? 2 : 0,
                }}
              >
                <FilmThumbnail
                  film={{ ...poster, thumbnail: poster.posterImage ?? poster.thumbnail, thumbnailScale: undefined }}
                  decorative
                  className="block h-full w-full object-contain"
                />
              </div>
            );
          })}
        </div>
        <div id="movie-carousel-slide" className="movie-carousel-current relative z-20 mx-auto" role="group" aria-roledescription={t('slide')} aria-label={t('{current} of {total}: {title}', { current: current + 1, total: films.length, title: film.title })}>
          <FilmCard
            film={{ ...film, index: `${String(current + 1).padStart(2, '0')}/${String(films.length).padStart(2, '0')}` }}
            onOpen={() => onOpen(film.archiveIndex)}
            posterPreview
            renderThumbnail={false}
          />
        </div>
      </div>
      {films.length > 1 && (
        <div className="movie-carousel-controls pointer-events-none absolute left-1/2 top-0 z-30 aspect-[2/3] -translate-x-1/2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={t('Previous movie')}
            aria-controls="movie-carousel-slide"
            className="movie-carousel-arrow movie-carousel-arrow--previous pointer-events-auto absolute top-1/2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-stone-ground/70 bg-noble-black/90 text-solo shadow-lg backdrop-blur-sm transition-colors hover:bg-hive-delight hover:text-noble-black focus-visible:ring-2 focus-visible:ring-hive-delight motion-reduce:transition-none"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={t('Next movie')}
            aria-controls="movie-carousel-slide"
            className="movie-carousel-arrow movie-carousel-arrow--next pointer-events-auto absolute top-1/2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-stone-ground/70 bg-noble-black/90 text-solo shadow-lg backdrop-blur-sm transition-colors hover:bg-hive-delight hover:text-noble-black focus-visible:ring-2 focus-visible:ring-hive-delight motion-reduce:transition-none"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p role="status" aria-live={autoplayAllowed ? 'off' : 'polite'} aria-atomic="true" className="text-center font-montserrat text-xs leading-relaxed text-wainscot-green">
          {t('Movie {current} of {total}: {title}', { current: current + 1, total: films.length, title: film.title })}
        </p>
        {films.length > 1 && !reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={t(paused ? 'Play movie slideshow' : 'Pause movie slideshow')}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-deep-bronze/70 px-3 text-xs text-wainscot-green transition-colors hover:border-hive-delight hover:text-solo disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            <span>{t(paused ? 'Play' : 'Pause')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

const ArchiveGrid: React.FC<{
  films: IndexedFilm[];
  onOpen: (archiveIndex: number) => void;
  portrait?: boolean;
  className?: string;
  startIndex?: number;
  total?: number;
}> = ({ films, onOpen, portrait = false, className = '', startIndex = 0, total = films.length }) => (
  <div className={`archive-grid${portrait ? ' archive-grid-portrait' : ''} ${className}`}>
    {films.map((film, index) => (
      <FilmCard
        key={film.id}
        film={{ ...film, index: `${String(startIndex + index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}` }}
        onOpen={() => onOpen(film.archiveIndex)}
      />
    ))}
  </div>
);

export const FilmmakingSection: React.FC = () => {
  const { content: filmmakerContent, archive: archiveFilms, t } = useLanguage();
  const [activeFilmIndex, setActiveFilmIndex] = useState<number | null>(null);

  const allFilms = useMemo<IndexedFilm[]>(() => {
    const combined: FilmItem[] = [
      ...filmmakerContent.films.map((film, index, films) => ({
        ...film,
        index: `${String(index + 1).padStart(2, '0')}/${String(films.length).padStart(2, '0')}`,
        category: 'movie' as const,
      })),
      ...archiveFilms,
    ];

    return combined.map((film, archiveIndex) => ({ ...film, archiveIndex }));
  }, [filmmakerContent.films, archiveFilms]);

  const activeFilm = activeFilmIndex === null ? null : allFilms[activeFilmIndex];

  const handleNextFilm = () => {
    if (activeFilmIndex === null) return;
    const currentFilm = allFilms[activeFilmIndex];
    const categoryIndexes = getCategoryFilms(allFilms, currentFilm.category)
      .map((film) => film.archiveIndex);
    const current = categoryIndexes.indexOf(activeFilmIndex);
    setActiveFilmIndex(categoryIndexes[(current + 1) % categoryIndexes.length]);
  };

  return (
    <>
      <section id="filmmaking" className="relative overflow-hidden border-t border-deep-bronze/30 bg-noble-black py-20 sm:py-28" aria-label={t('Filmmaking Works Portfolio')}>
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-12 whitespace-nowrap font-playfair text-[18vw] font-black uppercase tracking-widest text-solo opacity-[0.025]">
          {t('CINEMA ARCHIVE')} · {t('CINEMA ARCHIVE')}
        </div>

        <header className="portfolio-container relative z-10 mb-14">
          <div className="flex flex-col gap-5 border-b border-deep-bronze/40 pb-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-montserrat text-xs font-semibold uppercase tracking-cinema text-wainscot-green">{t('ACT II — FILMMAKING')}</span>
                <span className="h-px w-12 bg-olivia/50" />
              </div>
              <h2 className="section-heading font-playfair font-black uppercase tracking-tight text-solo">
                {t('FILMMAKING')} <span className="text-hive-delight">{t('ARCHIVE')}</span>
              </h2>
            </div>
          </div>
          <p className="mt-5 max-w-2xl font-montserrat text-sm leading-relaxed text-wainscot-green text-justify">
            {t('A curated collection of feature films, short-form storytelling, commercials and music videos. Explore every selected work below.')}
          </p>
        </header>

        <div className="relative z-10 space-y-16 sm:space-y-20">
          {categories.map((category, categoryIndex) => {
            const categoryFilms = getCategoryFilms(allFilms, category.id);
            const posters = categoryFilms.filter((film) => film.mediaType === 'poster');
            const videos = categoryFilms.filter((film) => film.mediaType !== 'poster');

            return (
              <section key={category.id} aria-labelledby={`archive-${category.id}`}>
                <div className="portfolio-container mb-6 flex min-w-0 items-end justify-between gap-4 sm:gap-5">
                  <div className="flex min-w-0 items-baseline gap-3 sm:gap-5">
                    <span className="shrink-0 font-mono text-xs text-stone-ground">0{categoryIndex + 1}</span>
                    <div className="min-w-0">
                      <h3 id={`archive-${category.id}`} className="archive-category-title font-playfair font-black uppercase tracking-tight text-solo">{t(category.label)}</h3>
                      <p className="mt-1 font-montserrat text-[10px] uppercase tracking-widest text-wainscot-green">{t(category.note)}</p>
                    </div>
                  </div>
                </div>

                <div className="portfolio-container">
                  {posters.length > 0 && (
                    <ArchiveGrid
                      films={posters}
                      onOpen={setActiveFilmIndex}
                      portrait
                      className={category.id === 'short-film' ? 'archive-short-film-posters' : ''}
                      total={categoryFilms.length}
                    />
                  )}
                  {categoryFilms.length === 0 ? (
                    <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-deep-bronze/80 bg-[#112A46]/70 text-center">
                      <Sparkles className="mb-4 h-6 w-6 text-hive-delight" />
                      <p className="font-playfair text-2xl uppercase text-solo">{t('New work in development')}</p>
                      <span className="mt-2 font-montserrat text-[10px] uppercase tracking-cinema text-wainscot-green">{t('Coming soon')}</span>
                    </div>
                  ) : category.id === 'movie' ? (
                    <MovieCarousel films={categoryFilms} onOpen={setActiveFilmIndex} isModalOpen={activeFilmIndex !== null} />
                  ) : videos.length > 0 ? (
                    <ArchiveGrid
                      films={videos}
                      onOpen={setActiveFilmIndex}
                      portrait={category.id === 'ai-film'}
                      className={category.id === 'ai-film' ? 'archive-ai-film-gallery' : category.id === 'tvc' || category.id === 'house-rule' ? `archive-centered-gallery archive-${category.id}-gallery` : ''}
                      startIndex={posters.length}
                      total={categoryFilms.length}
                    />
                  ) : null}
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
