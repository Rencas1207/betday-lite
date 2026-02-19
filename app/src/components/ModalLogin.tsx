'use client';

import { useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { loginModalAtom, pendingBetAtom } from '../store/globals';

const ModalLogin = () => {
  const [showModal, setShowModal] = useAtom(loginModalAtom);
  const [pendingBet, setPendingBet] = useAtom(pendingBetAtom);

  const handleModalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    });

    if (res?.error) {
      toast.error('Credenciales inválidas');
      return;
    }

    setShowModal(false);

    if (pendingBet) {
      toast.success(
        `Apuesta realizada en ${pendingBet.match.homeTeam.shortName} vs ${pendingBet.match.awayTeam.shortName}`
      );
      setPendingBet(null);
    } else {
      toast.success('¡Sesión iniciada!');
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Inicia sesión
            </h2>
            {pendingBet && (
              <p className="mb-6 text-sm text-zinc-400">
                Necesitas una cuenta para apostar en{' '}
                {pendingBet?.match.homeTeam.name} vs{' '}
                {pendingBet?.match.awayTeam.name}
              </p>
            )}
            <form onSubmit={handleModalLogin} className="space-y-4">
              <input
                name="username"
                placeholder="testuser"
                className="mb-4 w-full rounded-lg border border-white/5 bg-zinc-800 p-3 outline-none focus:border-green-500"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="mb-6 w-full rounded-lg border border-white/5 bg-zinc-800 p-3 outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="mb-6 w-full cursor-pointer rounded-lg bg-green-600 p-3 font-bold transition-colors hover:bg-green-500"
              >
                Entrar y Apostar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
                className="w-full cursor-pointer text-sm text-zinc-500"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLogin;
