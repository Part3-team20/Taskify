'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { SIGNIN } from '@/constants/ApiUrl';
import Image from 'next/image';
import Link from 'next/link';
import useFetchWithToken from '@/hooks/useFetchToken';
import LoginSubmitButton from '@/components/common/Button/LoginSubmitButton';
import Input from '@/components/common/Input';
import PasswordInput from '@/components/common/Input/PasswordInput';
import Toast from '@/util/Toast';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.scss';

export default function SignUpPage() {
  const { fetchWithToken } = useFetchWithToken();
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, nickname, password } = values;

    try {
      await fetchWithToken(SIGNIN, 'POST', {
        email,
        nickname,
        password,
      });
      Toast.success('가입이 완료되었습니다!');
      router.push('/login');
    } catch (err: any) {
      // Error 객체에서 Message만 추출
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  // 비밀번호 확인 focus시, 동일한지 확인
  const handleFocusConfirmPassword = () => {
    const { password, confirmPassword } = values;
    if (password === confirmPassword) {
      setIsConfirmPasswordError(false);
    } else {
      setIsConfirmPasswordError(true);
    }
  };

  // 비밀번호 확인 focus out시, 에러 메시지 없애기
  const handleBlurConfirmPassword = () => {
    setIsConfirmPasswordError(false);
  };

  useEffect(() => {
    const { email, nickname, password, confirmPassword } = values;

    // 입력 폼 모두 입력시, 버튼 활성화
    const isValid =
      email.trim() !== '' &&
      nickname.trim() !== '' &&
      password.trim() !== '' &&
      password.trim().length >= 8 &&
      password === confirmPassword;
    setIsBtnActive(isValid);

    // 이메일 형식 확인
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email) && email.trim().length > 0) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }

    // 닉네임 10자 이하 확인
    if (nickname.trim().length > 10) {
      setIsNicknameError(true);
    } else {
      setIsNicknameError(false);
    }

    // 비밀번호 8자 이하 확인
    if (password.trim().length < 8 && password.trim().length > 0) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    // // 동일한 비밀번호 확인
    // if (password === confirmPassword) {
    //   setIsConfirmPasswordError(false);
    // } else {
    //   setIsConfirmPasswordError(true);
    // }
  }, [values]);

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src="/images/fullLogo.svg" alt="logo" width={200} height={280} priority />
      </Link>
      <p className={styles.greetingText}>첫 방문을 환영합니다!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          labelName="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          name="email"
          onChange={handleChange}
          error={isEmailError}
          errorMessage="이메일 형식으로 작성해주세요."
          required
        />
        <Input
          labelName="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          name="nickname"
          onChange={handleChange}
          error={isNicknameError}
          errorMessage="10자 이하로 작성해주세요."
          maxLength={10}
          required
        />
        <PasswordInput
          labelName="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          autoComplete="new-password"
          onChange={handleChange}
          error={isPasswordError}
          errorMessage="비밀번호를 8자 이상 입력해주세요."
          required
        />
        <PasswordInput
          labelName="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          name="confirmPassword"
          autoComplete="new-password"
          onChange={handleChange}
          onFocus={handleFocusConfirmPassword}
          onBlur={handleBlurConfirmPassword}
          error={isConfirmPasswordError}
          errorMessage="비밀번호가 일치하지 않습니다."
          required
        />
        <LoginSubmitButton isActive={isBtnActive}>가입하기</LoginSubmitButton>
      </form>
      <p className={styles.signupText}>
        이미 가입하셨나요?
        <Link href="/login">
          <span>로그인하기</span>
        </Link>
      </p>
    </div>
  );
}
