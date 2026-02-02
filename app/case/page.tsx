'use client';

import Link from 'next/link';
import Image from 'next/image';
import starIcon from '@/assets/star.svg';
import dollarIcon from '@/assets/icon-dollar.svg';
import bagImage from '@/assets/bag.svg';
import ButtonLink from '../components/ButtonLink';
import { useCases } from '@/hooks/cases/useCases';
import { CASE_TITLE_MAP } from '../components/Сase/caseTitles.config';

export default function Cases() {
  const { data, isLoading } = useCases();

  if (isLoading) return null;

  return (
    <div className="flex flex-col px-12 max-md:px-3.75 pt-5 max-md:pt-0 pb-62.5 max-md:pb-34">
      <ButtonLink href="/" />
      <div className="grid grid-cols-4 gap-6 justify-items-center max-xl:grid-cols-2 max-md:grid-cols-2 max-md:gap-3.5 mt-25.5 max-lg:mt-6">
        {data?.cases.map((caseItem, index) => (
          <Link
            key={caseItem.id}
            href={`/case/${caseItem.id}`}
            className="w-full max-w-79.5 max-sm:max-w-43.5 h-full max-h-131 max-sm:max-h-69 shadow-case transition-all duration-200 flex justify-center flex-col items-center bg-bg-case radius-md px-2 pt-6 pb-18.5 max-md:pb-4 max-md:pt-3"
          >
            <div className="flex gap-1">
              {Array.from({ length: index + 1 }).map((_, i) => (
                <Image key={i} src={starIcon} alt="starIcon" />
              ))}
            </div>
            <p className="text-white text-satoshi max-md:text-xl! mt-4.5 max-md:mt-2.5">
              {CASE_TITLE_MAP[caseItem.name] ?? caseItem.name}
            </p>
            <div className="mt-2 w-full max-w-25 max-md:w-21.75 h-full max-h-10 max-md:h-7.5 radius-pill border border-transparent bg-[linear-gradient(180deg,#FFCD71,#E59603)] p-px">
              <div className="py-2 max-md:py-1.5 flex justify-center items-center gap-1 w-full max-w-24.5 max-md:w-20.75 h-full max-h-9 max-md:h-6.5 relative z-999 bg-bg-case! radius-pill">
                <p className="text-white text-inter-bold max-md:text-sm!">{caseItem.price}</p>
                <Image src={dollarIcon} alt="dollarIcon" className="max-md:w-4 max-md:h-4" />
              </div>
            </div>
            <Image src={bagImage} alt="bagImage" />
          </Link>
        ))}
      </div>
    </div>
  );
}
