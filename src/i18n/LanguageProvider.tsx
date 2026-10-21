import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filmmakerContentEn, archiveFilmsEn, journeyYearsEn } from '../data/content.en';
import { filmmakerContentVi, archiveFilmsVi, journeyYearsVi } from '../data/content.vi';
import { translateText, type Language } from './translations';
import { LanguageContext, type LanguageContextValue } from './useLanguage';

const STORAGE_KEY = 'portfolio-language';
const readLanguage = (): Language => {
  try { return window.localStorage.getItem(STORAGE_KEY) === 'vi' ? 'vi' : 'en'; }
  catch { return 'en'; }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(readLanguage);
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* Storage can be unavailable in private browsing. */ }
  }, []);
  const t = useCallback((text: string, values?: Record<string, string | number>) => translateText(language, text, values), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    const description = language === 'vi'
      ? 'Hồ sơ điện ảnh của Lê Đặng Đài Trang — Nhà sản xuất phim & Trưởng bộ phận Kinh doanh AI tại TP. Hồ Chí Minh, Việt Nam. Câu chuyện về tôi, về phim và về ước mơ.'
      : 'Cinematic portfolio of Le Dang Dai Trang — Film Producer & AI Business Head based in Ho Chi Minh City, Vietnam. Story about me, story about film, story about dream.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    const profile = (language === 'vi' ? filmmakerContentVi : filmmakerContentEn).profile;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${profile.fullName} — ${profile.role}`);
    document.querySelector('meta[name="author"]')?.setAttribute('content', language === 'vi' ? 'Lê Đặng Đài Trang' : 'Le Dang Dai Trang');
    const films = (language === 'vi' ? filmmakerContentVi : filmmakerContentEn).films;
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', [profile.fullName, profile.role, 'Vietnamese Cinema', ...films.map((film) => film.title)].join(', '));
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', language === 'vi'
      ? 'Câu chuyện về tôi · Câu chuyện về phim · Câu chuyện về ước mơ. Tuyển chọn tác phẩm điện ảnh và sản xuất phim Việt Nam.'
      : 'Story about me · Story about film · Story about dream. Selected Vietnamese cinema features and production portfolio.');
    // Refresh scroll measurements after translated paragraphs have reflowed; do not remount the page.
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language, setLanguage, t,
    content: language === 'vi' ? filmmakerContentVi : filmmakerContentEn,
    archive: language === 'vi' ? archiveFilmsVi : archiveFilmsEn,
    journey: language === 'vi' ? journeyYearsVi : journeyYearsEn,
  }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
