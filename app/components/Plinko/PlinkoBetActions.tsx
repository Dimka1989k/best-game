'use client';

import { Button } from '@/components/ui/button';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { usePlayPlinko } from '@/hooks/plinko/usePlayPlinko';
import Image from 'next/image';
import tablerCoin from '@/assets/tablerCoin.svg';

export default function PlinkoBetActions() {
  const { betAmount, risk, rows, balls, startGame } = usePlinkoStore();
  const playMutation = usePlayPlinko();
  const isAnimating = usePlinkoStore((s) => s.isAnimating);

  const onPlay = () => {
    startGame();

    playMutation.mutate({
      amount: betAmount,
      risk,
      lines: rows,
      balls,
    });
  };

  return (
    <div className="flex flex-col">
      <Button
        disabled={isAnimating || playMutation.isPending}
        onClick={onPlay}
        className="cursor-pointer relative flex items-center justify-center text-inter-bold button-red text-white radius-pill h-12"
      >
        Place bet
        <Image src={tablerCoin} alt="coin" className="absolute right-2.5" />
      </Button>
    </div>
  );
}
