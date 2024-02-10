import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import * as S from 'src/styled/authStyled';
import { updateMusicImg } from 'src/firebase/music';
import albumDefaultImg from 'src/assets/jpg-file/album-default.jpg';
import uploadImage from 'src/firebase/image';
import { auth } from 'src/firebase/config';

function ChangeMusicImg() {
  const [uuid, setUuid] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUri, setImageUri] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageUri !== '') {
      updateMusicImg({ uuid, imageUri });
      setUuid('');
      setImageUri('');
      setImageFile(null);
    }
  }, [imageUri, uuid]);

  const handleSubmit = () => {
    if (uuid !== '' && imageFile) {
      const props = {
        file: imageFile,
        setState: setImageUri,
        path: 'music_image',
        uuid,
      };
      uploadImage(props);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const user = auth.currentUser;
    if (user && files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
    }
  };

  return (
    <>
      <H3>앨범 이미지 수정</H3>
      <S.InputBox>
        <input
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          type="text"
          placeholder="음악 uuid 입력"
          autoComplete="off"
          required
        />
      </S.InputBox>

      <InputImg onChange={handleImage} ref={imageRef} accept="image/jpeg, image/png" type="file" />
      <AlbumFile>
        <div className="album-file-box">
          <FileTxt>앨범 이미지</FileTxt>
          <FileBtn onClick={() => imageRef.current?.click()}>
            <i className="i-plus-small" />
          </FileBtn>
        </div>
        <Image
          width={147}
          height={147}
          src={imageFile ? URL.createObjectURL(imageFile) : albumDefaultImg}
          alt="album image"
          className="album-img"
        />
      </AlbumFile>
      <S.SubmitBtn onClick={handleSubmit}>앨범 이미지 수정</S.SubmitBtn>
    </>
  );
}

export default ChangeMusicImg;

const H3 = styled.h3`
  color: var(--dark-blue-900);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 28px 0 30px 0;
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

const InputImg = styled.input`
  display: none;
`;
