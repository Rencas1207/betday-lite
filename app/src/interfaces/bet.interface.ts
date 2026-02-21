export interface IBetResponse {
  id: string;
  matchId: string;
  odd: number;
  pick: BetPick;
  placedAt: string;
  stake: number;
  status: BetStatus;
  return: number | null;
}

export interface IBetItem {
  match: string;
  pick: string;
  odd: number;
}

export interface IBet {
  user_id: string;
  type: 'simple' | 'multiple';
  total_stake: number;
  total_odd: number;
  potential_return: number;
  status: BetStatus;
  items: IBetItem[];
}

export type BetStatus = 'PENDING' | 'WON' | 'LOST';
export type BetPick = 'HOME' | 'DRAW' | 'AWAY';
