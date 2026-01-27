export type BetAdjustAction = 'half' | 'double' | 'max';

export const BET_ADJUST_BUTTONS: {
  label: string;
  action: BetAdjustAction;
}[] = [
  { label: '1/2', action: 'half' },
  { label: 'x2', action: 'double' },
  { label: 'Max', action: 'max' },
];
