import rocketCards from '@/assets/image-rocket.svg';
import casesCards from '@/assets/image-cases.svg';
import minesCards from '@/assets/image-mines.svg';
import plinkCards from '@/assets/image-plinko.svg';

export interface GameCardItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  badgeKey: string;
  href: string;
  badgeWidthClass: string;
  background: string;
}

export const GAME_LIST: GameCardItem[] = [
  {
    id: 'crash',
    titleKey: 'games.crash.title',
    descriptionKey: 'games.crash.description',
    badgeKey: 'common.top',
    href: '/crash',
    badgeWidthClass: 'w-14.5',
    background: rocketCards.src,
  },
  {
    id: 'case',
    titleKey: 'games.cases.title',
    descriptionKey: 'games.cases.description',
    badgeKey: 'common.popular',
    href: '/case',
    badgeWidthClass: 'w-full max-w-23',
    background: casesCards.src,
  },
  {
    id: 'mines',
    titleKey: 'games.mines.title',
    descriptionKey: 'games.mines.description',
    badgeKey: 'common.hot',
    href: '/mines',
    badgeWidthClass: 'w-full max-w-14.5',
    background: minesCards.src,
  },
  {
    id: 'plinko',
    titleKey: 'games.plinko.title',
    descriptionKey: 'games.plinko.description',
    badgeKey: 'common.new',
    href: '/plinko',
    badgeWidthClass: 'w-14.5',
    background: plinkCards.src,
  },
];
