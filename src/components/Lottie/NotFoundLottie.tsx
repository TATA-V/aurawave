'use client';

import notfoundJson from '@/public/lottie/notfound.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

function NotFoundLottie() {
  return (
    <div className="w-[250px] md:w-[370px]">
      <Lottie loop animationData={notfoundJson} play />
    </div>
  );
}

export default NotFoundLottie;
