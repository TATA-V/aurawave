'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';
import userState from 'src/atom/userState';
import crayonPng from 'src/assets/png-file/crayon-line.png';
import { auth } from 'src/firebase/config';
import currentTrackState from 'src/atom/currentTrackState';
import useToast from 'src/hook/useToast';

import CustomModal from 'src/components/CustomModal/CustomModal';

function LogoutAndDeleteAccount() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useRecoilValue(userState); // 리코일
  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState); // 리코일
  const { successToast, errorToast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      resetCurrentMusicAndTrack();
      successToast('로그아웃 되었습니다.');
      router.replace('/login');
    } catch (error) {
      errorToast('로그아웃 도중에 문제가 발생했습니다.');
    }
  };

  return (
    <LogoutAndDeleteAccountBlock>
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-box">
          <i className="i-logout-circle" />
          <p className="logout-txt">로그아웃</p>
        </button>
      )}
      <Image width={540} height={327.69} className="crayon-img" src={crayonPng} alt="crayon line" priority />

      {isLoggedIn && (
        <button onClick={() => setOpenModal(true)} className="delete-box">
          <span className="delete-txt">탈퇴하기</span>
        </button>
      )}

      {/* 탈퇴하기 모달 => CustomModal 컴포넌트 */}
      <CustomModal open={openModal} setOpen={setOpenModal} type="탈퇴" />
    </LogoutAndDeleteAccountBlock>
  );
}

export default LogoutAndDeleteAccount;

const LogoutAndDeleteAccountBlock = styled.div`
  padding-top: 15px;

  .logout-box {
    padding: 0 25px 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .i-logout-circle {
    color: var(--blue-gray-750);
    font-size: 12.54px;
  }

  .logout-txt {
    color: var(--blue-gray-750);
    padding: 1.24px 0 0 5.46px;
    font-size: 0.6875rem;
    display: flex;
    align-items: center;
    margin-top: -3px;
  }

  .crayon-img {
    width: 100%;
    height: auto;
    padding-top: 12px;
  }

  .delete-box {
    width: 100%;
    padding: 0 25px 10px 25px;
    display: flex;
    justify-content: end;
  }

  .delete-txt {
    color: var(--blue-gray-700);
    font-size: 0.6875rem;
    transform: translateY(-22px);
  }
`;
