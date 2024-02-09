'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp } from 'firebase/firestore';
import { bubblegum } from 'src/fonts/fonts';
import playlistDataState from 'src/atom/playlistDataState';
import { setAwPlaylistDoc } from 'src/firebase/playlist';
import uploadImage from 'src/firebase/image';
import formatDateToYYYYMMDD from 'src/utils/formatDateToYYYYMMDD';

function AwPlaylistGoBackHead() {
  const [loading, setLoading] = useState(false);
  const [rightTxt, setRightTxt] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { uuid, playlistImageUri, playlistTitle, description, musicList } = playlistData;
  const resetPlaylistDataState = useResetRecoilState(playlistDataState); // 리코일
  const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
  const router = useRouter();
  const pathname = usePathname();

  // 오른쪽 글자
  useEffect(() => {
    if (pathname === '/admin-awplaylist-editor') {
      setRightTxt('저장');
    } else {
      setRightTxt('닫기');
    }
  }, [pathname]);

  // 저장 버튼 눌리면 동작
  useEffect(() => {
    const isValid = uuid !== ''
      && imageUri !== ''
      && playlistTitle.trim() !== ''
      && description.trim() !== ''
      && musicList.length !== 0;
    // firestore에 저장
    if (isValid) {
      const awplaylistData = {
        uuid,
        playlistImageUri: imageUri,
        playlistTitle,
        description,
        musicList,
        timestamp: serverTimestamp(),
      };
      setAwPlaylistDoc({ uuid, awplaylistData });
      resetPlaylistDataState();
      const id = uuidv4(); // uuid 생성
      setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
      setLoading(false);
    }
  }, [
    router,
    uuid,
    description,
    imageUri,
    musicList,
    playlistTitle,
    formattedDate,
    setPlaylistData,
    resetPlaylistDataState,
  ]);

  // 뒤로가기
  const handleGoBack = () => {
    router.back();
    if (pathname === '/admin-awplaylist-editor') {
      resetPlaylistDataState();
      const id = uuidv4(); // uuid 생성
      setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
    }
  };

  // 오른쪽 버튼 클릭 시
  const handleRightBtnClick = () => {
    if (rightTxt === '저장') {
      // File 형식의 이미지에서 URI를 추출
      if (playlistImageUri instanceof File) {
        setLoading(true);
        const props = {
          file: playlistImageUri,
          setState: setImageUri,
          path: 'aw_playlist_image',
          uuid,
        };
        uploadImage(props);
      }
    }

    if (rightTxt === '닫기') {
      router.back();
    }
  };

  return (
    <GoBackHeadBlok>
      <div onClick={handleGoBack} role="button" className="back-btn">
        <i className="i-back" />
      </div>
      <Title>
        <span className={`aw-txt ${bubblegum.className}`}>AW</span> 플레이리스트 등록
      </Title>

      <RightBox>
        <button disabled={loading} onClick={handleRightBtnClick} className="right-btn">
          {rightTxt}
        </button>
      </RightBox>
    </GoBackHeadBlok>
  );
}

export default AwPlaylistGoBackHead;

const GoBackHeadBlok = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 540px;
  height: 61px;
  background-color: var(--white-100);
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .back-btn {
    width: 63px;
    height: 61px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .i-back {
    font-size: 18;

    &::before {
      color: var(--dark-blue-900);
    }
  }
`;

const Title = styled.p`
  color: var(--dark-blue-900);
  font-size: 1.09375rem;
  font-weight: 600;

  .aw-txt {
    font-size: 1.1875rem;
    font-weight: 400;
  }
`;

const RightBox = styled.div`
  width: 63px;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;

  .right-btn {
    color: var(--sky-blue-400);
    font-size: 1rem;
    font-weight: 400;
  }
`;
