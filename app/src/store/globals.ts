import { atom } from 'jotai';
import type { Match } from '../types';

export const loginModalAtom = atom(false);
export const pendingBetAtom = atom<{
  match: Match;
  pick: string;
  odd: number;
} | null>(null);
