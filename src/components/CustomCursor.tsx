import React, { useEffect, useRef, useState } from 'react';

interface CursorState {
  text: string;
  isHovered: boolean;
  isPointer: boolean;
  scale: number;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    isHovered: false,
    isPointer: false,
    scale: 1,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate for fine pointer devices (desktop mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check cursor data attributes
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      const clickableTarget = target?.closest('a, button, input, select, textarea, [role="button"]') as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorState({
          text,
          isHovered: true,
          isPointer: true,
          scale: text ? 3.2 : 2.0,
        });
      } else if (clickableTarget) {
        setCursorState({
          text: '',
          isHovered: true,
          isPointer: true,
          scale: 1.6,
        });
      } else {
        setCursorState({
          text: '',
          isHovered: false,
          isPointer: false,
          scale: 1,
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth ring lerp
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      className={`hidden md:block pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-hive-delight rounded-full pointer-events-none transition-transform duration-75"
        style={{ willChange: 'transform' }}
      />

      {/* Cinematic Fluid Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full flex items-center justify-center pointer-events-none border transition-[width,height,background-color,border-color] duration-200 ${
          cursorState.text
            ? 'w-20 h-20 -ml-10 -mt-10 bg-hive-delight/95 border-hive-delight text-noble-black font-semibold text-xs tracking-widest shadow-gold-glow'
            : cursorState.isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 bg-hive-delight/15 border-hive-delight backdrop-blur-[1px]'
            : 'border-solo/40 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorState.text && (
          <span className="font-montserrat font-bold text-[11px] tracking-widest uppercase text-noble-black">
            {cursorState.text}
          </span>
        )}
      </div>
    </div>
  );
};
