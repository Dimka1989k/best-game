'use client';

import { SplashProvider } from './SplashProvider';

export function ClientRoot({ children }: { children: React.ReactNode }) {
  return <SplashProvider>{children}</SplashProvider>;
}
