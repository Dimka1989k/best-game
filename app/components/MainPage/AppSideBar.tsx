'use client';

import { Sidebar, SidebarContent, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from '@/assets/Logo-header.svg';
import iconLogOut from '@/assets/login-icon.svg';
import invertIocn from '@/assets/invert-icon.svg';
import iconSettings from '@/assets/icon-settings.svg';
import { useLogout } from '@/hooks/auth/useLogout';
import Link from 'next/link';
import { Settings } from './Settings';
import { useTranslation } from 'react-i18next';

export function AppSidebar() {
  const logout = useLogout();
  const { t } = useTranslation();
  return (
    <Sidebar side="left" className="md:hidden">
      <SidebarContent className="bg-main pb-10 pt-17.5 h-full">
        <SidebarGroupContent className="flex flex-col h-full">
          <SidebarMenu className="h-full">
            <Link href="/" className="flex gap-2 items-center justify-center  mb-17">
              <p className="text-satoshi-small text-white">Blaze</p>
              <Image src={Logo} alt="logo" className="" />
              <p className="text-satoshi-small text-white">Casino</p>
            </Link>
            <div className="flex flex-col gap-2 justify-center items-center">
              <Button className="cursor-pointer flex px-4.5 justify-start w-full max-w-47 text-btn! text-inter-main bg-cards-bg radius-sm">
                <Image src={invertIocn} alt="invertIocn" />
                {t('navigation.inventory')}
              </Button>
              <Settings>
                <Button className="cursor-pointer flex px-4.5 justify-start w-full max-w-47 text-btn! text-inter-main bg-cards-bg radius-sm">
                  <Image src={iconSettings} alt="iconSettings" className="w-4.5 h-4.5" />
                  {t('navigation.settings')}
                </Button>
              </Settings>
            </div>
            <div className="mt-auto flex justify-center">
              <Button
                onClick={logout}
                className="radius-md transition-shadow duration-200 ease-in-out text-inter-h2 text-btn button-yellow w-full max-w-47 h-10.5 border-none cursor-pointer"
                variant="default"
              >
                <span className="">{t('auth.logout')}</span>
                <span className="flex items-center">
                  <Image src={iconLogOut} alt="loginIcon" />
                </span>
              </Button>
            </div>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}
