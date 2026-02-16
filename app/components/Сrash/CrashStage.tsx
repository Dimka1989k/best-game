'use client';

import bgSpace from '@/assets/planet/bg-space.jpg';

import { CrashCanvas } from './CrashCanvas';
import { CrashResultOverlay } from './CrashResultOverlay';
import { useCrashStore } from '@/store/useCrashStore';
import { memo } from 'react';
import { CrashGameState } from '@/types/crash.types';
import { useTranslation } from 'react-i18next';

type Props = {
  state: CrashGameState;
  multiplier: number;
};

export const CrashStage = memo(function CrashStage({ state, multiplier }: Props) {
  const status = useCrashStore((s) => s.status);
  const { t } = useTranslation();

  return (
    <div
      className="relative flex flex-col justify-center items-center radius-md text-center w-full max-w-222 max-lg:max-w-231.5 h-127.5 max-sm:h-95.5 bg-cards-bg"
      style={{
        backgroundImage: `url(${bgSpace.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CrashCanvas started={state === CrashGameState.Running} multiplier={multiplier} />
      <CrashResultOverlay />
      {!status && (
        <p className="text-gray text-satoshi text-[clamp(24px,5vw,64px)]! relative z-10">
          {multiplier.toFixed(2)}X
        </p>
      )}

      {state === CrashGameState.Waiting && (
        <p className="text-gray text-inter-bold text-[clamp(16px,3vw,32px)]!">
          {t('games.crash.waiting')}
        </p>
      )}
    </div>
  );
});
