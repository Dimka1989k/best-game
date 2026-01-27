'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { GameHistoryRow } from '@/types/game-history.types';
import { memo } from 'react';
import { CrashBetStatus } from '@/types/crash.types';

type Props = {
  history?: GameHistoryRow[];
  isLoading: boolean;
};

export const CrashHistoryTable = memo(function CrashHistoryTable({ history, isLoading }: Props) {
  return (
    <div className="overflow-x-auto scrollbar-hide relative rounded-t-2xl overflow-hidden before:absolute before:top-10 before:left-0 before:h-full before:w-px before:bg-bg-tabel after:absolute after:top-10 after:right-0 after:h-full after:w-px after:bg-bg-tabel">
      <Table className="w-332.5 2xl:w-full mx-auto">
        <TableHeader className="bg-bg-tabel">
          <TableRow className="text-gray text-inter-bold!">
            <TableHead className="w-67.5 pl-8">Time</TableHead>
            <TableHead className="w-64 pl-8">Bet</TableHead>
            <TableHead className="w-81.5">Multiplier</TableHead>
            <TableHead className="w-88.5">Win Amount</TableHead>
            <TableHead className="2xl:w-50">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pt-8 text-inter-main">
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray">
                Loading history...
              </TableCell>
            </TableRow>
          )}
          {history?.map((row) => {
            const isWon = row.status === CrashBetStatus.Won;
            return (
              <TableRow key={row.id}>
                <TableCell className="text-white pl-8">
                  {new Date(row.time).toLocaleString()}
                </TableCell>
                <TableCell className="text-white pl-8">${row.betAmount.toFixed(2)}</TableCell>
                <TableCell className={isWon ? 'text-green' : 'text-red'}>
                  {row.multiplier?.toFixed(2)}x
                </TableCell>
                <TableCell className={isWon ? 'text-green' : 'text-red'}>
                  ${row.winAmount.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`${isWon ? 'text-green' : 'text-red'} first-letter:uppercase`}
                >
                  {row.status}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});
