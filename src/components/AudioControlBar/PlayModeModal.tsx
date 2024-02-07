'use client';

import React, { SetStateAction, useRef } from 'react';
import { useRecoilState } from 'recoil';
import currentTrackState from 'src/atom/currentTrackState';
import * as S from 'src/styled/audioControlStyled';
import useCloseModal from 'src/hook/useCloseModal';
import { useMusicLoop, useMusicShuffle } from 'src/hook/useMusicControl';

interface Props {
  playModeModal: boolean;
  setPlayModeModal: React.Dispatch<SetStateAction<boolean>>;
}

function PlayModeModal({ playModeModal, setPlayModeModal }: Props) {
  const [currentMusicAndTrack] = useRecoilState(currentTrackState);
  const { isLoop, playMode } = currentMusicAndTrack;
  const modalRef = useRef<HTMLUListElement>(null);
  const handleLoop = useMusicLoop(); // hook
  const handleShuffle = useMusicShuffle(); // hook

  // 모달창 영역 밖을 클릭하면 모달창 닫힘
  useCloseModal({ modalRef, state: playModeModal, setState: setPlayModeModal }); // hook

  return (
    <S.PlayModeModalBlock ref={modalRef} $isLoop={isLoop} $playMode={playMode}>
      <li onClick={handleLoop} className="option-box border-bottom">
        <i className="i-loop" />
        <span className="option-txt loop">LOOP</span>
      </li>
      <li onClick={handleShuffle} className="option-box">
        <i className="i-shuffle" />
        <span className="option-txt shuffle">SHUFFLE</span>
      </li>
    </S.PlayModeModalBlock>
  );
}

export default PlayModeModal;
