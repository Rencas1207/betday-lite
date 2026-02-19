'use client';

import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { loginModalAtom, pendingBetAtom } from '../store/globals';
import type { GroupedMatch, Match } from '../types';

export default function TimelineSection({
  matches
}: {
  matches: GroupedMatch[];
}) {
  const { data: session } = useSession();
  const setPendingBet = useSetAtom(pendingBetAtom);
  const setShowModal = useSetAtom(loginModalAtom);

  const handleBetClick = (match: Match, pick: string, odd: number) => {
    if (!session) {
      setPendingBet({ match, pick, odd });
      setShowModal(true);
      return;
    }

    toast.success(
      `Apuesta realizada en ${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`
    );
  };

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div
          key={match.match.id}
          className="rounded-xl border border-white/5 bg-zinc-900 p-4"
        >
          <p className="mb-2 text-xs text-zinc-500">
            {new Date(match.match.startTime).toLocaleTimeString()}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold">
              {match.match.homeTeam.shortName} vs{' '}
              {match.match.awayTeam.shortName}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleBetClick(
                    match.match,
                    'HOME',
                    match.match.market.odds.home
                  )
                }
                className="min-w-15 cursor-pointer rounded bg-zinc-800 p-2 text-sm font-semibold hover:bg-zinc-700"
              >
                {match.match.market.odds.home}
              </button>

              <button
                onClick={() =>
                  handleBetClick(
                    match.match,
                    'DRAW',
                    match.match.market.odds.draw
                  )
                }
                className="min-w-15 cursor-pointer rounded bg-zinc-800 p-2 text-sm font-semibold hover:bg-zinc-700"
              >
                {match.match.market.odds.draw}
              </button>

              <button
                onClick={() =>
                  handleBetClick(
                    match.match,
                    'AWAY',
                    match.match.market.odds.away
                  )
                }
                className="min-w-15 cursor-pointer rounded bg-zinc-800 p-2 text-sm font-semibold hover:bg-zinc-700"
              >
                {match.match.market.odds.away}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
