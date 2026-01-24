'use client';

import bgSpace from '@/assets/planet/bg-space.jpg';

import { CrashCanvas } from './CrashCanvas';
import { CrashResultOverlay } from './CrashResultOverlay';
import { MULTIPLIER_SCALE, TIME_SCALE } from './crashStage.constants';
import { useCrashStore } from '@/store/useCrashStore';

type Props = {
  state: string;
  multiplier: number;
};

export function CrashStage({ state, multiplier }: Props) {
  const status = useCrashStore((s) => s.status);

  return (
    <div
      className="relative flex flex-col justify-center items-center radius-md text-center
        w-full max-w-222 max-lg:max-w-231.5 h-127.5 max-sm:h-95.5 bg-cards-bg
      "
      style={{
        backgroundImage: `url(${bgSpace.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {state === 'running' && (
        <>
          <div className="absolute h-full max-h-110 max-sm:max-h-80 flex flex-col left-4 top-4 justify-between items-center text-white text-inter text-[clamp(10px,1.5vw,18px)] leading-[1.3]">
            {MULTIPLIER_SCALE.map((value) => (
              <p key={value}>{value}</p>
            ))}
          </div>
          <div className="absolute left-4 right-4 bottom-4 flex justify-between items-center text-white text-inter text-[clamp(10px,1.5vw,18px)] leading-[1.3]">
            {TIME_SCALE.map((value) => (
              <p key={value}>{value}</p>
            ))}
          </div>
        </>
      )}
      <CrashCanvas started={state === 'running'} multiplier={multiplier} />
      <CrashResultOverlay />
      {!status && (
        <p className="text-gray text-satoshi text-[clamp(24px,5vw,64px)]! relative z-10">
          {multiplier.toFixed(2)}X
        </p>
      )}

      {state === 'waiting' && (
        <p className="text-gray text-inter-bold text-[clamp(16px,3vw,32px)]!">
          Waiting for bets...
        </p>
      )}
    </div>
  );
}
