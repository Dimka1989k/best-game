export type BetMinesAction = 'half' | 'double' | 'max';

export const BET_MINES_BUTTONS: {
  label: string;
  action: BetMinesAction;
}[] = [
  { label: '1/2', action: 'half' },
  { label: 'x2', action: 'double' },
  { label: 'Max', action: 'max' },
];
