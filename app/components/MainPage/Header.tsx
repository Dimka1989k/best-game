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

import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { useSidebar } from '@/components/ui/sidebar';
import { useLogout } from '@/hooks/auth/useLogout';

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const logout = useLogout();
  const balance = useUserStore((s) => s.balance);

  return (
    <header className="sticky px-12 max-md:px-4 pt-6 pb-6 max-md:pt-4 bg-header flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <Button className="px-0 py-0 cursor-pointer" onClick={toggleSidebar}>
          <Image src={burgerIcon} alt="burgerIcon" className="md:hidden" />
        </Button>
        <Link href="/" className="flex gap-2 items-center justify-center">
          <p className="text-satoshi-small text-white max-md:hidden">Blaze</p>
          <Image src={Logo} alt="logo" className="max-md:hidden" />
          <p className="text-satoshi-small text-white max-md:hidden">Casino</p>
        </Link>
      </div>
      <div className="flex gap-15.5 max-md:gap-0">
        <div className="flex items-center justify-center max-md:justify-between max-md:gap-0 gap-4">
          <div className="flex items-center justify-center gap-2 border border-gray radius-pill px-6 py-3">
            <Image src={Dollar} alt="Dollar" />
            <p className="text-inter-main text-white">{balance.toFixed(2)}</p>
          </div>
          <Button className="max-md:hidden flex items-center">
            <div className="rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)]">
              <Avatar>
                <AvatarImage
                  src={avatarIcon.src}
                  alt="avatar"
                  className="cursor-pointer object-cover"
                />
              </Avatar>
            </div>
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <Button className="px-0 max-md:hidden">
            <Image src={iconSettings} alt="iconSettings" className="cursor-pointer" />
          </Button>
          <Button
            onClick={logout}
            className="max-md:hidden transition-shadow duration-200 ease-in-out text-inter-h2 text-white button-yellow w-full max-w-29.5 h-10.5 border-none cursor-pointer"
            variant="default"
          >
            <span className="mx-auto ">Log out</span>
            <span className="flex items-center">
              <Image src={iconLogOut} alt="loginIcon" />
            </span>
          </Button>
        </div>
      </div>
      <Button className="md:hidden flex items-center">
        <div className="rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)]">
          <Avatar>
            <AvatarImage
              src={avatarIcon.src}
              alt="avatar"
              className="cursor-pointer object-cover"
            />
          </Avatar>
        </div>
      </Button>
    </header>
  );
}
