import { RARITY_IMAGE_POOL } from './case-images.config';
import type { CaseItemImageSource } from '@/types/cases.types';

const imageCache = new Map<string, Map<string, string>>();

export function resetCaseItemImages() {
  imageCache.clear();
}

export function getCaseItemImage(item: CaseItemImageSource): string {
  if (!imageCache.has(item.rarity)) {
    imageCache.set(item.rarity, new Map());
  }

  const rarityCache = imageCache.get(item.rarity)!;

  if (rarityCache.has(item.id)) {
    return rarityCache.get(item.id)!;
  }

  const pool = RARITY_IMAGE_POOL[item.rarity];
  if (!pool || pool.length === 0) {
    return RARITY_IMAGE_POOL.Common[0];
  }

  const usedImages = new Set(rarityCache.values());
  const available = pool.filter((img) => !usedImages.has(img));

  const image = available.length > 0 ? available[0] : pool[rarityCache.size % pool.length];
  rarityCache.set(item.id, image);
  return image;
}
