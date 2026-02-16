'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { usePlinkoStore } from '@/store/usePlinkoStore';
import type { Row } from '@/types/plinko.types';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

const ROWS: Row[] = [8, 10, 12, 14, 16];

export default function RowPlinko() {
  const rows = usePlinkoStore((s) => s.rows);
  const changeRows = usePlinkoStore((s) => s.changeRows);
  const isAnimating = usePlinkoStore((s) => s.isAnimating);

  const { playMusic } = useMusic();

  const handleClick = (r: Row) => {
    playMusic(Music.buttonBet);
    changeRows(r);
  };

  return (
    <div className="flex gap-2 mb-8 mt-2">
      {ROWS.map((r) => (
        <Button
          type="button"
          key={r}
          disabled={isAnimating}
          onClick={() => handleClick(r)}
          className={clsx(
            'h-8 px-4 radius-xs text-inter-small! cursor-pointer',
            rows === r ? 'button-case-active text-white!' : 'bg-color-dark text-white',
          )}
        >
          {r}
        </Button>
      ))}
    </div>
  );
}
