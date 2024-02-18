import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMusicShuffle } from 'src/hook/useMusicControl';
import currentTrackState from 'src/atom/currentTrackState';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { AWPlaylistData } from 'src/types/playlistTypes';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';

interface Props {
  data: DocumentData;
}

function PlayAndShuffleBtn({ data } : Props) {
  const [playBtnClicked, setPlayBtnClicked] = useState(false);
  const setCurrentTrack = useSetRecoilState(currentTrackState);
  const resetCurrentTrack = useResetRecoilState(currentTrackState);
  const playlistShuffle = useMusicShuffle(); // hook

  const handlePlay = () => {
    setPlayBtnClicked(true);
    resetCurrentTrack();
    setCurrentTrack((prev) => ({
      ...prev,
      isShow: true,
      isPlaying: true,
      currentMusic: data.musicList[0],
      currentTrack: data.musicList,
    }));
  };

  const handleShuffle = () => {
    if (playBtnClicked) {
      playlistShuffle();
      return;
    }
    handlePlay();
    setPlayBtnClicked(true);
  };

  return (
    <div className="pt-[20px] pb-[33px] flex gap-[10px]">
      <Button onClick={handlePlay} whileTap={{ scale: 0.9 }}>
        <i className="i-play-line" /> PLAY
      </Button>
      <Button onClick={handleShuffle} whileTap={{ scale: 0.9 }}>
        <i className="i-shuffle" /> SHUFFLE
      </Button>
    </div>
  );
}

export default PlayAndShuffleBtn;

const Button = styled(motion.button)`
  width: 100%;
  height: 52px;
  color: var(--dark-blue-900);
  font-size: 0.9375rem;
  font-weight: 500;
  border-width: 1px;
  border-style: solid;
  border-color: var(--gray-100);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .i-play-line,
  .i-shuffle {
    font-size: 16px;
  }
`;
