import type { Match, MatchesApiResponse } from '../interfaces';

export const getMatches = async (): Promise<Match[]> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${BASE_URL}/api/matches`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch matches');
  }
  const data: MatchesApiResponse = await res.json();
  return data.data.matches;
};
