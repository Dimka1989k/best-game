'use client';

import { useRef, useEffect } from 'react';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { usePlinkoMultipliers } from '@/hooks/plinko/usePlinkoMultipliers';
import { usePlinkoAnimation } from './usePlinkoAnimation';

import PlinkoPyramid from './PlinkoPyramid';
import PlinkoMultipliers from './PlinkoMultipliers';
import { PlinkoBall } from './PlinkoBall';

export default function PlinkoField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const multipliersRef = useRef<HTMLDivElement>(null);

  const { rows, risk, drops } = usePlinkoStore();
  const { data: multipliers = [] } = usePlinkoMultipliers(risk, rows);
  const { play, isAnimating, activeDrops } = usePlinkoAnimation(drops);

  const setAnimating = usePlinkoStore((s) => s.setAnimating);

  useEffect(() => {
    setAnimating(isAnimating);
  }, [isAnimating, setAnimating]);

  useEffect(() => {
    if (drops?.length) play();
  }, [drops, play]);

  return (
    <div
      ref={fieldRef}
      className="relative w-full max-w-220 h-155 max-sm:h-95 mx-auto bg-cards-bg rounded-md overflow-hidden max-sm:overflow-visible"
    >
      <PlinkoPyramid lines={rows} />

      {drops &&
        activeDrops.map((drop, index) => (
          <PlinkoBall
            key={`${drop.slotIndex}-${index}`}
            drop={drop}
            rows={rows}
            fieldRef={fieldRef}
            multipliersRef={multipliersRef}
          />
        ))}

      <PlinkoMultipliers ref={multipliersRef} multipliers={multipliers} lines={rows} />
    </div>
  );
}
