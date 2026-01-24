'use client';

import { useEffect, useRef } from 'react';

import rocket from '@/assets/planet/rocket.png';
import mars from '@/assets/planet/mars.jpg';
import earth from '@/assets/planet/earthmap.jpg';
import jupiter from '@/assets/planet/jupitermap.jpg';
import mercury from '@/assets/planet/mercurymap.jpg';
import neptun from '@/assets/planet/neptunemap.jpg';
import pluton from '@/assets/planet/plutomap.jpg';
import venus from '@/assets/planet/venusmap.jpg';
import uran from '@/assets/planet/uranusmap.jpg';

type CrashCanvasProps = {
  started: boolean;
  multiplier: number;
};

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
};

type Planet = {
  img: HTMLImageElement;
  srcIndex: number;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  z: number;
};

export function CrashCanvas({ started, multiplier }: CrashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const startedRef = useRef(false);
  const multiplierRef = useRef(multiplier);

  const smoothProgressRef = useRef(0);
  const targetProgressRef = useRef(0);

  const startTimeRef = useRef<number | null>(null);
  const baseProgressRef = useRef(0);
  const phaseRef = useRef<'intro' | 'linked'>('intro');

  const pathRef = useRef<{ x: number; y: number }[]>([]);
  const lastTargetRef = useRef(0);

  useEffect(() => {
    startedRef.current = started;

    if (started) {
      startTimeRef.current = performance.now();

      smoothProgressRef.current = 0;
      baseProgressRef.current = 0;
      lastTargetRef.current = 0;

      phaseRef.current = 'intro';
    }
  }, [started]);

  useEffect(() => {
    multiplierRef.current = multiplier;
    targetProgressRef.current = Math.min(multiplier / 20, 1);
  }, [multiplier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const buildPath = () => {
      const pts: { x: number; y: number }[] = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      for (let i = 0; i <= 120; i++) {
        const p = i / 120;
        pts.push({
          x: w * 0.08 + p * w * 0.72,
          y: h * 0.88 - Math.pow(p, 1.65) * h * 0.65,
        });
      }

      pathRef.current = pts;
    };

    const resizeCanvas = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPath();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars: Star[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.4 + 0.4,
      speed: 0.15 + Math.random() * 0.4,
      alpha: 0.4 + Math.random() * 0.6,
    }));

    const drawStars = () => {
      stars.forEach((s) => {
        s.x -= s.speed;
        if (s.x < -5) {
          s.x = canvas.offsetWidth + 5;
          s.y = Math.random() * canvas.offsetHeight;
        }

        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const planetImgs = [mars, earth, jupiter, mercury, neptun, pluton, venus, uran];

    const spawnPlanet = (srcIndex: number): Planet => {
      const img = new Image();
      img.src = planetImgs[srcIndex].src;

      const z = 0.35 + Math.random() * 0.9;
      const x = canvas.offsetWidth + Math.random() * canvas.offsetWidth * 0.6;
      const y = canvas.offsetHeight * (0.2 + Math.random() * 0.6);
      const speed = (0.6 + Math.random() * 1.4) * z;

      return {
        img,
        srcIndex,
        x,
        y,
        r: (22 + Math.random() * 26) * z,
        vx: -speed,
        vy: (Math.random() - 0.5) * 0.2 * z,
        speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002 * z,
        z,
      };
    };

    const planets: Planet[] = planetImgs.map((_, i) => spawnPlanet(i));

    const drawPlanets = (delta: number) => {
      const PLANET_SPEED_MULT = 0.35;
      planets.sort((a, b) => a.z - b.z);

      planets.forEach((p, i) => {
        p.x += p.vx * delta * 60 * PLANET_SPEED_MULT;
        p.y += p.vy * delta * 60 * PLANET_SPEED_MULT;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.r * 3) {
          planets[i] = spawnPlanet(p.srcIndex);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const glow = ctx.createRadialGradient(0, 0, p.r * 0.85, 0, 0, p.r * 1.08);
        glow.addColorStop(0, 'rgba(180,220,255,0)');
        glow.addColorStop(0.7, `rgba(180,220,255,${0.12 * p.z})`);
        glow.addColorStop(1, `rgba(180,220,255,${0.22 * p.z})`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 1.08, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.clip();

        ctx.filter = 'brightness(1.9) contrast(0.9) saturate(0.9)';
        ctx.drawImage(p.img, -p.r, -p.r, p.r * 2, p.r * 2);
        ctx.filter = 'none';

        ctx.restore();
      });
    };

    const rocketImg = new Image();
    rocketImg.src = rocket.src;

    const getRocketSize = () => (canvas.offsetWidth < 768 ? 140 : 265);

    const drawTrail = (pts: { x: number; y: number }[], end: number) => {
      if (end < 2) return;

      ctx.lineCap = 'round';

      ctx.strokeStyle = '#F5C003';
      ctx.lineWidth = 16;
      ctx.beginPath();
      pts.slice(0, end).forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      ctx.strokeStyle = '#FFD84D';
      ctx.lineWidth = 8;
      ctx.beginPath();
      pts.slice(0, end).forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
    };

    let lastTime = performance.now();

    const draw = () => {
      const now = performance.now();
      let delta = (now - lastTime) / 1000;
      lastTime = now;
      if (delta > 0.05) delta = 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (startedRef.current) {
        drawStars();
        drawPlanets(delta);

        const elapsed = startTimeRef.current ? (now - startTimeRef.current) / 1000 : 0;

        if (phaseRef.current === 'intro') {
          baseProgressRef.current += delta * 0.18;

          smoothProgressRef.current = baseProgressRef.current;

          if (elapsed >= 2) {
            phaseRef.current = 'linked';
          }
        } else {
          const follow = 1 - Math.exp(-delta * 6);

          const next =
            smoothProgressRef.current +
            (targetProgressRef.current - smoothProgressRef.current) * follow;

          smoothProgressRef.current = Math.max(smoothProgressRef.current, next);
        }

        const path = pathRef.current;
        const idx = Math.floor(
          Math.max(0, Math.min(smoothProgressRef.current, 1)) * (path.length - 2),
        );

        drawTrail(path, idx);

        const curr = path[idx];
        const next = path[idx + 1];

        if (curr && next) {
          const pathAngle = Math.atan2(next.y - curr.y, next.x - curr.x);

          const BASE_ROTATION = Math.PI / 4;
          const TAIL_TILT = Math.PI * 0.06;
          const angle = pathAngle + BASE_ROTATION - TAIL_TILT;

          const size = getRocketSize();
          const dx = Math.cos(pathAngle);
          const dy = Math.sin(pathAngle);

          const nx = -dy;
          const ny = dx;

          const targetDelta = Math.abs(targetProgressRef.current - lastTargetRef.current);
          const isStalled = targetDelta < 0.0002;

          lastTargetRef.current = targetProgressRef.current;

          const jitter = isStalled ? Math.sin(now * 0.02) * 1.2 : 0;
          const jitterRot = isStalled ? Math.sin(now * 0.015) * 0.006 : 0;

          ctx.save();
          ctx.translate(
            curr.x + dx * size * 0.4 + nx * jitter,
            curr.y + dy * size * 0.4 + ny * jitter,
          );
          ctx.rotate(angle + jitterRot);
          ctx.drawImage(rocketImg, -size / 2, -size / 2, size, size);
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]"
    />
  );
}
