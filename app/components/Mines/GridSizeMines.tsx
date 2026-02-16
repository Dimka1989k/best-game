'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useMinesStore } from '@/store/useMinesStore';
import { GridSize } from '@/types/mines.types';
import { MinesStatus } from '@/types/mines.types';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

const GRID_SIZES: GridSize[] = [5, 6, 7, 8];

export default function GridSizeMines() {
  const gridSize = useMinesStore((s) => s.gridSize);
  const setGridSize = useMinesStore((s) => s.setGridSize);
  const status = useMinesStore((s) => s.status);
  const { playMusic } = useMusic();

  const handleClick = (size: GridSize) => {
    playMusic(Music.buttonBet);
    setGridSize(size);
  };

  return (
    <div className="flex gap-4 max-md:gap-2 mb-8 mt-2">
      {GRID_SIZES.map((size) => (
        <Button
          key={size}
          type="button"
          disabled={status === MinesStatus.Playing}
          onClick={() => handleClick(size)}
          className={clsx(
            `h-8 w-12.75 px-0 radius-xs text-inter-small! font-normal! cursor-pointer
            `,
            gridSize === size ? 'button-case-active text-white!' : 'bg-color-dark text-white',
          )}
        >
          {size}x{size}
        </Button>
      ))}
    </div>
  );
}
