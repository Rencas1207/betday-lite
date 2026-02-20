import fs from 'fs/promises';
import path from 'path';
import type { Bet } from '../interfaces/bet.interface';

export const getBetDetail = async (id: string) => {
  try {
    const filePath = path.join(process.cwd(), 'app/src/data/bets-me.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.bets.find((b: Bet) => b.id === id);
  } catch {
    return null;
  }
};
