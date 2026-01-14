import rocketCards from '@/assets/image-rocket.svg';
import casesCards from '@/assets/image-cases.svg';
import minesCards from '@/assets/image-mines.svg';
import plinkCards from '@/assets/image-plinko.svg';

export interface GameCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  badgeWidthClass: string;
  background: string;
}

export const GAME_LIST: GameCardItem[] = [
  {
    id: 'crash',
    title: 'Crash',
    description: 'Watch the multiplier rise and cash out before it’s gone',
    href: '/crash',
    badge: 'Top',
    badgeWidthClass: 'w-14.5',
    background: rocketCards.src,
  },
  {
    id: 'case',
    title: 'Case',
    description: 'Open cases and win random rewards',
    href: '/case',
    badge: 'Popular',
    badgeWidthClass: 'w-full max-w-23',
    background: casesCards.src,
  },
  {
    id: 'mines',
    title: 'Mines',
    description: 'Avoid the mines and collect bigger rewards',
    href: '/mines',
    badge: 'Hot',
    badgeWidthClass: 'w-full max-w-14.5',
    background: minesCards.src,
  },
  {
    id: 'plinko',
    title: 'Plinko',
    description: 'Drop the ball, watch it bounce, and win prizes',
    href: '/plinko',
    badge: 'New',
    badgeWidthClass: 'w-14.5',
    background: plinkCards.src,
  },
];
