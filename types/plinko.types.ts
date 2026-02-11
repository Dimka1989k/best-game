export enum Risk {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum PlinkoStatus {
  Won = 'won',
  Lost = 'lost',
}

export type DropPayload = {
  amount: number;
  balls: number;
  risk: Risk;
  lines: Row;
};

export type Row = 8 | 10 | 12 | 14 | 16;

export type PlinkoDrop = {
  dropId: string;
  slotIndex: number;
  multiplier: number;
  winAmount: number;
  path: Array<0 | 1>;
};

export type PlinkoDropResponse = {
  drops: PlinkoDrop[];
  totalBet: number;
  totalWin: number;
  newBalance: number;
};

export type BackendPlinkoGame = {
  _id: string;
  betAmount: number;
  ballsCount: number;
  linesCount: Row;
  riskLevel: Risk;
  avgMultiplier: string;
  totalWin: number;
  createdAt: string;
  status: PlinkoStatus;
};

export type PlinkoHistoryResponse = {
  drops: BackendPlinkoGame[];
};

export type PlinkoHistoryRow = {
  id: string;
  betAmount: number;
  rows: Row;
  risk: Risk;
  multiplier: number;
  totalBet: number;
  winAmount: number;
  netWin: number;
  createdAt: string;
  status: PlinkoStatus;
};

export type PlinkoMultipliersResponse = {
  multipliers: number[];
};
