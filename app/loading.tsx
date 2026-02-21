import { Box } from '@betday-lite/box';
import { Typography } from '@betday-lite/typography';
import { Ticket } from 'lucide-react';

export default function Loading() {
  return (
    <Box className="flex min-h-[80vh] w-full flex-col items-center justify-center space-y-4">
      <Box className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></Box>

      <Box className="animate-pulse text-xs font-black tracking-[0.3em] text-slate-400 uppercase">
        <Box className="mb-4 flex items-center gap-2">
          <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 transition-transform group-hover:scale-105">
            <Ticket className="text-slate-950" size={24} strokeWidth={3} />
          </Box>
          <Typography
            variant="small"
            className="text-2xl font-black tracking-tighter text-slate-950 uppercase italic"
          >
            Bet
            <Typography variant="small" className="text-2xl text-emerald-500">
              Day
            </Typography>
          </Typography>
        </Box>
        <Typography
          variant="small"
          className="mt-5 text-xs font-bold text-slate-400 uppercase"
        >
          Cargando...
        </Typography>
      </Box>
    </Box>
  );
}
