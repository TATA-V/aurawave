'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { MusicData } from 'src/types/musicTypes';
import playlistDataState from 'src/atom/playlistDataState';
import useMusicPlay from 'src/hook/useMusicPlay';
import * as S from 'src/styled/musicLiStyled';

interface Props {
  el: MusicData;
}
function AddMusicMusicLi({ el }: Props) {
  const [isInPlaylist, setIsInPlaylist] = useState(false);
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { musicList } = playlistData;
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook

  useEffect(() => {
    const inPlaylist = musicList.some((music) => music.uuid === el.uuid);
    setIsInPlaylist(inPlaylist);
  }, [musicList, el.uuid]);

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
  };

  const handleAddMusic = () => {
    if (isInPlaylist) {
      // 플레이리스트에서 음악을 삭제
      const removeMusic = musicList.filter((music) => music.uuid !== el.uuid);
      setPlaylistData((prev) => ({ ...prev, musicList: removeMusic }));
    } else {
      // 플레이리스트에 음악을 추가
      setPlaylistData((prev) => ({ ...prev, musicList: [...prev.musicList, el] }));
    }
    setIsInPlaylist(!isInPlaylist);
  };

  return (
    <S.MusicLiBlock>
      <div className="music-content">
        <div className="details-box">
          <Image
            onClick={() => handleMusicPlay(el)}
            className="image"
            width={50}
            height={50}
            src={imageUri}
            alt="recommended music"
          />
          <p className="details">
            <span onClick={() => handleMusicPlay(el)} className="title">
              {title}
            </span>
            <br />
            <span onClick={() => handleMusicPlay(el)} className="composer">
              {composer}
            </span>
          </p>
        </div>

        {/* 플레이리스트에서 해당 음악 삭제 */}
        <DeleteBtn onClick={handleAddMusic} $isInPlaylist={isInPlaylist}>
          <i className="i-music-plus" />
        </DeleteBtn>
      </div>
    </S.MusicLiBlock>
  );
}

export default AddMusicMusicLi;

interface IsInPlaylist {
  $isInPlaylist: boolean;
}

export const DeleteBtn = styled.button<IsInPlaylist>`
  display: flex;
  justify-content: center;
  align-items: center;

  .i-music-plus {
    font-size: 20px;

    &::before {
      color: ${({ $isInPlaylist }) => ($isInPlaylist ? 'var(--fl-blue-500)' : 'var(--sky-blue-300)')};
    }
  }
`;
