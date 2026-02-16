'use client';

import { Button } from '@/components/ui/button';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import { usePlayPlinko } from '@/hooks/plinko/usePlayPlinko';
import Image from 'next/image';
import tablerCoin from '@/assets/tablerCoin.svg';
import { useTranslation } from 'react-i18next';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

export default function PlinkoBetActions() {
  const { betAmount, risk, rows, balls, startGame } = usePlinkoStore();
  const playMutation = usePlayPlinko();
  const isAnimating = usePlinkoStore((s) => s.isAnimating);
  const { t } = useTranslation();
  const { playMusic } = useMusic();

  const onPlay = () => {
    playMusic(Music.button);
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
        className="cursor-pointer relative flex items-center justify-center text-inter-bold button-red text-btn radius-pill h-12"
      >
        {t('bet.placeBet')}
        <Image src={tablerCoin} alt="coin" className="absolute right-2.5" />
      </Button>
    </div>
  );
}
