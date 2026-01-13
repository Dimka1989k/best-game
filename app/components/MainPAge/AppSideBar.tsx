'use client';

import { Sidebar, SidebarContent, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from '@/assets/Logo-header.svg';
import iconLogOut from '@/assets/login-icon.svg';
import invertIocn from '@/assets/invert-icon.svg';
import iconSettings from '@/assets/icon-settings.svg';
import { useLogout } from '@/hooks/auth/useLogout';

export function AppSidebar() {
  const logout = useLogout();
  return (
    <Sidebar side="left" className="md:hidden">
      <SidebarContent className="bg-bg-mines pb-10 pt-17.5">
        <SidebarGroupContent>
          <SidebarMenu>
            <div className="flex gap-2 items-center justify-center  mb-17">
              <p className="text-satoshi-small text-white">Blaze</p>
              <Image src={Logo} alt="logo" className="" />
              <p className="text-satoshi-small text-white">Casino</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <Button className="cursor-pointer flex px-4.5 justify-start w-full max-w-47 text-white! text-inter-main bg-cards-bg radius-sm">
                <Image src={invertIocn} alt="invertIocn" />
                Invertory
              </Button>
              <Button className="cursor-pointer flex px-4.5 justify-start w-full max-w-47 text-white! text-inter-main bg-cards-bg radius-sm">
                <Image src={iconSettings} alt="iconSettings" className="w-4.5 h-4.5" />
                Settings
              </Button>
            </div>
            <div className="flex justify-center mt-125">
              <Button
                onClick={logout}
                className="transition-shadow duration-200 ease-in-out text-inter-h2 text-white button-yellow w-full max-w-47 h-10.5 border-none cursor-pointer"
                variant="default"
              >
                <span className="">Log out</span>
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
