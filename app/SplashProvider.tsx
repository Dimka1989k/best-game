'use client';

import { useEffect, useState } from 'react';
import { Loading } from './Loading';

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  if (isLoading) {
    return <Loading progress={progress} />;
  }
  return <>{children}</>;
}
import React from 'react';
