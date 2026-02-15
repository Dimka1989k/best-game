import { useCallback, useState } from 'react';
import type { PlinkoDrop } from '@/types/plinko.types';

export function usePlinkoAnimation(drops: PlinkoDrop[] | null) {
  const [activeDrops, setActiveDrops] = useState<PlinkoDrop[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const play = useCallback(() => {
    if (!drops?.length) return;

    setIsAnimating(true);
    setActiveDrops([]);

    drops.forEach((drop, index) => {
      setTimeout(() => {
        setActiveDrops((prev) => [...prev, drop]);
      }, index * 120);
    });

    setTimeout(
      () => {
        setIsAnimating(false);
      },
      drops.length * 120 + 1600,
    );
  }, [drops]);

  const reset = () => {
    setActiveDrops([]);
  };

  return { play, reset, activeDrops, isAnimating };
}
