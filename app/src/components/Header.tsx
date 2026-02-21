'use client';

import { Box } from '@betday-lite/box';
import { Button } from '@betday-lite/button';
import { Typography } from '@betday-lite/typography';
import { useSetAtom } from 'jotai';
import { LayoutDashboard, LogOut, Ticket, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { loginModalAtom, pendingBetsAtom } from '../store/globals';

const Header = () => {
  const { data: session, status } = useSession();
  const setShowModal = useSetAtom(loginModalAtom);
  const setPendingBets = useSetAtom(pendingBetsAtom);

  const handleLogin = () => {
    setPendingBets([]);
    setShowModal(true);
  };

  const handleLogout = () => {
    setPendingBets([]);
    void signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <Box
      as="header"
      className="sticky top-0 z-50 flex h-20 w-full items-center justify-center border-b border-slate-200 bg-slate-950 px-3 shadow-md transition-all md:px-6"
    >
      <Box className="flex w-full max-w-360 items-center justify-between">
        <Box className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2">
            <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 transition-transform group-hover:scale-105">
              <Ticket className="text-slate-950" size={24} strokeWidth={3} />
            </Box>
            <Typography
              variant="small"
              className="text-2xl font-black tracking-tighter text-white uppercase italic"
            >
              Bet
              <Typography variant="small" className="text-2xl text-emerald-500">
                Day
              </Typography>
            </Typography>
          </Link>
        </Box>

        <Box className="flex items-center gap-3 md:gap-6">
          {!session && status !== 'loading' && (
            <Button
              variant="primary"
              onClick={handleLogin}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-black tracking-widest text-white uppercase shadow-none transition-all hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95"
            >
              <User size={18} />
              Entrar
            </Button>
          )}

          {session && (
            <Box className="flex items-center gap-3 md:gap-6">
              <Link
                href="/profile"
                prefetch={true}
                className="flex items-center gap-2 text-sm font-bold tracking-tighter text-slate-400 uppercase transition-colors hover:text-emerald-400"
              >
                <LayoutDashboard size={18} />
                <Typography
                  variant="small"
                  className="hidden text-sm sm:inline"
                >
                  Historial
                </Typography>
              </Link>

              <Box className="flex items-center gap-3 border-l border-slate-800 pl-3 text-white md:pl-6">
                <Box className="flex flex-col text-right leading-none">
                  <Typography
                    variant="small"
                    className="text-[10px] font-bold text-slate-500 uppercase"
                  >
                    Usuario
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-sm font-black italic"
                  >
                    {session.user?.name}
                  </Typography>
                </Box>
                <Link
                  href="/profile"
                  prefetch={true}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800"
                >
                  <User size={18} className="text-emerald-500" />
                </Link>
              </Box>
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-red-500/10 hover:text-red-500"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
