import type { CaseItemDTO } from '@/types/cases.types';

export const TOTAL_ITEMS = 40;
export const WIN_INDEX = 20;

export function generateSpinItems(pool: CaseItemDTO[], winItem: CaseItemDTO): CaseItemDTO[] {
  return Array.from({ length: TOTAL_ITEMS }, (_, i) =>
    i === WIN_INDEX ? winItem : pool[Math.floor(Math.random() * pool.length)],
  );
}
