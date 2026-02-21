import { useAtom } from 'jotai';
import { type Match } from '../interfaces/index.interface';
import { pendingBetsAtom } from '../store/globals';

export const useMatchSelection = () => {
  const [pendingBets, setPendingBets] = useAtom(pendingBetsAtom);

  const toggleBet = (match: Match, pick: string, odd: number) => {
    setPendingBets((prev) => {
      const otherMatches = prev.filter((b) => b.match.id !== match.id);

      const isReclickingSamePick = prev.find(
        (b) => b.match.id === match.id && b.pick === pick
      );

      if (isReclickingSamePick) return otherMatches;

      return [...otherMatches, { match, pick, odd }];
    });
  };

  const isSelected = (matchId: string, pick: string) =>
    pendingBets.some((bet) => bet.match.id === matchId && bet.pick === pick);

  return { toggleBet, isSelected };
};
