'use client';

import { Button } from '@betday-lite/button';
import { Typography } from '@betday-lite/typography';
import { useAtom, useSetAtom } from 'jotai';
import { ReceiptText, TrendingUp, Wallet2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { loginModalAtom, pendingBetsAtom } from '../store/globals';

export default function BetSlip() {
  const { data: session } = useSession();
  const setShowModal = useSetAtom(loginModalAtom);
  const [pendingBets, setPendingBets] = useAtom(pendingBetsAtom);
  const [activeTab, setActiveTab] = useState<'simples' | 'multiples'>(
    'simples'
  );
  const [stakes, setStakes] = useState<Record<string, number>>({});
  const [multiStake, setMultiStake] = useState<number>(10);

  const handleUpdateStake = (matchId: string, value: number) => {
    setStakes((prev) => ({
      ...prev,
      [matchId]: value > 0 ? value : 0
    }));
  };

  const totalInvertido = pendingBets.reduce(
    (acc, bet) => acc + (stakes[bet.match.id] || 0),
    0
  );
  const totalPosibleGanancia = pendingBets.reduce(
    (acc, bet) => acc + (stakes[bet.match.id] || 0) * bet.odd,
    0
  );
  const totalOdd = pendingBets.reduce((acc, bet) => acc * bet.odd, 1);

  const handlePlaceBet = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    const payload = {
      usuario: session.user?.name || session.user?.email || 'Usuario Test',
      tipo: activeTab,
      fecha: new Date().toISOString(),
      montoTotal: activeTab === 'simples' ? totalInvertido : multiStake,
      gananciaTotal:
        activeTab === 'simples' ? totalPosibleGanancia : multiStake * totalOdd,
      items: pendingBets.map((bet) => ({
        match: `${bet.match.homeTeam.name} vs ${bet.match.awayTeam.name}`,
        pick: bet.pick,
        odd: bet.odd,
        stake: activeTab === 'simples' ? stakes[bet.match.id] || 0 : null
      }))
    };

    try {
      const res = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('¡Apuesta realizada con éxito!');
        setPendingBets([]);
        setStakes({});
      } else {
        console.error('Error del servidor:', data);
        toast.error('Error al guardar: ' + (data.error || 'Error desconocido'));
      }
    } catch {
      toast.error('Ups! Algo salió mal al conectar con el servidor.');
    }
  };

  if (pendingBets.length === 0) {
    return (
      <div className="rounded-3xl p-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
          <ReceiptText size={24} />
        </div>
        <Typography
          variant="body"
          className="text-sm font-bold tracking-tighter text-slate-400 uppercase"
        >
          Tu boleto está vacío
        </Typography>
        <Typography variant="body" className="mt-1 text-xs text-slate-400">
          Selecciona una cuota para empezar.
        </Typography>
      </div>
    );
  }

  return (
    <div className="overflow-hidden transition-all">
      <div className="flex gap-1 bg-slate-100/50 p-2">
        {(['simples', 'multiples'] as const).map((tab) => (
          <Button
            variant="ghost"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 cursor-pointer rounded-2xl py-3 text-[10px] font-black tracking-widest uppercase transition-all ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-lg hover:bg-slate-900 hover:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}{' '}
            {tab === 'multiples' &&
              pendingBets.length > 1 &&
              `(${pendingBets.length})`}
          </Button>
        ))}
      </div>

      <div className="max-h-112.5 space-y-4 overflow-y-auto p-5">
        {pendingBets.map((bet) => (
          <div
            key={bet.match.id}
            className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-emerald-200"
          >
            <Button
              variant="ghost"
              onClick={() =>
                setPendingBets((prev) =>
                  prev.filter((b) => b.match.id !== bet.match.id)
                )
              }
              className="absolute top-3 right-3 h-auto cursor-pointer p-0 text-slate-300 transition-colors hover:bg-transparent hover:text-red-500 focus:bg-transparent"
            >
              <X size={20} />
            </Button>

            <div className="flex flex-col gap-1.5">
              <Typography
                variant="small"
                className="text-[10px] font-black tracking-tighter text-emerald-600 uppercase"
              >
                {bet.pick}
              </Typography>
              <Typography
                variant="body"
                className="pr-6 text-sm leading-tight font-black text-slate-900 uppercase italic"
              >
                {bet.match.homeTeam.shortName}{' '}
                <Typography
                  variant="small"
                  className="font-medium text-slate-300 not-italic"
                >
                  vs
                </Typography>{' '}
                {bet.match.awayTeam.shortName}
              </Typography>
              <Typography
                variant="body"
                className="font-mono text-lg font-bold text-slate-900"
              >
                {bet.odd.toFixed(2)}
              </Typography>

              {activeTab === 'simples' && (
                <div className="mt-3 flex items-end justify-between gap-4 border-t border-slate-100 pt-3">
                  <div className="flex-1">
                    <Typography
                      variant="body"
                      className="mb-1 text-[9px] font-bold text-slate-400 uppercase"
                    >
                      Importe
                    </Typography>
                    <div className="relative">
                      <Typography
                        variant="small"
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] font-bold text-slate-400"
                      >
                        S/
                      </Typography>
                      <input
                        type="number"
                        value={stakes[bet.match.id] || ''}
                        placeholder="0.00"
                        onChange={(e) =>
                          handleUpdateStake(
                            bet.match.id,
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pl-7 text-sm font-black outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <Typography
                      variant="body"
                      className="mb-1 text-[9px] font-bold text-slate-400 uppercase"
                    >
                      Retorno
                    </Typography>
                    <Typography
                      variant="body"
                      className="text-sm font-black text-emerald-600"
                    >
                      S/{((stakes[bet.match.id] || 0) * bet.odd).toFixed(2)}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t border-slate-100 bg-white p-6">
        {activeTab === 'multiples' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
              <Typography
                variant="small"
                className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase"
              >
                Cuota Total
              </Typography>
              <Typography
                variant="small"
                className="font-mono text-2xl font-black text-emerald-600 italic"
              >
                {totalOdd.toFixed(2)}
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Typography
                  variant="body"
                  className="mb-1 text-[9px] font-bold text-slate-400 uppercase"
                >
                  Importe Combinada
                </Typography>
                <input
                  type="number"
                  value={multiStake}
                  onChange={(e) => setMultiStake(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xl font-black text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
              <div className="text-right">
                <Typography
                  variant="body"
                  className="mb-1 text-[9px] font-bold text-slate-400 uppercase"
                >
                  Premio Total
                </Typography>
                <Typography
                  variant="body"
                  className="text-2xl font-black text-emerald-600 italic"
                >
                  S/{(multiStake * totalOdd).toFixed(2)}
                </Typography>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase opacity-60">
              <Typography variant="small">Inversión</Typography>
              <Typography variant="small">Ganancia Potencial</Typography>
            </div>
            <div className="mt-1 flex items-baseline justify-between font-black italic">
              <Typography variant="small">
                S/{totalInvertido.toFixed(2)}
              </Typography>
              <Typography variant="small" className="text-2xl text-emerald-400">
                S/{totalPosibleGanancia.toFixed(2)}
              </Typography>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          onClick={handlePlaceBet}
          className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl py-4 font-black tracking-widest uppercase transition-all ${
            !session
              ? 'bg-slate-200 text-slate-500'
              : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:scale-[1.02] hover:bg-emerald-700 active:scale-95'
          }`}
        >
          {!session ? (
            <Typography
              variant="small"
              className="flex items-center justify-center gap-2 text-base italic"
            >
              <Wallet2 size={16} /> Identificarse
            </Typography>
          ) : (
            <Typography
              variant="small"
              className="flex items-center justify-center gap-2 italic"
            >
              <TrendingUp size={16} /> Confirmar{' '}
              {activeTab === 'simples' ? 'Simples' : 'Combinada'}
            </Typography>
          )}
        </Button>
      </div>
    </div>
  );
}
