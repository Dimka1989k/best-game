'use client';

import { useEffect, useRef } from 'react';
import { useSyncUser } from '@/hooks/useSyncUser';
import { useAuthStore } from '@/store/auth.store';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

export function AppBootstrap() {
  useSyncUser();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const { playMusic, stopMusic } = useMusic();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) return;

    const handleFirstInteraction = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (soundEnabled) {
        playMusic(Music.game);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [isAuthenticated, hasHydrated, soundEnabled, playMusic]);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (!soundEnabled) {
      stopMusic(Music.game);
    } else if (startedRef.current) {
      playMusic(Music.game);
    }
  }, [soundEnabled, isAuthenticated, playMusic, stopMusic]);

  // 🚪 якщо розлогінився
  useEffect(() => {
    if (!isAuthenticated) {
      stopMusic(Music.game);
      startedRef.current = false;
    }
  }, [isAuthenticated, stopMusic]);

  return null;
}
