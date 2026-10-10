import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 0.3 : 1.8;

    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // 1. Initial state
    tl.set(centerContentRef.current, { opacity: 0, scale: 0.95 })
      .to(centerContentRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
      // 2. Count 0 -> 100
      .to(counterObj, {
        val: 100,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterObj.val));
        }
      })
      // 3. Center content fade out
      .to(centerContentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      })
      // 4. Letterbox bars slide away to reveal hero
      .to(topBarRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut'
      }, '-=0.1')
      .to(bottomBarRef.current, {
        yPercent: 100,
        duration: 0.7,
        ease: 'power3.inOut'
      }, '<')
      .to(containerRef.current, {
        opacity: 0,
        display: 'none',
        duration: 0.1
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex flex-col justify-between pointer-events-auto bg-transparent select-none"
      aria-label="Cinematic Film Loading Screen"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Letterbox Bar */}
      <div
        ref={topBarRef}
        className="h-1/2 w-full bg-noble-black border-b border-deep-bronze/40"
      />

      {/* Center Counter & Slate HUD */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          {/* Subtle crosshairs */}
          <div className="w-16 h-16 border border-olivia/40 rounded-full flex items-center justify-center mb-6 relative animate-pulse">
            <div className="w-2 h-2 bg-hive-delight rounded-full" />
            <div className="absolute w-full h-[1px] bg-olivia/40" />
            <div className="absolute h-full w-[1px] bg-olivia/40" />
          </div>

          {/* 0 -> 100 Digital Counter */}
          <div className="font-playfair font-black text-6xl md:text-8xl text-hive-delight tracking-tight flex items-baseline">
            <span>{count.toString().padStart(3, '0')}</span>
            <span className="text-xl md:text-2xl font-montserrat font-light text-wainscot-green ml-2">%</span>
          </div>
        </div>
      </div>

      {/* Bottom Letterbox Bar */}
      <div
        ref={bottomBarRef}
        className="h-1/2 w-full bg-noble-black border-t border-deep-bronze/40"
      />
    </div>
  );
};
