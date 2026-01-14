'use client';

import { AuthGate } from '@/app/routing/AuthGate';
import LeaderBoard from './components/MainPAge/LeaderBoard';
import LiveChat from './components/MainPAge/LiveChat';
import GameList from './components/MainPAge/GameList';

export default function Home() {
  return (
    <AuthGate>
      <div className="flex px-12 max-md:px-4 pt-10 max-md:pt-0 pb-13.5 justify-between items-center flex-wrap max-xl:flex-col-reverse max-xl:gap-10">
        <LeaderBoard />
        <GameList />
        <LiveChat />
      </div>
    </AuthGate>
  );
}
