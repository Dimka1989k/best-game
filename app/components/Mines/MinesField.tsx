'use client';

import Image from 'next/image';
import bombImage from '@/assets/bomb.svg';
import coinImage from '@/assets/coin.svg';
import { useEffect, useRef } from 'react';

import { useMinesStore } from '@/store/useMinesStore';
import { useRevealMinesTile } from '@/hooks/mines/useMinesGame';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { MinesStatus } from '@/types/mines.types';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

export default function MinesField() {
  const { gridSize, totalTiles, revealedPositions, minePositions, gameId, status, lastHitMine } =
    useMinesStore();

  const revealMutation = useRevealMinesTile();
  const { playMusic } = useMusic();
  const prevHitRef = useRef<number | null>(null);

  useEffect(() => {
    if (lastHitMine !== null && lastHitMine !== undefined && lastHitMine !== prevHitRef.current) {
      playMusic(Music.losemines);
    }

    prevHitRef.current = lastHitMine;
  }, [lastHitMine, playMusic]);

  const handleClick = (position: number) => {
    if (status !== MinesStatus.Playing) return;
    if (revealedPositions.includes(position)) return;
    if (!gameId) return;

    revealMutation.mutate({ gameId, position });
  };

  const getCellSize = () => {
    switch (gridSize) {
      case 5:
        return 'w-25 h-25 max-sm:w-12.5 max-sm:h-12.5';
      case 6:
        return 'w-20 h-20 max-sm:w-10 max-sm:h-10';
      case 7:
        return 'w-16.5 h-16.5 max-sm:w-8 max-sm:h-8';
      case 8:
        return 'w-14 h-14 max-sm:w-7.25 max-sm:h-7.25';
    }
  };

  const getIconSize = () => {
    switch (gridSize) {
      case 5:
        return 'w-15 h-15 max-sm:w-8.5 max-sm:h-8.5';
      case 6:
        return 'w-10 h-10 max-sm:w-6 max-sm:h-6';
      case 7:
        return 'w-10 h-10 max-sm:w-6 max-sm:h-6';
      case 8:
        return 'w-10 h-10 max-sm:w-4.5 max-sm:h-4.5';
    }
  };

  return (
    <div className="relative flex justify-center items-center radius-md w-full max-w-222 h-159.5 max-sm:h-95.25 bg-cards-bg">
      <div
        className="grid gap-4 max-sm:gap-2 w-fit"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, i) => {
          const isRevealed = revealedPositions.includes(i);
          const isMine = minePositions?.includes(i) || lastHitMine === i;

          return (
            <Button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              disabled={status !== MinesStatus.Playing || isRevealed}
              className={clsx(
                'px-0 py-0 disabled:opacity-100 cursor-pointer rounded-sm md:rounded-md shadow-mines flex items-center justify-center transition',
                getCellSize(),

                !isRevealed && 'bg-bg-mines',
                isRevealed &&
                  !isMine &&
                  'bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] animate-ripple-gold',
                isRevealed &&
                  isMine &&
                  'bg-[linear-gradient(0deg,#FF0047_0%,#FF417B_100%)] animate-ripple-red',
              )}
            >
              {isRevealed && (
                <Image
                  src={isMine ? bombImage : coinImage}
                  alt={isMine ? 'mine' : 'coin'}
                  className={clsx('pointer-events-none select-none', getIconSize())}
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
