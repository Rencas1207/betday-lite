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
    country: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  market: Market;
  displayHour: string;
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
  hour: string;
  matches: Match[];
}

export type BetStatus = 'PENDING' | 'WON' | 'LOST';
export type BetPick = 'HOME' | 'DRAW' | 'AWAY';

export interface UserBetsResponse {
  total: number;
  data: Bet[];
}
