'use client';

import { Box } from '@betday-lite/box';
import { cn } from '@betday-lite/tailwind-utils';
import { Typography } from '@betday-lite/typography';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMatchSelection } from '../hooks/use-match-selection';
import type { DayGroup } from '../interfaces/matches.interface';

export default function TimelineSection({ matches }: { matches: DayGroup[] }) {
  const { toggleBet, isSelected } = useMatchSelection();
  const swiperRefs = useRef<{ [key: string]: SwiperType }>({});
  const today = matches[0];

  if (!today) return null;

  return (
    <Box className="w-full space-y-10 overflow-hidden">
      {today.leagues.map((league) => (
        <Box key={league.id} className="space-y-4">
          <Box className="flex items-center gap-2 px-4">
            <Box className="h-5 w-1 rounded-full bg-emerald-500" />
            <Typography
              variant="h2"
              className="text-xl font-black tracking-tighter text-slate-800 uppercase italic"
            >
              {league.name}
            </Typography>
          </Box>

          <Box className="group/slider relative">
            <button
              onClick={() => swiperRefs.current[league.id]?.slideNext()}
              className="absolute top-0 right-0 z-10 flex h-[calc(100%-1rem)] w-20 cursor-pointer items-center justify-end bg-linear-to-l from-slate-50 via-slate-50/80 to-transparent pr-4 transition-all hover:pr-2 active:scale-95 md:flex"
            >
              <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-slate-200 transition-transform group-hover/slider:translate-x-1">
                <ChevronRight size={24} className="text-emerald-600" />
              </Box>
            </button>
            <Swiper
              onSwiper={(swiper) => {
                swiperRefs.current[league.id] = swiper;
              }}
              modules={[FreeMode, Mousewheel]}
              freeMode={true}
              mousewheel={{ forceToAxis: true }}
              slidesPerView="auto"
              spaceBetween={16}
              watchSlidesProgress={true}
              slidesOffsetAfter={80}
              observer={true}
              observeParents={true}
              className="w-full overflow-visible! px-4"
            >
              {league.matches.map((m) => (
                <SwiperSlide
                  key={m.id}
                  style={{ width: '360px' }}
                  className="w-[85vw]! pb-4 sm:w-90!"
                >
                  <Box className="group flex h-50 flex-col rounded-4xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
                    <Box className="mb-4 flex items-center justify-between">
                      <Typography
                        variant="small"
                        className="rounded bg-slate-50 px-2 py-1 text-[12px] font-bold text-slate-400"
                      >
                        {m.displayHour} HS
                      </Typography>
                      <Box className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    </Box>

                    <Box className="mb-5">
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
                    </Box>

                    <Box className="mt-auto grid grid-cols-3 gap-2">
                      {[
                        { label: 'Local', val: m.market.odds.home },
                        { label: 'Empate', val: m.market.odds.draw },
                        { label: 'Visita', val: m.market.odds.away }
                      ].map((odd) => {
                        const active = isSelected(m.id, odd.label);
                        return (
                          <button
                            key={odd.label}
                            onClick={() => toggleBet(m, odd.label, odd.val)}
                            className={`flex cursor-pointer flex-col items-center rounded-2xl py-2.5 transition-all duration-200 ${
                              active
                                ? 'bg-slate-900 text-white shadow-lg ring-2 ring-slate-900 ring-offset-2'
                                : 'border border-transparent bg-slate-50 text-slate-900 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
                            }`}
                          >
                            <Typography
                              variant="small"
                              className={cn(
                                'text-[10px] font-bold text-slate-400 uppercase group-hover:text-emerald-600 active:text-white',
                                active &&
                                  'text-slate-400 group-hover:text-slate-400 active:text-slate-400'
                              )}
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
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
