'use client';

import { useForm, FormProvider } from 'react-hook-form';

import PotentialPlinkoWin from './PotentialPlinkoWin';
import BetAmountPlinkoField from './BetAmountPlinkoField';

import PlinkoBetActions from './PlinkoBetActions';
import RiskPlinko from './RiskPlinko';
import RowPlinko from './RowPlinko';

export type FormValues = {
  amount: string;
  PlinkoCount: number;
};

export default function PlinkoBetForm() {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: '10',
      PlinkoCount: 3,
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="bg-cards-bg radius-md py-6 px-8 xl:w-108! max-xl:w-220 max-md:w-full text-center h-full mx-auto">
        <p className="text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-8">
          Plinko Configuration
        </p>
        <BetAmountPlinkoField />
        <p className="text-left text-white text-manrope font-medium!">Risk</p>
        <RiskPlinko />
        <p className="text-left text-white text-manrope font-medium!">Row</p>
        <RowPlinko />
        <PlinkoBetActions />
        <PotentialPlinkoWin />
      </form>
    </FormProvider>
  );
}
