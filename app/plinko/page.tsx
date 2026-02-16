'use client';

import ButtonLink from '../components/ButtonLink';
import PlinkoBetForm from '../components/Plinko/PlinkoBetForm';
import PlinkoHistoryTable from '../components/Plinko/PlinkoHistoryTable';
import { useEffect } from 'react';
import { usePlinkoStore } from '@/store/usePlinkoStore';

import PlinkoField from '../components/Plinko/PlinkoField';
import { useTranslation } from 'react-i18next';

export default function Plinko() {
  const { t } = useTranslation();

  useEffect(() => {
    usePlinkoStore.getState().resetGame();
  }, []);

  return (
    <div className="flex flex-col px-12 max-md:px-4 pt-5 max-md:pt-0">
      <ButtonLink href="/" />
      <div className="flex justify-center gap-6 w-full max-xl:flex-wrap">
        <PlinkoField />
        <PlinkoBetForm />
      </div>
      <div>
        <p className="2xl:text-center text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-4 mt-10 max-md:mt-6 max-md:text-2xl!">
          {t('history.title')}
        </p>
        <div className="mb-5 border-b border-bg-tabel">
          <PlinkoHistoryTable />
        </div>
      </div>
    </div>
  );
}
