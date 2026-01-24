import { useCrashStore } from '@/store/useCrashStore';
import { useEffect } from 'react';

export function CrashResultOverlay() {
  const { status, crashPoint, resetRound, multiplier } = useCrashStore();

  useEffect(() => {
    if (!status) return;

    const t = setTimeout(() => {
      resetRound();
    }, 2000);

    return () => clearTimeout(t);
  }, [status, resetRound]);

  if (!status) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      {status === 'won' ? (
        <div className="relative z-10 flex flex-col w-full max-w-48 h-full max-h-23.5 bg-overlay backdrop-blur-lg shadow-overlay p-2 radius-md">
          <p className="text-inter-h2 text-green text-[clamp(40px,2vw,64px)]! font-bold!">
            {multiplier.toFixed(2)}x
          </p>
          <p className="text-inter-h2 text-green text-[clamp(24px,1vw,32px)]!">Current Payout</p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col w-full max-w-48 h-full max-h-23.5 bg-overlay backdrop-blur-lg shadow-overlay-red p-2 radius-md">
          <p className="text-red text-inter-h2 text-[clamp(40px,2vw,64px)]! font-bold!">
            {crashPoint?.toFixed(2)}x
          </p>
          <p className="text-red text-inter-h2 text-[clamp(24px,1vw,32px)]!">Current Payout</p>
        </div>
      )}
    </div>
  );
}
