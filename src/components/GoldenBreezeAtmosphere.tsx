import React, { useId } from 'react';

interface GoldenBreezeAtmosphereProps {
  isHovered: boolean;
}

// 14 perimeter metallic particles positioned strictly along the outer perimeter (Stone Ground, Hive Delight, Olivia)
const BREEZE_PARTICLES = [
  // Top edge perimeter
  { top: '3%', left: '16%', size: 2, color: '#F1C34C', delay: '0.2s', duration: '6.5s', driftX: '10px', driftY: '-6px' },
  { top: '4%', left: '48%', size: 1.5, color: '#D39730', delay: '1.8s', duration: '7.8s', driftX: '14px', driftY: '-4px' },
  { top: '2%', left: '78%', size: 2.2, color: '#F1C34C', delay: '3.1s', duration: '6.0s', driftX: '8px', driftY: '-8px' },
  { top: '6%', left: '92%', size: 1.5, color: '#986626', delay: '0.9s', duration: '8.2s', driftX: '12px', driftY: '-5px' },

  // Right edge perimeter
  { top: '22%', left: '97%', size: 2, color: '#F1C34C', delay: '2.4s', duration: '6.2s', driftX: '6px', driftY: '-12px' },
  { top: '48%', left: '98%', size: 1.8, color: '#D39730', delay: '0.5s', duration: '7.0s', driftX: '8px', driftY: '-14px' },
  { top: '74%', left: '96%', size: 2.2, color: '#F1C34C', delay: '3.6s', duration: '5.8s', driftX: '5px', driftY: '-10px' },

  // Bottom edge perimeter
  { top: '96%', left: '84%', size: 2.4, color: '#F1C34C', delay: '1.2s', duration: '6.7s', driftX: '-10px', driftY: '6px' },
  { top: '97%', left: '52%', size: 1.6, color: '#D39730', delay: '2.9s', duration: '7.5s', driftX: '-12px', driftY: '4px' },
  { top: '95%', left: '22%', size: 2, color: '#986626', delay: '0.7s', duration: '6.3s', driftX: '-8px', driftY: '7px' },
  { top: '93%', left: '8%', size: 1.5, color: '#F1C34C', delay: '3.8s', duration: '8.0s', driftX: '-6px', driftY: '5px' },

  // Left edge perimeter
  { top: '76%', left: '3%', size: 1.8, color: '#D39730', delay: '1.5s', duration: '7.2s', driftX: '-5px', driftY: '-10px' },
  { top: '44%', left: '2%', size: 2.2, color: '#F1C34C', delay: '2.2s', duration: '6.4s', driftX: '-6px', driftY: '-14px' },
  { top: '18%', left: '4%', size: 1.5, color: '#986626', delay: '0.3s', duration: '7.9s', driftX: '-4px', driftY: '-8px' },
];

// Occasional optical cross sparkles placed near the frame corners (anamorphic lens glint)
const DELICATE_SPARKLES = [
  { top: '5%', left: '9%', delay: '0.5s', duration: '6.4s' },   // Near Top-Left viewfinder corner
  { top: '4%', left: '91%', delay: '2.8s', duration: '7.2s' },  // Near Top-Right viewfinder corner
  { top: '94%', left: '89%', delay: '4.6s', duration: '6.8s' }, // Near Bottom-Right viewfinder corner
  { top: '93%', left: '11%', delay: '1.9s', duration: '7.6s' }, // Near Bottom-Left viewfinder corner
];

export const GoldenBreezeAtmosphere: React.FC<GoldenBreezeAtmosphereProps> = ({ isHovered }) => {
  const uniqueId = useId();
  const grad1 = `breeze-grad1-${uniqueId}`;
  const grad2 = `breeze-grad2-${uniqueId}`;
  const grad3 = `breeze-grad3-${uniqueId}`;

  return (
    <div
      aria-hidden="true"
      className={`absolute -inset-4 sm:-inset-6 pointer-events-none select-none z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHovered ? 'opacity-90 scale-[1.01]' : 'opacity-40 scale-100'
      }`}
    >
      {/* 1. Subtle perimeter ambient vignette - center remains 100% untouched & clear */}
      <div className="absolute inset-2 sm:inset-3 rounded-md bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(152,102,38,0.12)_88%,rgba(241,195,76,0.25)_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

      {/* 2. Soft flowing wind streamlines (SVG Curved Motion strictly along the outer borders) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient 1: Hive Delight -> Stone Ground -> Olivia (Warm Golden Wind) */}
          <linearGradient id={grad1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#986626" stopOpacity="0" />
            <stop offset="25%" stopColor="#D39730" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#F1C34C" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#D39730" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#986626" stopOpacity="0" />
          </linearGradient>

          {/* Gradient 2: Stone Ground -> Hive Delight -> Transparent */}
          <linearGradient id={grad2} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1C34C" stopOpacity="0" />
            <stop offset="35%" stopColor="#F1C34C" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#D39730" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#986626" stopOpacity="0" />
          </linearGradient>

          {/* Gradient 3: Olivia Bronze Shimmer */}
          <linearGradient id={grad3} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D39730" stopOpacity="0" />
            <stop offset="50%" stopColor="#F1C34C" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#986626" stopOpacity="0" />
          </linearGradient>

          {/* Golden Breeze Glow Filter */}
          <filter id={`breeze-glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Group with slight glow */}
        <g filter={`url(#breeze-glow-${uniqueId})`}>
          {/* Top-Right sweep streamline */}
          <path
            d="M 270,12 C 325,16 385,34 388,88 C 390,138 382,185 392,235"
            stroke={`url(#${grad1})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            className="breeze-line-1"
          />

          {/* Top-Left gentle breeze streamline */}
          <path
            d="M 130,10 C 72,15 16,38 14,92 C 12,142 22,185 14,230"
            stroke={`url(#${grad2})`}
            strokeWidth="1.1"
            strokeLinecap="round"
            className="breeze-line-2"
          />

          {/* Bottom-Left upward sweep streamline */}
          <path
            d="M 12,310 C 16,370 20,440 65,475 C 110,505 180,488 230,490"
            stroke={`url(#${grad1})`}
            strokeWidth="1.3"
            strokeLinecap="round"
            className="breeze-line-3"
          />

          {/* Bottom-Right upward sweep streamline */}
          <path
            d="M 388,290 C 384,360 380,435 340,472 C 300,505 240,492 190,492"
            stroke={`url(#${grad2})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            className="breeze-line-4"
          />

          {/* Top subtle crest breeze (whisper wind over the camera header) */}
          <path
            d="M 60,18 C 140,5 260,5 340,18"
            stroke={`url(#${grad3})`}
            strokeWidth="0.9"
            strokeLinecap="round"
            className="breeze-line-1"
          />

          {/* Bottom base subtle breeze */}
          <path
            d="M 80,488 C 160,498 240,498 320,486"
            stroke={`url(#${grad3})`}
            strokeWidth="0.9"
            strokeLinecap="round"
            className="breeze-line-2"
          />

          {/* Secondary delicate whisps along top-right & bottom-left */}
          <path
            d="M 310,24 C 350,30 380,55 382,105"
            stroke={`url(#${grad1})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            className="breeze-line-3"
          />
          <path
            d="M 22,420 C 35,460 70,482 120,485"
            stroke={`url(#${grad2})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            className="breeze-line-4"
          />
        </g>
      </svg>

      {/* 3. Tiny Metallic Golden Particles drifting gracefully around the perimeter */}
      <div className="absolute inset-0 overflow-visible">
        {BREEZE_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="breeze-particle absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}`,
              animationDelay: p.delay,
              animationDuration: isHovered ? `${parseFloat(p.duration) * 0.85}s` : p.duration,
              ['--drift-x' as string]: p.driftX,
              ['--drift-y' as string]: p.driftY,
            }}
          />
        ))}
      </div>

      {/* 4. Occasional Delicate Sparkles (Anamorphic lens glints near frame corners) */}
      <div className="absolute inset-0 overflow-visible">
        {DELICATE_SPARKLES.map((s, idx) => (
          <div
            key={idx}
            className="breeze-sparkle absolute"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          >
            {/* Horizontal anamorphic light streak */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent via-hive-delight to-transparent shadow-[0_0_4px_rgba(241,195,76,0.8)]" />
            {/* Vertical cross beam */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-[1px] bg-gradient-to-b from-transparent via-hive-delight to-transparent shadow-[0_0_4px_rgba(241,195,76,0.8)]" />
            {/* Ultra-fine white-gold core glint */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_rgba(241,195,76,1)]" />
          </div>
        ))}
      </div>
    </div>
  );
};
