export interface Bet {
  id: string;
  matchId: string;
  odd: number;
  pick: 'HOME' | 'DRAW' | 'AWAY';
  placedAt: string;
  stake: number;
  status: 'PENDING' | 'WON' | 'LOST';
  return: number | null;
}
