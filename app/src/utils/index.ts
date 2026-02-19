import type { Match } from '../types';

export interface GroupedMatch {
  datetime: string;
  match: Match;
}

export function groupMatchesByTime(matches: Match[]): GroupedMatch[] {
  return matches.map((match) => {
    const date = new Date(match.startTime);

    const day = date.toISOString().split('T')[0];
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return {
      datetime: `${day} ${hour}:${minutes}`,
      match
    };
  });
}
