'use client';

import { usePlinkoResult } from '@/hooks/plinko/usePlinkoResult';

export default function PotentialPlinkoWin() {
  const { mode, multiplier, winAmount } = usePlinkoResult();

  return (
    <div className="mt-8 mb-2">
      <div className="w-full bg-gray h-px mb-2" />

      <div className="flex justify-between mb-2">
        <p className="text-gray">
          {mode === 'potential' ? 'Potential Multiplier:' : 'Final Multiplier:'}
        </p>
        <p className={multiplier >= 1 ? 'text-green font-bold' : 'text-red font-bold'}>
          {multiplier.toFixed(2)}x
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-gray">{mode === 'potential' ? 'Potential Result:' : 'Result:'}</p>
        <p className={winAmount >= 0 ? 'text-green font-bold' : 'text-red font-bold'}>
          {winAmount >= 0 ? '+' : ''}${winAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
