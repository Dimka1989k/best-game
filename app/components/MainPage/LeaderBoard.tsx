'use client';

import Image from 'next/image';

import cup from '@/assets/cup.svg';
import dollar from '@/assets/icon-dollar.svg';
import firstPlace from '@/assets/1place.svg';
import secondPlace from '@/assets/2place.svg';
import thirdPlace from '@/assets/3place.svg';
import { useTranslation } from 'react-i18next';

import { useLeaderboardQuery } from '@/hooks/useLeaderboardQuery';
import type { LeaderboardPlayer } from '@/types/leaderboard.types';
import { useUserStore } from '@/store/useUserStore';

function getPlaceIcon(rank: number, isTop: boolean) {
  if (isTop) return firstPlace;
  if (rank === 2) return secondPlace;
  if (rank === 3) return thirdPlace;
  return null;
}

export default function LeaderBoard() {
  const { t } = useTranslation();
  const currentUsername = useUserStore((s) => s.username);
  const { data, isLoading, isError } = useLeaderboardQuery('all');

  if (isLoading) {
    return (
      <div className="bg-cards-bg p-4 radius-md text-white">{t('common.loadingLeaderboard')}</div>
    );
  }

  if (isError) {
    return (
      <div className="bg-cards-bg p-4 radius-md text-white">{t('common.failedLeaderboard')}</div>
    );
  }

  if (!data || data.players.length === 0) {
    return <div className="bg-cards-bg p-4 radius-md text-white"> {t('common.noLeaderboard')}</div>;
  }

  const renderPlayerRow = (player: LeaderboardPlayer, isTop = false) => {
    const isMe = player.username === currentUsername;
    const placeIcon = getPlaceIcon(player.rank, isTop);

    const row = (
      <div
        className={`bg-bg-black radius-sm p-4 flex ${
          isTop
            ? 'gap-4 mx-auto max-xl:w-full w-64.75 justify-between'
            : 'justify-between items-center'
        } shadow-message-chat`}
      >
        <div className="flex items-center gap-4">
          {placeIcon ? (
            <Image src={placeIcon} alt={`${player.rank} place`} />
          ) : (
            <span className="text-white text-inter-h2">{player.rank}</span>
          )}
          <div>
            <p className="text-white text-inter-bold">{player.username}</p>
            <p className="text-gray text-inter-small">
              {player.gamesPlayed} {t('navigation.games')}
            </p>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div className="flex gap-0.5 items-center justify-end">
            <Image src={dollar} alt="dollar" className="w-4 h-4" />
            <p className="text-white text-inter-bold">{player.totalWagered.toFixed(0)}</p>
          </div>
          <p className="text-green text-inter-small mt-1">
            {player.winRate}% {t('navigation.win')}
          </p>
        </div>
      </div>
    );

    if (!isMe) return row;
    return (
      <div className="p-0.5 radius-sm bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)]">
        {row}
      </div>
    );
  };

  const [topPlayer, ...otherPlayers] = data.players;

  return (
    <div className="relative bg-cards-bg py-4 px-2.75 radius-md">
      <Image
        src={cup}
        alt="cup"
        className="w-20 h-20 shadow-cup absolute -top-6.5 -left-7.5 max-md:-left-3"
      />
      <p className="text-white text-satoshi-small text-center">{t('navigation.leaderboard')}</p>
      <p className="text-gray text-inter-main text-center mt-0.5 mb-6">
        {t('navigation.topPlayers')}
      </p>
      <div className="h-175 overflow-y-auto scrollbar-hide p-1 flex flex-col gap-4">
        {renderPlayerRow(topPlayer, true)}
        {otherPlayers.map((player) => (
          <div key={player.username}>{renderPlayerRow(player)}</div>
        ))}
      </div>
    </div>
  );
}
