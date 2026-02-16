import Image from 'next/image';
import { useMemo, useEffect } from 'react';

import { RARITY_GRADIENT } from './rarity.config';
import { getCaseItemImage } from './getCaseItemImage';
import { normalizeCaseItemName } from './normalizeCaseItemName';
import { CASE_NAME_TO_CATEGORY } from './case-category.map';
import type { CaseItemDTO } from '@/types/cases.types';
import { useTranslation } from 'react-i18next';

type Props = {
  items: CaseItemDTO[];
  selectedCaseName?: string;
};

export default function CaseContent({ items, selectedCaseName }: Props) {
  const { t } = useTranslation();
  useEffect(() => {}, [items]);

  const category = selectedCaseName ? CASE_NAME_TO_CATEGORY[selectedCaseName] : undefined;

  const visibleItems = useMemo(() => items.slice(0, 24), [items]);

  if (!visibleItems.length) return null;

  return (
    <div className="mt-14 max-md:mt-10">
      <p className="text-white text-satoshi max-md:text-satoshi-small! mb-6 max-md:mb-4">
        {t('games.cases.content')}
      </p>
      <div className="flex gap-4 flex-wrap mx-auto max-sm:px-3.5">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="relative w-full max-w-32.5 max-md:max-w-25 h-full max-h-37.5 max-md:max-h-31.5 radius-md px-0.5 pb-0.75"
            style={{ background: RARITY_GRADIENT[item.rarity] }}
          >
            <div className="flex flex-col bg-bg-button radius-md h-full pb-5 max-md:pb-4">
              <p className="mx-2 my-2 text-white text-inter-small max-md:text-[0.625rem]! w-24 max-md:w-19">
                {category ? normalizeCaseItemName(item.name, category) : item.name}
              </p>
              <div className="flex items-center justify-center w-full">
                <Image
                  src={getCaseItemImage(item)}
                  alt={item.name}
                  width={78}
                  height={78}
                  className="max-md:w-16 max-md:h-16"
                />
              </div>
              <div
                className="absolute w-1.5 h-1.5 rounded-full bottom-2 left-2.5"
                style={{ background: RARITY_GRADIENT[item.rarity] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
