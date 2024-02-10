import styled from 'styled-components';
import Lottie from 'react-lottie-player';
import loadingJson from '../../../public/lottie/playlist_loading.json';

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
