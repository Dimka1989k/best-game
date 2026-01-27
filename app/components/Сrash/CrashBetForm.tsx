'use client';

import { memo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useCrashStore } from '@/store/useCrashStore';
import { useCrashGame } from '@/hooks/useCrashGame';
import { PotentialWin } from './PotentialWin';

import { BetAmountField } from './BetAmountField';
import { AutoCashoutField } from './AutoCashoutField';
import { CrashBetActions } from './CrashBetActions';
import { useController } from 'react-hook-form';
import { CrashGameState } from '@/types/crash.types';

type Props = {
  state: CrashGameState;
};

export type FormValues = {
  amount: string;
  autoCashout: string;
  autoCashoutEnabled: boolean;
};

function handleCrashBetSubmit(
  values: FormValues,
  setAmount: (amount: number) => void,
  placeBet: (payload: { amount: number; autoCashout?: number }) => void,
) {
  const amount = Number(values.amount);
  if (!amount || amount <= 0) return;

  setAmount(amount);

  placeBet({
    amount,
    autoCashout: values.autoCashoutEnabled ? Number(values.autoCashout) : undefined,
  });
}

export const CrashBetForm = memo(function CrashBetForm({ state }: Props) {
  const setAmount = useCrashStore((s) => s.setAmount);
  const { placeBet, cashout } = useCrashGame();

  const methods = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: '',
      autoCashout: '',
      autoCashoutEnabled: false,
    },
  });

  const { field: autoCashoutEnabled } = useController({
    name: 'autoCashoutEnabled',
    control: methods.control,
  });

  const isCashoutDisabled = autoCashoutEnabled.value || state !== CrashGameState.Running;

  const { handleSubmit, reset, formState } = methods;

  const canPlaceBet = formState.isValid && state === CrashGameState.Waiting;

  useEffect(() => {
    if (state === CrashGameState.Waiting) {
      reset({
        amount: '',
        autoCashout: '',
        autoCashoutEnabled: false,
      });
    }
  }, [state, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((values) => handleCrashBetSubmit(values, setAmount, placeBet))}
        className="bg-cards-bg radius-md py-6 px-8 w-108 max-lg:w-full text-center h-full"
      >
        <p className="text-white text-satoshi text-[clamp(24px,2vw,32px)]! mb-8 max-md:text-2xl!">
          Crash Configuration
        </p>
        <BetAmountField />
        <AutoCashoutField />
        <CrashBetActions
          canPlaceBet={canPlaceBet}
          onCashout={cashout}
          isCashoutDisabled={isCashoutDisabled}
        />
        <PotentialWin state={state} />
      </form>
    </FormProvider>
  );
});
