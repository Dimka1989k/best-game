'use client';

import Image from 'next/image';
import Logo from '@/assets/Logo-header.svg';
import Dollar from '@/assets/icon-dollar.svg';
import avatarIcon from '@/assets/avatar.jpg';
import iconSettings from '@/assets/icon-settings.svg';
import { Button } from '@/components/ui/button';
import iconLogOut from '@/assets/login-icon.svg';
import burgerIcon from '@/assets/burger.svg';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { Settings } from './Settings';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { useSidebar } from '@/components/ui/sidebar';
import { useLogout } from '@/hooks/auth/useLogout';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const { toggleSidebar } = useSidebar();
  const logout = useLogout();
  const balance = useUserStore((s) => s.balance);
  const avatarURL = useUserStore((s) => s.avatarURL);

  return (
    <header className="sticky px-12 max-md:px-4 pt-6 pb-6 max-md:pt-4 bg-header flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <Button className="px-0 py-0 cursor-pointer" onClick={toggleSidebar}>
          <Image src={burgerIcon} alt="burgerIcon" className="md:hidden" />
        </Button>
        <Link href="/" className="flex gap-2 items-center justify-center">
          <p className="text-satoshi-small text-white max-md:hidden">Blaze</p>
          <Image src={Logo} alt="logo" className="max-md:hidden" />
          <p className="text-satoshi-small text-white max-md:hidden">{t('auth.casino')}</p>
        </Link>
      </div>
      <div className="flex gap-15.5 max-md:gap-0">
        <div className="flex items-center justify-center max-md:justify-between max-md:gap-0 gap-4">
          <Link
            href="/bonus"
            className="flex items-center justify-center gap-2 border border-gray radius-pill px-6 py-3"
          >
            <Image src={Dollar} alt="Dollar" />
            <p className="text-inter-main text-white">{balance.toFixed(2)}</p>
          </Link>
          <Link href="/profile" className="max-md:hidden flex items-center">
            <div className="rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)]">
              <Avatar>
                <AvatarImage
                  src={avatarURL ?? avatarIcon.src}
                  alt="avatar"
                  className="cursor-pointer object-cover"
                />
              </Avatar>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Settings>
            <Button className="px-0 max-md:hidden">
              <Image src={iconSettings} alt="iconSettings" className="cursor-pointer" />
            </Button>
          </Settings>
          <Button
            onClick={logout}
            className="radius-md max-md:hidden transition-shadow duration-200 ease-in-out text-inter-h2 text-btn button-yellow w-full max-w-29.5 h-10.5 border-none cursor-pointer"
            variant="default"
          >
            <span className="mx-auto ">{t('auth.logout')}</span>
            <span className="flex items-center">
              <Image src={iconLogOut} alt="loginIcon" />
            </span>
          </Button>
        </div>
      </div>
      <Link href="/profile" className="md:hidden flex items-center">
        <div className="rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)]">
          <Avatar>
            <AvatarImage
              src={avatarURL ?? avatarIcon.src}
              alt="avatar"
              className="cursor-pointer object-cover"
            />
          </Avatar>
        </div>
      </Link>
    </header>
  );
}
