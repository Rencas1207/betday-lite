import { Box } from '@betday-lite/box';
import { Typography } from '@betday-lite/typography';
import BetSidePanel from './src/components/BetSidePanel';
import MobileTicketButton from './src/components/MobileTicketButton';
import TimelineSection from './src/components/TimelineSection';
import PublicLayout from './src/layout/PublicLayout';
import { getMatches } from './src/services/get-matches.service';
import { groupMatchesByToday } from './src/utils';

export const dynamic = 'force-dynamic';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'BetDay Lite',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  description:
    'BetDay Lite es tu plataforma de apuestas deportivas y pronósticos en tiempo real.',
  applicationCategory: 'SportsApplication, FinanceApplication',
  operatingSystem: 'Android, iOS, Windows, macOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PEN'
  },
  author: {
    '@type': 'Organization',
    name: 'BetDay Team'
  },
  screenshot: `${process.env.NEXT_PUBLIC_BASE_URL}/android-chrome-512x512.png`,
  featureList: [
    'Apuestas en vivo',
    'Pronósticos deportivos',
    'Gestión de historial de apuestas',
    'Multi-dispositivo'
  ]
};

export default async function Page() {
  const matches = await getMatches();
  const groupedMatches = groupMatchesByToday(matches);
  return (
    <PublicLayout>
      <Box
        as="main"
        className="flex min-h-screen w-full flex-col items-center justify-start bg-slate-50 px-4 py-10 pb-22.5 transition-colors md:pb-10"
      >
        <Box as="section" className="w-full max-w-360">
          <Box className="mb-10">
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
          </Box>

          <Box className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <Box as="section" className="lg:col-span-8">
              <TimelineSection matches={groupedMatches} />
            </Box>
            <BetSidePanel />
          </Box>
          <MobileTicketButton />
        </Box>
      </Box>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PublicLayout>
  );
}
