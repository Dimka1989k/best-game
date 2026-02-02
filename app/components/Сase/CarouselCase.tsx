'use client';

import { useEffect, useRef } from 'react';
import { useCaseStore } from '@/store/case.store';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import line from '@/assets/line.svg';

import { getCaseItemImage } from './getCaseItemImage';
import { RARITY_GRADIENT } from './rarity.config';
import { normalizeCaseItemName } from './normalizeCaseItemName';
import { CASE_NAME_TO_CATEGORY } from './case-category.map';

const WIN_INDEX = 20;

export default function CarouselCase() {
  const { spinItems, finishSpin, selectedCaseName } = useCaseStore();

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const finished = useRef(false);

  const category = selectedCaseName ? CASE_NAME_TO_CATEGORY[selectedCaseName] : undefined;

  useEffect(() => {
    finished.current = false;
  }, [spinItems]);

  useEffect(() => {
    if (!spinItems?.length || finished.current) return;
    if (!viewportRef.current || !trackRef.current) return;

    finished.current = true;

    let rafFast = 0;
    let rafSlow = 0;
    let cancelled = false;

    const viewportWidth = viewportRef.current.offsetWidth;
    const firstItem = trackRef.current.children[0] as HTMLElement;

    const styles = getComputedStyle(trackRef.current);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');
    const itemWidth = firstItem.offsetWidth + gap;

    const centerOffset = viewportWidth / 2 - itemWidth / 2;
    const endX = -(WIN_INDEX * itemWidth) + centerOffset;

    const fastDuration = 1800;
    const slowDuration = 1200;
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function animateFast(now: number) {
      if (cancelled || !trackRef.current) return;

      const t = Math.min((now - startTime) / fastDuration, 1);
      const x = endX * 0.85 * t;

      trackRef.current.style.transform = `translateX(${x}px)`;

      if (t < 1) {
        rafFast = requestAnimationFrame(animateFast);
      } else {
        animateSlow();
      }
    }

    function animateSlow() {
      const slowStart = performance.now();
      const startX = parseFloat(trackRef.current!.style.transform.replace(/[^\d.-]/g, '') || '0');

      function step(now: number) {
        if (cancelled || !trackRef.current) return;

        const t = Math.min((now - slowStart) / slowDuration, 1);
        const eased = easeOutCubic(t);
        const x = startX + (endX - startX) * eased;

        trackRef.current.style.transform = `translateX(${x}px)`;

        if (t < 1) {
          rafSlow = requestAnimationFrame(step);
        } else {
          finishSpin();
        }
      }

      rafSlow = requestAnimationFrame(step);
    }

    rafFast = requestAnimationFrame(animateFast);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafFast);
      cancelAnimationFrame(rafSlow);
    };
  }, [spinItems, finishSpin]);

  if (!spinItems?.length) return null;

  return (
    <div className="mt-14.5 p-px radius-lg bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] mx-auto max-w-197.5 max-sm:max-w-91 max-lg:max-w-150 h-60.5 max-md:h-50.5">
      <div ref={viewportRef} className="relative overflow-hidden w-full h-full bg-black radius-lg">
        <Image
          src={line}
          alt="line"
          className="absolute z-50 inset-0 w-full h-full pointer-events-none"
        />
        <div
          ref={trackRef}
          className="flex h-full items-center gap-6 will-change-transform"
          style={{ transform: 'translateX(0px)' }}
        >
          {spinItems.map((item, i) => (
            <div key={`${item.id}-${i}`} className="shrink-0">
              <Card>
                <CardContent className="flex items-center justify-center">
                  <div
                    className="relative w-38.5 h-48 max-md:w-25 max-md:h-31.5 radius-md p-px"
                    style={{ background: RARITY_GRADIENT[item.rarity] }}
                  >
                    <div className="flex flex-col justify-center bg-bg-button radius-md h-full">
                      <p className="text-white text-inter-small text-[0.625rem]! ml-2 w-19">
                        {category ? normalizeCaseItemName(item.name, category) : item.name}
                      </p>
                      <div className="flex items-center justify-center w-full">
                        <Image
                          src={getCaseItemImage(item)}
                          alt={item.name}
                          width={135}
                          height={137}
                          className="mt-2 max-md:w-16! max-md:h-16!"
                        />
                      </div>
                      <div
                        className="absolute w-1.5 h-1.5 rounded-full bottom-2 left-2.5"
                        style={{ background: RARITY_GRADIENT[item.rarity] }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
