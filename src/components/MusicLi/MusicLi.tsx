'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { MusicData } from 'src/types/musicTypes';
import useMusicPlay from 'src/hook/useMusicPlay';
import userState from 'src/atom/userState';
import * as S from 'src/styled/musicLiStyled';
import MoreSvg from '../../../public/more.svg';

import AddToPlaylistModal from './AddToPlaylistModal';

interface Props {
  el: MusicData;
}

function MusicLi({ el }: Props) {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const { isLoggedIn } = useRecoilValue(userState); // 리코일
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
  };

  return (
    <S.MusicLiBlock>
      <div className="music-content">
        <div className="details-box">
          <Image
            onClick={() => handleMusicPlay(el)}
            className="image"
            width={49}
            height={49}
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

        {/* 더보기 */}
        {isLoggedIn && (
          <S.MoreBox>
            <button aria-label="더보기" onClick={() => setShowAddToPlaylistModal(true)}>
              <MoreSvg width={19} height={4} fill="#62686A" />
            </button>
            {/* 플레이리스트에 음악 추가하는 모달 => AddToPlaylistModal 컴포넌트 */}
            {showAddToPlaylistModal && (
              <AddToPlaylistModal
                el={el}
                showAddToPlaylistModal={showAddToPlaylistModal}
                setShowAddToPlaylistModal={setShowAddToPlaylistModal}
              />
            )}
          </S.MoreBox>
        )}
      </div>
    </S.MusicLiBlock>
  );
}

export default MusicLi;
