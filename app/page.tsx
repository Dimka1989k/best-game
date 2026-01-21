'use client';

import { AuthGate } from '@/app/routing/AuthGate';
import LeaderBoard from './components/MainPage/LeaderBoard';
import LiveChat from './components/MainPage/Chat/LiveChat';

import DrawerChat from './components/MainPage/Chat/DrawerChat';

import GameList from './components/MainPage/GameList/GameList';

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
