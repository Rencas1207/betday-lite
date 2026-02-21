import { Box } from '@betday-lite/box';
import { Typography } from '@betday-lite/typography';
import { ArrowRight, Eye, History, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Pagination from '../src/components/Pagination';
import type { IBetResponse } from '../src/interfaces/bet.interface';
import { getBetsPageData } from '../src/services/get-page-data';
import { formatDate, pickTranslations } from '../src/utils';

export const metadata: Metadata = {
  title: 'Mis Apuestas | BetDay Lite',
  description:
    'Consulta tu historial de jugadas, estados de apuestas y ganancias acumuladas en BetDay Lite.',
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: 'Mi Historial de Apuestas - BetDay Lite',
    description: 'Gestiona tus jugadas y sigue tus resultados en tiempo real.',
    type: 'website'
  }
};

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const { bets, totalPages, totalItems, currentPage } =
    await getBetsPageData(page);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Usuario BetDay',
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ViewAction',
        userInteractionCount: totalItems
      }
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: process.env.NEXT_PUBLIC_BASE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Historial de Apuestas',
          item: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`
        }
      ]
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (bets.length === 0) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <Box className="flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-white p-20 text-center">
          <Box className="mb-6 flex h-20 w-20 items-center justify-center rounded-4xl bg-slate-50 text-slate-200">
            <Ticket size={40} strokeWidth={1.5} />
          </Box>
          <Typography
            variant="h2"
            className="mb-2 text-2xl font-black tracking-tighter text-slate-900 uppercase italic"
          >
            Aún no tienes jugadas
          </Typography>
          <Typography
            variant="body"
            className="mb-8 max-w-xs text-sm text-slate-400"
          >
            Tu historial de apuestas aparecerá aquí en cuanto realices tu
            primera selección.
          </Typography>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-xs font-black tracking-widest text-white uppercase shadow-xl shadow-slate-200 transition-all hover:bg-emerald-600"
          >
            Ir a la cartelera
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box as="main" className="min-h-screen bg-slate-50 p-4 md:p-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box className="mx-auto w-full max-w-360">
        <Box as="header" className="mb-10 flex items-end justify-between">
          <Box>
            <Box className="mb-1 flex items-center gap-2 text-emerald-600">
              <History size={20} />
              <span className="text-[12px] font-black tracking-widest uppercase">
                Mi Actividad
              </span>
            </Box>
            <Typography
              variant="h1"
              className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic"
            >
              Mis{' '}
              <Typography
                variant="small"
                className="text-[48px] font-black text-emerald-600"
              >
                Apuestas
              </Typography>
            </Typography>
          </Box>
          <Box className="hidden text-right md:block">
            <Typography
              variant="body"
              className="text-[12px] font-bold text-slate-400 uppercase"
            >
              Total Acumulado
            </Typography>
            <Typography
              variant="body"
              className="text-xl font-black text-slate-900 italic"
            >
              {totalItems} Jugadas
            </Typography>
          </Box>
        </Box>

        <Box className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all">
          <Box className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  <th className="px-8 py-5">Fecha y Hora</th>
                  <th className="px-6 py-5">ID Evento</th>
                  <th className="px-6 py-5">Tu Selección</th>
                  <th className="px-6 py-5 text-center">Stake</th>
                  <th className="px-6 py-5 text-center">Estado</th>
                  <th className="px-6 py-5 text-right">Ganancia</th>
                  <th className="px-8 py-5 text-center">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bets.map((bet) => (
                  <BetRow key={bet.id} bet={bet} />
                ))}
              </tbody>
            </table>
          </Box>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            bets={bets}
            totalItems={totalItems}
          />
        </Box>
      </Box>
    </Box>
  );
}

function BetRow({ bet }: { bet: IBetResponse }) {
  const statusStyles = {
    WON: 'bg-emerald-100 text-emerald-700',
    LOST: 'bg-red-100 text-red-700',
    PENDING: 'bg-amber-100 text-amber-700'
  };

  return (
    <tr className="group transition-colors hover:bg-slate-50/80">
      <td className="px-8 py-5 whitespace-nowrap">
        <Box className="text-sm font-black text-slate-900 uppercase italic">
          {formatDate(bet.placedAt)}
        </Box>
        <Box className="text-[12px] font-bold text-slate-400">
          {new Date(bet.placedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Box>
      </td>
      <td className="px-6 py-5">
        <Box className="w-fit rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[14px] font-bold text-slate-500">
          #{bet.matchId}
        </Box>
      </td>
      <td className="px-6 py-5">
        <Box className="flex flex-col">
          <Typography
            variant="small"
            className="text-sm font-black text-slate-900 uppercase"
          >
            {pickTranslations[bet.pick] || bet.pick}
          </Typography>
          <Typography
            variant="small"
            className="text-md font-mono font-bold text-emerald-600"
          >
            {bet.odd.toFixed(2)}
          </Typography>
        </Box>
      </td>
      <td className="px-6 py-5 text-center">
        <Typography
          variant="small"
          className="text-md w-fit font-black text-slate-700"
        >
          S/{bet.stake.toFixed(2)}
        </Typography>
      </td>
      <td className="px-6 py-5 text-center">
        <Typography
          variant="small"
          className={`inline-flex items-center rounded-xl px-3 py-1 text-[14px] font-black uppercase ${statusStyles[bet.status as keyof typeof statusStyles]}`}
        >
          {bet.status}
        </Typography>
      </td>
      <td className="px-6 py-5 text-right">
        <Typography
          variant="small"
          className={`text-md font-black italic ${bet.status === 'WON' ? 'text-emerald-600' : 'text-slate-300'}`}
        >
          {bet.status === 'WON' ? `+ S/${bet.return?.toFixed(2)}` : 'S/0.00'}
        </Typography>
      </td>
      <td className="px-8 py-5 text-center">
        <Link
          href={`/bets/${bet.id}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <Eye size={18} />
        </Link>
      </td>
    </tr>
  );
}
