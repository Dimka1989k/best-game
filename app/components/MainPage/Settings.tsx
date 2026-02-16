'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import i18n from '@/app/i18n';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/store/useSettingsStore';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

type Theme = 'dark' | 'light';

type SettingsProps = {
  children: React.ReactNode;
};

export function Settings({ children }: SettingsProps) {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSound = useSettingsStore((s) => s.setSound);

  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-47 mt-2 px-0 bg-bg-black border-none shadow-message-chat radius-sm"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-white text-inter-main!">
            {t('navigation.settings')}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white!" />
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-white cursor-pointer">
              {t('navigation.theme')}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-bg-black border-none shadow-message-chat radius-sm">
                <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
                  <DropdownMenuRadioItem className="text-white cursor-pointer" value="dark">
                    {t('navigation.dark')}
                    <DropdownMenuShortcut>
                      <Moon size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="text-white cursor-pointer" value="light">
                    {t('navigation.light')}
                    <DropdownMenuShortcut>
                      <Sun size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-white cursor-pointer">
              {t('navigation.lang')}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-bg-black border-none shadow-message-chat radius-sm">
                <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                  <DropdownMenuRadioItem className="text-white cursor-pointer" value="en">
                    {t('navigation.english')}
                    <DropdownMenuShortcut>{t('navigation.en')}</DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="text-white cursor-pointer" value="uk">
                    {t('navigation.ukrainian')}
                    <DropdownMenuShortcut>{t('navigation.ua')}</DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-white cursor-pointer">
              {t('navigation.sound')}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-bg-black border-none shadow-message-chat radius-sm">
                <DropdownMenuRadioGroup
                  value={soundEnabled ? 'on' : 'off'}
                  onValueChange={(value) => setSound(value === 'on')}
                >
                  <DropdownMenuRadioItem className="text-white cursor-pointer" value="on">
                    {t('navigation.on')}
                    <DropdownMenuShortcut>
                      <Volume2 size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="text-white  cursor-pointer" value="off">
                    {t('navigation.off')}
                    <DropdownMenuShortcut>
                      <VolumeX size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
