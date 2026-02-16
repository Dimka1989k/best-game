'use client';

import { Howl } from 'howler';
import { Music } from '@/types/music.types';
import { useSettingsStore } from '@/store/useSettingsStore';

const sounds: Record<Music, Howl> = {
  [Music.game]: new Howl({
    src: ['/music/game.mp3'],
    volume: 0.2,
    preload: true,
    loop: true,
  }),
  [Music.buttonBet]: new Howl({
    src: ['/music/buttonbet.mp3'],
    volume: 0.4,
    preload: true,
  }),
  [Music.bonus]: new Howl({
    src: ['/music/bonus.mp3'],
    volume: 0.4,
    preload: true,
  }),
  [Music.button]: new Howl({
    src: ['/music/button.wav'],
    volume: 0.5,
    preload: true,
  }),
  [Music.carousel]: new Howl({
    src: ['/music/carousel.mp3'],
    volume: 0.4,
    preload: true,
  }),
  [Music.gameover]: new Howl({
    src: ['/music/gameover.mp3'],
    volume: 0.3,
    preload: true,
  }),
  [Music.rocket]: new Howl({
    src: ['/music/rocket.mp3'],
    volume: 0.2,
    preload: true,
    loop: true,
  }),
  [Music.won]: new Howl({
    src: ['/music/won.mp3'],
    volume: 0.3,
    preload: true,
  }),
  [Music.losemines]: new Howl({
    src: ['/music/losemines.mp3'],
    volume: 0.2,
    preload: true,
  }),
  [Music.winmines]: new Howl({
    src: ['/music/winmines.mp3'],
    volume: 0.3,
    preload: true,
  }),
  [Music.ball]: new Howl({
    src: ['/music/ball.mp3'],
    volume: 0.4,
    preload: true,
  }),
};

export const useMusic = () => {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);

  const playMusic = (name: Music) => {
    if (!soundEnabled) return;
    sounds[name]?.play();
  };

  const stopMusic = (name: Music) => {
    sounds[name]?.stop();
  };

  return { playMusic, stopMusic };
};
