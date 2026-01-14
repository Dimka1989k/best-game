'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import cup from '@/assets/cup.svg';
import dollar from '@/assets/icon-dollar.svg';
import firstPlace from '@/assets/1place.svg';
import secondPlace from '@/assets/2place.svg';
import thirdPlace from '@/assets/3place.svg';

import { useAuthStore } from '@/store/auth.store';
import { useLeaderboardStore } from '@/store/leaderboard.store';

function getPlaceIcon(rank: number) {
  if (rank === 2) return secondPlace;
  if (rank === 3) return thirdPlace;
  return null;
}

export default function LeaderBoard() {
  const { session, hasHydrated } = useAuthStore();
  const { players, isLoading, fetchLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    if (!hasHydrated || !session?.accessToken) return;
    fetchLeaderboard(session.accessToken, 'all');
  }, [hasHydrated, session?.accessToken, fetchLeaderboard]);

  if (isLoading) {
    return <div className="bg-cards-bg p-4 radius-md text-white">Loading leaderboard...</div>;
  }

  if (!players.length) {
    return <div className="bg-cards-bg p-4 radius-md text-white">No leaderboard data</div>;
  }

  const [topPlayer, ...otherPlayers] = players;

  return (
    <div className="relative bg-cards-bg p-4 radius-md">
      <Image
        src={cup}
        alt="cup"
        className="w-20 h-20 shadow-cup absolute -top-6.5 -left-7.5 max-md:-left-3"
      />
      <p className="text-white text-satoshi-small text-center">Leaderboard</p>
      <p className="text-gray text-inter-main text-center mt-0.5 mb-6">Top players</p>
      <div className="bg-bg-black radius-sm p-4 flex gap-4 mx-auto mb-4 max-xl:w-full w-65 shadow-message-chat">
        <Image src={firstPlace} alt="1st place" />
        <div className="flex gap-2 w-full justify-between">
          <div className="flex flex-col text-start">
            <p className="text-white text-inter-bold">{topPlayer.username}</p>
            <p className="text-gray text-inter-small mt-1">{topPlayer.gamesPlayed} games</p>
          </div>
          <div className="flex flex-col text-right">
            <div className="flex gap-0.5 items-center justify-end">
              <Image src={dollar} alt="dollar" className="w-4 h-4" />
              <p className="text-white text-inter-bold">{topPlayer.totalWagered.toFixed(0)}</p>
            </div>
            <p className="text-green text-inter-small mt-1">{topPlayer.winRate}% win</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {otherPlayers.map((player) => {
          const placeIcon = getPlaceIcon(player.rank);
          return (
            <div
              key={player.username}
              className="bg-bg-black radius-sm p-4 flex justify-between items-center shadow-message-chat"
            >
              <div className="flex items-center gap-4">
                {placeIcon ? (
                  <Image src={placeIcon} alt={`${player.rank} place`} />
                ) : (
                  <span className="text-white text-inter-h2">{player.rank}</span>
                )}
                <div>
                  <p className="text-white text-inter-bold">{player.username}</p>
                  <p className="text-gray text-inter-small">{player.gamesPlayed} games</p>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <div className="flex gap-0.5 items-center justify-end">
                  <Image src={dollar} alt="dollar" className="w-4 h-4" />
                  <p className="text-white text-inter-bold">{player.totalWagered.toFixed(0)}</p>
                </div>
                <p className="text-green text-inter-small mt-1">{player.winRate}% win</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
