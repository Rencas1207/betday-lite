import { supabase } from '../lib/supabase';

export const getBetDetail = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('bets')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      type: data.type,
      placedAt: data.placed_at,
      status: data.status,
      odd: data.total_odd,
      stake: data.total_stake,
      return: data.potential_return,
      items: data.items
    };
  } catch (error) {
    console.error('Error fetching bet detail:', error);
    return null;
  }
};
