'use client';

import { AuthGate } from '@/app/routing/AuthGate';
import LeaderBoard from './components/MainPAge/LeaderBoard';
import LiveChat from './components/MainPAge/LiveChat';
import GameList from './components/MainPAge/GameList';
import DrawerChat from './components/MainPAge/DrawerChat';

export default function Home() {
  return (
    <AuthGate>
      <DrawerChat />
      <div className="relative flex pl-12 pr-0  max-md:px-4 pt-10 max-md:pt-0 pb-13.5 justify-between max-xl:flex-col-reverse max-xl:gap-10 scrollbar-red">
        <LeaderBoard />
        <GameList />
        <LiveChat />
      </div>
    </AuthGate>
  );
}
