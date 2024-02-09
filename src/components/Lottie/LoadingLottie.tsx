import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie-player';
import loadingJson from '../../../public/lottie/animation_loading.json';

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
