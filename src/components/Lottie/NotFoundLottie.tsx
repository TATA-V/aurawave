'use client';

import Lottie from 'react-lottie-player';
import notfoundJson from '../../../public/lottie/notfound.json';

function NotFoundLottie() {
  return (
    <div className="w-[250px] md:w-[370px]">
      <Lottie loop animationData={notfoundJson} play />
    </div>
  );
}

export default NotFoundLottie;
