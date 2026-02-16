'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMinesHistory } from '@/hooks/mines/useMinesGame';
import { MinesStatus } from '@/types/mines.types';
import { useTranslation } from 'react-i18next';

export default function MinesHistoryTable() {
  const { data, isLoading } = useMinesHistory(10, 0);
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="text-gray px-8 py-4">{t('history.loadingHistory')}</div>;
  }

  if (!data || data.games.length === 0) {
    return <div className="text-gray px-8 py-4">{t('games.plinko.noGames')}</div>;
  }

  const getDisplayStatus = (status: string) => {
    if (status === MinesStatus.CashedOut) return MinesStatus.Won;
    return status;
  };

  return (
    <div
      className="overflow-x-auto scrollbar-hide relative rounded-t-2xl overflow-hidden
      before:absolute before:top-10 before:left-0 before:h-full before:w-px before:bg-bg-tabel
      after:absolute after:top-10 after:right-0 after:h-full after:w-px after:bg-bg-tabel"
    >
      <Table className="w-332.5 2xl:w-full mx-auto">
        <TableHeader className="bg-bg-tabel">
          <TableRow className="text-gray text-inter-bold!">
            <TableHead className="w-67.5 pl-8">{t('history.time')}</TableHead>
            <TableHead className="w-64 pl-8">{t('history.bet')}</TableHead>
            <TableHead className="w-81.5">{t('history.multiplier')}</TableHead>
            <TableHead className="w-88.5">{t('history.winAmount')}</TableHead>
            <TableHead className="2xl:w-50">{t('history.status')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-inter-main">
          {data.games.map((game) => {
            const isWin = game.status === MinesStatus.Won || game.status === MinesStatus.CashedOut;
            return (
              <TableRow key={game._id}>
                <TableCell className="text-white pl-8">
                  {new Date(game.finishedAt ?? game.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-white pl-8">${game.betAmount.toFixed(2)}</TableCell>
                <TableCell className={isWin ? 'text-green' : 'text-red'}>
                  {game.cashoutMultiplier ? `${game.cashoutMultiplier.toFixed(2)}x` : '0.00'}
                </TableCell>
                <TableCell className={isWin ? 'text-green' : 'text-red'}>
                  {isWin ? `$${game.winAmount?.toFixed(2)}` : '$0.00'}
                </TableCell>
                <TableCell
                  className={
                    isWin ? 'text-green first-letter:uppercase' : 'text-red first-letter:uppercase'
                  }
                >
                  {getDisplayStatus(game.status)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
