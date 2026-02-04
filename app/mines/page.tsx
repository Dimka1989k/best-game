'use client';
import { useEffect } from 'react';
import ButtonLink from '../components/ButtonLink';
import MinesBetForm from '../components/Mines/MinesBetForm';
import MinesHistoryTable from '../components/Mines/MInesHistoryTable';
import { useActiveMinesGame } from '@/hooks/mines/useMinesGame';
import { useMinesStore } from '@/store/useMinesStore';
import MinesField from '../components/Mines/MinesField';

export default function Mines() {
  const restoreGame = useMinesStore((s) => s.restoreGame);
  const { data } = useActiveMinesGame();

  useEffect(() => {
    if (data?.game) {
      restoreGame(data.game);
    }
  }, [data, restoreGame]);

  return (
    <div className="flex flex-col px-12 max-md:px-4 pt-5 max-md:pt-0">
      <ButtonLink href="/" />
      <div className="flex justify-center gap-6 w-full max-lg:flex-wrap">
        <MinesField />
        <MinesBetForm />
      </div>
      <div>
        <p className="2xl:text-center text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-4 mt-10 max-md:mt-6 max-md:text-2xl!">
          Game history
        </p>
        <div className="mb-5 border-b border-bg-tabel">
          <MinesHistoryTable />
        </div>
      </div>
    </div>
  );
}
