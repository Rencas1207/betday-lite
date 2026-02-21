import type { Match } from './index.interface';

export interface LeagueGroup {
  id: string;
  name: string;
  country: string;
  matches: (Match & { displayHour: string })[];
}

export interface DayGroup {
  date: string;
  leagues: LeagueGroup[];
}
