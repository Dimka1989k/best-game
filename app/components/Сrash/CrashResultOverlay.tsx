import { useCrashStore } from '@/store/useCrashStore';
import { useEffect } from 'react';
import { CrashBetStatus } from '@/types/crash.types';
import { useTranslation } from 'react-i18next';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

export function CrashResultOverlay() {
  const { status, crashPoint, resetRound, multiplier } = useCrashStore();
  const { t } = useTranslation();
  const { playMusic, stopMusic } = useMusic();

  useEffect(() => {
    if (!status) return;
    stopMusic(Music.rocket);
    stopMusic(Music.won);
    stopMusic(Music.gameover);

    if (status === CrashBetStatus.Won) {
      playMusic(Music.won);
    }

    if (status === CrashBetStatus.Lost) {
      playMusic(Music.gameover);
    }

    const timer = setTimeout(() => {
      resetRound();
    }, 2000);

    return () => clearTimeout(timer);
  }, [playMusic, resetRound, status, stopMusic]);

  if (!status) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs radius-md" />
      {status === CrashBetStatus.Won ? (
        <div className="relative z-10 flex flex-col w-full max-w-48 h-full max-h-23.5 bg-overlay backdrop-blur-lg shadow-overlay p-2 radius-md">
          <p className="text-inter-h2 text-green text-[clamp(40px,2vw,64px)]! font-bold!">
            {multiplier.toFixed(2)}x
          </p>
          <p className="text-inter-h2 text-green text-[clamp(24px,1vw,32px)]!">
            {t('games.crash.currentPayout')}
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col w-full max-w-48 h-full max-h-23.5 bg-overlay backdrop-blur-lg shadow-overlay-red p-2 radius-md">
          <p className="text-red text-inter-h2 text-[clamp(40px,2vw,64px)]! font-bold!">
            {crashPoint?.toFixed(2)}x
          </p>
          <p className="text-red text-inter-h2 text-[clamp(24px,1vw,32px)]!">
            {t('games.crash.currentPayout')}
          </p>
        </div>
      )}
    </div>
  );
}
