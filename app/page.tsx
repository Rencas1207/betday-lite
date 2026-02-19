import type { Match, MatchesApiResponse } from '@/app/src/types';
import { groupMatchesByTime } from '@/app/src/utils';
import TimelineSection from './src/components/TimelineSection';
import PublicLayout from './src/layout/PublicLayout';

async function getMatches(): Promise<Match[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${BASE_URL}/api/matches`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch matches');
  }
  const data: MatchesApiResponse = await res.json();
  return data.data.matches;
}

export default async function Page() {
  const matches = await getMatches();
  const groupedMatches = groupMatchesByTime(matches);

  return (
    <PublicLayout>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 sm:items-center dark:bg-black">
        <section className="w-full max-w-360">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">
              Eventos del Día
            </h1>
            <p className="mt-2 text-zinc-400">
              Selecciona un evento y realiza tu apuesta 1X2.
            </p>
          </div>
          <TimelineSection matches={groupedMatches} />
        </section>
      </main>
    </PublicLayout>
  );
}
