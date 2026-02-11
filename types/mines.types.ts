export type GridSize = 5 | 6 | 7 | 8;

export enum MinesStatus {
  Idle = 'idle',
  Starting = 'starting',
  Playing = 'playing',
  Lost = 'lost',
  Won = 'won',
  CashedOut = 'cashed_out',
}

export type StartMinesPayload = {
  amount: number;
  minesCount: number;
  gridSize: GridSize;
  clientSeed?: string;
};

export type RevealMinesPayload = {
  gameId: string;
  position: number;
};

export type StartMinesResponse = {
  gameId: string;
  amount: number;
  minesCount: number;
  gridSize: GridSize;
  totalTiles: number;
  serverSeedHash: string;
  multipliers: number[];
};

export type RevealMinesResponse = {
  minePositions: never[];
  position: number;
  isMine: boolean;
  currentMultiplier: number;
  currentValue: number;
  revealedTiles: number[];
  safeTilesLeft: number;
  gridSize: GridSize;
  totalTiles: number;
};

export type CashoutMinesResponse = {
  winAmount: number;
  multiplier: number;
  serverSeed: string;
  minePositions: number[];
  gridSize: GridSize;
  totalTiles: number;
};

export type MinesGame = {
  _id: string;
  userId: string;
  betAmount: number;
  gridSize: GridSize;
  minesCount: number;
  minePositions?: number[];
  revealedPositions: number[];
  status: MinesStatus;
  cashoutMultiplier?: number;
  winAmount?: number;
  serverSeed?: string;
  serverSeedHash?: string;
  clientSeed?: string;
  nonce?: number;
  createdAt: string;
  finishedAt?: string;
};

export type ActiveMinesResponse = {
  game: MinesGame | null;
};

export type MinesHistoryResponse = {
  games: MinesGame[];
};
