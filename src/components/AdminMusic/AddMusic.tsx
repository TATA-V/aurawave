'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp } from 'firebase/firestore';
import * as S from 'src/styled/authStyled';
import albumDefaultImg from 'src/assets/jpg-file/album-default.jpg';
import { auth, storage } from 'src/firebase/config';
import { setMusicDoc } from 'src/firebase/music';

function AddMusic() {
  const [progress, setProgress] = useState(0);
  const [uuid, setUuid] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [musicUri, setMusicUri] = useState('');
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [copyright, setCopyright] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);
  const musicRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = uuidv4(); // uuid 생성
    setUuid(id);
  }, []);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const user = auth.currentUser;
    if (user && files && files.length > 0) {
      const file = files[0];
      const metadata = { contentType: file.type };
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
      const isAudio = file.type === 'audio/mpeg';
      let path = '';

      // 이미지 파일이라면
      if (isImage) {
        path = 'music_image';
      } else if (isAudio) {
        // 음악 파일이라면
        path = 'music_audio';
      }

      const uploadTask = uploadBytesResumable(
        ref(storage, `${path}/${uuid}`), // 저장 경로
        file, // 이미지 파일
        metadata, // 파일 타입
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (isAudio) {
            setProgress(progress);
          }
          // console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              // console.log('Upload is paused');
              break;
            case 'running':
              // console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;

            default:
              break;
          }
        },
        () => {
          // 업로드가 성공적으로 완료
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (isImage) {
              setImageUri(downloadURL);
            } else if (isAudio) {
              setMusicUri(downloadURL);
            }
          });
        },
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const isValid = imageUri !== '' && musicUri !== '' && title !== '' && composer !== '' && copyright !== '';
    const musicData = {
      uuid,
      imageUri,
      musicUri,
      title,
      composer,
      copyright,
      timestamp: serverTimestamp(),
    };
    if (isValid) {
      // firestore에 저장
      try {
        await setMusicDoc({ uuid, musicData });
        // 비워주기
        setProgress(0);
        setImageUri('');
        setMusicUri('');
        setTitle('');
        setComposer('');
        setCopyright('');
        const id = uuidv4(); // 새로운 uuid 생성
        setUuid(id);
      } catch (error) {
        alert('음악 등록 중에 문제가 발생했습니다.');
      }
    }
  };

  return (
    <AddMusicBlock>
      <H3>음악 등록</H3>

      <input
        onChange={handleUploadImage}
        ref={musicRef}
        className="music-input"
        accept="audio/mp3"
        type="file"
      />
      <MusicFile>
        <FileTxt>음악 파일</FileTxt>
        <FileBtn onClick={() => musicRef.current?.click()}>
          <i className="i-plus-small" />
        </FileBtn>
        <p className="upload-progress">
          {progress !== 0 ? `${progress}%` : null} {progress === 100 ? 'upload successful!' : null}
        </p>
      </MusicFile>

      <S.InputBox>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="margin-top"
          type="text"
          placeholder="음악 제목 입력"
          autoComplete="off"
        />
        <input
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
          className="margin-top"
          type="text"
          placeholder="음악 작곡자 입력"
          autoComplete="off"
        />
        <input
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          className="margin-top"
          type="text"
          placeholder="출처 입력"
          autoComplete="off"
        />
      </S.InputBox>

      <input
        onChange={handleUploadImage}
        ref={imageRef}
        className="image-input"
        accept="image/jpeg, image/png"
        type="file"
      />
      <AlbumFile>
        <div className="album-file-box">
          <FileTxt>앨범 이미지</FileTxt>
          <FileBtn onClick={() => imageRef.current?.click()}>
            <i className="i-plus-small" />
          </FileBtn>
        </div>
        <Image
          width={150}
          height={150}
          src={imageUri !== '' ? imageUri : albumDefaultImg}
          alt="album image"
          className="album-img"
        />
      </AlbumFile>
      <S.SubmitBtn onClick={handleSubmit}>음악 등록</S.SubmitBtn>
    </AddMusicBlock>
  );
}

export default AddMusic;

const AddMusicBlock = styled.div`
  .music-input,
  .image-input {
    display: none;
  }
`;

const MusicFile = styled.div`
  padding-bottom: 5px;
  display: flex;
  align-items: center;

  .upload-progress {
    color: var(--blue-gray-600);
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const AlbumFile = styled.div`
  padding: 13px 0 3px 0;
  display: flex;

  .album-file-box {
    height: 20px;
    display: flex;
    align-items: center;
  }

  .album-img {
    width: 147px;
    height: 147px;
    border: 1.5px solid var(--gray-100);
    border-radius: 5px;
    transform: translateX(45px);
    object-fit: cover;
  }
`;

const FileTxt = styled.p`
  color: var(--dark-blue-700);
  font-size: 0.875rem;
  font-weight: 400;
`;

const FileBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid var(--sky-blue-450);
  border-radius: 3px;
  margin: 0 9px 0 9px;
  background-color: var(--sky-blue-400);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.07);
  }

  .i-plus-small {
    font-size: 10px;
  }
`;

const H3 = styled.h3`
  color: var(--dark-blue-900);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 28px 0 30px 0;
`;
