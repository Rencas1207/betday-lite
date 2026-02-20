import { authOptions } from '@/app/src/lib/auth';
import { Typography } from '@betday-lite/typography';
import { Eye, History } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Pagination from '../src/components/Pagination';
import { ITEMS_PER_PAGE } from '../src/constants';
import type { Bet } from '../src/interfaces/bet.interface';
import { getBetsData } from '../src/services/get-bets-me.service';
import { formatDate, pickTranslations } from '../src/utils';

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const { bets, totalPages, totalItems } = await getBetsData({
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage
  });

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="mx-auto w-full max-w-360">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-emerald-600">
              <History size={20} />
              <span className="text-[10px] font-black tracking-widest uppercase">
                Mi Actividad
              </span>
            </div>
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
          </div>
          <div className="hidden text-right md:block">
            <Typography
              variant="body"
              className="text-[10px] font-bold text-slate-400 uppercase"
            >
              Total Acumulado
            </Typography>
            <Typography
              variant="body"
              className="text-xl font-black text-slate-900 italic"
            >
              {totalItems} Jugadas
            </Typography>
          </div>
        </header>

        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all">
          <div className="overflow-x-auto">
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
                {bets.map((bet: Bet) => (
                  <tr
                    key={bet.id}
                    className="group transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-black text-slate-900 uppercase italic">
                        {formatDate(bet.placedAt)}
                      </div>
                      <div className="text-[11px] font-bold text-slate-400">
                        {new Date(bet.placedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Typography
                        variant="small"
                        className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-500"
                      >
                        #{bet.matchId}
                      </Typography>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="text-sm font-black tracking-tight text-slate-900 uppercase"
                        >
                          {pickTranslations[bet.pick] || bet.pick}
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-md font-mono font-bold text-emerald-600"
                        >
                          {bet.odd.toFixed(2)}
                        </Typography>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Typography
                        variant="small"
                        className="text-md font-black text-slate-700"
                      >
                        S/{bet.stake.toFixed(2)}
                      </Typography>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Typography
                        variant="small"
                        className={`inline-flex items-center rounded-xl px-3 py-1 text-[10px] font-black tracking-tighter uppercase ${
                          bet.status === 'WON'
                            ? 'bg-emerald-100 text-emerald-700'
                            : bet.status === 'LOST'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {bet.status}
                      </Typography>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Typography
                        variant="small"
                        className={`text-sm font-black italic ${bet.status === 'WON' ? 'text-emerald-600' : 'text-slate-300'}`}
                      >
                        {bet.status === 'WON'
                          ? `+ S/${bet.return?.toFixed(2)}`
                          : 'S/0.00'}
                      </Typography>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <Link
                        href={`/bets/${bet.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200 transition-all hover:scale-110 active:scale-95"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            bets={bets}
            totalItems={totalItems}
          />
        </div>
      </div>
    </main>
  );
}
