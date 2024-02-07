'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import userState from 'src/atom/userState';
import { auth } from 'src/firebase/config';
import * as S from 'src/styled/authStyled';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import GoogleAuth from 'src/components/GoogleAuth/GoogleAuth';

function Login() {
  const pwdRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const setUserInfo = useSetRecoilState(userState);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setUserState = useSetRecoilState(userState); // 리코일

  useEffect(() => {
    // 로그인 되어있지 않다면 리코일 상태 리셋
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUserInfo((data) => ({ ...data, username: '', photoURL: '', isLoggedIn: false }));
      }
    });
  }, [setUserInfo, router]);

  /* submit */
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      // 리코일에 유저정보 저장
      const user = auth.currentUser;
      if (user) {
        const { displayName, photoURL, email } = user;
        const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL; // admin 계정인지 확인
        setUserState((data) => ({
          ...data,
          username: displayName,
          photoURL,
          isLoggedIn: true,
          isAdmin,
        }));
      }
      router.replace('/');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('가입되지 않은 이메일이거나, 잘못된 비밀번호입니다.');
    }
  });

  // 다음 input으로 focus
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (nextInputRef === submitRef) {
        submitRef.current?.click();
      }
      nextInputRef.current?.focus();
    }
  };

  return (
    <>
      {/* 뒤로가기 => GoBackHead 컴포넌트 */}
      <GoBackHead />

      <S.LoginBlock>
        <S.AuthTextBox>
          <h1 className="auth-text">Login</h1>
          <p className="hi-text">안녕하세요, AuraWave입니다 :)</p>
        </S.AuthTextBox>

        <S.InputBox>
          {/* 이메일 */}
          <Controller
            control={control}
            rules={{ required: true, maxLength: 50, pattern: /^[\w]+@([\w]+\.)+[a-z]{2,4}$/ }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="email"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, pwdRef)}
                placeholder="이메일 입력"
              />
            )}
            name="email"
          />
          {errors.email && errors.email.type === 'required' && (
            <p className="error-txt">필수 입력 항목입니다.</p>
          )}
          {errors.email && errors.email.type === 'maxLength' && (
            <p className="error-txt">최대 50자 이하로 입력해주세요.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className="error-txt">올바른 이메일 형식이 아닙니다.</p>
          )}

          {/* 비밀번호 */}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
              pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                ref={pwdRef}
                type="password"
                className="margin-top"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, submitRef)}
                placeholder="비밀번호 입력"
                autoComplete="off"
              />
            )}
            name="password"
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="error-txt">필수 입력 항목입니다.</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p className="error-txt">최소 8자 이상으로 입력해주세요.</p>
          )}
          {errors.password && errors.password.type === 'pattern' && (
            <p className="error-txt">영문, 숫자, 특수문자 조합으로 8자리 이상 입력해주세요.</p>
          )}
        </S.InputBox>

        <S.SubmitBtn ref={submitRef} onClick={onSubmit} disabled={loading}>
          로그인
        </S.SubmitBtn>
        <S.StyledLink href="/signup">회원가입</S.StyledLink>

        {/* 구글 계정으로 로그인 */}
        <SnsLoginBox>
          <S.GrayLineTxtBox>
            <div className="gray-line-login" />
            <p className="sns-txt">SNS 계정으로 로그인</p>
            <div className="gray-line-login" />
          </S.GrayLineTxtBox>

          {/* 구글로 signin => GoogleAuth 컴포넌트 */}
          <GoogleAuth />
        </SnsLoginBox>
      </S.LoginBlock>
    </>
  );
}

export default Login;

const SnsLoginBox = styled.div`
  margin-top: 97px;
`;
