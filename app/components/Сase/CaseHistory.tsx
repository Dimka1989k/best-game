'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCaseHistory } from '@/hooks/cases/useCaseHistory';

import { CASE_NAME_TO_CATEGORY } from '@/app/components/Сase/case-category.map';
import { normalizeCaseItemName } from '@/app/components/Сase/normalizeCaseItemName';

import type { CaseItemRarity } from '@/types/cases.types';
import { RARITY_GRADIENT } from './rarity.config';
import { CASE_TITLE_MAP } from '@/app/components/Сase/caseTitles.config';

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

export default function CaseHistory() {
  const { data, isLoading, isError } = useCaseHistory();

  const gradientTextStyle = (gradient: string) => ({
    background: gradient,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  });

  if (isLoading) {
    return <p className="text-gray px-4">Loading history…</p>;
  }

  if (isError || !data) {
    return <p className="text-red px-4">Failed to load history</p>;
  }

  if (data.openings.length === 0) {
    return <p className="text-gray px-4">No case openings yet</p>;
  }

  return (
    <div className="overflow-x-auto scrollbar-hide relative rounded-t-2xl overflow-hidden before:absolute before:top-10 before:left-0 before:h-full before:w-px before:bg-bg-tabel after:absolute after:top-10 after:right-0 after:h-full after:w-px after:bg-bg-tabel">
      <Table className="w-332.5 2xl:w-full mx-auto">
        <TableHeader className="bg-bg-tabel">
          <TableRow className="text-gray text-inter-bold!">
            <TableHead className="w-61.5 pl-8 pr-0">Time</TableHead>
            <TableHead className="w-61.5">Case</TableHead>
            <TableHead className="w-60.5">Item</TableHead>
            <TableHead className="w-63">Rarity</TableHead>
            <TableHead className="w-62.5">Value</TableHead>
            <TableHead className="w-18.5">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-inter-main">
          {data.openings.map((row) => {
            const profitPositive = row.profit >= 0;
            const category = CASE_NAME_TO_CATEGORY[row.caseName];
            const normalizedItemName = category
              ? normalizeCaseItemName(row.itemName, category)
              : row.itemName;

            const rarity = row.itemRarity as CaseItemRarity;
            const gradientStyle = gradientTextStyle(RARITY_GRADIENT[rarity]);
            const caseTitle = CASE_TITLE_MAP[row.caseName] ?? row.caseName;

            return (
              <TableRow key={row.id}>
                <TableCell className="text-white pl-8">{formatDate(row.createdAt)}</TableCell>
                <TableCell className="text-white">{caseTitle}</TableCell>
                <TableCell style={gradientStyle}>{normalizedItemName}</TableCell>
                <TableCell style={gradientStyle}>{row.itemRarity}</TableCell>
                <TableCell style={gradientStyle}>{row.itemValue}</TableCell>
                <TableCell style={gradientStyle}>
                  {profitPositive ? `+${row.profit}` : row.profit}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
