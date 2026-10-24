import React, { useState, useRef } from 'react';
import { ArrowUp, Copy, Check, Send, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

export const ContactSection: React.FC = () => {
  const { content: filmmakerContent, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);

  const { profile, socials, creditsClosing } = filmmakerContent;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    const mailtoSubject = encodeURIComponent(t('[Film Collaboration] {name}', { name: formState.name }));
    const mailtoBody = encodeURIComponent(
      t('Hello Lê Đặng Đài Trang,\n\n{message}\n\nFrom: {name} ({email})', formState)
    );
    window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Magnetic button effect on mouse move
  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
  };

  const handleMagneticLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate3d(0, 0, 0)';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <section
      id="contact"
      className="relative pt-28 sm:pt-36 px-6 sm:px-10 lg:px-16 bg-noble-black border-t border-deep-bronze/40 overflow-hidden flex flex-col justify-between"
      aria-label={t('Ending Credits and Contact')}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Act Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-montserrat text-xs tracking-cinema uppercase text-wainscot-green font-semibold">
            {t('ACT IV — CONTACT · ENDING CREDITS')}
          </span>
          <div className="w-12 h-[1px] bg-olivia/50" />
        </div>

        {/* Large Rolling Statement: Playfair Display */}
        <div className="mb-20 sm:mb-24 text-center max-w-4xl mx-auto">
          <h2 className="contact-heading font-playfair font-black uppercase tracking-tight text-solo leading-tight">
            {t("LET'S MAKE SOMETHING")}{' '}
            <span className="text-hive-delight">
              {t('UNFORGETTABLE')}
            </span>
          </h2>
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="font-montserrat text-xs sm:text-sm text-hive-delight font-medium tracking-[0.2em] uppercase">
              {creditsClosing.subtitle}
            </p>
            <p className="font-montserrat text-xs sm:text-sm text-wainscot-green font-light max-w-xl text-center tracking-wide">
              {t('Currently coordinating feature films, independent cinema, and creative productions based in Ho Chi Minh City, Vietnam.')}
            </p>
          </div>
        </div>

        {/* Contact Layout Grid: Direct Contact Left (5 cols), Form Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20">
          {/* Direct Details & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct Email */}
            <div className="space-y-2">
              <span className="font-montserrat text-[10px] tracking-cinema text-wainscot-green uppercase block">
                {t('DIRECT INQUIRY')}
              </span>
              <div className="contact-email-row flex min-w-0 flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-email min-w-0 font-montserrat font-bold text-solo hover:text-hive-delight transition-colors"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-11 min-w-11 inline-flex items-center justify-center p-2 rounded border border-olivia text-solo hover:text-hive-delight hover:border-hive-delight transition-colors shrink-0"
                  aria-label={t('Copy email address')}
                  title={t('Copy email')}
                >
                  {copied ? <Check className="w-4 h-4 text-hive-delight" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] tracking-cinema text-wainscot-green uppercase block">
                {t('TELEPHONE / AGENT')}
              </span>
              <a
                href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                className="font-montserrat text-xl sm:text-2xl text-solo hover:text-hive-delight transition-colors inline-flex items-center gap-2 group"
              >
                <Phone className="w-4 h-4 text-stone-ground" />
                <span className="whitespace-nowrap tabular-nums lining-nums tracking-normal">{profile.phone}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-ground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Studio Base / Availability */}
            <div className="space-y-1">
              <span className="font-montserrat text-[10px] tracking-cinema text-wainscot-green uppercase block">
                {t('PRODUCTION BASES')}
              </span>
              <p className="font-montserrat text-sm text-solo flex items-center gap-2">
                <MapPin className="w-4 h-4 text-hive-delight" />
                <span>{profile.location}</span>
              </p>
              <p className="font-montserrat text-xs text-wainscot-green pt-1">
                {profile.availability}
              </p>
            </div>

            {/* Social Links with Hover Micro-Animations in Hive Delight */}
            <div className="space-y-3 pt-4 border-t border-deep-bronze/40">
              <span className="font-montserrat text-[10px] tracking-cinema text-wainscot-green uppercase block">
                {t('CHANNELS & NETWORKS')}
              </span>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group min-h-11 px-3.5 py-1.5 rounded-sm bg-noble-black border border-olivia text-solo hover:text-hive-delight hover:border-hive-delight text-xs font-montserrat tracking-wider flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-wainscot-green group-hover:text-hive-delight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Midnight Blue form surface within the unified navy page. */}
          <div className="contact-form-panel navy-card min-w-0 lg:col-span-7 p-5 sm:p-8 rounded-sm border">
            <h3 className="contact-form-title font-playfair font-black text-solo uppercase tracking-tight mb-2">
              {t('INITIATE COLLABORATION')}
            </h3>
            <p className="font-montserrat text-xs text-wainscot-green mb-8">
              {t('Send a project brief, treatment, or inquiry. All correspondence is held in artistic confidence.')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-montserrat text-[10px] tracking-widest text-wainscot-green uppercase mb-2">
                    {t('YOUR NAME *')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t('Jane Doe')}
                    className="contact-field w-full px-4 py-3 rounded-sm border text-sm focus:border-hive-delight transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-montserrat text-[10px] tracking-widest text-wainscot-green uppercase mb-2">
                    {t('EMAIL ADDRESS *')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="producer@studio.com"
                    className="contact-field w-full px-4 py-3 rounded-sm border text-sm focus:border-hive-delight transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-montserrat text-[10px] tracking-widest text-wainscot-green uppercase mb-2">
                  {t('SYNOPSIS / COLLABORATION NOTES *')}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t('Outline the vision, timeline, production locations, or envisioned aesthetic...')}
                  className="contact-field w-full px-4 py-3 rounded-sm border text-sm focus:border-hive-delight transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3">
                <span className="font-montserrat text-[10px] text-wainscot-green flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-stone-ground" />
                  <span>{t('DISPATCHED VIA SECURE MAIL CLIENT')}</span>
                </span>

                {/* Large Magnetic Send Message Button */}
                <button
                  ref={magneticBtnRef}
                  type="submit"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="contact-submit relative px-8 py-3.5 font-montserrat font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-200 flex items-center gap-2 select-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('SEND MESSAGE')}</span>
                </button>
              </div>

              {formSubmitted && (
                <div className="p-3 bg-hive-delight/15 border border-hive-delight/40 rounded text-xs font-montserrat text-hive-delight">
                  {t('Draft prepared in your email client. Looking forward to our artistic journey.')}
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>

    {/* Ending credits continue the unified navy page. */}
    <footer className="theme-navy bg-noble-black px-6 sm:px-10 lg:px-16 py-16 border-t border-deep-bronze/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-montserrat text-wainscot-green">
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-center md:justify-start md:text-left">
            <span className="font-playfair font-bold text-solo text-sm">
              © 2026 {profile.fullName}.
            </span>
            <span className="text-[10px] uppercase tracking-wider">{t('All rights reserved.')}</span>
          </div>

          {/* Center Cinematic "THE END" Stamp */}
          <div className="text-center">
            <span className="font-playfair italic text-solo/60 text-lg tracking-widest">
              {t('— THE END —')}
            </span>
            <span className="block text-[9px] uppercase tracking-ultra text-wainscot-green/60 mt-0.5">
              {t('THE END CROWNS THE WORK')}
            </span>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 uppercase font-montserrat text-[11px] tracking-widest text-solo hover:text-hive-delight transition-colors group"
          >
            <span>{t('BACK TO TOP')}</span>
            <ArrowUp className="w-3.5 h-3.5 text-stone-ground group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
    </footer>
    </>
  );
};
