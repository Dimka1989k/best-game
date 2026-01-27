'use client';

import { memo } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { useCrashStore } from '@/store/useCrashStore';
import { CrashGameState } from '@/types/crash.types';

type Props = {
  state: CrashGameState;
};

export const PotentialWin = memo(function PotentialWin({ state }: Props) {
  const { control } = useFormContext();
  const multiplier = useCrashStore((s) => s.multiplier);

  const amount = useWatch({ control, name: 'amount' });

  if (state !== CrashGameState.Running) return null;

  const value = Number(amount || 0) * multiplier;

  return (
    <div className="mt-8 mb-2">
      <div className="w-full bg-gray h-px mb-2" />
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray text-inter-main">Current Multiplier:</p>
        <p className="text-green text-inter-bold">{multiplier.toFixed(2)}X</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray text-inter-main">Potential Win:</p>
        <p className="text-green text-inter-bold">${value.toFixed(2)}</p>
      </div>
    </div>
  );
});
