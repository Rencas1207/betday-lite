import { Typography } from '@betday-lite/typography';
import BetSidePanel from './src/components/BetSidePanel';
import TimelineSection from './src/components/TimelineSection';
import PublicLayout from './src/layout/PublicLayout';
import { getMatches } from './src/services/get-matches.service';
import { groupMatchesByDateHour } from './src/utils';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const matches = await getMatches();
  const groupedMatches = groupMatchesByDateHour(matches);
  return (
    <PublicLayout>
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-slate-50 px-4 py-10 transition-colors">
        <section className="w-full max-w-360">
          <div className="mb-10">
            <Typography
              variant="h1"
              className="w-fit text-4xl font-black tracking-tighter text-slate-900 uppercase italic"
            >
              Eventos del Día
            </Typography>
            <Typography
              variant="body"
              className="mt-2 font-medium text-slate-500"
            >
              Selecciona un evento y realiza tu apuesta{' '}
              <Typography
                variant="small"
                className="text-base font-bold text-emerald-600"
              >
                1X2
              </Typography>
              .
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <section className="lg:col-span-8">
              <TimelineSection matches={groupedMatches} />
            </section>
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <BetSidePanel />
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
