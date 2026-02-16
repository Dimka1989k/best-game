'use client';

import { useCrashStore } from '@/store/useCrashStore';
import { useEffect } from 'react';
import { crashSocket } from '@/lib/api/crash/crash.socket';

import { CrashHistoryTable } from '../components/Сrash/CrashHistoryTable';

import { useGameHistory } from '@/hooks/useGameHistory';
import { CrashStage } from '../components/Сrash/CrashStage';

import { CrashBetForm } from '../components/Сrash/CrashBetForm';
import { useCrashRoundFinalize } from '@/hooks/useCrashRoundFinalize';

import ButtonLink from '../components/ButtonLink';
import { useTranslation } from 'react-i18next';

export default function Crash() {
  const state = useCrashStore((s) => s.state);
  const multiplier = useCrashStore((s) => s.multiplier);
  const { data: history, isLoading } = useGameHistory('crash');
  const { t } = useTranslation();

  useCrashRoundFinalize();

  useEffect(() => {
    return () => {
      crashSocket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col px-12 max-md:px-4 pt-5 max-md:pt-0">
      <ButtonLink href="/" />
      <div className="flex justify-center gap-6 w-full max-lg:flex-wrap">
        <CrashStage state={state} multiplier={multiplier} />
        <CrashBetForm state={state} />
      </div>
      <div>
        <p className="2xl:text-center text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-4 mt-10 max-md:mt-6 max-md:text-2xl!">
          {t('history.title')}
        </p>
        <div className="mb-5 border-b border-bg-tabel">
          <CrashHistoryTable history={history} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
