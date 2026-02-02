'use client';

import Image from 'next/image';
import biaBag from '@/assets/bigBag.svg';
import { Switch } from '@/components/ui/switch';
import ButtonLink from '@/app/components/ButtonLink';

import CaseHistory from '@/app/components/Сase/CaseHistory';
import CaseContent from '@/app/components/Сase/CaseContent';

import { useRouter, useParams } from 'next/navigation';
import { useCaseDetails } from '@/hooks/cases/useCaseDetails';
import { CASE_TITLE_MAP } from '../../components/Сase/caseTitles.config';
import { useCaseStore } from '@/store/case.store';
import { Button } from '@/components/ui/button';
import { generateSpinItems } from '@/app/components/Сase/generateSpinItems';
import { resetCaseItemImages } from '@/app/components/Сase/getCaseItemImage';
import { useUserStore } from '@/store/useUserStore';
import { useOpenCase } from '@/hooks/cases/useOpenCase';
import { CasePhase } from '@/types/cases.types';

export default function CasePage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCaseDetails(slug);

  const balance = useUserStore((s) => s.balance);

  const { setResult, startSpin, setSelectedCaseName, withoutAnimation, setWithoutAnimation } =
    useCaseStore();

  const openCase = useOpenCase(data?.id ?? '');

  if (!data) return null;

  const handleOpenCase = async () => {
    if (balance < data.price) {
      alert('Not enough balance');
      return;
    }

    resetCaseItemImages();
    setSelectedCaseName(data.name);

    const res = await openCase.mutateAsync();

    if (withoutAnimation) {
      useCaseStore.setState({
        result: res,
        phase: CasePhase.RESULT,
      });

      router.push(`/case/${data.id}/carousel`);
      return;
    }

    const winItem = data.items.find((i) => i.id === res.item.id);
    if (!winItem) {
      throw new Error('Winning item not found in case items');
    }

    const spinItems = generateSpinItems(data.items, winItem);

    startSpin(spinItems);
    setResult(res);

    router.push(`/case/${data.id}/carousel`);
  };

  return (
    <div className="px-12  [@media(max-width:1193px)]:pr-12 max-sm:px-4! pt-5 pb-4">
      <ButtonLink href="/" />

      <div className="flex justify-between flex-wrap [@media(max-width:1193px)]:justify-center max-xl:pr-0 pr-29.5">
        <div>
          <p className="text-white text-satoshi text-5xl max-md:text-[2rem]">
            {CASE_TITLE_MAP[data.name] ?? data.name}
          </p>
          <Image
            src={biaBag}
            alt="case bag"
            className="max-md:w-full max-md:max-w-90 h-full max-md:max-h-49.5 mt-10 max-md:mt-6"
          />
        </div>
        <div className="flex flex-col w-full max-w-107 mt-21.5 max-md:mt-4 max-md:text-center">
          <div className="flex justify-center items-center mt-25.5 max-md:flex-col">
            <Button
              onClick={handleOpenCase}
              disabled={openCase.isPending}
              className="flex items-center justify-center button-red text-white! radius-pill text-inter-bold w-full max-w-51 h-12 cursor-pointer"
            >
              Open Case
            </Button>
            <div className="flex items-center max-md:mt-4">
              <Switch
                checked={withoutAnimation}
                onCheckedChange={setWithoutAnimation}
                className="ml-8 max-md:ml-0 cursor-pointer"
              />
              <p className="ml-4 text-inter-bold text-gray">without animation</p>
            </div>
          </div>
        </div>
      </div>
      <CaseContent items={data.items} selectedCaseName={data.name} />
      <div className="mt-10">
        <p className="text-white text-satoshi max-md:text-satoshi-small! mb-4">Game history</p>
        <div className="border-b border-bg-tabel">
          <CaseHistory />
        </div>
      </div>
    </div>
  );
}
