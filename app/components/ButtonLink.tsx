import Link from 'next/link';
import Image from 'next/image';
import arrowLeft from '@/assets/arrow-left.svg';

type ButtonLinkProps = {
  href: string;
  label?: string;
};

export default function ButtonLink({ href, label = 'All games' }: ButtonLinkProps) {
  return (
    <Link href={href} className="flex w-full max-w-25 mb-10 max-md:hidden">
      <Image src={arrowLeft} alt="arrowLeft" />
      <p className="text-inter-main bg-[linear-gradient(180deg,#ffcd71_0%,#e59603_100%)] bg-clip-text text-transparent">
        {label}
      </p>
    </Link>
  );
}
