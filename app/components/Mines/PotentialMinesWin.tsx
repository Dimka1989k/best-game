'use client';

import { useMinesStore } from '@/store/useMinesStore';
import { MinesStatus } from '@/types/mines.types';

export default function PotentialMinesWin() {
  const { multiplier, currentValue, status } = useMinesStore();

  if (status !== MinesStatus.Playing) return null;

  return (
    <div className="mt-8 mb-2">
      <div className="w-full bg-gray h-px mb-2" />

      <div className="flex items-center justify-between mb-2">
        <p className="text-gray text-inter-main">Current Multiplier:</p>
        <p className="text-green text-inter-bold">{multiplier.toFixed(2)}x</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray text-inter-main">Win Amount:</p>
        <p className="text-green text-inter-bold">${currentValue.toFixed(2)}</p>
      </div>
    </div>
  );
}
