import Link from 'next/link';
import arrowLeft from '@/assets/arrow-left.svg';
import Image from 'next/image';

export default function ButtonLink() {
  return (
    <Link href="/" className="flex mb-10 max-md:hidden">
      <Image src={arrowLeft} alt="arrowLeft" />
      <p className="text-inter-main bg-[linear-gradient(180deg,#ffcd71_0%,#e59603_100%)] bg-clip-text text-transparent">
        All games
      </p>
    </Link>
  );
}
