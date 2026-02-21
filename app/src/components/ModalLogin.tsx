'use client';

import { Box } from '@betday-lite/box';
import { Button } from '@betday-lite/button';
import { Input } from '@betday-lite/input';
import { Typography } from '@betday-lite/typography';
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  User,
  X
} from 'lucide-react';
import { useAuthModal } from '../hooks/use-auth-modal';
import { useClickOutside } from '../hooks/use-click-outside';

const ModalLogin = () => {
  const {
    showModal,
    closeModal,
    handleLogin,
    register,
    errors,
    isLoading,
    pendingBetsCount,
    showPassword,
    setShowPassword
  } = useAuthModal();

  const modalRef = useClickOutside(closeModal);
  if (!showModal) return null;

  return (
    <Box className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
      <Box
        ref={modalRef}
        className="animate-in fade-in zoom-in relative w-full max-w-md rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-2xl duration-300"
      >
        <Button
          variant="ghost"
          onClick={closeModal}
          className="focus:transparent absolute top-6 right-6 h-auto cursor-pointer p-0 text-slate-400 transition-colors hover:bg-transparent hover:text-slate-600"
        >
          <X size={20} />
        </Button>

        <Box className="mb-8 text-center">
          <Box className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <ShieldCheck size={32} strokeWidth={2.5} />
          </Box>
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
          {pendingBetsCount > 0 ? (
            <Box className="mt-3 rounded-xl bg-slate-50 p-3">
              <Typography
                variant="body"
                className="text-[12px] leading-tight font-bold text-slate-500 uppercase"
              >
                Inicia sesión para finalizar tu apuesta en:
                <Typography
                  variant="small"
                  className="mt-1 block text-[12px] text-slate-800 italic"
                >
                  {pendingBetsCount} selección(es) activa(s)
                </Typography>
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body"
              className="mt-2 text-sm font-medium text-slate-400"
            >
              Accede a tu panel de apuestas
            </Typography>
          )}
        </Box>

        <form onSubmit={handleLogin} noValidate className="space-y-3.5">
          <Input
            {...register('username')}
            name="username"
            placeholder="Tu nombre de usuario"
            required
            icon={User}
            className={errors.username ? 'border-red-500' : ''}
            errorMessage={errors.username ? errors.username.message : ''}
          />

          <Box className="relative">
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              icon={LockKeyhole}
              className={errors.password ? 'border-red-500 pr-12' : 'pr-12'}
              errorMessage={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3.5 right-4 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </Box>

          <Button
            variant="dark"
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full cursor-pointer rounded-2xl bg-slate-900 p-4 text-sm font-black tracking-widest text-white uppercase transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="mx-auto animate-spin" size={20} />
            ) : (
              'Entrar ahora'
            )}
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={closeModal}
            className="h-auto w-full cursor-pointer p-0 pt-2 text-xs font-bold tracking-tighter text-slate-400 uppercase transition-colors hover:bg-transparent hover:text-slate-600 focus:bg-transparent"
          >
            Continuar como invitado
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ModalLogin;
