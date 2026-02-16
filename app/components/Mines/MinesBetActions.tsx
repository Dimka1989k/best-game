'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import tablerCoin from '@/assets/tablerCoin.svg';
import walletIcon from '@/assets/walletIcon.svg';

import { useMinesStore } from '@/store/useMinesStore';
import { useCashoutMines } from '@/hooks/mines/useMinesGame';
import { MinesStatus } from '@/types/mines.types';
import { useTranslation } from 'react-i18next';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

export default function MinesBetActions() {
  const { status, gameId } = useMinesStore();
  const cashoutMutation = useCashoutMines();
  const { t } = useTranslation();
  const { playMusic } = useMusic();

  const handlePlaceBetSound = () => {
    playMusic(Music.button);
  };

  const handleCashout = () => {
    if (!gameId) return;

    playMusic(Music.button);
    cashoutMutation.mutate(gameId);
  };

  return (
    <div className="flex flex-col">
      <Button
        type="submit"
        disabled={status === MinesStatus.Playing}
        onClick={handlePlaceBetSound}
        className="relative mb-4 cursor-pointer flex items-center justify-center text-inter-bold button-red text-white radius-pill h-12"
      >
        <p>{t('bet.placeBet')}</p>
        <Image src={tablerCoin} alt="coin" className="absolute right-2.5" />
      </Button>
      <Button
        type="button"
        disabled={status !== MinesStatus.Playing || !gameId}
        onClick={handleCashout}
        className="relative cursor-pointer flex items-center justify-center text-inter-bold button-yellow text-white radius-md h-12"
      >
        <p>{t('bet.cashout')}</p>
        <Image src={walletIcon} alt="wallet" className="absolute right-2.5" />
      </Button>
    </div>
  );
}
