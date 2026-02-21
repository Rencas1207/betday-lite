import type { Match } from '../interfaces/index.interface';
import type { DayGroup, LeagueGroup } from '../interfaces/matches.interface';

export function groupMatchesByToday(matches: Match[]): DayGroup[] {
  const now = new Date();
  const todayKey = now.toISOString().split('T')[0];

  const groups: Record<string, Record<string, LeagueGroup>> = {};

  matches.forEach((match) => {
    const originalDate = new Date(match.startTime);
    if (isNaN(originalDate.getTime())) return;

    const hour = originalDate.getHours().toString().padStart(2, '0');
    const minutes = originalDate.getMinutes().toString().padStart(2, '0');

    const leagueId = match.league.id;

    if (!groups[todayKey]) groups[todayKey] = {};

    if (!groups[todayKey][leagueId]) {
      groups[todayKey][leagueId] = {
        id: leagueId,
        name: match.league.name,
        country: match.league.country,
        matches: []
      };
    }

    groups[todayKey][leagueId].matches.push({
      ...match,
      displayHour: `${hour}:${minutes}`
    });
  });

  return Object.entries(groups)
    .map(([date, leaguesObj]) => ({
      date,
      leagues: Object.values(leaguesObj).map((league) => ({
        ...league,
        matches: league.matches.sort((a, b) =>
          a.displayHour.localeCompare(b.displayHour)
        )
      }))
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export const pickTranslations: Record<string, string> = {
  HOME: 'Local',
  DRAW: 'Empate',
  AWAY: 'Visita'
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
