import type { IBetItem } from '@/app/src/interfaces/bet.interface';
import { authOptions } from '@/app/src/lib/auth';
import { getBetDetail } from '@/app/src/services/get-bet-detail.service';
import { formatDate, pickTranslations } from '@/app/src/utils/index';
import { Box } from '@betday-lite/box';
import { Typography } from '@betday-lite/typography';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Hash,
  SearchX,
  Ticket,
  XCircle
} from 'lucide-react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Detalle de Apuesta | BetDay Lite',
  description:
    'Visualiza el comprobante digital de tu jugada, cuotas y premios potenciales.',
  robots: {
    index: false,
    follow: false
  }
};

type Props = {
  params: Promise<{ betId: string }>;
};

export default async function Page({ params }: Props) {
  const { betId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  const bet = await getBetDetail(betId);

  if (!bet) {
    return (
      <Box className="flex min-h-dvh items-center justify-center bg-slate-50 p-6">
        <Box className="w-full max-w-sm text-center">
          <Box className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-4xl bg-white shadow-xl shadow-slate-200/50">
            <SearchX size={32} className="text-slate-300" />
          </Box>
          <Typography
            variant="h2"
            className="mb-2 text-xl font-black tracking-tighter text-slate-900 uppercase italic"
          >
            Apuesta no encontrada
          </Typography>
          <Typography variant="body" className="mb-8 text-sm text-slate-500">
            No pudimos encontrar el comprobante{' '}
            <span className="font-mono font-bold">#{betId}</span>. Es posible
            que no exista o haya sido eliminada.
          </Typography>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-xs font-black tracking-widest text-white uppercase transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={16} />
            Volver a mi historial
          </Link>
        </Box>
      </Box>
    );
  }

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Order',
    orderNumber: bet.id,
    orderStatus: `https://schema.org/${bet.status === 'WON' ? 'OrderDelivered' : bet.status === 'PENDING' ? 'OrderProcessing' : 'OrderCancelled'}`,
    priceCurrency: 'PEN',
    price: bet.stake.toString(),
    orderDate: bet.placedAt,
    seller: {
      '@type': 'Organization',
      name: 'BetDay Lite'
    },
    customer: {
      '@type': 'Person',
      name: session.user?.name || 'Usuario'
    }
  };

  return (
    <Box className="flex min-h-screen items-start justify-center bg-slate-50 p-6 md:p-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box className="animate-in fade-in slide-in-from-bottom-6 w-full max-w-lg duration-700">
        <Link
          href="/profile"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Regresar al historial
        </Link>

        <Box className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <Box className="bg-slate-900 p-4 text-white md:p-8">
            <Box className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <Box className="flex items-center gap-4">
                <Box className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">
                  <Ticket
                    className="text-slate-900"
                    size={24}
                    strokeWidth={2.5}
                  />
                </Box>
                <Box>
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
                </Box>
              </Box>
              <Box
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 ${currentStatus.bg} ${currentStatus.color}`}
              >
                {currentStatus.icon}
                <Typography
                  variant="small"
                  className="text-xs font-black tracking-widest uppercase italic"
                >
                  {bet.status}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="p-4 md:p-10">
            <Box as="section" className="mb-8 space-y-6">
              <Typography
                variant="body"
                className="flex items-center justify-center gap-1 text-[10px] font-black tracking-widest text-slate-400 uppercase"
              >
                <Hash size={12} /> Detalle de Selección
              </Typography>

              {bet.items.map((item: IBetItem, index: number) => (
                <Box key={index} className="text-center">
                  <Typography
                    variant="h2"
                    className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic"
                  >
                    {pickTranslations[item.pick] || item.pick}
                  </Typography>
                  <Typography
                    variant="body"
                    className="mt-1 text-sm font-bold text-slate-500 uppercase"
                  >
                    {item.match}
                  </Typography>
                  {bet.items.length > 1 && (
                    <Box className="mt-2 text-[14px] font-bold text-emerald-600">
                      CUOTA: {item.odd.toFixed(2)}
                    </Box>
                  )}
                  {index < bet.items.length - 1 && (
                    <Box className="mx-auto my-4 h-1 w-1 rounded-full bg-slate-200" />
                  )}
                </Box>
              ))}
            </Box>

            <Box className="mb-10 rounded-3xl border border-slate-100 bg-slate-50/50 p-4 md:p-8">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography
                    variant="body"
                    className="text-[10px] font-black tracking-widest text-slate-400 uppercase"
                  >
                    Cuota Final
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-xl font-black text-emerald-600 md:text-4xl"
                  >
                    {bet.odd.toFixed(2)}
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography
                    variant="body"
                    className="text-[10px] font-black tracking-widest text-slate-400 uppercase italic"
                  >
                    Tipo
                  </Typography>
                  <Typography
                    variant="body"
                    className={`text-lg font-black uppercase ${bet.type === 'multiple' ? 'text-indigo-600' : 'text-slate-900'}`}
                  >
                    {bet.type === 'multiple' ? 'Combinada' : 'Simple'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className="grid grid-cols-2 gap-10 px-2">
              <Box>
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
              </Box>
              <Box className="text-right">
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
                  S/{bet.return.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Box className="my-10 flex items-center gap-4">
              <Box className="h-px flex-1 bg-slate-100"></Box>
              <CalendarDays size={16} className="text-slate-300" />
              <Box className="h-px flex-1 bg-slate-100"></Box>
            </Box>

            <Box className="flex items-center justify-between text-xs">
              <Typography
                variant="small"
                className="text-sm font-black tracking-widest text-slate-400 uppercase"
              >
                Fecha de Registro
              </Typography>
              <Typography
                variant="small"
                className="text-sm font-bold text-slate-700 italic"
              >
                {formatDate(bet.placedAt)}
              </Typography>
            </Box>
          </Box>

          <Box className="relative bg-slate-50 p-8 pt-10 text-center">
            <Box className="absolute top-0 right-0 left-0 flex overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <Box
                  key={i}
                  className="-mt-2 h-4 min-w-6 rotate-45 border border-slate-100 bg-white"
                />
              ))}
            </Box>

            <Box className="flex h-12 w-full items-end justify-center gap-1 overflow-hidden px-4 opacity-40">
              {Array.from({ length: 60 }).map((_, i) => (
                <Box
                  key={i}
                  className={`bg-slate-900 ${i % 4 === 0 ? 'w-0.75' : 'w-px'} ${i % 7 === 0 ? 'h-full' : 'h-3/4'}`}
                />
              ))}
            </Box>
            <Typography
              variant="body"
              className="mt-4 text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase"
            >
              Verificado por BetDay-Lite v1.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
