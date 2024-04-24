'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchPost from '@/hooks/useFetcht';
import LoginSubmitButton from '@/components/common/Button/LoginSubmitButton';
import PasswordInput from '@/components/common/input/PasswordInput';
import Input from '@/components/common/input';
import styles from './Login.module.scss';

export default function LoginPage() {
  const { fetchPost } = useFetchPost();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  function handleChange(e: any) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      await fetchPost('/auth/login', {
        email,
        password,
      });
    } catch (err) {
      console.error(err);
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
  }, [values]);

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src="/images/fullLogo.svg" alt="logo" width={200} height={280} />
      </Link>
      <p className={styles.greetingText}>오늘도 만나서 반가워요!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          labelName="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          name="email"
          onChange={handleChange}
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
