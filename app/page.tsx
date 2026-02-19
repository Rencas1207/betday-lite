import { groupMatchesByTime } from '@/app/src/utils';
import TimelineSection from './src/components/TimelineSection';
import PublicLayout from './src/layout/PublicLayout';
import { getMatches } from './src/services/get-matches.services';

export const dynamic = 'force-dynamic';

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
