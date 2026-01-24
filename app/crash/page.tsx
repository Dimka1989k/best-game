'use client';

import Link from 'next/link';
import arrowLeft from '@/assets/arrow-left.svg';
import Image from 'next/image';
import { useEffect } from 'react';

import { useCrashStore } from '@/store/useCrashStore';
import { useCrashGame } from '@/hooks/useCrashGame';

import { CrashHistoryTable } from '../components/Сrash/CrashHistoryTable';

import { useGameHistory } from '@/hooks/useGameHistory';
import { CrashStage } from '../components/Сrash/CrashStage';

import { CrashBetForm } from '../components/Сrash/CrashBetForm';
import { useQueryClient } from '@tanstack/react-query';

export default function Crash() {
  const { state, multiplier } = useCrashStore();
  const { data: history, isLoading } = useGameHistory('crash');
  const { finalizeBet } = useCrashGame();
  const roundFinished = useCrashStore((s) => s.roundFinished);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roundFinished) return;
    finalizeBet();
    queryClient.invalidateQueries({
      queryKey: ['game-history', 'crash'],
    });
    useCrashStore.getState().resetRoundFinished();
  }, [roundFinished, finalizeBet, queryClient]);

  return (
    <>
      <div className="flex flex-col px-12 max-md:px-4 pt-5 max-md:pt-0">
        <Link href="/" className="flex mb-10 max-md:hidden">
          <Image src={arrowLeft} alt="arrowLeft" className="" />
          <p className="text-inter-main bg-[linear-gradient(180deg,#ffcd71_0%,#e59603_100%)] bg-clip-text text-transparent">
            All games
          </p>
        </Link>
        <div className="flex justify-center gap-6 w-full max-lg:flex-wrap">
          <CrashStage state={state} multiplier={multiplier} />
          <CrashBetForm state={state} multiplier={multiplier} />
        </div>
        <div>
          <p className="2xl:text-center text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-4 mt-10 max-md:mt-6 max-md:text-2xl!">
            Game history
          </p>
          <div className="pb-5">
            <CrashHistoryTable history={history} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}
