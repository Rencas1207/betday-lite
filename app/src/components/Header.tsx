'use client';

import { useSetAtom } from 'jotai';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { loginModalAtom, pendingBetAtom } from '../store/globals';

const Header = () => {
  const { data: session, status } = useSession();
  const setShowModal = useSetAtom(loginModalAtom);
  const setPendingBet = useSetAtom(pendingBetAtom);

  const handleLogin = () => {
    setPendingBet(null);
    setShowModal(true);
  };

  const handleLogout = () => {
    setPendingBet(null);
    void signOut({ redirect: false });
  };

  return (
    <header className="sticky top-0 mb-6 flex h-20 w-full items-center justify-center border-b border-b-gray-700 bg-black px-4">
      <div className="flex w-full max-w-360 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            BetApp
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!session && status !== 'loading' && (
            <button
              onClick={handleLogin}
              className="text-md cursor-pointer rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-500"
            >
              Iniciar sesión
            </button>
          )}

          {session && (
            <>
              <Link
                href="/profile"
                className="text-md font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Mis apuestas
              </Link>

              <span className="text-md text-zinc-400">
                {session.user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="text-md cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-500"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
