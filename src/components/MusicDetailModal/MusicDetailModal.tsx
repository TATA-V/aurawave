'use client';

import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from 'src/styled/musicDetailModalStyled';
import currentTrackState from 'src/atom/currentTrackState';
import formatTime from 'src/utils/formatTime';
import useCloseModal from 'src/hook/useCloseModal';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MusicPauseSvg from '../../../public/musicPauseSvg.svg';

import MusicTitle from './MusicDetailModalMaterial/MusicTitle';
import MusicCopyright from './MusicDetailModalMaterial/MusicCopyright';
import PlaymodeMenu from './MusicDetailModalMaterial/PlaymodeMenu';

interface Props {
  totalDuration: number;
  currentDuration: number;
  progressBarWidth: number;
  handlePrevNextMusic: (type?: 'prev' | 'next') => void;
  handleTogglePlay: () => void;
  handleProgressBar: (e: React.MouseEvent<HTMLDivElement>, type: string) => void;
  currentTimeWidth: number;
  currentTime: number;
}

function MusicDetailModal({
  // play, // 음악 재생 유무
  totalDuration, // 총 음악 시간
  currentDuration, // 현재 음악 시간
  handleTogglePlay, // 현재 재생 중인 음악을 멈추거나 다시 재생
  handlePrevNextMusic, // 이전, 다음 음악 재생
  progressBarWidth, // 음악 재생 중인 상태에서 progressBar의 가로 길이
  handleProgressBar, // progressBar 클릭한 위치에서 음악 재생(onClick), ProgressBar위에 마우스 올리면 해당 위치의 음악 시간 표시(onMouseMove)
  currentTimeWidth, // progressBar 위에 마우스가 올릴 때 해당 음악의 가로 길이
  currentTime, // progressBar 위에 마우스가 올릴 때 해당 음악의 시간
}: Props) {
  // 현재 모달창이 열렸는지 여부
  const [openModal, setOpenModal] = useState(true);
  // progressBar 위에 마우스가 있는지
  const [isMouseMoveActive, setIsMouseMoveActive] = useState(false);
  const [modalClientY, setModalClientY] = useState();

  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { isPlaying, showMusicDetail, currentMusic } = currentMusicAndTrack;
  const { imageUri, composer } = currentMusic;
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달창 닫기
  const handleClose = () => {
    if (!modalClientY) return;
    if (modalClientY > 500) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (!openModal) {
      // 모달이 닫힌 후 수행할 작업
      setTimeout(() => {
        setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: false }));
      }, 150);
    }
  }, [openModal, setCurrentMusicAndTrack]);

  // 모달창 영역 밖을 클릭하면 모달창 닫힘
  useCloseModal({ modalRef, state: showMusicDetail, setState: setOpenModal }); // hook

  return (
    <>
      <S.MusicDetailModalBlock>
        <S.MusicDetailBox
          ref={modalRef}
          $openModal={openModal}
          drag="y"
          onDrag={(e: any) => setModalClientY(e.clientY)}
          onDragEnd={handleClose}
          dragConstraints={{ top: 0, bottom: 0 }}
        >
          <S.MusicDetail>
            {/* 닫기 버튼 */}
            <S.CloseBtnBox>
              <button onClick={() => setOpenModal(false)} className="close-btn">
                <div className="close" />
              </button>
            </S.CloseBtnBox>

            {/* 음악 제목 => MusicTitle 컴포넌트 */}
            <MusicTitle />
            {/* 음악 이미지 */}
            <LazyLoadImage effect="blur" width="100%" height={340} className="image" src={imageUri} alt="album image" />
            {/* 출처 => MusicCopyright 컴포넌트 */}
            <MusicCopyright />
            {/* 저작권자 */}
            <S.Composer>
              <p className="composer">{composer}</p>
            </S.Composer>
            {/* 프로그레스바 */}
            <S.ProgressBarBox
              onMouseMove={(e) => {
                handleProgressBar(e, 'hover');
                setIsMouseMoveActive(true);
              }}
              onMouseLeave={() => setIsMouseMoveActive(false)}
              onClick={(e) => handleProgressBar(e, 'click')}
              $progressBarWidth={progressBarWidth}
              $currentTimeWidth={currentTimeWidth}
            >
              <div className="progressbar" />
              {isMouseMoveActive && (
                <div className="hover-time">
                  <p>{formatTime(currentTime)}</p>
                </div>
              )}
            </S.ProgressBarBox>
            {/* 음악 시간 - 현재 재생 시간, 총 음악 시간 */}
            <S.MusicTime>
              <p>{formatTime(currentDuration)}</p>
              <p>{formatTime(totalDuration)}</p>
            </S.MusicTime>

            {/* 음악 컨트롤 */}
            <S.Controls>
              {/* 이전 곡 재생 - 곡 재생 ,일시 정지 - 다음 곡 */}
              <S.PlayBox>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handlePrevNextMusic('prev')}>
                  <i className="i-back-music" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleTogglePlay()} className="play-btn">
                  {isPlaying ? (
                    <MusicPauseSvg width={42} height={44} fill="#283437" />
                  ) : (
                    <i className="i-play" />
                  )}
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handlePrevNextMusic()}>
                  <i className="i-next-play" />
                </motion.button>
              </S.PlayBox>

              {/* 음악 루프 설정, 음악 셔플 모드, soundtrack으로 이동 => PlaymodeMenu 컴포넌트 */}
              <PlaymodeMenu setOpenModal={setOpenModal} />
            </S.Controls>
          </S.MusicDetail>
        </S.MusicDetailBox>
      </S.MusicDetailModalBlock>
    </>
  );
}

export default MusicDetailModal;
