import { CASE_ITEM_NAME_MAP, type CaseCategory } from './case-item-name.map';

export function normalizeCaseItemName(rawName: string, category: CaseCategory) {
  const key = rawName.trim().toLowerCase();
  return CASE_ITEM_NAME_MAP[category][key] ?? rawName;
}
