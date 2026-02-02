import type { CaseItemRarity } from '@/types/cases.types';

export function normalizeRarity(rarity: string): CaseItemRarity {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'Common';
    case 'uncommon':
      return 'Uncommon';
    case 'rare':
      return 'Rare';
    case 'epic':
      return 'Epic';
    case 'legendary':
      return 'Legendary';
    case 'gold':
      return 'Gold';
    default:
      return 'Common';
  }
}
