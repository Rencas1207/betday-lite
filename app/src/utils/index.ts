import type { Match } from '../interfaces';

export interface HourGroup {
  hour: string;
  matches: Match[];
}

export interface DayGroup {
  date: string;
  hours: HourGroup[];
}

export function groupMatchesByDateHour(matches: Match[]): DayGroup[] {
  const groups: Record<string, Record<string, Match[]>> = {};

  matches.forEach((match) => {
    const dateObj = new Date(match.startTime);
    if (isNaN(dateObj.getTime())) return;

    const day = dateObj.toISOString().split('T')[0];
    const hour = dateObj.getHours().toString().padStart(2, '0');

    if (!groups[day]) groups[day] = {};
    if (!groups[day][hour]) groups[day][hour] = [];

    groups[day][hour].push(match);
  });

  return Object.entries(groups)
    .map(([date, hoursObj]) => ({
      date,
      hours: Object.entries(hoursObj)
        .map(([hour, matches]) => ({ hour, matches }))
        .sort((a, b) => Number(a.hour) - Number(b.hour))
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
