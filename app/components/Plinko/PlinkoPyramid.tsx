'use client';

type Props = {
  lines: 8 | 10 | 12 | 14 | 16;
};

const SIZE_MAP = {
  8: { desktop: 22, mobile: 12 },
  10: { desktop: 20, mobile: 10 },
  12: { desktop: 18, mobile: 8 },
  14: { desktop: 16, mobile: 6 },
  16: { desktop: 14, mobile: 6 },
} as const;

const LAYOUT_MAP = {
  8: {
    desktop: { gap: 38, marginBottom: 46 },
    mobile: { gap: 20, marginBottom: 24 },
  },
  10: {
    desktop: { gap: 28, marginBottom: 36 },
    mobile: { gap: 18, marginBottom: 21 },
  },
  12: {
    desktop: { gap: 22, marginBottom: 26 },
    mobile: { gap: 16, marginBottom: 16 },
  },
  14: {
    desktop: { gap: 20, marginBottom: 22 },
    mobile: { gap: 16, marginBottom: 16 },
  },
  16: {
    desktop: { gap: 20, marginBottom: 19 },
    mobile: { gap: 13, marginBottom: 12 },
  },
} as const;

export default function PlinkoPyramid({ lines }: Props) {
  const size = SIZE_MAP[lines];
  const layout = LAYOUT_MAP[lines];

  return (
    <div className="absolute inset-x-0 top-6 flex justify-center pointer-events-none">
      <div className="flex flex-col items-center">
        {Array.from({ length: lines }).map((_, rowIndex) => {
          const dotsCount = rowIndex + 3;

          return (
            <div
              key={rowIndex}
              className="plinko-row flex justify-center"
              style={{
                gap: layout.desktop.gap,
                marginBottom: layout.desktop.marginBottom,
              }}
            >
              {Array.from({ length: dotsCount }).map((_, i) => (
                <div
                  key={i}
                  data-peg-row={rowIndex}
                  data-peg-col={i}
                  className="plinko-peg rounded-full bg-gray"
                  style={{
                    width: size.desktop,
                    height: size.desktop,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .plinko-row {
            gap: ${layout.mobile.gap}px !important;
            margin-bottom: ${layout.mobile.marginBottom}px !important;
          }
          .plinko-row > div {
            width: ${size.mobile}px !important;
            height: ${size.mobile}px !important;
          }
        }
      `}</style>
    </div>
  );
}
