'use client';

// 추후 삭제
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOGIN } from '@/constants/ApiUrl';
import Image from 'next/image';
import Link from 'next/link';
import useFetchWithToken from '@/hooks/useFetchToken';
import Input from '@/components/common/Input';
import LoginSubmitButton from '@/components/common/Button/LoginSubmitButton';
import PasswordInput from '@/components/common/Input/PasswordInput';
import Toast from '@/util/Toast';

import styles from './Login.module.scss';

export default function LoginPage() {
  const { fetchWithToken } = useFetchWithToken();
  // loading, error 삭제
  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      const responseData = await fetchWithToken(`${LOGIN}`, 'POST', {
        email,
        password,
      });
      localStorage.setItem('accessToken', responseData.accessToken);
      router.push('/mydashboard');
    } catch (err: any) {
      // Error 객체에서 Message만 추출
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const { email, password } = values;
    const isLoginValid = email.trim() !== '' && password.trim() !== '' && password.trim().length >= 8;
    if (password.trim().length < 8 && password.trim().length > 0) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
    setIsBtnActive(isLoginValid);

    // 이메일 형식 확인
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email) && email.trim().length > 0) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }

    // 비밀번호 8자 이하 확인
    if (password.trim().length < 8 && password.trim().length > 0) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  }, [values]);

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src="/images/fullLogo.svg" alt="logo" width={200} height={280} priority />
      </Link>
      <p className={styles.greetingText}>오늘도 만나서 반가워요!</p>
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
        <PasswordInput
          labelName="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          onChange={handleChange}
          error={isPasswordError}
          errorMessage="비밀번호를 8자 이상 입력해주세요"
          required
        />
        <LoginSubmitButton isActive={isBtnActive}>로그인</LoginSubmitButton>
      </form>
      <p className={styles.signupText}>
        회원이 아니신가요?
        <Link href="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </div>
  );
}
