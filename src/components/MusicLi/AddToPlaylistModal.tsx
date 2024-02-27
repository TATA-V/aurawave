'use clinet';

import { usePathname, useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Link from 'next/link';
import { MusicData } from 'src/types/musicTypes';
import useCloseModal from 'src/hook/useCloseModal';
import currentTrackState from 'src/atom/currentTrackState';
import { motion } from 'framer-motion';
import { getUserInfo } from 'src/firebase/user';
import { auth } from 'src/firebase/config';
import { UserPlaylistData } from 'src/types/playlistTypes';
import { addOneMusicToPlaylist, deleteOneMusicToPlaylist } from 'src/firebase/playlist';
import useToast from 'src/hook/useToast';
import myPlaylistState from 'src/atom/myPlaylistState';

interface Props {
  el: MusicData;
  top?: string;
  showAddToPlaylistModal: boolean;
  setShowAddToPlaylistModal: (value: boolean) => void;
}
function AddToPlaylistModal({ el, top, showAddToPlaylistModal, setShowAddToPlaylistModal }: Props) {
  const [playlists, setPlaylists] = useState<UserPlaylistData[] | undefined>([]);
  const setMyPlaylist = useSetRecoilState(myPlaylistState);
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { playMode, currentMusic, currentTrack, suffleTrack, showMusicDetail } = currentMusicAndTrack;

  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const paths = pathname.split('/');
  const isMyPlaylistPage = paths[1] === 'my-playlist';
  const { errorToast, successToast } = useToast();
  const user = auth.currentUser;
  const { myPlaylistId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    getUserInfo(user.uid).then((data) => {
      if (!data) return;
      setPlaylists(data.playlists);
    });
  }, []);

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

  const handleAddMusicToPlaylist = async (uuid: string) => {
    const exist = await addOneMusicToPlaylist(uuid, el);
    if (exist) {
      errorToast('이미 재생 목록에 추가된 음악입니다.');
      return;
    }
    successToast('재생목록에 음악을 추가했습니다.');
  };

  const handleDeleteFromMyPlaylist = async () => {
    if (!user) return;
    try {
      const data = await deleteOneMusicToPlaylist(String(myPlaylistId), el);
      setMyPlaylist((prev) => ({ ...prev, musicList: data }));
      setShowAddToPlaylistModal(false);
      successToast('플레이리스트에서 1곡을 삭제했습니다.');
    } catch (err) {
      errorToast('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddNewPlaylist = () => {
    if (showMusicDetail) {
      setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: false }));
    }
    router.push('/playlist-editor');
  };

  return (
    <Container
      $top={top}
      initial={{ scale: 0, transformOrigin: '100% 0%' }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
    >
      <AddToPlaylistModalBlock ref={modalRef}>
        {isMyPlaylistPage && (
          <ModalTitle onClick={handleDeleteFromMyPlaylist}>
            <p className="delete-music">내 플레이리스트에서 삭제</p>
          </ModalTitle>
        )}

        <ModalTitle>
          <p className="add-music">내 플레이리스트에 추가</p>
        </ModalTitle>

        <AddToPlaylistUl>
          {playlists && playlists.map((item, idx) => (
            <AddToPlaylistLi onClick={() => handleAddMusicToPlaylist(item.uuid)} key={idx} $num={idx + 1} whileTap={{ scale: 0.9 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="playlist-box">
                <i className="i-plus-music-circle" />
                <p className="playlist-title">{item.playlistTitle}</p>
              </div>
            </AddToPlaylistLi>
          ))}
        </AddToPlaylistUl>
        <AddNewPlaylistBtn onClick={handleAddNewPlaylist} whileTap={{ scale: 0.9 }}>
          <i className="i-plus-circle" />
          <p className="add-new-playlist">새 플레이리스트 추가</p>
        </AddNewPlaylistBtn>
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
  top: ${({ $top }) => ($top ? `${$top}px` : '28px')};
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

const AddToPlaylistLi = styled(motion.li)<Num>`
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

const AddNewPlaylistBtn = styled(motion.button)`
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
