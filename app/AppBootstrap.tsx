'use client';

import { useSyncUser } from '@/hooks/useSyncUser';

export function AppBootstrap() {
  useSyncUser();
  return null;
}
