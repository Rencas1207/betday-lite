export interface Odd {
  id: string;
  value: number;
  marketId: string;
}

export interface Market {
  id: string;
  type: '1X2';
  name: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}

export interface Match {
  id: string;
  league: {
    id: string;
    name: string;
    logo: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  market: Market;
}

export interface MatchesTodayResponse {
  date: string;
  timezone: string;
  matches: Match[];
}

export interface MatchesApiResponse {
  ok: boolean;
  data: MatchesApiData;
}

export interface GroupedMatch {
  datetime: string;
  match: Match;
}

export type BetStatus = 'PENDING' | 'WON' | 'LOST';
export type BetPick = 'HOME' | 'DRAW' | 'AWAY';

export interface Bet {
  id: string;
  matchId: string;
  leagueName: string;
  homeTeamName: string;
  awayTeamName: string;
  pick: BetPick;
  oddValue: number;
  stake: number;
  return: number;
  status: BetStatus;
  betTime: string; // ISO 8601 string
}

export interface UserBetsResponse {
  total: number;
  data: Bet[];
}
