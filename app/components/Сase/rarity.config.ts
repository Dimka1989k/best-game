import type { CaseItemRarity } from '@/types/cases.types';

export const RARITY_GRADIENT: Record<CaseItemRarity, string> = {
  Common: 'linear-gradient(180deg, rgba(80,83,87,0.2) 0%, #ADB5BD 100%)',
  Uncommon: 'linear-gradient(180deg, rgba(64,99,15,0.2) 0%, #82C91E 100%)',
  Rare: 'linear-gradient(180deg, rgba(108,170,246,0.2) 0%, #6CAAF6 100%)',
  Epic: 'linear-gradient(180deg, rgba(168,108,246,0.2) 0%, #A86CF6 100%)',
  Legendary: 'linear-gradient(180deg, rgba(255,205,113,0.2) 0%, #E59603 100%)',
  Gold: 'linear-gradient(180deg, rgba(255, 24, 95, 0.2) 0%, #FF185F 100%)',
};
