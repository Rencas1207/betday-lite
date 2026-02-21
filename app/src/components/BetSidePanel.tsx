'use client';

import { Box } from '@betday-lite/box';
import { Button } from '@betday-lite/button';
import { cn } from '@betday-lite/tailwind-utils';
import { Typography } from '@betday-lite/typography';
import { useAtom } from 'jotai';
import { Loader2, ReceiptText, TrendingUp, Wallet2, X } from 'lucide-react';
import { useBetSlip } from '../hooks/use-bet-slip';
import { isBetSlipOpenAtom } from '../store/globals';

export default function BetSlip() {
  const [isExpanded, setIsExpanded] = useAtom(isBetSlipOpenAtom);
  const {
    session,
    pendingBets,
    activeTab,
    setActiveTab,
    stakes,
    multiStake,
    setMultiStake,
    setPendingBets,
    totalInvertido,
    totalPosibleGanancia,
    totalOdd,
    handleUpdateStake,
    handlePlaceBet,
    isDisabled,
    isLoading,
    validateInput
  } = useBetSlip();

  return (
    <Box as="aside" className="lg:col-span-4">
      <Box className="lg:sticky lg:top-24">
        {pendingBets.length === 0 ? (
          <Box className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center md:relative lg:col-span-4">
            <Box className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
              <ReceiptText size={24} />
            </Box>
            <Typography
              variant="body"
              className="text-sm font-bold tracking-tighter text-slate-400 uppercase"
            >
              Tu boleto está vacío
            </Typography>
            <Typography variant="body" className="mt-1 text-xs text-slate-400">
              Selecciona una cuota para empezar.
            </Typography>
          </Box>
        ) : (
          <>
            {isExpanded && (
              <Box
                className="fixed inset-0 z-140 bg-slate-950/60 backdrop-blur-sm md:hidden"
                onClick={() => setIsExpanded(false)}
              />
            )}

            <Box
              className={cn(
                'w-full bg-white transition-all duration-300 md:relative md:z-0 md:rounded-3xl md:border md:border-slate-200 md:shadow-sm',
                'fixed left-0 z-150 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] md:rounded-t-3xl',
                {
                  'bottom-0 h-[85vh]': isExpanded,
                  'bottom-0 translate-y-full md:translate-y-0': !isExpanded
                }
              )}
            >
              <Box className="flex h-full flex-col">
                <Box
                  className="flex cursor-pointer items-center justify-center p-4 md:hidden"
                  onClick={() => setIsExpanded(false)}
                >
                  <Box className="h-1.5 w-12 rounded-full bg-slate-200" />
                </Box>

                <Box className="flex gap-1 bg-slate-100/50 p-2">
                  {(['simples', 'multiples'] as const).map((tab) => (
                    <Button
                      variant="ghost"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 cursor-pointer rounded-2xl py-3 text-[14px] font-black tracking-widest uppercase transition-all ${
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
                </Box>

                <Box className="max-h-112.5 space-y-4 overflow-y-auto p-5">
                  {pendingBets.map((bet) => (
                    <Box
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

                      <Box className="flex flex-col gap-1.5">
                        <Typography
                          variant="small"
                          className="text-[12px] font-black tracking-tighter text-emerald-600 uppercase"
                        >
                          {bet.pick}
                        </Typography>
                        <Typography
                          variant="body"
                          className="pr-6 text-sm leading-tight font-black text-slate-900 uppercase italic"
                        >
                          {bet.match.homeTeam.name}{' '}
                          <Typography
                            variant="small"
                            className="font-medium text-slate-300 not-italic"
                          >
                            vs
                          </Typography>{' '}
                          {bet.match.awayTeam.name}
                        </Typography>
                        <Typography
                          variant="body"
                          className="text-lg font-bold text-slate-900"
                        >
                          {bet.odd.toFixed(2)}
                        </Typography>

                        {activeTab === 'simples' && (
                          <Box className="mt-3 flex items-end justify-between gap-4 border-t border-slate-100 pt-3">
                            <Box className="flex-1">
                              <Typography
                                variant="body"
                                className="mb-1 text-[10px] font-bold text-slate-400 uppercase"
                              >
                                Importe
                              </Typography>
                              <Box className="relative">
                                <Typography
                                  variant="small"
                                  className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] font-bold text-slate-400"
                                >
                                  S/
                                </Typography>
                                <input
                                  type="text"
                                  value={stakes[bet.match.id] || ''}
                                  id="mount"
                                  name="mount"
                                  placeholder="0.00"
                                  onChange={(e) =>
                                    handleUpdateStake(
                                      bet.match.id,
                                      validateInput(e.target.value)
                                    )
                                  }
                                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pl-7 text-sm font-black outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                              </Box>
                            </Box>
                            <Box className="text-right">
                              <Typography
                                variant="body"
                                className="mb-1 text-[11px] font-bold text-slate-400 uppercase"
                              >
                                Retorno
                              </Typography>
                              <Typography
                                variant="body"
                                className="text-sm font-black text-emerald-600"
                              >
                                S/
                                {(
                                  (stakes[bet.match.id] || 0) * bet.odd
                                ).toFixed(2)}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box className="mt-auto space-y-4 rounded-b-2xl border-t border-slate-100 bg-white p-6">
                  {activeTab === 'multiples' ? (
                    <Box className="space-y-4">
                      <Box className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
                        <Typography
                          variant="small"
                          className="text-[10px] font-bold text-emerald-700 uppercase"
                        >
                          Cuota Total
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-2xl font-black text-emerald-600 italic"
                        >
                          {totalOdd.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box className="flex items-center gap-4">
                        <Box className="flex-1">
                          <Typography
                            variant="body"
                            className="mb-1 text-[11px] font-bold text-slate-400 uppercase"
                          >
                            Importe Combinada
                          </Typography>
                          <input
                            type="text"
                            value={multiStake}
                            name="multi-stake"
                            id="multi-stake"
                            onChange={(e) =>
                              setMultiStake(validateInput(e.target.value))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xl font-black text-slate-900 outline-none focus:border-emerald-500"
                          />
                        </Box>
                        <Box className="text-right">
                          <Typography
                            variant="body"
                            className="mb-1 text-[11px] font-bold text-slate-400 uppercase"
                          >
                            Premio Total
                          </Typography>
                          <Typography
                            variant="body"
                            className="text-2xl font-black text-emerald-600 italic"
                          >
                            S/{(multiStake * totalOdd).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box className="rounded-2xl bg-slate-900 p-4 text-white">
                      <Box className="flex justify-between text-[10px] font-bold tracking-widest uppercase opacity-60">
                        <Typography variant="small" className="text-xs">
                          Inversión
                        </Typography>
                        <Typography variant="small" className="text-xs">
                          Ganancia Potencial
                        </Typography>
                      </Box>
                      <Box className="mt-1 flex items-baseline justify-between font-black italic">
                        <Typography variant="small" className="text-sm">
                          S/{totalInvertido.toFixed(2)}
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-2xl text-emerald-400"
                        >
                          S/{totalPosibleGanancia.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <Button
                    variant="ghost"
                    onClick={handlePlaceBet}
                    disabled={isDisabled || isLoading}
                    className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl py-4 font-black tracking-widest uppercase transition-all ${
                      !session || isDisabled
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
                        className="flex items-center justify-center gap-2 text-base italic group-hover:text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <TrendingUp size={16} />
                            Confirmar{' '}
                            {activeTab === 'simples' ? 'Simples' : 'Combinada'}
                          </>
                        )}
                      </Typography>
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
