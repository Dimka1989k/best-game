'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

import LiveChat from './components/MainPAge/LiveChat';
import LeaderBoard from './components/MainPAge/LeaderBoard';
import GameList from './components/MainPAge/GameList';

export default function Home() {
  const router = useRouter();

  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <div className="flex px-12 pt-10 pb-13.5 justify-between items-center">
      <LeaderBoard />
      <GameList />
      <LiveChat />
    </div>
  );
}
