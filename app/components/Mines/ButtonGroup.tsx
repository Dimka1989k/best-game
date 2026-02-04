'use client';

import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

type FormValues = {
  minesCount: number;
};

const VALUES = [1, 3, 5, 10, 24];

export default function ButtonGroup() {
  const { watch, setValue } = useFormContext<FormValues>();
  const current = watch('minesCount');

  return (
    <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
      {VALUES.map((value) => (
        <Button
          key={value}
          type="button"
          onClick={() => setValue('minesCount', value)}
          className={`cursor-pointer radius-xs px-0 text-inter-small! h-6.25 w-6
            ${current === value ? 'button-case-active text-white!' : 'bg-color-dark text-white'}
          `}
        >
          {value}
        </Button>
      ))}
    </div>
  );
}
