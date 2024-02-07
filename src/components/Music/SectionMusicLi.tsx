'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { MusicData } from 'src/types/musicTypes';
import useMusicPlay from 'src/hook/useMusicPlay';
import userState from 'src/atom/userState';
import * as S from 'src/styled/musicLiStyled';

interface Props {
  el: MusicData;
}

function SectionMusicLi({ el }: Props) {
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
      </div>
    </S.MusicLiBlock>
  );
}

export default SectionMusicLi;
