import { createContext, useContext } from 'react';
import type { filmmakerContent } from '../data/content';
import type { archiveFilms } from '../data/archiveData';
import type { journeyYears } from '../data/journeyData';
import type { Language } from './translations';

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string, values?: Record<string, string | number>) => string;
  content: typeof filmmakerContent;
  archive: typeof archiveFilms;
  journey: typeof journeyYears;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
