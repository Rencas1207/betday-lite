import { authOptions } from '@/app/src/lib/auth';
import { getBetDetail } from '@/app/src/services/get-bet-detail.service';
import { formatDate, pickTranslations } from '@/app/src/utils/index';
import { Typography } from '@betday-lite/typography';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Hash,
  Ticket,
  XCircle
} from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { JSX } from 'react';

type Props = {
  params: Promise<{ betId: string }>;
};

export default async function Page({ params }: Props) {
  const { betId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  const bet = await getBetDetail(betId);
  if (!bet) notFound();

  const statusStyles: Record<
    string,
    { icon: JSX.Element; color: string; bg: string }
  > = {
    WON: {
      icon: <CheckCircle2 size={20} />,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    },
    LOST: {
      icon: <XCircle size={20} />,
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    PENDING: {
      icon: <Clock size={20} />,
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    }
  };

  const currentStatus = statusStyles[bet.status] || statusStyles.PENDING;

  return (
    <div className="flex min-h-screen items-start justify-center bg-slate-50 p-6 md:p-12">
      <div className="animate-in fade-in slide-in-from-bottom-6 w-full max-w-lg duration-700">
        <Link
          href="/profile"
          className="group mb-8 inline-flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Regresar al historial
        </Link>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">
                  <Ticket
                    className="text-slate-900"
                    size={24}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <Typography
                    variant="body"
                    className="text-[10px] font-black tracking-[0.2em] text-emerald-400/80 uppercase"
                  >
                    Comprobante Digital
                  </Typography>
                  <Typography
                    variant="body"
                    className="font-mono text-sm font-bold text-white opacity-80"
                  >
                    ID: {bet.id}
                  </Typography>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 ${currentStatus.bg} ${currentStatus.color}`}
              >
                {currentStatus.icon}
                <Typography
                  variant="small"
                  className="text-xs font-black tracking-widest uppercase italic"
                >
                  {bet.status}
                </Typography>
              </div>
            </div>
          </div>

          <div className="p-10">
            <section className="mb-10 text-center">
              <Typography
                variant="body"
                className="mb-3 flex items-center justify-center gap-1 text-[10px] font-black tracking-widest text-slate-400 uppercase"
              >
                <Hash size={12} /> Selección Realizada
              </Typography>
              <Typography
                variant="h2"
                className="text-5xl font-black tracking-tighter text-slate-900 uppercase italic"
              >
                {pickTranslations[bet.pick] || bet.pick}
              </Typography>
              <div className="mt-4 inline-flex items-center rounded-xl bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-500">
                Match ID:{' '}
                <Typography
                  variant="small"
                  className="ml-1 leading-5 font-black text-slate-900 italic"
                >
                  #{bet.matchId}
                </Typography>
              </div>
            </section>

            <div className="mb-10 rounded-3xl border border-slate-100 bg-slate-50/50 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography
                    variant="body"
                    className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
                  >
                    Cuota Final
                  </Typography>
                  <Typography
                    variant="body"
                    className="font-mono text-4xl font-black text-emerald-600"
                  >
                    {bet.odd.toFixed(2)}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography
                    variant="body"
                    className="text-[10px] font-black tracking-widest text-slate-400 uppercase italic"
                  >
                    Tipo
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-lg font-black text-slate-900 uppercase"
                  >
                    Simple
                  </Typography>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 px-2">
              <div>
                <Typography
                  variant="body"
                  className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase"
                >
                  Monto Apostado
                </Typography>
                <Typography
                  variant="body"
                  className="text-3xl font-black text-slate-900 italic"
                >
                  S/{bet.stake.toFixed(2)}
                </Typography>
              </div>
              <div className="text-right">
                <Typography
                  variant="body"
                  className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase"
                >
                  {bet.status === 'WON' ? 'Retorno Total' : 'Premio Potencial'}
                </Typography>
                <Typography
                  variant="body"
                  className={`text-3xl font-black italic ${bet.status === 'WON' ? 'text-emerald-600' : 'text-slate-900'}`}
                >
                  S/
                  {(bet.status === 'WON'
                    ? bet.return
                    : bet.stake * bet.odd
                  ).toFixed(2)}
                </Typography>
              </div>
            </div>

            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100"></div>
              <CalendarDays size={16} className="text-slate-300" />
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <Typography
                variant="small"
                className="font-black tracking-widest text-slate-400 uppercase"
              >
                Fecha de Registro
              </Typography>
              <Typography
                variant="small"
                className="font-mono font-bold text-slate-700 italic"
              >
                {formatDate(bet.placedAt)}
              </Typography>
            </div>
          </div>

          <div className="relative bg-slate-50 p-8 pt-10 text-center">
            <div className="absolute top-0 right-0 left-0 flex overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="-mt-2 h-4 min-w-6 rotate-45 border border-slate-100 bg-white"
                />
              ))}
            </div>

            <div className="flex h-12 w-full items-end justify-center gap-1 overflow-hidden px-4 opacity-40">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-slate-900 ${i % 4 === 0 ? 'w-0.75' : 'w-px'} ${i % 7 === 0 ? 'h-full' : 'h-3/4'}`}
                />
              ))}
            </div>
            <Typography
              variant="body"
              className="mt-4 text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase"
            >
              Verificado por BetDay-Lite v1.0
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
