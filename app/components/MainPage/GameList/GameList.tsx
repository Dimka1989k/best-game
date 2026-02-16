'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { GAME_LIST } from './gameList.data';
import { useTranslation } from 'react-i18next';

export default function GameList() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6 max-md:gap-4 md:mt-8.5 justify-items-center">
      {GAME_LIST.map((game) => (
        <Card
          key={game.id}
          className="w-full max-w-74 h-90.5 max-sm:max-h-57.5 object-contain bg-center flex flex-col p-6 max-md:pt-2.5 max-md:pb-4 max-md:px-2.5 radius-lg shadow-cards-games"
          style={{ backgroundImage: `url(${game.background})` }}
        >
          <CardHeader>
            <div
              className={`shadow-green flex items-center justify-center bg-[linear-gradient(116.24deg,#B9FF58_-6.88%,#69B400_83.61%)] ${game.badgeWidthClass} max-sm:h-6.5 h-7 radius-pill text-white text-inter-bold max-md:text-sm!`}
            >
              {t(game.badgeKey)}
            </div>
          </CardHeader>
          <CardContent className="relative flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 translate-y-[10%] bg-[#FFFFFF03] backdrop-blur-lg pointer-events-none mask-[linear-gradient(to_bottom,transparent_47.37%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_47.37%,black_100%)] rounded-b-lg" />
            <div className="relative z-10 ">
              <p className="max-sm:mt-9 mt-29 text-satoshi text-white max-sm:text-xl!">
                {t(game.titleKey)}
              </p>
              <p className="text-inter-secondary text-white max-sm:text-xs! max-sm:font-normal!">
                {t(game.descriptionKey)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex mt-auto justify-center items-center px-0">
            <Link
              href={game.href}
              className="radius-pill w-42 h-12 max-sm:w-31 max-sm:h-10 cursor-pointer flex items-center justify-center button-red text-white! text-inter-secondary"
            >
              {t('common.freePlay')}
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
