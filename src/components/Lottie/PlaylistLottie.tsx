import styled from 'styled-components';
import loadingJson from '@/public/lottie/playlist_loading.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

function PlaylistLottie() {  
  return (
    <PlaylistLottieBlock>
      <Lottie className="lottie" loop animationData={loadingJson} play />
    </PlaylistLottieBlock>
  );
}

export default PlaylistLottie;

const PlaylistLottieBlock = styled.div`
  padding-top: 120px;
  display: flex;
  justify-content: center;

  .lottie {
    width: 290px;
  }
`;
