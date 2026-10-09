import React, { useEffect, useRef } from 'react';

interface GoldenBreezeAtmosphereProps {
  isHovered: boolean;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseAlpha: number;
  streamIndex: number;
  offsetY: number;
  life: number;
  maxLife: number;
  isGlitter: boolean;
  shimmerTimer: number;
  shimmerInterval: number;
}

export const GoldenBreezeAtmosphere: React.FC<GoldenBreezeAtmosphereProps> = ({ isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isHoveredRef = useRef<boolean>(isHovered);

  // Sync ref with prop for smooth continuous animation without re-renders
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;
    let currentIntensity = isHoveredRef.current ? 0.95 : 0.28;
    let currentSpeed = isHoveredRef.current ? 0.038 : 0.009;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Color palette matching the reference image:
    // Hive Delight #F1C34C (bright metallic champagne highlights)
    // Stone Ground #D39730 (warm rich golden amber)
    // Olivia #986626 (deep warm bronze depth)
    const PALETTE = [
      { color: '#F1C34C', weight: 0.45 },
      { color: '#D39730', weight: 0.4 },
      { color: '#986626', weight: 0.15 },
    ];

    const pickColor = () => {
      const rand = Math.random();
      let acc = 0;
      for (const item of PALETTE) {
        acc += item.weight;
        if (rand <= acc) return item.color;
      }
      return '#F1C34C';
    };

    // Calculate wave height at any X coordinate for a specific stream ribbon
    const getWaveY = (xRatio: number, t: number, sIdx: number) => {
      const baselines = [0.82, 0.68, 0.52]; // lower-left to upper-right drift baselines
      const targets = [0.15, 0.08, -0.05];
      const baseRatio = baselines[sIdx] + xRatio * (targets[sIdx] - baselines[sIdx]);

      // Undulating harmonic sine & cosine waves like the reference image
      const wave1 = Math.sin(xRatio * 3.8 + t * 0.45 + sIdx * 1.8) * 0.085;
      const wave2 = Math.cos(xRatio * 7.2 - t * 0.3 + sIdx * 2.4) * 0.045;
      const wave3 = Math.sin(xRatio * 11.5 + t * 0.6) * 0.02;

      return height * (baseRatio + wave1 + wave2 + wave3);
    };

    // Face clearance attenuation (protects portrait face in central zone)
    const getFaceClearance = (px: number, py: number) => {
      const faceCenterX = width * 0.5;
      const faceCenterY = height * 0.38;
      const faceRadiusX = width * 0.24;
      const faceRadiusY = height * 0.24;

      const dx = (px - faceCenterX) / faceRadiusX;
      const dy = (py - faceCenterY) / faceRadiusY;
      const distSq = dx * dx + dy * dy;

      if (distSq < 0.35) return 0;
      if (distSq < 1.0) return (distSq - 0.35) / 0.65;
      return 1;
    };

    // Initialize 90 fine dust particles + 22 glittering bokeh specks
    const PARTICLE_COUNT = 105;
    const particles: DustParticle[] = [];

    const createParticle = (spawnAnywhere = false): DustParticle => {
      const isGlitter = Math.random() < 0.22; // ~22% larger glittering golden specks
      const streamIndex = Math.floor(Math.random() * 3);

      let x = spawnAnywhere ? Math.random() * width * 1.2 - width * 0.1 : -Math.random() * (width * 0.15);
      const xRatio = Math.max(0, Math.min(1, x / width));
      const ribbonY = getWaveY(xRatio, time, streamIndex);

      // Clustered around the ribbon airflow stream with Gaussian-like spread
      const spread = isGlitter ? 45 : 24;
      const offsetY = (Math.random() + Math.random() - 1) * spread;
      const y = ribbonY + offsetY;

      const speed = 0.55 + Math.random() * 0.65;
      const maxLife = 260 + Math.random() * 220;

      return {
        x,
        y,
        vx: speed,
        vy: -speed * 0.42, // diagonal upward-right drift
        size: isGlitter ? 1.8 + Math.random() * 1.4 : 0.6 + Math.random() * 0.8, // fine metallic dust
        color: pickColor(),
        baseAlpha: isGlitter ? 0.75 + Math.random() * 0.25 : 0.35 + Math.random() * 0.45,
        streamIndex,
        offsetY,
        life: spawnAnywhere ? Math.random() * maxLife : 0,
        maxLife,
        isGlitter,
        shimmerTimer: Math.random() * 120,
        shimmerInterval: 140 + Math.random() * 180,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(true));
    }

    // 1. Draw silky undulating volumetric airflow ribbons (like the reference image)
    const drawSilkyAirRibbons = (t: number, intensity: number) => {
      const streamConfigs = [
        { sIdx: 0, width: 7, baseAlpha: 0.32, color: '#F1C34C' },
        { sIdx: 1, width: 5, baseAlpha: 0.26, color: '#D39730' },
        { sIdx: 2, width: 4, baseAlpha: 0.22, color: '#986626' },
      ];

      streamConfigs.forEach(({ sIdx, width: rWidth, baseAlpha, color }) => {
        const ribbonAlpha = baseAlpha * intensity;
        if (ribbonAlpha <= 0.01) return;

        const steps = 60;
        const pts: { x: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
          const xRatio = i / steps;
          const px = -width * 0.12 + xRatio * (width * 1.24);
          const py = getWaveY(xRatio, t, sIdx);
          pts.push({ x: px, y: py });
        }

        // Draw soft volumetric aura layer around the ribbon
        ctx.save();
        ctx.beginPath();
        pts.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });

        const gradAura = ctx.createLinearGradient(0, height, width, 0);
        gradAura.addColorStop(0, 'rgba(152, 102, 38, 0)');
        gradAura.addColorStop(0.3, `rgba(211, 151, 48, ${ribbonAlpha * 0.5})`);
        gradAura.addColorStop(0.65, `rgba(241, 195, 76, ${ribbonAlpha * 0.7})`);
        gradAura.addColorStop(1, 'rgba(211, 151, 48, 0)');

        ctx.strokeStyle = gradAura;
        ctx.lineWidth = rWidth * 2.2;
        ctx.lineCap = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Draw high-luminosity silky core line along the wave crest
        ctx.beginPath();
        pts.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });

        const gradCore = ctx.createLinearGradient(0, height, width, 0);
        gradCore.addColorStop(0, 'rgba(211, 151, 48, 0)');
        gradCore.addColorStop(0.35, `rgba(241, 195, 76, ${ribbonAlpha * 0.85})`);
        gradCore.addColorStop(0.7, `rgba(255, 238, 175, ${ribbonAlpha * 0.95})`);
        gradCore.addColorStop(1, 'rgba(241, 195, 76, 0)');

        ctx.strokeStyle = gradCore;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();
      });
    };

    // 2. Draw fine metallic golden dust mist and shimmering particles
    const updateAndDrawParticles = (t: number, intensity: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife || p.x > width * 1.15 || p.y < -height * 0.15) {
          particles[i] = createParticle(false);
          continue;
        }

        // Particle moves forward diagonally along the airflow - gently accelerates on hover
        const speedMult = currentSpeed / 0.022; // ~0.4x in idle, ~1.7x on hover
        p.x += p.vx * speedMult;

        // Y position smoothly tracks the undulating wave ribbon plus its individual offset
        const xRatio = Math.max(0, Math.min(1, p.x / width));
        const targetRibbonY = getWaveY(xRatio, t, p.streamIndex);
        const microWave = Math.sin(p.life * 0.05 + i) * (p.isGlitter ? 4 : 2);
        p.y = targetRibbonY + p.offsetY + microWave;

        // Smooth fade-in at birth and fade-out at death
        const lifeRatio = p.life / p.maxLife;
        let fade = 1;
        if (lifeRatio < 0.15) {
          fade = lifeRatio / 0.15;
        } else if (lifeRatio > 0.8) {
          fade = (1 - lifeRatio) / 0.2;
        }

        const faceClearance = getFaceClearance(p.x, p.y);
        const renderAlpha = p.baseAlpha * fade * intensity * faceClearance;
        if (renderAlpha <= 0.01) continue;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = renderAlpha;

        if (p.isGlitter) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size * 3.5;
        }
        ctx.fill();

        // Shimmering specular glint on glitter particles
        if (p.isGlitter) {
          p.shimmerTimer++;
          if (p.shimmerTimer >= p.shimmerInterval) {
            const shimmerAge = p.shimmerTimer - p.shimmerInterval;
            const shimmerDuration = 30; // brief metallic light glint
            if (shimmerAge < shimmerDuration) {
              const shimmerFade = Math.sin((shimmerAge / shimmerDuration) * Math.PI);
              const glintAlpha = shimmerFade * intensity * faceClearance;

              if (glintAlpha > 0.08) {
                const arm = 3.5 + p.size;
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 0.8;
                ctx.globalAlpha = glintAlpha;

                // Horizontal cross
                ctx.beginPath();
                ctx.moveTo(p.x - arm, p.y);
                ctx.lineTo(p.x + arm, p.y);
                ctx.stroke();

                // Vertical cross
                ctx.beginPath();
                ctx.moveTo(p.x, p.y - arm);
                ctx.lineTo(p.x, p.y + arm);
                ctx.stroke();
              }
            } else {
              p.shimmerTimer = 0;
              p.shimmerInterval = 140 + Math.random() * 200;
            }
          }
        }

        ctx.restore();
      }
    };

    // Animation render loop
    const render = () => {
      const targetIntensity = isHoveredRef.current ? 0.95 : 0.28;
      const targetSpeed = isHoveredRef.current ? 0.038 : 0.009;

      currentIntensity += (targetIntensity - currentIntensity) * 0.06;
      currentSpeed += (targetSpeed - currentSpeed) * 0.06;

      ctx.clearRect(0, 0, width, height);

      time += currentSpeed;

      // 1. Draw volumetric silky golden ribbons
      drawSilkyAirRibbons(time, currentIntensity);

      // 2. Draw metallic golden dust mist and glittering specks
      updateAndDrawParticles(time, currentIntensity);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      currentIntensity = 0.35;
      drawSilkyAirRibbons(1.5, 0.35);
      updateAndDrawParticles(1.5, 0.35);
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute -inset-10 sm:-inset-16 pointer-events-none select-none z-10 w-[calc(100%+5rem)] sm:w-[calc(100%+8rem)] h-[calc(100%+5rem)] sm:h-[calc(100%+8rem)] overflow-visible"
    />
  );
};
