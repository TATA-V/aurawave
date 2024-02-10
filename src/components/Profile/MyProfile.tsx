'use client';

import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import Image from 'next/image';
import userState from 'src/atom/userState';
import { auth, storage } from 'src/firebase/config';
import { updateUserName, updateUserPhotoURL } from 'src/firebase/user';
import { motion } from 'framer-motion';
import compressImage from 'src/utils/compressImage';
import defaultProfileJpg from 'src/assets/jpg-file/default-profile.jpg';

function MyProfile() {
  const [openTextInput, setOpenTextInput] = useState(false);
  const [changeUsername, setChangeUsername] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userState); // 리코일
  const textInputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { username, photoURL, isLoggedIn } = userInfo;
  const user = auth.currentUser;

  // 닉네임 변경 버튼을 눌렀을 경우 textInputRef으로 바로 focus됨
  useEffect(() => {
    if (openTextInput && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [openTextInput]);

  const handleBlueBtnClick = () => {
    // 로그인 안 되어있을 땐 로그인 페이지로 이동
    if (!isLoggedIn) {
      return router.push('/login');
    }
    // 로그인이 되어있을 경우엔 닉네임 변경
    setOpenTextInput(!openTextInput);
  };

  // 닉네임 변경
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setOpenTextInput(false);
    const isValidUsername = changeUsername.length !== 0 && changeUsername.length < 21;
    // firebase 닉네임 변경해주기
    try {
      if (user && isValidUsername) {
        await updateProfile(user, { displayName: changeUsername });
        await updateUserName({ uuid: user.uid, username: changeUsername });
        setUserInfo((data) => ({ ...data, username: changeUsername }));
        setChangeUsername('');
      }
    } catch (error) {
      // console.log('닉네임 변경 실패:', error);
    }
  };

  /* 프로필 이미지 수정 */
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (user && files && files.length > 0) {
      const file = files[0];
      const metadata = { contentType: file.type };
      const compressFile = await compressImage(file); // 이미지 압축
      const uploadTask = uploadBytesResumable(
        ref(storage, `user_image/${user.uid}`), // 저장 경로
        compressFile, // 이미지 파일
        metadata, // 파일 타입
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            // 프로필 이미지 수정
            updateProfile(user, {
              photoURL: downloadURL,
            });
            // 리코일에 저장
            setUserInfo((data) => ({ ...data, photoURL: downloadURL }));

            // 파이어스토어 유저 이미지 수정하기
            updateUserPhotoURL({ uuid: user.uid, photoURL: downloadURL });
          });
        },
      );
    }
  };

  return (
    <MyProfileBlock>
      <LeftBox>
        <p className="name-text">{isLoggedIn ? username : '로그인 해주세요'}</p>
        <motion.button whileTap={{ scale: 0.9 }} className="login-changename-btn" onClick={handleBlueBtnClick}>
          {isLoggedIn ? '닉네임 변경' : '로그인'}
        </motion.button>
        {openTextInput && (
          <form className="input-form" onSubmit={handleSubmit}>
            <ChangeNameInput
              className="changename-input"
              defaultValue={changeUsername}
              type="text"
              ref={textInputRef}
              onBlur={() => setOpenTextInput(false)}
              onChange={(e) => setChangeUsername(e.target.value)}
              placeholder="2~20자 이하로 입력 후 Enter"
            />
            <button onClick={handleSubmit} className="submit-btn">
              <i className="i-submit" />
            </button>
          </form>
        )}
      </LeftBox>

      <RightBox>
        <Image
          width={86}
          height={86}
          src={isLoggedIn && photoURL !== null ? photoURL : defaultProfileJpg}
          alt="user profile"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAZEAADAQEBAAAAAAAAAAAAAAAAAQIDMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AptLtaUlVdfoAA//Z"
          className="profile-img"
        />

        {isLoggedIn && (
          <motion.div whileTap={{ scale: 0.9 }} className="file-box">
            <input
              onChange={handleUploadImage}
              accept="image/jpeg, image/png"
              ref={fileRef}
              type="file"
              className="file-input"
            />
            <i onClick={() => fileRef.current?.click()} className="i-pen-icon" />
          </motion.div>
        )}
      </RightBox>
    </MyProfileBlock>
  );
}

export default MyProfile;

const MyProfileBlock = styled.div`
  height: 172px;
  padding: 53px 20px 18px 20px;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  .name-text {
    color: var(--dark-blue-900);
    font-size: 1.5625rem;
    font-weight: 700;
  }

  .login-changename-btn {
    height: 22px;
    border: 1px solid var(--sky-blue-450);
    border-radius: 15px;
    padding: 4px 12px 3px 12px;
    margin: 9px 0 5px 0;
    background-color: var(--sky-blue-400);
    color: var(--white-100);
    font-size: 10px;
    font-weight: 400;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-form {
    width: 177px;
    position: relative;
  }

  .submit-btn {
    position: absolute;
    top: 8.5px;
    right: 9px;
  }
`;

const ChangeNameInput = styled.input`
  width: 100%;
  height: 28px;
  color: var(--dark-blue-800);
  font-size: 0.625rem;
  font-weight: 400;
  padding: 6px 26.5px 6px 12px;
  border: 1px solid var(--gray-100);
  border-radius: 5px;
  background-color: var(--gray-30);
  line-height: 28px;
  vertical-align: middle;

  &::placeholder {
    color: var(--gray-200);
  }

  &:focus {
    outline: none;
  }
`;

const RightBox = styled.div`
  position: relative;

  .file-input {
    display: none;
  }

  .file-box {
    position: relative;
    width: 23px;
    height: 23px;
    left: 60px;
    bottom: 25px;
  }

  .i-pen-icon {
    width: 23px;
    height: 23px;
    background-color: #fff;
    border: 1px solid var(--gray-100);
    border-radius: 50%;
    color: var(--dark-blue-800);
    font-size: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }

  .profile-img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
