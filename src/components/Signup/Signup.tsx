'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as S from 'src/styled/authStyled';
import { auth } from 'src/firebase/config';
import { setUserDoc } from 'src/firebase/user';
import useToast from 'src/hook/useToast';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import GoogleAuth from 'src/components/GoogleAuth/GoogleAuth';

function Signup() {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const checkPwdRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { successToast, errorToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordsMatch = pwdRef.current?.value === checkPwdRef.current?.value;

  /* 일반 이메일으로 회원가입 */
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (passwordsMatch) {
        const { email, username, password } = data;
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, { displayName: username });

          // firestore에 유저 정보 저장
          const { uid, displayName, email } = user;
          if (uid !== null && displayName !== null && email !== null) {
            const userData = {
              uuid: uid,
              email,
              username: displayName,
            };
            setUserDoc({ uuid: uid, userData });
          }
        }

        successToast('회원가입이 완료되었습니다🎉');
        // 로그인 페이지 이동
        router.replace('/login');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast('회원가입에 실패했습니다. 다시 시도하세요.');
    }
  });

  // 다음 input으로 focus
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<HTMLInputElement | null> | React.RefObject<HTMLButtonElement | null>,
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

      <S.SignupBlock>
        <S.AuthTextBox>
          <h1 className="auth-text">Sign Up</h1>
          <p className="hi-text">안녕하세요, AuraWave입니다 :)</p>
        </S.AuthTextBox>

        <S.InputBox>
          <Controller
            control={control}
            rules={{ required: true, maxLength: 50, pattern: /^[\w]+@([\w]+\.)+[a-z]{2,4}$/ }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="email"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, nameRef)}
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

          {/* 닉네임 */}
          <Controller
            control={control}
            rules={{ required: true, pattern: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,20}$/ }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="text"
                ref={nameRef}
                className="margin-top"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, pwdRef)}
                placeholder="닉네임 입력"
              />
            )}
            name="username"
          />
          {errors.username && errors.username.type === 'required' && (
            <p className="error-txt">필수 입력 항목입니다.</p>
          )}
          {errors.username && errors.username.type === 'maxLength' && (
            <p className="error-txt">최대 20자 이하로 입력해주세요.</p>
          )}
          {errors.username && errors.username.type === 'pattern' && (
            <p className="error-txt">2자 이상 20자 이하의 영문, 숫자, 한글로 작성해주세요.</p>
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
                onKeyUp={(e) => handleInputKeyDown(e, checkPwdRef)}
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

          {/* 비밀번호 확인 */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                ref={checkPwdRef}
                type="password"
                className="margin-top"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, submitRef)}
                placeholder="비밀번호 확인"
                autoComplete="off"
              />
            )}
            name="checkPassword"
          />
          {errors.checkPassword && errors.checkPassword.type === 'required' && (
            <p className="error-txt">필수 입력 항목입니다.</p>
          )}
          {checkPwdRef.current?.value !== '' && !passwordsMatch && (
            <p className="error-txt">비밀번호가 일치하지 않습니다.</p>
          )}
        </S.InputBox>

        <S.SubmitBtn ref={submitRef} onClick={onSubmit} disabled={loading}>
          회원가입
        </S.SubmitBtn>
        <S.StyledLink href="/login">이미 계정이 있으신가요?</S.StyledLink>

        {/* 구글 계정으로 로그인 */}
        <S.GoogleBox>
          <S.GrayLineTxtBox>
            <div className="gray-line-signup" />
            <p className="sns-txt">SNS 계정으로 회원가입</p>
            <div className="gray-line-signup" />
          </S.GrayLineTxtBox>

          {/* 구글로 signin => GoogleAuth 컴포넌트 */}
          <GoogleAuth />
        </S.GoogleBox>
      </S.SignupBlock>
    </>
  );
}

export default Signup;
