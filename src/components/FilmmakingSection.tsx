import React, { useMemo, useState } from 'react';
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

const previewAspectRatio = (film: FilmItem) => film.thumbnailAspectRatio ?? (film.mediaType === 'local-video' ? 3 / 4 : 16 / 9);

const FilmCard: React.FC<{
  film: IndexedFilm;
  onOpen: () => void;
  className?: string;
}> = ({ film, onOpen, className = '' }) => (
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
    aria-label={`Xem ${film.title}`}
    style={{ '--archive-aspect': previewAspectRatio(film) } as React.CSSProperties}
    className={`archive-card group relative min-w-0 cursor-pointer overflow-hidden border border-deep-bronze/60 bg-[#112A46] shadow-xl transition-colors duration-300 hover:border-hive-delight/80 focus-visible:border-hive-delight motion-reduce:transition-none ${className}`}
  >
    <div className="archive-card-media relative overflow-hidden bg-black">
      <FilmThumbnail
        key={film.id}
        film={film}
        loading="lazy"
        className={`absolute inset-0 block h-full w-full ${film.mediaType === 'poster' ? 'object-contain' : 'object-cover'}`}
      />
      {film.mediaType !== 'poster' && film.category !== 'ai-film' && <div className="absolute inset-0 bg-gradient-to-t from-noble-black via-noble-black/15 to-transparent" />}
      <span className="absolute left-2.5 top-2.5 border border-deep-bronze/80 bg-noble-black/90 px-2 py-1 font-mono text-[10px] text-hive-delight">
        {film.index}
      </span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hive-delight text-noble-black shadow-gold-glow">
          {film.mediaType === 'poster' ? <ImageIcon className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
        </span>
      </div>
    </div>

    <div className="p-3.5 sm:p-4">
      <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 font-montserrat text-[10px] uppercase tracking-wider text-wainscot-green">
        <span>{film.year} · {film.role}</span>
        <span>{film.genre}</span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h4 className="min-h-[2.5rem] font-playfair text-lg font-bold uppercase leading-tight text-solo transition-colors group-hover:text-hive-delight sm:text-xl">
          {film.title}
        </h4>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-stone-ground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  </article>
);

const ArchiveGrid: React.FC<{
  films: IndexedFilm[];
  onOpen: (archiveIndex: number) => void;
  portrait?: boolean;
}> = ({ films, onOpen, portrait = false }) => (
  <div className={`archive-grid${portrait ? ' archive-grid-portrait' : ''}`}>
    {films.map((film, index) => (
      <FilmCard
        key={film.id}
        film={{ ...film, index: `${String(index + 1).padStart(2, '0')}/${String(films.length).padStart(2, '0')}` }}
        onOpen={() => onOpen(film.archiveIndex)}
      />
    ))}
  </div>
);

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
    const currentFilm = allFilms[activeFilmIndex];
    const categoryIndexes = allFilms
      .filter((film) => film.category === currentFilm.category && (film.mediaType === 'poster') === (currentFilm.mediaType === 'poster'))
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
            A curated collection of feature films, short-form storytelling, commercials and music videos. Explore every selected work below.
          </p>
        </header>

        <div className="relative z-10 space-y-16 sm:space-y-20">
          {categories.map((category, categoryIndex) => {
            const categoryFilms = allFilms.filter((film) => film.category === category.id && film.mediaType !== 'poster');
            const posters = allFilms.filter((film) => film.category === category.id && film.mediaType === 'poster');

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
                  <span className="shrink-0 whitespace-nowrap text-right font-mono text-xs text-hive-delight">{String(categoryFilms.length).padStart(2, '0')} WORKS</span>
                </div>

                <div className="portfolio-container">
                  {categoryFilms.length === 0 ? (
                    <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-deep-bronze/80 bg-[#112A46]/70 text-center">
                      <Sparkles className="mb-4 h-6 w-6 text-hive-delight" />
                      <p className="font-playfair text-2xl uppercase text-solo">New work in development</p>
                      <span className="mt-2 font-montserrat text-[10px] uppercase tracking-cinema text-wainscot-green">Coming soon</span>
                    </div>
                  ) : (
                    <ArchiveGrid films={categoryFilms} onOpen={setActiveFilmIndex} portrait={category.id === 'ai-film'} />
                  )}

                  {posters.length > 0 && (
                    <section className="mt-12 border-t border-deep-bronze/40 pt-8 sm:mt-16" aria-labelledby={`archive-${category.id}-posters`}>
                      <div className="mb-6 flex items-end justify-between gap-4">
                        <div>
                          <h3 id={`archive-${category.id}-posters`} className="font-playfair text-2xl font-bold uppercase text-solo sm:text-3xl">Short Film Posters</h3>
                          <p className="mt-1 font-montserrat text-[10px] uppercase tracking-widest text-wainscot-green">MINH & Vũ điệu tình yêu · Poster collection</p>
                        </div>
                        <span className="shrink-0 font-montserrat text-xs tabular-nums text-hive-delight">{String(posters.length).padStart(2, '0')} POSTERS</span>
                      </div>
                      <ArchiveGrid films={posters} onOpen={setActiveFilmIndex} portrait />
                    </section>
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
