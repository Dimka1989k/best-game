'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { Risk } from '@/types/plinko.types';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

const RISK_PLINKO = [Risk.Low, Risk.Medium, Risk.High];

export default function RiskPlinko() {
  const risk = usePlinkoStore((s) => s.risk);
  const changeRisk = usePlinkoStore((s) => s.changeRisk);
  const isAnimating = usePlinkoStore((s) => s.isAnimating);
  const { playMusic } = useMusic();

  const handleClick = (r: Risk) => {
    playMusic(Music.buttonBet);
    changeRisk(r);
  };

  return (
    <div className="flex gap-2 mb-2 mt-2">
      {RISK_PLINKO.map((r) => (
        <Button
          type="button"
          key={r}
          disabled={isAnimating}
          onClick={() => handleClick(r)}
          className={clsx(
            'h-8 px-4 radius-xs text-inter-small! cursor-pointer',
            risk === r ? 'button-case-active text-white!' : 'bg-color-dark text-white',
          )}
        >
          {r}
        </Button>
      ))}
    </div>
  );
}
