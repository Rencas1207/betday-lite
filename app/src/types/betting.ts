// src/types/betting.ts
export interface Match {
  id: string;
  startTime: string;
  league: { name: string };
  homeTeam: { name: string; shortName: string };
  awayTeam: { name: string; shortName: string };
  market: {
    odds: { home: number; draw: number; away: number };
  };
}

export interface Bet {
  id: string;
  matchId: string;
  pick: 'HOME' | 'DRAW' | 'AWAY';
  odd: number;
  stake: number;
  status: 'PENDING' | 'WON' | 'LOST';
  return: number | null;
}
