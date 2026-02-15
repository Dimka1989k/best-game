export type BetPlinkoAction = 'half' | 'double' | 'max';

export const BET_PLINKO_BUTTONS: {
  label: string;
  action: BetPlinkoAction;
}[] = [
  { label: '1/2', action: 'half' },
  { label: 'x2', action: 'double' },
  { label: 'Max', action: 'max' },
];
