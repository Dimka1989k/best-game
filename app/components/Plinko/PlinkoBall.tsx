'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { PlinkoDrop } from '@/types/plinko.types';

type Props = {
  drop: PlinkoDrop;
  rows: number;
  fieldRef: RefObject<HTMLDivElement | null>;
  multipliersRef: RefObject<HTMLDivElement | null>;
};

type Step = {
  x: number;
  y: number;
  duration: number;
  ease: 'easeIn' | 'easeOut' | 'linear';
};

export function PlinkoBall({ drop, rows, fieldRef, multipliersRef }: Props) {
  const controls = useAnimation();
  const stepsRef = useRef<Step[] | null>(null);
  const landedRef = useRef(false);

  useLayoutEffect(() => {
    if (!fieldRef.current || !multipliersRef.current) return;

    landedRef.current = false;

    const fieldRect = fieldRef.current.getBoundingClientRect();
    const slot = multipliersRef.current.querySelector<HTMLDivElement>(
      `[data-slot-index="${drop.slotIndex}"]`,
    );
    if (!slot) return;

    const slotRect = slot.getBoundingClientRect();

    const isMobile = window.innerWidth < 640;
    const ballSize = isMobile ? 10 : 18;
    const r = ballSize / 2;

    const startX = fieldRect.width / 2 - r;
    const startY = 12;

    controls.set({ x: startX, y: startY, rotate: 0 });

    const targetX = slotRect.left - fieldRect.left + slotRect.width / 2 - r;

    const targetY = slotRect.top - fieldRect.top - r;

    const rowGap = (targetY - startY) / rows;
    const stepX = (targetX - startX) / drop.path.length;

    let x = startX;

    const steps: Step[] = [];

    drop.path.forEach((dir, i) => {
      const hitY = startY + rowGap * (i + 1);

      const progress = (i + 1) / rows;
      const baseX = startX + (targetX - startX) * progress;
      const wiggle = (dir ? 1 : -1) * Math.min(12, Math.abs(stepX));
      const hitX = baseX + wiggle;

      steps.push({
        x,
        y: hitY,
        duration: 0.12,
        ease: 'easeIn',
      });

      steps.push({
        x: hitX,
        y: hitY - r * 0.6,
        duration: 0.08,
        ease: 'easeOut',
      });

      steps.push({
        x: hitX,
        y: hitY + r * 0.4,
        duration: 0.1,
        ease: 'easeIn',
      });

      x = hitX;
    });
    x = targetX;

    steps.push({
      x: targetX,
      y: targetY,
      duration: 0.22,
      ease: 'easeOut',
    });

    stepsRef.current = steps;
  }, [drop, rows, fieldRef, multipliersRef, controls]);

  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps) return;

    let cancelled = false;

    (async () => {
      for (const step of steps) {
        if (cancelled) return;

        await controls.start({
          x: step.x,
          y: step.y,
          rotate: Math.random() * 12 - 6,
          transition: {
            duration: step.duration,
            ease: step.ease,
          },
        });
      }

      landedRef.current = true;

      const slot = multipliersRef.current?.querySelector<HTMLDivElement>(
        `[data-slot-index="${drop.slotIndex}"]`,
      );
      slot?.classList.add('plinko-slot-hit');
      setTimeout(() => slot?.classList.remove('plinko-slot-hit'), 400);
    })();

    return () => {
      cancelled = true;
    };
  }, [controls, drop.slotIndex, multipliersRef]);

  useEffect(() => {
    if (!multipliersRef.current) return;

    let raf = 0;

    const ro = new ResizeObserver(() => {
      if (!landedRef.current) return;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!fieldRef.current || !multipliersRef.current) return;

        const fieldRect = fieldRef.current.getBoundingClientRect();
        const slot = multipliersRef.current.querySelector<HTMLDivElement>(
          `[data-slot-index="${drop.slotIndex}"]`,
        );
        if (!slot) return;

        const slotRect = slot.getBoundingClientRect();
        const isMobile = window.innerWidth < 640;
        const r = (isMobile ? 10 : 18) / 2;

        controls.set({
          x: slotRect.left - fieldRect.left + slotRect.width / 2 - r,
          y: slotRect.top - fieldRect.top - r - (isMobile ? 5 : 10),
        });
      });
    });

    ro.observe(multipliersRef.current);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [controls, drop.slotIndex, fieldRef, multipliersRef]);

  return (
    <motion.div
      className="absolute w-5 h-5 max-md:w-3.5 max-md:h-3.5 max-sm:w-2.5 max-sm:h-2.5 rounded-full button-red z-50 pointer-events-none"
      animate={controls}
    />
  );
}
