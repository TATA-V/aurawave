'use client';

import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import playlistDataState from 'src/atom/playlistDataState';
import { setUserPlaylistDoc, updatePlaylistDoc } from 'src/firebase/playlist';
import uploadImage from 'src/firebase/image';
import formatDateToYYYYMMDD from 'src/utils/formatDateToYYYYMMDD';
import compressImage from 'src/utils/compressImage';
import { updateUserPlaylists } from 'src/firebase/user';
import { auth } from 'src/firebase/config';
import { motion } from 'framer-motion';
import userState from 'src/atom/userState';
import useToast from 'src/hook/useToast';

interface Props {
  loading?: boolean;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
}

function PlaylistGoBackHead({ loading, setLoading }: Props) {
  const [rightTxt, setRightTxt] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { username } = useRecoilValue(userState); // 리코일
  const { isEdit, isPublic, uuid, playlistImageUri, playlistTitle, description, musicList } = playlistData;
  const resetPlaylistDataState = useResetRecoilState(playlistDataState); // 리코일
  const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
  const router = useRouter();
  const pathname = usePathname();
  const user = auth.currentUser;
  const myPlaylistId = useSearchParams().get('id');
  const { successToast, errorToast } = useToast();

  // 오른쪽 글자
  useEffect(() => {
    if (pathname === '/playlist-editor') {
      setRightTxt('저장');
    } else {
      setRightTxt('닫기');
    }
  }, [pathname]);

  const submit = async () => {
    const isValid = uuid !== ''
    && description.trim() !== ''
    && musicList.length !== 0;
    if (imageUri === '' && setLoading && !isEdit) {
      errorToast('이미지를 추가해주세요.');
      setLoading(false);
      return;
    }
    if (!isValid && setLoading) {
      errorToast('플레이리스트 설명과 노래를 추가해주세요.');
      setLoading(false);
      return;
    }
    if (!user) return;
    const image = imageUri !== '' ? imageUri : playlistImageUri;
    const playlistData = {
      uuid,
      userUuid: user?.uid,
      username,
      date: formatDateToYYYYMMDD(),
      isPublic,
      playlistImageUri: image,
      playlistTitle,
      description,
      musicList,
    };
    // firestore에 저장
    const playlist = async () => {
      if (isEdit) {
        await updatePlaylistDoc({ uuid, playlistData });
        successToast('플레이리스트가 수정되었습니다.');
      } else {
        await setUserPlaylistDoc({ uuid, playlistData }); // user_playlist에 플레이리스트 등록
        await updateUserPlaylists({ uuid: user.uid, playlistData }); // 유저 정보에 등록한 플레이리스트 추가
        successToast('플레이리스트가 추가되었습니다.');
      }
    };
    playlist();
    resetPlaylistDataState();
    const id = uuidv4(); // uuid 생성
    setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));

    if (setLoading) {
      setLoading(false);
    }
    router.push(`my-playlist/${uuid}`);
  };

  // 뒤로가기
  const handleGoBack = () => {
    if (pathname === '/playlist-editor') {
      resetPlaylistDataState();
      const id = uuidv4(); // uuid 생성
      setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
    }
    router.back();
  };

  useEffect(() => {
    if (imageUri !== '') {
      submit();
    }
  }, [imageUri]);

  // 오른쪽 버튼 클릭 시
  const handleRightBtnClick = async () => {
    if (rightTxt === '저장') {
      // File 형식의 이미지에서 URI를 추출
      if (playlistImageUri instanceof File && setLoading) {
        setLoading(true);
        const compressFile = await compressImage(playlistImageUri); // 이미지 압축
        const props = {
          file: compressFile,
          setState: setImageUri,
          path: 'user_playlist_image',
          uuid,
        };
        await uploadImage(props);
      }
      if (isEdit && imageUri === '') {
        submit();
      }
    }

    if (rightTxt === '닫기') {
      router.push('/playlist-editor');
    }
  };

  return (
    <GoBackHeadBlok>
      <motion.div whileTap={{ scale: 0.9 }} onClick={handleGoBack} role="button" className="back-btn">
        <i className="i-back" />
      </motion.div>

      <Title>{myPlaylistId ? '플레이리스트 수정' : '새 플레이리스트 추가'}</Title>

      <RightBox>
        <button disabled={loading} onClick={handleRightBtnClick} className="right-btn">
          {rightTxt}
        </button>
      </RightBox>
    </GoBackHeadBlok>
  );
}

export default PlaylistGoBackHead;

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
