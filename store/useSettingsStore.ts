import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SettingsState = {
  soundEnabled: boolean;
  toggleSound: () => void;
  setSound: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: true,

      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        })),

      setSound: (value) => set({ soundEnabled: value }),
    }),
    {
      name: 'settings-storage',
    },
  ),
);
