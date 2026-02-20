import fs from 'fs/promises';
import path from 'path';

export const getBetsData = async ({
  itemsPerPage,
  currentPage
}: {
  itemsPerPage: number;
  currentPage: number;
}) => {
  try {
    const filePath = path.join(process.cwd(), 'app/src/data/bets-me.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const allBets = [...(data.bets || [])].reverse();

    const totalItems = allBets.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBets = allBets.slice(startIndex, startIndex + itemsPerPage);

    return { bets: paginatedBets, totalPages, totalItems };
  } catch {
    return { bets: [], totalPages: 0, totalItems: 0 };
  }
};
