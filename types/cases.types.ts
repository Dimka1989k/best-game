export type CaseDTO = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string | null;
};

export type CaseItemDTO = {
  id: string;
  name: string;
  rarity: CaseItemRarity;
  value: number;
  chance: number;
  image: string;
};

export enum CasePhase {
  IDLE = 'idle',
  SPINNING = 'spinning',
  RESULT = 'result',
}

export type OpenedCaseItem = {
  id: string;
  name: string;
  rarity: CaseItemRarity;
  value: number;
  image: string;
};

export type CarouselItemUI = {
  id: string;
  name: string;
  rarity: CaseItemRarity;
  image: string;
};

export type CaseDetailsDTO = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: CaseItemDTO[];
};

export type CaseItemImageSource = {
  id: string;
  rarity: CaseItemRarity;
};

export type OpenCaseResponse = {
  openingId: string;
  item: OpenedCaseItem;
  newBalance: number;
  caseItems: CaseItemDTO[];
  casePrice: number;
  itemValue: number;
};

export type CaseHistoryItem = {
  rarity: string;
  id: string;
  createdAt: string;
  caseName: string;
  casePrice: number;
  itemName: string;
  itemValue: number;
  itemRarity: CaseItemRarity;
  itemImage: string;
  profit: number;
};

export type CaseItemRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Gold';

export type CaseHistoryResponse = {
  openings: CaseHistoryItem[];
};
