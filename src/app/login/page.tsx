'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchPost from '@/hooks/useFetchPost';
import styles from './Login.module.scss';
import logo from '../../../public/images/mainLogo.svg';
import LoginSubmitButton from '@/components/common/Button/LoginSubmitButton';

export default function LoginPage() {
  const { fetchPost } = useFetchPost();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isBtnActive, setIsBtnActive] = useState(false);

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
    const isValid = email.trim() !== '' && password.trim() !== '' && password.trim().length >= 8;
    setIsBtnActive(isValid);
  }, [values]);

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src={logo} alt="logo" />
      </Link>
      <p className={styles.greetingText}>오늘도 만나서 반가워요!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="user_email">
          이메일
          <br />
          <input
            id="user_email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            placeholder="이메일을 입력해 주세요"
          />
        </label>
        <label htmlFor="user_pw">
          비밀번호
          <br />
          <input
            id="user_pw"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            required
            onChange={handleChange}
          />
        </label>
        <br />
        {/* <input type="submit" value="로그인" /> */}
        <LoginSubmitButton isActive={isBtnActive}>로그인</LoginSubmitButton>
      </form>
      <p>
        회원이 아니신가요?
        <Link href="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </div>
  );
}
