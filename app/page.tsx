'use client';

import { AuthGate } from '@/app/routing/AuthGate';
import LeaderBoard from './components/MainPAge/LeaderBoard';
import LiveChat from './components/MainPAge/LiveChat';
import GameList from './components/MainPAge/GameList';

export default function Home() {
  return (
    <AuthGate>
      <div className="flex px-12 pt-10 pb-13.5 justify-between items-center">
        <LeaderBoard />
        <GameList />
        <LiveChat />
      </div>
    </AuthGate>
  );
}
