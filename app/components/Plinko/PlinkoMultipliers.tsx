'use client';

import { forwardRef } from 'react';

type Props = {
  multipliers: number[];
  lines: number;
};

function formatMultiplier(value: number): string {
  if (value <= 4.1) return `${value.toFixed(1)}`;
  return `${Math.round(value)}x`;
}

function getMultiplierColor(m: number) {
  if (m >= 50) return '#C62121';
  if (m >= 10) return '#D34521';
  if (m >= 2) return '#D38321';
  if (m >= 1) return '#D3B621';
  return '#82C91E';
}

const PlinkoMultipliers = forwardRef<HTMLDivElement, Props>(({ multipliers, lines }, ref) => {
  if (!multipliers.length) return null;

  return (
    <div
      ref={ref}
      className="absolute bottom-7.5 max-md:bottom-6 left-0 right-0 px-40 max-lg:px-28 max-md:px-20 max-sm:px-25 [@media(max-width:540px)]:px-20 [@media(max-width:500px)]:px-4! z-20"
    >
      <div
        className="grid gap-1 max-md:gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${lines + 1}, minmax(0, 1fr))`,
        }}
      >
        {multipliers.map((m, i) => (
          <div
            key={`${lines}-${i}`}
            data-slot-index={i}
            className="h-8.5 w-full radius-sm flex items-center justify-center text-[0.8125rem]! max-sm:text-[0.5625rem]! text-inter-bold text-white"
            style={{
              background: getMultiplierColor(m),
            }}
          >
            {formatMultiplier(m)}
          </div>
        ))}
      </div>
    </div>
  );
});

PlinkoMultipliers.displayName = 'PlinkoMultipliers';
export default PlinkoMultipliers;
