import React, { useEffect, useState } from 'react';
import { formatSMPTETimecode } from '../utils/timecode';

interface TimecodeHUDProps {
  scrollProgress: number;
}

export const TimecodeHUD: React.FC<TimecodeHUDProps> = ({ scrollProgress }) => {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setTimecode(formatSMPTETimecode(scrollProgress));
    setPercent(Math.round(scrollProgress * 100));
  }, [scrollProgress]);

  return (
    <>
      {/* Top Scroll Progress Playhead */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-black/40 backdrop-blur-sm pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-stone-ground via-hive-delight to-hive-delight transition-all duration-75 ease-out shadow-[0_0_12px_rgba(241,195,76,0.8)]"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>

      {/* Cinematic Viewfinder HUD: Bottom-Right */}
      <div 
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-sm bg-noble-black/85 backdrop-blur-md border border-deep-bronze/70 text-wainscot-green font-montserrat text-[11px] tracking-wider pointer-events-none select-none shadow-bronze-surface"
        aria-label="Camera playback timecode HUD"
      >
        <div className="flex items-center gap-1.5 pr-2 border-r border-deep-bronze/80">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <span className="text-[10px] uppercase font-semibold text-solo/80">REC</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-hive-delight font-medium text-xs tracking-widest min-w-[88px]">
          <span>TC</span>
          <span className="text-solo">{timecode}</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-deep-bronze/80 text-[10px] text-wainscot-green">
          <span>24.00 FPS</span>
          <span className="text-olivia">•</span>
          <span>2.39:1</span>
        </div>
      </div>
    </>
  );
};
