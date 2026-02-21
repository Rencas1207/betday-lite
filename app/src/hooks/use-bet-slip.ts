import confetti from 'canvas-confetti';
import { useAtom, useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { IBet } from '../interfaces/bet.interface';
import {
  isBetSlipOpenAtom,
  loginModalAtom,
  pendingBetsAtom
} from '../store/globals';

export const useBetSlip = () => {
  const { data: session } = useSession();
  const setShowModal = useSetAtom(loginModalAtom);
  const [pendingBets, setPendingBets] = useAtom(pendingBetsAtom);
  const setIsBetSlipOpen = useSetAtom(isBetSlipOpenAtom);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'simples' | 'multiples'>(
    'simples'
  );
  const [stakes, setStakes] = useState<Record<string, number>>({});
  const [multiStake, setMultiStake] = useState<number>(10);

  const totalInvertido = pendingBets.reduce(
    (acc, bet) => acc + (stakes[bet.match.id] || 0),
    0
  );
  const totalPosibleGanancia = pendingBets.reduce(
    (acc, bet) => acc + (stakes[bet.match.id] || 0) * bet.odd,
    0
  );
  const totalOdd = pendingBets.reduce((acc, bet) => acc * bet.odd, 1);

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99 };
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: unknown = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval as NodeJS.Timeout);
      const particleCount = 50 * (timeLeft / duration);
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleUpdateStake = (matchId: string, value: number) => {
    setStakes((prev) => ({ ...prev, [matchId]: value > 0 ? value : 0 }));
  };

  const handlePlaceBet = async () => {
    if (!session) {
      setShowModal(true);
      setIsBetSlipOpen(false);
      return;
    }

    const montoValidacion =
      activeTab === 'simples' ? totalInvertido : multiStake;
    if (pendingBets.length === 0 || montoValidacion <= 0) {
      return toast.error('Ingresa un importe válido.');
    }

    setIsLoading(true);

    let betsToInsert: IBet[] = [];

    if (activeTab === 'simples') {
      if (
        pendingBets.some(
          (bet) => !stakes[bet.match.id] || stakes[bet.match.id] <= 0
        )
      ) {
        setIsLoading(false);
        return toast.error('Todos los importes deben ser mayores a 0.');
      }
      betsToInsert = pendingBets.map((bet) => ({
        user_id: session.user?.email as string,
        type: 'simple',
        total_stake: stakes[bet.match.id],
        total_odd: bet.odd,
        potential_return: Number((stakes[bet.match.id] * bet.odd).toFixed(2)),
        status: 'PENDING',
        items: [
          {
            match: `${bet.match.homeTeam.name} vs ${bet.match.awayTeam.name}`,
            pick: bet.pick,
            odd: bet.odd
          }
        ]
      }));
    } else {
      betsToInsert = [
        {
          user_id: session.user?.email as string,
          type: 'multiple',
          total_stake: multiStake,
          total_odd: Number(totalOdd.toFixed(2)),
          potential_return: Number((multiStake * totalOdd).toFixed(2)),
          status: 'PENDING',
          items: pendingBets.map((bet) => ({
            match: `${bet.match.homeTeam.name} vs ${bet.match.awayTeam.name}`,
            pick: bet.pick,
            odd: bet.odd
          }))
        }
      ];
    }

    try {
      const res = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          activeTab === 'simples' ? betsToInsert : betsToInsert[0]
        )
      });

      if (res.ok) {
        fireConfetti();
        toast.success('¡Apuesta confirmada!');
        setPendingBets([]);
        setStakes({});
        setIsBetSlipOpen(false);
      } else {
        const errorData = await res.json();
        toast.error('Error: ' + errorData.error);
      }
    } catch {
      toast.error('Error de conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  const isInvalidSimple =
    activeTab === 'simples' &&
    pendingBets.some(
      (bet) => !stakes[bet.match.id] || stakes[bet.match.id] <= 0
    );

  const isInvalidMultiple =
    activeTab === 'multiples' && (!multiStake || multiStake <= 0);

  const isDisabled =
    isInvalidSimple ||
    isInvalidMultiple ||
    pendingBets.length === 0 ||
    isLoading;

  const validateInput = (val: string) => {
    if (val === '') return 0;

    const num = parseFloat(val);

    if (isNaN(num) || num < 0) return 0;

    return num;
  };

  return {
    session,
    pendingBets,
    activeTab,
    setActiveTab,
    stakes,
    multiStake,
    setMultiStake,
    setPendingBets,
    totalInvertido,
    totalPosibleGanancia,
    totalOdd,
    handleUpdateStake,
    handlePlaceBet,
    isDisabled,
    isLoading,
    validateInput
  };
};
