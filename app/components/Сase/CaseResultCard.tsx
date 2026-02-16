'use client';

import Image from 'next/image';
import iconBag from '@/assets/iconBag.svg';
import { Button } from '@/components/ui/button';
import iconAttention from '@/assets/icon-attention.svg';
import Link from 'next/link';
import type { OpenedCaseItem } from '@/types/cases.types';
import { RARITY_GRADIENT } from './rarity.config';

import { getCaseItemImage } from './getCaseItemImage';
import { CASE_TITLE_MAP } from '../../components/Сase/caseTitles.config';
import { useCaseStore } from '@/store/case.store';

import { CASE_NAME_TO_CATEGORY } from './case-category.map';
import { normalizeCaseItemName } from './normalizeCaseItemName';
import { useSellCaseItem } from '@/hooks/cases/useSellCaseItem';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';
import { useMusic } from '@/hooks/useMusic';
import { Music } from '@/types/music.types';

type Props = {
  item: OpenedCaseItem;
};

export default function CaseResultCard({ item }: Props) {
  const { selectedCaseName } = useCaseStore();
  const { t } = useTranslation();
  const { playMusic, stopMusic } = useMusic();

  useEffect(() => {
    stopMusic(Music.carousel);
  }, [stopMusic]);

  const resetCase = useCaseStore((s) => s.reset);
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const sellItem = useSellCaseItem();

  const handleSell = async () => {
    playMusic(Music.buttonBet);
    await sellItem.mutateAsync(item);
    resetCase();
    router.push('/case');
  };

  const category = selectedCaseName ? CASE_NAME_TO_CATEGORY[selectedCaseName] : undefined;

  const itemTitle = category ? normalizeCaseItemName(item.name, category) : item.name;

  const caseTitle =
    (selectedCaseName && CASE_TITLE_MAP[selectedCaseName]) ?? selectedCaseName ?? 'Unknown Case';

  return (
    <>
      <div className="flex justify-center text-left max-md:mt-16.5">
        <div
          className="relative w-full max-w-125.5 max-md:max-w-84 h-122.5 max-md:h-79.5 radius-md px-0.5 pt-0.5 pb-0.75"
          style={{ background: RARITY_GRADIENT[item.rarity] }}
        >
          <div className="flex flex-col p-6 bg-bg-button radius-md h-full">
            <p className="text-white text-inter-h2">{itemTitle}</p>
            <div className="flex gap-1 items-center">
              <Image src={iconBag} alt="iconBag" />
              <p className="text-gray text-inter-secondary">{caseTitle}</p>
            </div>
            <Image
              src={getCaseItemImage(item)}
              alt={item.name}
              width={357}
              height={317}
              className="mx-auto max-md:w-55.5 max-md:h-49 last"
            />
          </div>
          <div
            className="absolute w-3 h-3 rounded-full max-md:bottom-4 max-md:left-4 bottom-8 left-8"
            style={{ background: RARITY_GRADIENT[item.rarity] }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-4">
        <Button
          onClick={handleSell}
          variant="flat"
          className="cursor-pointer radius-pill w-full max-w-54 h-12  max-md:max-w-40 button-red text-white! text-inter-bold"
        >
          {t('games.cases.sellFor')} {item.value}$
        </Button>
        <Link
          href={`/case/${slug}`}
          className="flex items-center justify-center button-yellow radius-md w-full max-w-54 max-md:max-w-40 h-12 text-white text-inter-bold"
        >
          {t('games.cases.tryAgain')}
        </Link>
      </div>

      <div className="flex justify-center mt-14 max-md:mb-49 mb-45">
        <div className="flex items-center gap-2 bg-bg-button radius-sm px-4 h-9">
          <Image src={iconAttention} alt="iconAttention" />
          <p className="text-gray text-inter-secondary max-md:text-xs!">
            {t('games.cases.itemDisplay')}
          </p>
        </div>
      </div>
    </>
  );
}
