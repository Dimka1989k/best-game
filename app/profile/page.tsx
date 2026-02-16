'use client';

import { useLeaderboardQuery } from '@/hooks/useLeaderboardQuery';
import { useUserStore } from '@/store/useUserStore';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import avatarIcon from '@/assets/avatar.jpg';
import flagUkraine from '@/assets/flag.png';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { data } = useLeaderboardQuery('all');
  const { t } = useTranslation();

  const avatarURL = useUserStore((s) => s.avatarURL);
  const username = useUserStore((s) => s.username);

  const gamesPlayed = data?.currentUser?.gamesPlayed ?? 0;
  const winRate = data?.currentUser?.winRate ?? 0;
  const lossRate = 100 - winRate;

  return (
    <div className="flex flex-col items-center justify-center mt-14 max-md:mx-4">
      <div className="rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] w-25 h-25">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={avatarURL ?? avatarIcon.src}
            alt={username ?? 'avatar'}
            className="cursor-pointer object-cover"
          />
        </Avatar>
      </div>
      <p className="text-white text-inter-h2 mt-3 mb-5"> {username ?? t('common.loading')}</p>
      <div className="button-case radius-ms py-4 px-24.5 max-md:px-4 flex gap-10 max-md:gap-3 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-inter-main text-gray max-md:text-sm!">{t('common.totalGame')}</p>
          <p className="text-white text-inter-h2 max-md:text-base!">{gamesPlayed}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-inter-main text-gray">{t('common.win')}</p>
          <p className="text-white text-inter-h2  max-md:text-base!">{winRate.toFixed(2)}%</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-inter-main text-gray">{t('common.loss')}</p>
          <p className="text-white text-inter-h2  max-md:text-base!">{lossRate.toFixed(2)}%</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-inter-main text-gray">{t('common.location')}</p>
          <Image src={flagUkraine} alt="flagUkraine" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
