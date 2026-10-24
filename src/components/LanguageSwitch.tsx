import { useLanguage } from '../i18n/useLanguage';

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      type="button"
      data-language-switch
      aria-label={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
      aria-pressed={language === 'vi'}
      title="English / Tiếng Việt"
      onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
      className={`language-switch min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1 bg-transparent px-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-hive-delight ${className}`}
    >
      <span lang="en" className={language === 'en' ? 'text-hive-delight underline underline-offset-4' : 'text-wainscot-green'}>EN</span>
      <span aria-hidden="true" className="text-stone-ground">/</span>
      <span lang="vi" className={language === 'vi' ? 'text-hive-delight underline underline-offset-4' : 'text-wainscot-green'}>VI</span>
    </button>
  );
}
