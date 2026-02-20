'use client';

import { Button } from '@betday-lite/button';
import { Input } from '@betday-lite/input';
import { Typography } from '@betday-lite/typography';
import { useAtom } from 'jotai';
import { LockKeyhole, ShieldCheck, User, X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { loginModalAtom, pendingBetsAtom } from '../store/globals';

const ModalLogin = () => {
  const [showModal, setShowModal] = useAtom(loginModalAtom);
  const [pendingBets] = useAtom(pendingBetsAtom);

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

    if (pendingBets.length > 0) {
      toast.success(
        `Apuesta realizada en ${pendingBets.map((bet) => `${bet.match.homeTeam.shortName} vs ${bet.match.awayTeam.shortName}`).join(', ')}`
      );
    } else {
      toast.success('¡Sesión iniciada!');
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
          <div className="animate-in fade-in zoom-in relative w-full max-w-md rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-2xl duration-300">
            <Button
              variant="ghost"
              onClick={() => setShowModal(false)}
              className="focus:transparent absolute top-6 right-6 h-auto cursor-pointer p-0 text-slate-400 transition-colors hover:bg-transparent hover:text-slate-600"
            >
              <X size={20} />
            </Button>

            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={32} strokeWidth={2.5} />
              </div>
              <Typography
                variant="h2"
                className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic"
              >
                Área de{' '}
                <Typography
                  variant="small"
                  className="text-3xl leading-5 font-black tracking-tighter text-emerald-600 uppercase italic"
                >
                  Usuarios
                </Typography>
              </Typography>
              {pendingBets.length > 0 ? (
                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                  <Typography
                    variant="body"
                    className="text-[12px] leading-tight font-bold text-slate-500 uppercase"
                  >
                    Inicia sesión para finalizar tu apuesta en:
                    <Typography
                      variant="small"
                      className="mt-1 block text-[12px] text-slate-800 italic"
                    >
                      {pendingBets.length} selección(es) activa(s)
                    </Typography>
                  </Typography>
                </div>
              ) : (
                <Typography
                  variant="body"
                  className="mt-2 text-sm font-medium text-slate-400"
                >
                  Accede a tu panel de apuestas
                </Typography>
              )}
            </div>

            <form onSubmit={handleModalLogin} noValidate className="space-y-4">
              <Input
                name="username"
                placeholder="Tu nombre de usuario"
                required
                icon={User}
              />
              <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                required
                icon={LockKeyhole}
              />
              <Button
                variant="dark"
                type="submit"
                className="mt-3 w-full cursor-pointer rounded-2xl bg-slate-900 p-4 text-sm font-black tracking-widest text-white uppercase transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
              >
                Entrar ahora
              </Button>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowModal(false)}
                className="h-auto w-full cursor-pointer p-0 pt-2 text-xs font-bold tracking-tighter text-slate-400 uppercase transition-colors hover:bg-transparent hover:text-slate-600 focus:bg-transparent"
              >
                Continuar como invitado
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLogin;
