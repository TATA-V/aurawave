import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import currentTrackState from 'src/atom/currentTrackState';
import userState from 'src/atom/userState';
import MoreSvg from '../../../../public/more.svg';

import AddToPlaylistModal from '../../MusicLi/AddToPlaylistModal';

function MusicTitle() {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const { currentMusic } = useRecoilValue(currentTrackState); // 리코일
  const { isLoggedIn } = useRecoilValue(userState);
  const { title } = currentMusic;

  return (
    <MusicTitleBlock $isLoggedIn={isLoggedIn}>
      <div className="left" />
      <p className="title">{title}</p>

      {isLoggedIn && (
        <>
          <button
            onClick={() => setShowAddToPlaylistModal(!showAddToPlaylistModal)}
            className="more-btn"
          >
            <MoreSvg width={28.12} height={5.62} fill="#B1B7B9" />
          </button>
          {showAddToPlaylistModal && (
            <AddToPlaylistModal
              el={currentMusic}
              top="32"
              showAddToPlaylistModal={showAddToPlaylistModal}
              setShowAddToPlaylistModal={setShowAddToPlaylistModal}
            />
          )}
        </>
      )}
    </MusicTitleBlock>
  );
}

export default MusicTitle;

interface IsLoggedIn {
  $isLoggedIn: boolean;
}

const MusicTitleBlock = styled.div<IsLoggedIn>`
  width: 100%;
  height: 34px;
  margin: 8px 0 18px 0;
  position: relative;

  display: flex;
  justify-content: ${({ $isLoggedIn }) => ($isLoggedIn ? 'space-between' : 'center')};
  align-items: center;

  .left {
    width: ${({ $isLoggedIn }) => ($isLoggedIn ? '30px' : null)};
  }

  .more-btn {
    width: 38.12px;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 1rem;
    font-weight: 600;
  }
`;
