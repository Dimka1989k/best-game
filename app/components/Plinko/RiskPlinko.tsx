'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { Risk } from '@/types/plinko.types';

const RISK_PLINKO = [Risk.Low, Risk.Medium, Risk.High];

export default function RiskPlinko() {
  const risk = usePlinkoStore((s) => s.risk);
  const changeRisk = usePlinkoStore((s) => s.changeRisk);
  const isAnimating = usePlinkoStore((s) => s.isAnimating);

  return (
    <div className="flex gap-2 mb-2 mt-2">
      {RISK_PLINKO.map((r) => (
        <Button
          type="button"
          key={r}
          disabled={isAnimating}
          onClick={() => changeRisk(r)}
          className={clsx(
            'h-8 px-4 radius-xs text-inter-small!',
            risk === r ? 'button-case-active text-white!' : 'bg-color-dark text-white',
          )}
        >
          {r}
        </Button>
      ))}
    </div>
  );
}
