'use client';

import Image from 'next/image';
import { memo } from 'react';
import { Button } from '@/components/ui/button';

import tablerCoin from '@/assets/tablerCoin.svg';
import walletIcon from '@/assets/walletIcon.svg';
import { useTranslation } from 'react-i18next';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

type Props = {
  canPlaceBet: boolean;
  onCashout: () => void;
  isCashoutDisabled: boolean;
};

export const CrashBetActions = memo(function CrashBetActions({
  canPlaceBet,
  onCashout,
  isCashoutDisabled,
}: Props) {
  const { t } = useTranslation();
  const { playMusic, stopMusic } = useMusic();

  const handlePlaceBet = () => {
    playMusic(Music.button);
    playMusic(Music.rocket);
  };

  const handleCashout = () => {
    stopMusic(Music.rocket);
    playMusic(Music.button);
    onCashout();
  };

  return (
    <div className="flex flex-col">
      <Button
        type="submit"
        disabled={!canPlaceBet}
        onClick={handlePlaceBet}
        className="relative mb-4 cursor-pointer flex items-center justify-center text-inter-bold button-red text-btn radius-pill h-12"
      >
        <p> {t('bet.placeBet')}</p>
        <Image src={tablerCoin} alt="tablerCoin" className="absolute right-2.5" />
      </Button>
      <Button
        type="button"
        disabled={isCashoutDisabled}
        onClick={handleCashout}
        className="relative cursor-pointer flex items-center justify-center text-inter-bold button-yellow text-btn radius-md h-12"
      >
        <p>{t('bet.cashout')}</p>
        <Image src={walletIcon} alt="walletIcon" className="absolute right-2.5" />
      </Button>
    </div>
  );
});
