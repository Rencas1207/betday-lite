'use client';

import { Box } from '@betday-lite/box';
import { Button } from '@betday-lite/button';
import { Typography } from '@betday-lite/typography';
import { useAtom, useAtomValue } from 'jotai';
import {
  isBetSlipOpenAtom,
  loginModalAtom,
  pendingBetsAtom
} from '../store/globals';

export default function MobileTicketButton() {
  const pendingBets = useAtomValue(pendingBetsAtom);
  const [isBetSlipOpen, setIsBetSlipOpen] = useAtom(isBetSlipOpenAtom);
  const isLoginModalOpen = useAtomValue(loginModalAtom);

  return (
    <>
      {!isBetSlipOpen && !isLoginModalOpen && (
        <Box className="fixed bottom-6 left-0 z-810 flex w-full justify-center px-6 md:hidden">
          <Button
            onClick={() => setIsBetSlipOpen(true)}
            className="relative flex h-14 w-full max-w-sm items-center justify-between rounded-2xl bg-slate-900 px-6 py-4 shadow-2xl shadow-emerald-900/20 transition-transform active:scale-95"
          >
            <Box className="absolute -top-4 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-slate-900">
              {pendingBets.length}
            </Box>
            <Box className="flex w-full items-center justify-center gap-3">
              <Typography
                variant="small"
                className="text-center text-lg font-black tracking-widest text-white uppercase italic"
              >
                Ver Apuestas
              </Typography>
            </Box>
          </Button>
        </Box>
      )}
    </>
  );
}
