import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { loginModalAtom, pendingBetsAtom } from '../store/globals';

export const useAuthModal = () => {
  const [showModal, setShowModal] = useAtom(loginModalAtom);
  const [pendingBets] = useAtom(pendingBetsAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight =
        'var(--removed-body-scroll-bar-size, 0px)';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [showModal]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      username: data.username.trim(),
      password: data.password.trim(),
      redirect: false
    });

    if (res?.error) {
      toast.error('Credenciales inválidas');
      setIsLoading(false);
      return;
    }

    closeModal();
    setIsLoading(false);

    if (pendingBets.length > 0) {
      const matchNames = pendingBets
        .map(
          (bet) =>
            `${bet.match.homeTeam.shortName} vs ${bet.match.awayTeam.shortName}`
        )
        .join(', ');
      toast.success(`Listo para apostar en: ${matchNames}`);
    } else {
      toast.success('¡Bienvenido de nuevo!');
    }
  };

  return {
    showModal,
    closeModal,
    handleLogin: handleSubmit(onLogin),
    register,
    errors,
    isLoading,
    pendingBetsCount: pendingBets.length,
    showPassword,
    setShowPassword
  };
};
