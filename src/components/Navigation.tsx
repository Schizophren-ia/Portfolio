import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { filmmakerContent } from '../data/content';
import { formatSMPTETimecode } from '../utils/timecode';

interface NavigationProps {
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { label: 'ABOUT', href: '#about', act: 'ACT I' },
    { label: 'FILMMAKING', href: '#filmmaking', act: 'ACT II' },
    { label: 'EXPERIENCES', href: '#experiences', act: 'ACT III' },
    { label: 'CONTACT', href: '#contact', act: 'ACT IV' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setScrollProgress(progress);
      setScrolled(currentScroll > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTimecode = formatSMPTETimecode(scrollProgress);

  return (
    <>
      {/* Top Thin Hive Delight Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-noble-black/40 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-stone-ground via-hive-delight to-hive-delight transition-all duration-75 ease-out shadow-[0_0_10px_rgba(241,195,76,0.8)]"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-noble-black/90 backdrop-blur-md border-b border-deep-bronze/60 py-3.5 shadow-bronze-surface'
            : 'bg-gradient-to-b from-noble-black/80 via-noble-black/30 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Initials */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-3 text-solo hover:text-hive-delight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-delight"
            aria-label="Lê Đặng Đài Trang - Film Producer Portfolio"
          >
            <div className="relative w-8 h-8 rounded-sm border border-deep-bronze/80 group-hover:border-hive-delight flex items-center justify-center bg-deep-bronze/30 transition-colors">
              <span className="font-playfair font-black text-sm text-hive-delight">DT</span>
              {/* Camera viewfinder corner accents */}
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-hive-delight/70" />
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-hive-delight/70" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-playfair font-bold tracking-widest text-xs sm:text-sm text-solo group-hover:text-hive-delight transition-colors whitespace-nowrap">
                {filmmakerContent.profile.fullName}
              </span>
              <span className="hidden xs:block font-montserrat text-[8.5px] uppercase tracking-cinema text-wainscot-green">
                PRODUCER · FILMMAKER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links + Timecode Counter */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative py-1 font-montserrat text-xs tracking-widest uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-hive-delight group ${
                      isActive
                        ? 'text-hive-delight font-medium'
                        : 'text-wainscot-green hover:text-solo'
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Animated Hive Delight underline on hover & active */}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-stone-ground to-hive-delight transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Timecode counter display in nav bar */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-deep-bronze/40 border border-deep-bronze/70 text-[11px] font-mono select-none"
              title="Current Film Playhead Timecode"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              <span className="text-wainscot-green text-[10px] uppercase font-montserrat tracking-widest">TC</span>
              <span className="text-hive-delight font-semibold tracking-wider">{currentTimecode}</span>
            </div>

            {/* CTA Inquire */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-4 py-1.5 text-xs font-montserrat font-medium tracking-wider uppercase rounded-sm border border-hive-delight/80 text-hive-delight hover:bg-hive-delight hover:text-noble-black transition-all duration-200 shadow-gold-glow/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-delight"
            >
              INQUIRE
            </a>
          </div>

          {/* Mobile Right Controls: Timecode + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-deep-bronze/50 border border-deep-bronze text-[10px] font-mono text-hive-delight">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>{currentTimecode}</span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-solo hover:text-hive-delight focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-delight"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[60px] bg-noble-black/98 border-b border-deep-bronze/80 backdrop-blur-xl px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-baseline justify-between py-2 border-b border-deep-bronze/40 font-montserrat text-sm tracking-widest ${
                      isActive ? 'text-hive-delight font-semibold' : 'text-solo'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-wainscot-green tracking-widest">{link.act}</span>
                  </a>
                );
              })}
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full text-center py-3 bg-hive-delight text-noble-black font-montserrat font-semibold text-xs tracking-widest uppercase rounded-sm shadow-gold-glow"
            >
              LET'S COLLABORATE
            </a>
          </div>
        )}
      </header>
    </>
  );
};
