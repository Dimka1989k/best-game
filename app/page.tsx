'use client';

import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    redirect('/auth/login');
  }

  return <div>Main Screen</div>;
}
