'use client';

import { Typography } from '@betday-lite/typography';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Match } from '../interfaces';
import { pendingBetsAtom } from '../store/globals';

interface HourGroup {
  hour: string;
  matches: Match[];
}

interface DayGroup {
  date: string;
  hours: HourGroup[];
}

export default function TimelineSection({ matches }: { matches: DayGroup[] }) {
  const [pendingBets, setPendingBets] = useAtom(pendingBetsAtom);
  const [selectedDate] = useState(matches[0]?.date);

  const allMatchesOfDay = useMemo(() => {
    const day = matches.find((d) => d.date === selectedDate);
    if (!day) return [];

    return day.hours.flatMap((hg: HourGroup) =>
      hg.matches.map((m: Match) => ({ ...m, displayHour: hg.hour }))
    );
  }, [selectedDate, matches]);

  const handleBetClick = (match: Match, pick: string, odd: number) => {
    setPendingBets((prev) => {
      const otherMatches = prev.filter((b) => b.match.id !== match.id);
      const isReclickingSamePick = prev.find(
        (b) => b.match.id === match.id && b.pick === pick
      );

      if (isReclickingSamePick) return otherMatches;

      return [...otherMatches, { match, pick, odd }];
    });
  };

  const isSelected = (matchId: string, pick: string) =>
    pendingBets.some((bet) => bet.match.id === matchId && bet.pick === pick);

  return (
    <div className="w-full space-y-8 overflow-hidden">
      <div className="relative">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          slidesPerView="auto"
          spaceBetween={16}
          className="w-full overflow-visible! px-4"
        >
          {allMatchesOfDay.map((m: Match) => {
            return (
              <SwiperSlide
                key={m.id}
                style={{ width: '360px' }}
                className="w-[85vw]! pb-4 sm:w-90!"
              >
                <div className="space-y-3">
                  <div className="group flex h-50 flex-col rounded-4xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <Typography
                        variant="small"
                        className="truncate rounded-lg bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-tight text-slate-500 uppercase"
                      >
                        {m.league.name}
                      </Typography>
                      <div className="flex items-center gap-1.5">
                        <Typography
                          variant="small"
                          className="font-mono text-[10px] font-bold text-slate-400"
                        >
                          {m.displayHour}
                        </Typography>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    <div className="mb-5">
                      <Typography
                        variant="h3"
                        className="text-lg leading-tight font-black tracking-tighter text-slate-900 uppercase italic"
                      >
                        {m.homeTeam.name} <br />
                        <Typography
                          variant="small"
                          className="mx-1 text-sm font-medium text-slate-300 not-italic"
                        >
                          vs
                        </Typography>
                        {m.awayTeam.name}
                      </Typography>
                    </div>

                    <div className="mt-auto grid grid-cols-3 gap-2">
                      {[
                        { label: 'Local', val: m.market.odds.home },
                        { label: 'Empate', val: m.market.odds.draw },
                        { label: 'Visita', val: m.market.odds.away }
                      ].map((odd) => {
                        const active = isSelected(m.id, odd.label);
                        return (
                          <button
                            key={odd.label}
                            onClick={() =>
                              handleBetClick(m, odd.label, odd.val)
                            }
                            className={`group relative flex flex-col items-center rounded-2xl py-2.5 transition-all duration-200 ${
                              active
                                ? 'bg-slate-900 text-white shadow-lg ring-2 ring-slate-900 ring-offset-2'
                                : 'border border-transparent bg-slate-50 text-slate-900 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
                            }`}
                          >
                            <Typography
                              variant="small"
                              className={`text-[10px] font-bold uppercase ${active ? 'text-slate-400' : 'text-slate-400'}`}
                            >
                              {odd.label}
                            </Typography>
                            <Typography
                              variant="small"
                              className="text-md font-mono font-black"
                            >
                              {odd.val.toFixed(2)}
                            </Typography>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
