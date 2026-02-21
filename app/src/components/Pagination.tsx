import { Box } from '@betday-lite/box';
import { Typography } from '@betday-lite/typography';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { IBetResponse } from '../interfaces/bet.interface';

const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  bets,
  totalItems
}: {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  bets: IBetResponse[];
  totalItems: number;
}) => {
  return (
    <Box className="flex flex-col items-center justify-center border-t border-slate-100 bg-white px-8 py-5 sm:justify-between md:flex-row">
      <Box className="flex items-center gap-2">
        <Link
          href={`?page=${Math.max(1, currentPage - 1)}`}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition-all ${
            currentPage === 1
              ? 'pointer-events-none opacity-30'
              : 'shadow-sm hover:border-slate-900 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <ChevronLeft size={20} />
        </Link>

        <Box className="flex gap-1.5">
          {pageNumbers.map((num) => (
            <Link
              key={num}
              href={`?page=${num}`}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black transition-all ${
                currentPage === num
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'border border-slate-200 bg-white text-slate-400 hover:border-slate-900 hover:text-slate-900'
              }`}
            >
              {num}
            </Link>
          ))}
        </Box>

        <Link
          href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition-all ${
            currentPage === totalPages
              ? 'pointer-events-none opacity-30'
              : 'shadow-sm hover:border-slate-900 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <ChevronRight size={20} />
        </Link>
      </Box>

      <Box className="hidden text-[12px] font-black tracking-widest text-slate-400 uppercase sm:block">
        Mostrando{' '}
        <Typography variant="small" className="text-sm">
          {bets.length}
        </Typography>{' '}
        de{' '}
        <Typography variant="small" className="text-sm">
          {totalItems}
        </Typography>{' '}
        resultados
      </Box>
    </Box>
  );
};

export default Pagination;
