'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePlinkoHistory } from '@/hooks/plinko/usePlinkoHistory';
import { PlinkoStatus } from '@/types/plinko.types';
import { useTranslation } from 'react-i18next';

function formatDateTime(date: string) {
  const d = new Date(date);

  const pad = (n: number) => String(n).padStart(2, '0');

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();

  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
}

export default function PlinkoHistoryTable() {
  const { data, isLoading } = usePlinkoHistory();
  const { t } = useTranslation();

  if (isLoading) {
    return <p className="text-gray px-4">{t('history.loadingHistory')}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-gray px-4">{t('history.noGames')}</p>;
  }

  return (
    <div className="overflow-x-auto scrollbar-hide relative rounded-t-2xl overflow-hidden before:absolute before:top-10 before:left-0 before:h-full before:w-px before:bg-bg-tabel after:absolute after:top-10 after:right-0 after:h-full after:w-px after:bg-bg-tabel">
      <Table className="w-332.5 2xl:w-full mx-auto">
        <TableHeader className="bg-bg-tabel">
          <TableRow className="text-gray text-inter-bold!">
            <TableHead className="w-61.5 pl-8">{t('history.time')}</TableHead>
            <TableHead className="w-61.5">{t('history.bet')}</TableHead>
            <TableHead className="w-60.5">{t('history.lines')}</TableHead>
            <TableHead className="w-63">{t('history.risk')}</TableHead>
            <TableHead className="w-62.5">{t('history.multiplier')}</TableHead>
            <TableHead className="w-18.5">{t('common.win')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-inter-main">
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="text-white pl-8">{formatDateTime(row.createdAt)}</TableCell>
              <TableCell className="text-white">${row.totalBet}</TableCell>
              <TableCell className="text-gray">{row.rows}</TableCell>
              <TableCell className="text-gray first-letter:uppercase">{row.risk}</TableCell>
              <TableCell className={row.netWin > 0 ? 'text-green' : 'text-red'}>
                {row.multiplier.toFixed(2)}x
              </TableCell>
              <TableCell
                className={
                  row.status === PlinkoStatus.Won
                    ? 'text-green first-letter:uppercase text-bold!'
                    : 'text-red first-letter:uppercase text-bold!'
                }
              >
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
