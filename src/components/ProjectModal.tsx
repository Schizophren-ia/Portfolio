import React, { useEffect, useState } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import type { FilmProject } from '../data/portfolioData';

interface ProjectModalProps {
  project: FilmProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#1E2524]/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl my-auto rounded-2xl bg-[#1E2524] border border-[#504530]/60 shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#504530]/40 bg-[#1E2524]">
          <div className="flex items-center gap-3">
            <span className="font-mono-tag text-xs tracking-[0.2em] text-[#D39730] uppercase">
              Feature File • {project.index}
            </span>
            <span className="text-[#504530]">•</span>
            <span className="font-sans-ui text-xs text-[#9D9F87]">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#9D9F87] hover:text-[#F1C34C] transition-colors"
          >
            <span>Close (Esc)</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Hero Still or Embedded Video Player */}
          <div className="relative rounded-xl overflow-hidden border border-[#504530]/40 bg-black">
            <div className="widescreen-aspect w-full overflow-hidden relative">
              {isPlayingVideo && project.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
                  title={`${project.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <>
                  <img
                    src={project.posterImage}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-[0.94] contrast-[1.04]"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2524] via-transparent to-transparent flex items-end p-6 sm:p-8">
                    <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="font-mono-tag text-xs text-[#F1C34C] uppercase tracking-wider block mb-1">
                          {project.category}
                        </span>
                        <h3 className="font-editorial text-3xl sm:text-5xl font-medium text-white tracking-wide">
                          {project.title}
                        </h3>
                        {project.englishTitle && (
                          <p className="font-sans-ui text-sm text-[#9D9F87] italic mt-1">
                            {project.englishTitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {project.youtubeId && (
                          <button
                            onClick={() => setIsPlayingVideo(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D39730] text-[#1E2524] font-sans-ui text-xs font-semibold tracking-wider uppercase hover:bg-[#F1C34C] transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-[#1E2524]" />
                            <span>Play Trailer</span>
                          </button>
                        )}

                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#504530] text-[#CCD4D0] font-sans-ui text-xs tracking-wider uppercase hover:text-white hover:border-[#D39730] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>YouTube</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Producer's Insider Log */}
          {project.producerNote && (
            <div className="p-5 rounded-xl border border-[#504530]/40 bg-[#504530]/15">
              <span className="font-mono-tag text-[10px] tracking-[0.2em] text-[#D39730] uppercase block mb-1">
                Producer's Reflection • Ghi Chú Của Nhà Sản Xuất
              </span>
              <p className="font-sans-ui text-sm text-[#CCD4D0] leading-relaxed italic">
                "{project.producerNote}"
              </p>
            </div>
          )}

          {/* Technical Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#504530]/30 font-sans-ui text-xs">
            <div className="space-y-1">
              <span className="text-[#9D9F87] block uppercase font-mono-tag text-[10px]">
                Role
              </span>
              <span className="text-white font-medium">{project.role}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[#9D9F87] block uppercase font-mono-tag text-[10px]">
                Filming Location
              </span>
              <span className="text-white font-medium">{project.locations}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[#9D9F87] block uppercase font-mono-tag text-[10px]">
                Technical Scope
              </span>
              <span className="text-white font-medium">{project.duration} • {project.aspectRatio}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[#9D9F87] block uppercase font-mono-tag text-[10px]">
                Release Year
              </span>
              <span className="text-[#F1C34C] font-mono-tag">{project.year}</span>
            </div>
          </div>

          {/* Storyline & Key Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <h4 className="font-mono-tag text-xs tracking-[0.2em] text-[#D39730] uppercase">
                Synopsis & Narrative
              </h4>
              <p className="font-editorial text-xl sm:text-2xl text-white font-light italic leading-relaxed">
                "{project.shortDescription}"
              </p>
              <p className="font-sans-ui text-sm text-[#CCD4D0] leading-relaxed font-light">
                {project.fullSynopsis}
              </p>

              {/* Highlights */}
              <div className="pt-4 space-y-2">
                <span className="font-mono-tag text-[10px] text-[#986626] uppercase block">
                  Recognition & Production Highlights
                </span>
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans-ui text-[#9D9F87]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D39730]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Team Card */}
            <div className="lg:col-span-4 p-6 rounded-xl border border-[#504530]/30 bg-[#504530]/10 space-y-4 text-xs font-sans-ui">
              <h4 className="font-mono-tag text-xs tracking-[0.2em] text-[#D39730] uppercase">
                Credits
              </h4>
              <div>
                <span className="text-[#9D9F87] block uppercase text-[10px] mb-0.5">Director</span>
                <span className="text-white font-medium text-sm">{project.director}</span>
              </div>
              <div>
                <span className="text-[#9D9F87] block uppercase text-[10px] mb-0.5">Key Cast & Team</span>
                <span className="text-[#CCD4D0] leading-relaxed block">{project.castAndCrew}</span>
              </div>
              <div className="pt-2 border-t border-[#504530]/30">
                <span className="text-[#9D9F87] block uppercase text-[10px] mb-0.5">Producer</span>
                <span className="text-[#F1C34C] font-medium">{project.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
