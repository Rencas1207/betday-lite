import { cache } from 'react';
import type { IBetResponse } from '../interfaces/bet.interface';
import { supabase } from '../lib/supabase';

export const getBetsData = cache(
  async ({
    itemsPerPage,
    currentPage,
    userEmail
  }: {
    itemsPerPage: number;
    currentPage: number;
    userEmail: string;
  }) => {
    try {
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from('bets')
        .select('*', { count: 'exact' })
        .eq('user_id', userEmail)
        .order('placed_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const totalItems = count || 0;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const bets: IBetResponse[] = (data || []).map((bet) => ({
        id: bet.id,
        placedAt: bet.placed_at,
        matchId: bet.type === 'simple' ? 'SMPL' : 'MULT',
        pick: bet.type === 'simple' ? bet.items[0].pick : 'Combinada',
        odd: bet.total_odd,
        stake: bet.total_stake,
        status: bet.status,
        return: bet.potential_return,
        items: bet.items
      }));

      return { bets, totalPages, totalItems };
    } catch (error) {
      console.error('Error fetching bets:', error);
      return { bets: [], totalPages: 0, totalItems: 0 };
    }
  }
);
