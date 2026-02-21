import { authOptions } from '@/app/src/lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '../constants';
import { getBetsData } from './get-bets-me.service';

export async function getBetsPageData(page?: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) redirect('/');

  const currentPage = Number(page) || 1;
  const data = await getBetsData({
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
    userEmail: session.user.email
  });

  return { ...data, currentPage };
}
