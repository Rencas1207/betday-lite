import { atom } from 'jotai';
import type { Match } from '../interfaces/index.interface';

interface PendingBet {
  match: Match;
  pick: string;
  odd: number;
}

export const loginModalAtom = atom(false);
export const pendingBetsAtom = atom<PendingBet[]>([]);
export const isBetSlipOpenAtom = atom(false);
