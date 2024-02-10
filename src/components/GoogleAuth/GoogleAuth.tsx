'use client';

import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { auth } from 'src/firebase/config';
import { setUserDoc } from 'src/firebase/user';
import userState from 'src/atom/userState';
import GoogleSvg from '../../../public/googleSvg.svg';

function GoogleAuth() {
  const provider = new GoogleAuthProvider();
  const setUserState = useSetRecoilState(userState); // 리코일
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, provider);
    const user = auth.currentUser;

    if (user) {
      const { uid, email, displayName, photoURL } = user;
      // 리코일에 유저정보 저장
      if (auth.currentUser) {
        setUserState((data) => ({
          ...data,
          username: displayName,
          photoURL,
          isLoggedIn: true,
        }));
      }
      router.replace('/');

      // firestore에 유저 정보 저장
      if (uid !== null && displayName !== null && email !== null && photoURL !== null) {
        const userData = {
          uuid: uid,
          email,
          username: displayName,
          photoURL,
        };
        setUserDoc({ uuid: uid, userData });
      }
    }
  };

  return (
    <GoogleAuthBlock>
      <GoogleBtn onClick={handleGoogleLogin} className="w-[180px] md:w-[220px] gap-3">
        <GoogleSvg />
        <p className="signin-txt">Sign in with Google</p>
      </GoogleBtn>
    </GoogleAuthBlock>
  );
}

export default GoogleAuth;

const GoogleAuthBlock = styled.div`
  padding-top: 22.5px;
  display: flex;
  justify-content: center;
`;

const GoogleBtn = styled.button`
  height: 43px;
  padding: 0 15px 0 15px;
  border: 1px solid var(--gray-100);
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  .signin-txt {
    color: var(--dark-blue-650);
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
