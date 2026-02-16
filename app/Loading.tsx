import React from 'react';
import Image from 'next/image';

import logo from '@/assets/Logo-header.svg';

interface LoadingProps {
  progress: number;
}

export const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className="bg-main flex items-center justify-center h-dvh">
      <div className="items-center gap-1 flex flex-col">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-satoshi-small text-white max-md:hidden">Blaze</p>
          <Image src={logo} alt="logo" width={40} height={40} />
          <p className="text-satoshi-small text-white max-md:hidden">Casino</p>
        </div>
        <div className="w-70 h-1 bg-main rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full button-red transition-all ease-in duration-500"
          />
        </div>
      </div>
    </div>
  );
};
