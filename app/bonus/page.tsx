'use client';

import { Button } from '@/components/ui/button';
import { useBonusStatus, useClaimBonus } from '@/hooks/useBonus';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

function getRemainingSeconds(date: string) {
  const diff = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.floor(diff / 1000));
}

export default function Bonus() {
  const { t } = useTranslation();
  const { data, isLoading } = useBonusStatus();
  const claimMutation = useClaimBonus();
  const { playMusic } = useMusic();

  const [secondsLeft, setSecondsLeft] = useState(0);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const mm = String(minutes).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return `${mm}:${ss}`;
  }

  useEffect(() => {
    if (!data?.nextClaimAt) return;

    const update = () => {
      setSecondsLeft(getRemainingSeconds(data.nextClaimAt));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [data?.nextClaimAt]);

  if (isLoading || !data) return null;

  const canClaim = secondsLeft === 0;

  const handleClaimBonus = () => {
    if (!canClaim) return;

    playMusic(Music.bonus);
    claimMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 max-md:mx-4 pb-4">
      <p className="text-white text-inter-h2 text-4xl! max-md:text-2xl! mb-4">
        {t('bonus.minuteBonus')}
      </p>
      <div className="border border-yellow-400 button-case radius-md py-4 px-10 max-md:px-4 flex flex-col gap-4 max-md:gap-2 justify-center items-center">
        <div className="flex flex-col items-center">
          <p className="bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] bg-clip-text text-transparent text-4xl">
            ${data.amount}
          </p>
          <p className="text-gray mt-2">{t('bonus.bonusAmount')}</p>
        </div>
        {canClaim ? (
          <p className="text-3xl bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] bg-clip-text text-transparent">
            {t('bonus.availableNow')}
          </p>
        ) : (
          <p className="text-3xl bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] bg-clip-text text-transparent">
            {formatTime(secondsLeft)}
          </p>
        )}
        <div className="bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] w-full h-px" />
        <div className="flex gap-10 max-md:gap-2 justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-inter-main text-gray max-md:text-sm!">{t('bonus.baseAmount')}</p>
            <p className="text-white text-inter-h2 max-md:text-base!">${data.baseAmount}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-inter-main text-gray max-md:text-sm!">{t('bonus.wagerBonus')}</p>
            <p className="text-white text-inter-h2 max-md:text-base!">${data.wagerBonus}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-inter-main text-gray max-md:text-sm!">{t('bonus.gamesBonus')}</p>
            <p className="text-white text-inter-h2 max-md:text-base!">${data.gamesBonus}</p>
          </div>
        </div>
        <div className="bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] w-full h-px" />
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray text-inter-main">{t('bonus.nextClaim')}</p>
          <p className="text-white text-inter-h2 max-md:text-base!">
            {new Date(data.nextClaimAt).toLocaleString()}
          </p>
        </div>
        <Button
          disabled={!canClaim || claimMutation.isPending}
          onClick={handleClaimBonus}
          className="button-yellow radius-md cursor-pointer w-full mt-5 text-white! text-inter font-normal text-xl! h-14"
        >
          {t('bonus.claimBonus')}
        </Button>
      </div>
    </div>
  );
}
