'use client';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

export const SuccessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={18} fill="none" {...props}>
    <path fill="#40DF42" d="M9.5 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
    <path stroke="#FEFEFE" strokeLinecap="round" strokeLinejoin="round" d="m7.25 9 1.5 1.5 3-3" />
  </svg>
);

export const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={18} height={18} {...props}>
    <g transform="translate(1.4 1.4) scale(2.81)">
      <path
        d="M45 90C20.187 90 0 69.813 0 45 0 20.187 20.187 0 45 0c24.813 0 45 20.187 45 45 0 24.813-20.187 45-45 45z"
        fill="#EC0000"
      />
      <path
        d="M28.902 66.098c-1.28 0-2.559-.488-3.536-1.465-1.953-1.952-1.953-5.118 0-7.07l32.196-32.196c1.951-1.952 5.119-1.952 7.07 0 1.953 1.953 1.953 5.119 0 7.071L32.438 64.633c-.977.976-2.256 1.465-3.536 1.465z"
        fill="#FFFFFF"
      />
      <path
        d="M61.098 66.098c-1.279 0-2.56-.488-3.535-1.465L25.367 32.438c-1.953-1.953-1.953-5.119 0-7.071 1.953-1.952 5.118-1.952 7.071 0l32.195 32.196c1.953 1.952 1.953 5.118 0 7.07-.976.976-2.256 1.465-3.535 1.465z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      icons={{
        success: <SuccessIcon />,
        error: <ErrorIcon className="w-4.5 h-4.5" />,
      }}
      toastOptions={{
        classNames: {
          error: '!w-fit !left-1/2 !-translate-x-1/2 whitespace-nowrap',
          success: '!w-fit !left-1/2 !-translate-x-1/2 whitespace-nowrap',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--color-white)',
          '--normal-text': '13px',
          '--normal-border': 'var(--color-lines)',
          '--border-radius': '16px',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};
export { Toaster };
