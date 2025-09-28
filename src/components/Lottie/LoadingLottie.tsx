'use client';

import styled from 'styled-components';
import loadingJson from '@/public/lottie/animation_loading.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

function LoadingLottie() {  
  return (
    <LoadingLottieBlock>
      <Lottie className="lottie" loop animationData={loadingJson} play />
    </LoadingLottieBlock>
  );
}

export default LoadingLottie;

const LoadingLottieBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  .lottie {
    width: 100px;
    transform: translateY(-10px);
  }
`;
