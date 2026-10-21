import { filmmakerContent } from './content';
import { archiveFilms } from './archiveData';
import { journeyYears } from './journeyData';
import type { FilmItem, FilmmakerContent } from './types';
import { withoutVietnameseDiacritics } from '../utils/englishText';

// Confirmed release titles only. Sources and fallback policy: docs/english-titles.md.
export const englishFilmTitles: Readonly<Record<string, string>> = {
  'nham-mat-thay-mua-he': 'Summer in Closed Eyes',
  'troi-sang-roi-ta-ngu-di-thoi': 'Good Morning and Good Night',
  'sai-gon-trong-con-mua': 'Saigon in the Rain',
  'trai-tim-quai-vat': 'The Instrument of Murder',
  'giao-lo-8675': 'Intersection 8675',
  'doi-gi-mo-di': 'Dream On',
  'minh-echoes-of-doves-wings': 'Echoes of Dove’s Wings',
  'bay-ngot-ngao-house-rules': 'Naked Truth — House Rules',
  'bo-gia-house-rule': "Dad, I'm Sorry — House Rule",
};

const titleReplacements = [...filmmakerContent.films, ...archiveFilms]
  .filter((film) => englishFilmTitles[film.id])
  .map((film) => ({
    pattern: new RegExp(film.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'giu'),
    title: englishFilmTitles[film.id],
  }));

const englishCopy = (text: string) => withoutVietnameseDiacritics(
  titleReplacements.reduce((copy, replacement) => copy.replace(replacement.pattern, () => replacement.title), text),
);

export function localizeEnglishFilm(film: FilmItem): FilmItem {
  return {
    ...film,
    title: englishFilmTitles[film.id] ?? withoutVietnameseDiacritics(film.title),
    director: film.director ? withoutVietnameseDiacritics(film.director) : undefined,
    cast: film.cast ? withoutVietnameseDiacritics(film.cast) : undefined,
    logline: englishCopy(film.logline),
    synopsis: englishCopy(film.synopsis),
    credits: film.credits.map((credit) => ({ label: englishCopy(credit.label), value: englishCopy(credit.value) })),
    tools: film.tools.map(englishCopy),
    laurel: film.laurel ? englishCopy(film.laurel) : undefined,
  };
}

// Keep the source data intact so Vietnamese names and titles remain unchanged.
export const filmmakerContentEn: FilmmakerContent = {
  ...filmmakerContent,
  profile: {
    ...filmmakerContent.profile,
    firstName: withoutVietnameseDiacritics(filmmakerContent.profile.firstName),
    lastName: withoutVietnameseDiacritics(filmmakerContent.profile.lastName),
    fullName: withoutVietnameseDiacritics(filmmakerContent.profile.fullName),
  },
  bio: {
    ...filmmakerContent.bio,
    paragraphs: filmmakerContent.bio.paragraphs.map(englishCopy),
  },
  films: filmmakerContent.films.map(localizeEnglishFilm),
  experiences: filmmakerContent.experiences.map((item) => ({
    ...item,
    role: englishCopy(item.role), company: englishCopy(item.company), location: englishCopy(item.location),
    description: englishCopy(item.description), achievements: item.achievements.map(englishCopy),
  })),
  awards: filmmakerContent.awards.map((item) => ({ ...item, name: englishCopy(item.name), project: englishCopy(item.project) })),
  socials: filmmakerContent.socials.map((item) => ({ ...item, handle: withoutVietnameseDiacritics(item.handle) })),
  creditsClosing: Object.fromEntries(Object.entries(filmmakerContent.creditsClosing).map(([key, text]) => [key, englishCopy(text)])) as FilmmakerContent['creditsClosing'],
};

export const archiveFilmsEn = archiveFilms.map(localizeEnglishFilm);
export const journeyYearsEn = journeyYears.map((entry) => ({
  ...entry,
  location: withoutVietnameseDiacritics(entry.location),
  photos: entry.photos.map((photo) => ({ ...photo, alt: withoutVietnameseDiacritics(photo.alt) })),
}));
