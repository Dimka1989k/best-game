'use client';

import { useCaseStore } from '@/store/case.store';
import CarouselCase from '@/app/components/Сase/CarouselCase';
import CaseResultCard from '@/app/components/Сase/CaseResultCard';
import ButtonLink from '@/app/components/ButtonLink';
import { Button } from '@/components/ui/button';
import bag from '@/assets/bigBag.svg';
import Image from 'next/image';
import { CasePhase } from '@/types/cases.types';
import { useTranslation } from 'react-i18next';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

export default function OpenCase() {
  const { phase, result, finishSpin } = useCaseStore();
  const { t } = useTranslation();
  const { playMusic, stopMusic } = useMusic();

  const handleStopCarousel = () => {
    playMusic(Music.buttonBet);
    stopMusic(Music.carousel);
    finishSpin();
  };

  return (
    <div className="relative flex flex-col justify-center w-full h-full px-12 max-md:px-4 pt-6">
      <ButtonLink href="/" />
      {phase === CasePhase.SPINNING && <CarouselCase />}
      {phase === CasePhase.RESULT && result && <CaseResultCard item={result.item} />}
      {phase === CasePhase.SPINNING && (
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <Button
            onClick={handleStopCarousel}
            className="cursor-pointer radius-ms border border-gray w-37.5 h-10 text-white text-inter-bold!"
          >
            {t('games.cases.skipAnimation')}
          </Button>
          <Image
            src={bag}
            alt="bag"
            className="w-96.5 h-53 mt-6.5 mb-61 max-sm:w-50 max-sm:h-27.5"
          />
        </div>
      )}
    </div>
  );
}
