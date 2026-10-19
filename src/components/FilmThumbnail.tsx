import { useState } from 'react';
import type { FilmItem } from '../data/types';

type FilmThumbnailProps = {
  film: FilmItem;
  decorative?: boolean;
  className?: string;
};

const fallback = `${import.meta.env.BASE_URL}images/film-placeholder.svg`;

export function FilmThumbnail({ film, decorative = false, className }: FilmThumbnailProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const youtubeId = film.youtubeUrl?.match(/[?&]v=([\w-]{11})(?:[&#]|$)/)?.[1];
  const sources = [...new Set([
    film.thumbnail,
    ...(youtubeId ? ['maxresdefault', 'hqdefault', 'mqdefault'].map(
      (quality) => `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`,
    ) : []),
    fallback,
  ])];
  const tryNextSource = () => setSourceIndex((index) => Math.min(index + 1, sources.length - 1));

  return (
    <img
      src={sources[sourceIndex]}
      alt={decorative ? '' : film.title}
      // Copies must be ready before a transform brings them into the viewport.
      // Identical URLs reuse the browser cache rather than waiting for lazy loading.
      loading="eager"
      decoding="async"
      style={sourceIndex === 0 && film.thumbnailScale ? { transform: `scale(${film.thumbnailScale})` } : undefined}
      onError={tryNextSource}
      onLoad={(event) => {
        const image = event.currentTarget;
        // YouTube can return a 120px placeholder with HTTP 200 for missing images.
        if (image.src.startsWith('https://img.youtube.com/') && image.naturalWidth <= 120) {
          tryNextSource();
        }
      }}
      className={className}
    />
  );
}
