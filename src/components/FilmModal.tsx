import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Award, Film as FilmIcon, Clock, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import type { FilmItem } from '../data/types';
import { FilmThumbnail } from './FilmThumbnail';
import { getSmoothScroll } from '../utils/smoothScroll';

interface FilmModalProps {
  film: FilmItem | null;
  onClose: () => void;
  onNext: () => void;
}

export const FilmModal: React.FC<FilmModalProps> = ({ film, onClose, onNext }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const onCloseRef = useRef(onClose);
  const isOpen = film !== null;

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  const handleAnimatedClose = useCallback(() => {
    if (closingRef.current || !modalRef.current) return;
    closingRef.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCloseRef.current();
      return;
    }
    closeTweenRef.current = gsap.to(modalRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => onCloseRef.current(),
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;
    const root = document.getElementById('root');
    const previousInert = root?.inert ?? false;
    const previousFocus = document.activeElement;
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const originalGutter = html.style.scrollbarGutter;
    const originalOverflow = document.body.style.overflow;
    const lenis = getSmoothScroll();
    const resumeLenis = Boolean(lenis && !lenis.isStopped);

    // Stop the background's virtual scroll as well as native page scrolling.
    if (resumeLenis) lenis?.stop();
    html.style.scrollbarGutter = 'stable';
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (root) root.inert = true;
    closeBtnRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleAnimatedClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(modal.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, iframe, video[controls], [tabindex]',
      )).filter((element) => element.tabIndex >= 0 && !element.hasAttribute('disabled') && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
        modal.focus({ preventScroll: true });
      } else if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      closeTweenRef.current?.kill();
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      html.style.overflow = originalHtmlOverflow;
      html.style.scrollbarGutter = originalGutter;
      if (root) root.inert = previousInert;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
      if (resumeLenis) lenis?.start();
    };
  }, [isOpen, handleAnimatedClose]);

  useEffect(() => {
    if (!film || !modalRef.current) return;
    closingRef.current = false;
    modalRef.current.scrollTop = 0;
    closeBtnRef.current?.focus({ preventScroll: true });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(modalRef.current, { clipPath: 'none', opacity: 1 });
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    // Clip-path circle expand animation
    const tl = gsap.timeline();
    tl.fromTo(
      modalRef.current,
      {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0.9,
      },
      {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        duration: 0.65,
        ease: 'power3.inOut',
      }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, [film]);

  if (!film) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[10000] bg-noble-black/98 flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-10"
      data-lenis-prevent="true"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-film-title"
    >
      {/* Background Vignette Accent */}
      <div aria-hidden="true" className="fixed inset-0 bg-radial-gradient from-deep-bronze/20 via-transparent to-noble-black backdrop-blur-2xl pointer-events-none" />

      {/* Close button in top-right */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={handleAnimatedClose}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-deep-bronze/70 hover:bg-hive-delight hover:text-noble-black text-solo border border-olivia/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hive-delight shadow-xl"
        aria-label="Close project lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Dialog Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl shrink-0 my-auto bg-[#112A46] border border-deep-bronze/70 rounded-sm shadow-2xl overflow-hidden"
      >
        {/* Video reel or official-source preview */}
        <div className={`relative ${film.mediaType === 'poster' ? 'h-[65vh] sm:h-[75vh]' : 'aspect-video'} w-full bg-black overflow-hidden border-b border-deep-bronze/60`}>
          {film.mediaType === 'poster' ? (
            <FilmThumbnail key={film.id} film={film} className="block h-full w-full object-contain" />
          ) : film.videoUrl && film.mediaType === 'local-video' ? (
            <video
              src={film.videoUrl}
              poster={film.thumbnail}
              className="h-full w-full bg-black object-contain"
              controls
              playsInline
              preload="metadata"
            >
              Trình duyệt của bạn không hỗ trợ video HTML5.
            </video>
          ) : film.videoUrl ? (
            <iframe
              src={film.videoUrl}
              title={film.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <FilmThumbnail key={film.id} film={film} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-noble-black via-transparent to-transparent flex items-end justify-center p-8">
                <a href={film.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-hive-delight text-noble-black font-montserrat font-bold text-xs tracking-widest uppercase">
                  <span>Watch at official source</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Project Meta & Dossier */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Header Row: Index, Title, Year */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-deep-bronze/40 pb-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-montserrat tracking-cinema text-wainscot-green uppercase mb-2">
                <span className="text-hive-delight font-bold">{film.index}</span>
                <span>•</span>
                <span>{film.year}</span>
                <span>•</span>
                <span>{film.genre}</span>
              </div>
              <h2
                id="modal-film-title"
                className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl text-solo tracking-tight uppercase"
              >
                {film.title}
              </h2>
            </div>

            {/* Quick Specs & YouTube Action */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-4 text-xs font-montserrat text-wainscot-green bg-noble-black/70 px-4 py-2 rounded border border-deep-bronze/60">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-hive-delight" />
                  <span>{film.duration}</span>
                </div>
                <div className="w-[1px] h-3 bg-deep-bronze" />
                <div className="flex items-center gap-1.5">
                  <FilmIcon className="w-3.5 h-3.5 text-stone-ground" />
                  <span>{film.aspectRatio}</span>
                </div>
              </div>

              {(film.sourceUrl || film.youtubeUrl) && (
                <a
                  href={film.sourceUrl || film.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-montserrat font-semibold px-4 py-2 rounded bg-deep-bronze/80 hover:bg-hive-delight text-solo hover:text-noble-black border border-olivia/40 hover:border-hive-delight transition-all duration-300"
                >
                  <span>XEM NGUỒN CHÍNH THỨC</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Laurel badge if present */}
          {film.laurel && (
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-deep-bronze/40 border border-olivia/50 rounded-sm text-hive-delight text-xs sm:text-sm font-montserrat tracking-wide">
              <Award className="w-4 h-4 text-hive-delight shrink-0" />
              <span>{film.laurel}</span>
            </div>
          )}

          {/* Logline & Synopsis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-xs font-montserrat uppercase tracking-cinema text-wainscot-green mb-1.5">
                  LOGLINE
                </h3>
                <p className="font-playfair text-lg sm:text-xl text-solo italic leading-relaxed">
                  "{film.logline}"
                </p>
              </div>

              <div>
                <h3 className="text-xs font-montserrat uppercase tracking-cinema text-wainscot-green mb-1.5">
                  DIRECTOR’S INTENT
                </h3>
                <p className="font-montserrat text-sm text-solo/80 leading-relaxed font-light">
                  {film.synopsis}
                </p>
              </div>
            </div>

            {/* Credits Panel: Thể loại, Đạo diễn, Diễn viên */}
            <div className="lg:col-span-5 bg-noble-black/90 p-5 sm:p-6 rounded-sm border border-deep-bronze/80 space-y-4">
              <h4 className="text-xs font-montserrat uppercase tracking-cinema text-hive-delight font-bold border-b border-deep-bronze/60 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-hive-delight" />
                <span>THÔNG TIN PHIM</span>
              </h4>
              <div className="space-y-4 text-xs font-montserrat">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-deep-bronze/30 pb-2.5">
                  <span className="text-wainscot-green uppercase tracking-wider font-semibold">Thể loại:</span>
                  <span className="text-solo font-medium text-left sm:text-right">{film.genre}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-deep-bronze/30 pb-2.5">
                  <span className="text-wainscot-green uppercase tracking-wider font-semibold">Đạo diễn:</span>
                  <span className="text-hive-delight font-semibold text-left sm:text-right">
                    {film.director ||
                      (film.id === 'nham-mat-thay-mua-he' ? 'Cao Thúy Nhi' :
                       film.id === 'troi-sang-roi-ta-ngu-di-thoi' ? 'Chung Chí Công' :
                       film.id === 'sai-gon-trong-con-mua' ? 'Lê Minh Hoàng' :
                       film.id === 'trai-tim-quai-vat' ? 'Tạ Nguyên Hiệp' :
                       film.id === 'giao-lo-8675' ? 'Tân DS' : 'Đang cập nhật')}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 pb-1">
                  <span className="text-wainscot-green uppercase tracking-wider font-semibold">Diễn viên:</span>
                  <span className="text-solo font-medium text-left sm:text-right leading-relaxed max-w-xs">
                    {film.cast || (film.credits.find(c => c.label === "Starring")?.value ?? (
                      film.id === 'nham-mat-thay-mua-he' ? 'Phương Anh Đào, Takafumi Akutsu' :
                      film.id === 'troi-sang-roi-ta-ngu-di-thoi' ? 'Hà Quốc Hoàng, Trần Lê Thúy Vy' :
                      film.id === 'sai-gon-trong-con-mua' ? 'Avin Lu, Hồ Thu Anh' :
                      film.id === 'trai-tim-quai-vat' ? 'Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Trung' :
                      film.id === 'giao-lo-8675' ? 'Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành' : 'Đang cập nhật'
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer: Return or Next Project button */}
          <div className="flex items-center justify-between pt-6 border-t border-deep-bronze/50">
            <button
              type="button"
              onClick={handleAnimatedClose}
              className="text-xs font-montserrat tracking-widest text-wainscot-green hover:text-solo uppercase"
            >
              ← RETURN TO ARCHIVE
            </button>

            <button
              type="button"
              onClick={() => { if (!closingRef.current) onNext(); }}
              className="px-6 py-2.5 bg-hive-delight text-noble-black font-montserrat font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-stone-ground transition-colors flex items-center gap-2 shadow-gold-glow"
            >
              <span>NEXT REEL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
