import { Risk } from '@/types/plinko.types';

export const RISK_TO_API: Record<Risk, 'low' | 'medium' | 'high'> = {
  [Risk.Low]: 'low',
  [Risk.Medium]: 'medium',
  [Risk.High]: 'high',
};
