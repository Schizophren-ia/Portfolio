import React, { useEffect, useRef } from 'react';

interface GoldenBreezeAtmosphereProps {
  isHovered: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  life: number;
  maxLife: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  shimmerTimer: number;
  shimmerInterval: number;
}

export const GoldenBreezeAtmosphere: React.FC<GoldenBreezeAtmosphereProps> = ({ isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isHoveredRef = useRef<boolean>(isHovered);

  // Sync ref with prop
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
    let currentIntensity = isHoveredRef.current ? 0.9 : 0.4;

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

    // Palette: Stone Ground #D39730, Hive Delight #F1C34C, Olivia #986626
    const PALETTE = [
      { color: '#D39730', weight: 0.5 }, // Stone Ground (main)
      { color: '#F1C34C', weight: 0.35 }, // Hive Delight (highlights)
      { color: '#986626', weight: 0.15 }, // Olivia (depth)
    ];

    const pickColor = () => {
      const rand = Math.random();
      let acc = 0;
      for (const item of PALETTE) {
        acc += item.weight;
        if (rand <= acc) return item.color;
      }
      return '#D39730';
    };

    // Initialize 30 particles drifting along lower-left -> upper-right diagonal vector field
    const PARTICLE_COUNT = 32;
    const particles: Particle[] = [];

    const createParticle = (spawnAnywhere = false): Particle => {
      // Spawn near lower-left quadrant or slightly offscreen
      let startX = Math.random() * (width * 0.7) - width * 0.15;
      let startY = height * 0.5 + Math.random() * (height * 0.65);

      if (spawnAnywhere) {
        startX = Math.random() * (width * 1.2) - width * 0.1;
        startY = Math.random() * (height * 1.2) - height * 0.1;
      }

      // Base vector: ~32 to ~42 degrees diagonal upward drift
      const angle = (32 + Math.random() * 12) * (Math.PI / 180);
      const speed = 0.45 + Math.random() * 0.55;

      const maxLife = 240 + Math.random() * 200;

      return {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        size: 0.9 + Math.random() * 1.3, // 0.9px - 2.2px fine dust
        color: pickColor(),
        alpha: 0,
        baseAlpha: 0.25 + Math.random() * 0.55,
        life: spawnAnywhere ? Math.random() * maxLife : 0,
        maxLife,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        wobbleAmp: 0.35 + Math.random() * 0.45,
        shimmerTimer: Math.random() * 180,
        shimmerInterval: 180 + Math.random() * 220, // occasional lens glint
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(true));
    }

    // 3 Independent organic airflow streams (wisps)
    // Moving along diagonal wave paths across the negative space
    const drawAirflowStreams = (t: number, intensity: number) => {
      // Stream configurations (angles, wave phase offsets, vertical baselines)
      const streams = [
        {
          // Main gentle lower-left to upper-right stream
          startX: -width * 0.1,
          startY: height * 0.88,
          endX: width * 1.15,
          endY: height * 0.08,
          amp: height * 0.08,
          freq: 0.003,
          timeSpeed: 0.35,
          strokeWidth: 1.1,
          baseOpacity: 0.28,
        },
        {
          // Secondary trailing airy whisper
          startX: -width * 0.18,
          startY: height * 0.65,
          endX: width * 1.12,
          endY: -height * 0.06,
          amp: height * 0.06,
          freq: 0.004,
          timeSpeed: 0.28,
          strokeWidth: 0.85,
          baseOpacity: 0.22,
        },
        {
          // Lower ambient draft sweeping across bottom-left
          startX: -width * 0.05,
          startY: height * 1.08,
          endX: width * 0.95,
          endY: height * 0.28,
          amp: height * 0.07,
          freq: 0.0035,
          timeSpeed: 0.4,
          strokeWidth: 0.95,
          baseOpacity: 0.24,
        },
      ];

      streams.forEach((stream, sIdx) => {
        const streamAlpha = stream.baseOpacity * intensity;
        if (streamAlpha <= 0.01) return;

        ctx.save();
        ctx.beginPath();

        const steps = 40;
        const dx = (stream.endX - stream.startX) / steps;
        const dy = (stream.endY - stream.startY) / steps;

        for (let i = 0; i <= steps; i++) {
          const px = stream.startX + dx * i;
          const py = stream.startY + dy * i;

          // Organic S-curve wave offset perpendicular to flow direction
          const wave =
            Math.sin(i * 0.18 + t * stream.timeSpeed + sIdx * 1.6) * stream.amp +
            Math.cos(i * 0.09 - t * (stream.timeSpeed * 0.6)) * (stream.amp * 0.4);

          // Normal vector perpendicular to diagonal (approx -dy, dx)
          const normX = -0.55 * (wave / stream.amp);
          const normY = 0.83 * (wave / stream.amp);

          const finalX = px + normX * wave;
          const finalY = py + normY * wave;

          if (i === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }

        // Gradient along the stream: transparent -> Olivia -> Stone Ground -> Hive Delight -> transparent
        const grad = ctx.createLinearGradient(
          stream.startX,
          stream.startY,
          stream.endX,
          stream.endY
        );
        grad.addColorStop(0, 'rgba(152, 102, 38, 0)');
        grad.addColorStop(0.2, `rgba(152, 102, 38, ${streamAlpha * 0.6})`);
        grad.addColorStop(0.5, `rgba(211, 151, 48, ${streamAlpha * 0.9})`);
        grad.addColorStop(0.75, `rgba(241, 195, 76, ${streamAlpha})`);
        grad.addColorStop(1, 'rgba(211, 151, 48, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = stream.strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
      });
    };

    // Draw fine metallic particles drifting organically with air currents
    const updateAndDrawParticles = (_t: number, intensity: number) => {
      // Center face exclusion zone: (normalized center approx 0.38 - 0.62 x, 0.22 - 0.55 y)
      // Any particle entering this center zone is smoothly faded out so the face is 100% clear.
      const faceCenterX = width * 0.5;
      const faceCenterY = height * 0.38;
      const faceRadiusX = width * 0.22;
      const faceRadiusY = height * 0.22;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife || p.x > width * 1.2 || p.y < -height * 0.2) {
          particles[i] = createParticle(false);
          continue;
        }

        // Advance position with diagonal vector + organic gentle breeze wobble
        const wobble = Math.sin(p.life * p.wobbleSpeed + i) * p.wobbleAmp;
        const speedMult = isHoveredRef.current ? 1.2 : 1.0;
        p.x += (p.vx + wobble * 0.3) * speedMult;
        p.y += (p.vy - wobble * 0.2) * speedMult;

        // Smooth life fade in/out
        const lifeRatio = p.life / p.maxLife;
        let fade = 1;
        if (lifeRatio < 0.15) {
          fade = lifeRatio / 0.15;
        } else if (lifeRatio > 0.8) {
          fade = (1 - lifeRatio) / 0.2;
        }

        // Face clearance attenuation
        const dx = (p.x - faceCenterX) / faceRadiusX;
        const dy = (p.y - faceCenterY) / faceRadiusY;
        const faceDistSq = dx * dx + dy * dy;
        let faceClearance = 1;
        if (faceDistSq < 1.0) {
          // Inside face zone: completely fade out to 0
          faceClearance = Math.max(0, (faceDistSq - 0.4) / 0.6);
        }

        const renderAlpha = p.baseAlpha * fade * intensity * faceClearance;
        if (renderAlpha <= 0.01) continue;

        // Render circular metallic gold particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = renderAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2.5;
        ctx.fill();

        // Occasional delicate optical shimmer glint (tiny 4-point cross)
        p.shimmerTimer++;
        if (p.shimmerTimer >= p.shimmerInterval) {
          const shimmerAge = p.shimmerTimer - p.shimmerInterval;
          const shimmerDuration = 35; // ~0.5 second flash
          if (shimmerAge < shimmerDuration) {
            const shimmerFade = Math.sin((shimmerAge / shimmerDuration) * Math.PI);
            const glintAlpha = shimmerFade * intensity * 0.85 * faceClearance;

            if (glintAlpha > 0.05) {
              const armLen = 3.5 + p.size;
              ctx.strokeStyle = '#F1C34C';
              ctx.lineWidth = 0.75;
              ctx.globalAlpha = glintAlpha;

              // Horizontal glint
              ctx.beginPath();
              ctx.moveTo(p.x - armLen, p.y);
              ctx.lineTo(p.x + armLen, p.y);
              ctx.stroke();

              // Vertical glint
              ctx.beginPath();
              ctx.moveTo(p.x, p.y - armLen);
              ctx.lineTo(p.x, p.y + armLen);
              ctx.stroke();

              // Micro white core
              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.arc(p.x, p.y, 0.75, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            p.shimmerTimer = 0;
            p.shimmerInterval = 180 + Math.random() * 260;
          }
        }

        ctx.restore();
      }
    };

    // Main animation loop
    const render = () => {
      // Smoothly interpolate current intensity (idle ~0.4 -> hover ~0.9)
      const targetIntensity = isHoveredRef.current ? 0.9 : 0.42;
      currentIntensity += (targetIntensity - currentIntensity) * 0.05;

      ctx.clearRect(0, 0, width, height);

      time += 0.02;

      // 1. Draw 3 organic diagonal airflow streamlines (free-flowing Bezier waves)
      drawAirflowStreams(time, currentIntensity);

      // 2. Draw metallic gold dust particles drifting with the wind currents
      updateAndDrawParticles(time, currentIntensity);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      // Static single subtle render for reduced-motion accessibility
      currentIntensity = 0.35;
      drawAirflowStreams(1.2, 0.35);
      updateAndDrawParticles(1.2, 0.35);
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
