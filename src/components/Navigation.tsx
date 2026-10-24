import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { formatSMPTETimecode } from '../utils/timecode';
import { useLanguage } from '../i18n/useLanguage';
import { LanguageSwitch } from './LanguageSwitch';
import { scrollToSection as navigateToSection } from '../utils/smoothScroll';

export const Navigation: React.FC = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const desktopTimecodeRef = useRef<HTMLSpanElement>(null);
  const mobileTimecodeRef = useRef<HTMLSpanElement>(null);

  const navLinks = [
    { label: 'ABOUT', href: '#about', act: 'ACT I' },
    { label: 'FILMMAKING', href: '#filmmaking', act: 'ACT II' },
    { label: 'JOURNEY', href: '#experiences', act: 'ACT III' },
    { label: 'CONTACT', href: '#contact', act: 'ACT IV' },
  ];

  useEffect(() => {
    const root = document.documentElement;
    const sections = ['hero', 'about', 'filmmaking', 'experiences', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    let measureNeeded = true;
    let starts: { id: string; top: number }[] = [];
    let maxScroll = 0;
    let headerHeight = 73;
    let lastActive = 'hero';
    let lastTimecode = '';
    let lastTimecodeUpdate = -Infinity;

    const update = (time: number) => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      // Cache geometry on layout changes, not on every scroll event.
      if (measureNeeded) {
        headerHeight = headerRef.current?.getBoundingClientRect().height ?? 73;
        starts = sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top + y }));
        maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
        const heightValue = `${headerHeight}px`;
        if (root.style.getPropertyValue('--header-height') !== heightValue) {
          root.style.setProperty('--header-height', heightValue);
        }
        measureNeeded = false;
      }
      const progress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;
      let active = starts[0]?.id ?? 'hero';
      // A reading line under the fixed header works for sections of any length.
      for (const section of starts) {
        if (section.top <= y + headerHeight + 24) active = section.id;
        else break;
      }
      if (maxScroll > 0 && y >= maxScroll - 2) active = starts.at(-1)?.id ?? active;
      if (active !== lastActive) {
        lastActive = active;
        setActiveSection(active);
      }
      // Compositor-friendly progress; React only renders on section/menu changes.
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      if (time - lastTimecodeUpdate >= 1000 / 24 || y === 0 || y >= maxScroll - 2) {
        const timecode = formatSMPTETimecode(progress);
        if (timecode !== lastTimecode) {
          if (desktopTimecodeRef.current) desktopTimecodeRef.current.textContent = timecode;
          if (mobileTimecodeRef.current) mobileTimecodeRef.current.textContent = timecode;
          lastTimecode = timecode;
        }
        lastTimecodeUpdate = time;
      } else {
        schedule(); // Flush the final timecode even if scrolling just stopped.
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const invalidate = () => { measureNeeded = true; schedule(); };
    const resizeObserver = new ResizeObserver(invalidate);
    sections.forEach((section) => resizeObserver.observe(section));
    if (headerRef.current) resizeObserver.observe(headerRef.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', invalidate, { passive: true });
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', invalidate);
      root.style.removeProperty('--header-height');
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateToSection(href);
  };

  return (
    <>
      {/* Blue scroll-progress line above the light navigation. */}
      <div
        className="navigation-progress fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="navigation-progress-fill h-full origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <header
        ref={headerRef}
        className="navigation-light fixed top-0 left-0 right-0 z-50 flex items-center border-b border-deep-bronze shadow-[0_6px_24px_rgba(10,27,46,0.12)]"
      >
        <div className="w-full max-w-7xl mx-auto px-4 min-[400px]:px-6 sm:px-8 flex items-center gap-2 lg:gap-6">
          {/* Brand link: "Portfolio" */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="inline-flex shrink-0 items-center font-playfair font-black tracking-[0.22em] text-base sm:text-lg uppercase text-solo hover:text-hive-delight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-delight"
            aria-label="Portfolio"
          >
            Portfolio
          </a>

          {/* Desktop Navigation Links + Timecode Counter */}
          <div className="ml-auto hidden lg:flex items-center justify-end gap-6 xl:gap-8">
            <nav className="flex items-center justify-end gap-5 xl:gap-8" aria-label={t('Main Navigation')}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative inline-grid items-center justify-center py-1 font-montserrat text-sm tracking-widest uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-hive-delight group ${
                      isActive
                        ? 'text-hive-delight font-semibold'
                        : 'text-wainscot-green hover:text-solo'
                    }`}
                  >
                    {/* Reserve the bold label's width so active changes do not shift links. */}
                    <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">{t(link.label)}</span>
                    <span className="col-start-1 row-start-1">{t(link.label)}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-hive-delight transition-transform duration-200 motion-reduce:transition-none ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Timecode counter display in nav bar */}
            <div
              className="flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-sm bg-deep-bronze/40 border border-deep-bronze/70 text-[13px] font-mono select-none"
              title={t('Current Film Playhead Timecode')}
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              <span className="text-wainscot-green text-xs uppercase font-montserrat tracking-widest">TC</span>
              <span ref={desktopTimecodeRef} className="navigation-timecode-value text-hive-delight font-semibold tracking-wider">00:00:00:00</span>
            </div>
            <LanguageSwitch className="inline-flex" />
          </div>

          {/* Mobile Right Controls: Timecode + Hamburger */}
          <div className="ml-auto lg:hidden flex items-center gap-1.5 sm:gap-3">
            <div className="flex shrink-0 items-center gap-1.5 px-2 py-1 rounded bg-deep-bronze/50 border border-deep-bronze text-xs font-mono text-hive-delight">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span ref={mobileTimecodeRef} className="navigation-timecode-value">00:00:00:00</span>
            </div>

            <LanguageSwitch className="hidden min-[375px]:inline-flex" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-solo hover:text-hive-delight focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-delight"
              aria-expanded={mobileMenuOpen}
              aria-label={t('Toggle Mobile Menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div data-lenis-prevent className="navigation-drawer lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b border-deep-bronze/80 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm uppercase tracking-widest text-wainscot-green">{t('Language')}</span>
              <LanguageSwitch className="inline-flex" />
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-baseline justify-between py-2 border-b border-deep-bronze/40 font-montserrat text-base tracking-widest ${
                      isActive ? 'text-hive-delight font-semibold underline underline-offset-4' : 'text-solo'
                    }`}
                  >
                    <span>{t(link.label)}</span>
                    <span className="text-xs text-wainscot-green tracking-widest">{t(link.act)}</span>
                  </a>
                );
              })}
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full text-center py-3 bg-hive-delight text-noble-black font-montserrat font-semibold text-sm tracking-widest uppercase rounded-sm shadow-gold-glow"
            >
              {t("LET'S COLLABORATE")}
            </a>
          </div>
        )}
      </header>
    </>
  );
};
