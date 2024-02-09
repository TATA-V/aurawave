'use clinet';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Link from 'next/link';
import { MusicData } from 'src/types/musicTypes';
import useCloseModal from 'src/hook/useCloseModal';
import currentTrackState from 'src/atom/currentTrackState';
import { motion } from 'framer-motion';

/**
 * 상위에서 쓰이고 있는 useState
 * const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
 */

// 임시 데이터
const data = [
  {
    id: 1,
    playlistTitle: '여행가서 들으면 좋은 노래 모음',
  },
  {
    id: 2,
    playlistTitle: '새벽 감성 노래 모음',
  },
  {
    id: 3,
    playlistTitle: '꽃향기를 닮은 음악',
  },
  {
    id: 4,
    playlistTitle: '주인장이 좋아하는 감성 힙합',
  },
  {
    id: 5,
    playlistTitle: '우주를 여행하는 기분',
  },
];

interface Props {
  el: MusicData;
  top?: string;
  showAddToPlaylistModal: boolean;
  setShowAddToPlaylistModal: (value: boolean) => void;
}
function AddToPlaylistModal({ el, top, showAddToPlaylistModal, setShowAddToPlaylistModal }: Props) {
  const [soundtrackPage, setSoundtrackPage] = useState(false);
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { playMode, showMusicDetail, currentMusic, currentTrack, suffleTrack } = currentMusicAndTrack;

  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 현재 페이지가 soundtrack이라면
  useEffect(() => {
    if (pathname === '/soundtrack') {
      setSoundtrackPage(true);
    }
  }, [pathname]);

  // 모달창 영역 밖을 클릭하면 모달창 닫힘
  useCloseModal({ modalRef, state: showAddToPlaylistModal, setState: setShowAddToPlaylistModal }); // hook

  // 현재 재생목록에서 음악 삭제
  const handleDeleteMusic = () => {
    const deleteMatchCurrent = el.uuid === currentMusic.uuid;
    const musicTrack = playMode === 'shuffle' ? suffleTrack : currentTrack;
    const deleteIndex = musicTrack.findIndex((track) => track.uuid === el.uuid);

    // 재생목록에서 삭제하는 음악이 현재 재생 중인 음악과 같다면
    // 현재 재생 중인 곡을 다음 곡으로 바꿈
    if (deleteMatchCurrent) {
      const nextIndex = deleteIndex === musicTrack.length - 1 ? 0 : deleteIndex + 1;
      setCurrentMusicAndTrack((prev) => ({
        ...prev,
        currentMusic: musicTrack[nextIndex],
      }));
    }

    const newCurrnetTrack = currentTrack.filter((track) => track.uuid !== el.uuid);
    const newSuffleTrack = suffleTrack.filter((track) => track.uuid !== el.uuid);
    setCurrentMusicAndTrack((prev) => ({
      ...prev,
      currentTrack: newCurrnetTrack,
      suffleTrack: newSuffleTrack,
    }));
  };

  return (
    <Container
      $top={top}
      initial={{ scale: 0, transformOrigin: '100% 0%' }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', duration: 0.7 }}
    >
      <AddToPlaylistModalBlock ref={modalRef}>
        {soundtrackPage && !showMusicDetail && (
          <ModalTitle onClick={handleDeleteMusic}>
            <p className="delete-music">현재 재생목록에서 삭제</p>
          </ModalTitle>
        )}
        <ModalTitle>
          <p className="add-music">내 플레이리스트에 추가</p>
        </ModalTitle>

        <AddToPlaylistUl>
          {data.map((el) => (
            <AddToPlaylistLi key={el.id} $num={el.id}>
              <div className="playlist-box">
                <i className="i-plus-music-circle" />
                <p className="playlist-title">{el.playlistTitle}</p>
              </div>
            </AddToPlaylistLi>
          ))}
        </AddToPlaylistUl>
        <AddNewPlaylist>
          <StyledLink href="/playlist-editor">
            <i className="i-plus-circle" />
            <p className="add-new-playlist">새 플레이리스트 추가</p>
          </StyledLink>
        </AddNewPlaylist>
      </AddToPlaylistModalBlock>
    </Container>
  );
}

export default AddToPlaylistModal;

interface Num {
  $num: number;
}

interface Top {
  $top: string | undefined;
}

const Container = styled(motion.div)<Top>`
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top}px` : '18px')};
  right: 0;
  width: 130px;
  padding-bottom: 65px;
  z-index: 1;
`;

const AddToPlaylistModalBlock = styled.div`
  padding-left: 5px;
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(16, 29, 33, 0.05);
  background-color: var(--white-100);
`;

const ModalTitle = styled.div`
  width: 120px;
  height: 38px;
  border-bottom: 1px solid var(--gray-50);
  margin-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: var(--dark-blue-800);
    font-size: 0.65rem;
    font-weight: 500;
    padding-top: 1px;
  }

  .delete-music {
    cursor: pointer;
  }
  .add-music {
    user-select: none;
  }
`;

const AddToPlaylistUl = styled.ul`
  max-height: 140px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #ccc;
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    bottom: 10px;
  }
`;

const AddToPlaylistLi = styled.li<Num>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ $num }) => ($num === 1 ? '2px' : '0')};

  .playlist-box {
    width: 110px;
    height: 35px;
    padding: 0 2px 0 2px;
    border-bottom: 1px solid var(--gray-50);

    display: flex;
    align-items: center;
  }

  .i-plus-music-circle {
    color: var(--dark-blue-700);
    font-size: 14.5px;
  }

  .playlist-title {
    color: var(--dark-blue-700);
    font-size: 0.6rem;
    font-weight: 400;
    line-height: 0.75rem;
    padding-left: 4px;
    cursor: pointer;
  }
`;

const AddNewPlaylist = styled.div`
  width: 100%;
  height: 35px;
  padding-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  .i-plus-circle {
    color: var(--gray-300);
    font-size: 9.5px;
  }

  .add-new-playlist {
    color: var(--gray-300);
    font-size: 0.58rem;
    font-weight: 400;
    padding-left: 4px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;
