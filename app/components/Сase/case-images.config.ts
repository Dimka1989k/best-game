import gun1 from '@/assets/cases/gun1.svg';
import gun2 from '@/assets/cases/gun2.svg';
import gun3 from '@/assets/cases/gun3.svg';
import gun4 from '@/assets/cases/gun4.svg';
import gun5 from '@/assets/cases/gun5.svg';
import gun6 from '@/assets/cases/gun6.svg';
import gun7 from '@/assets/cases/gun7.svg';
import gun8 from '@/assets/cases/gun8.svg';
import gun9 from '@/assets/cases/gun9.svg';
import gun10 from '@/assets/cases/gun10.svg';
import gun11 from '@/assets/cases/gun11.webp';
import gun12 from '@/assets/cases/gun12.webp';
import gun13 from '@/assets/cases/gun13.webp';
import gun14 from '@/assets/cases/gun14.webp';

import type { CaseItemRarity } from '@/types/cases.types';

export const RARITY_IMAGE_POOL: Record<CaseItemRarity, string[]> = {
  Common: [gun1.src, gun2.src, gun3.src, gun4.src, gun5.src],
  Uncommon: [gun6.src, gun7.src, gun8.src],
  Rare: [gun9.src, gun10.src],
  Epic: [gun11.src, gun12.src],
  Legendary: [gun13.src],
  Gold: [gun14.src],
};
