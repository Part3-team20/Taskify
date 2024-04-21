'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchPost from '@/hooks/useFetchPost';
import LoginSubmitButton from '@/components/common/Button/LoginSubmitButton';
import logo from '../../../public/images/mainLogo.svg';
import styles from './Signup.module.scss';

export default function SignUpPage() {
  const { fetchPost } = useFetchPost();
  const [values, setValues] = useState({
    email: '',
    nickname: '',
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

    const { email, nickname, password } = values;

    try {
      await fetchPost('/users', {
        email,
        nickname,
        password,
      });
    } catch (err) {
      console.log('Error submitting data:', err);
    }
  };

  useEffect(() => {
    const { email, nickname, password } = values;
    const isValid =
      email.trim() !== '' && nickname.trim() !== '' && password.trim() !== '' && password.trim().length >= 8;
    setIsBtnActive(isValid);
  }, [values]);

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src={logo} alt="logo" />
      </Link>
      <p className={styles.greetingText}>첫 방문을 환영합니다!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="user_email" className={styles.label}>
          이메일
          <input
            className={styles.input}
            id="user_email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            placeholder="이메일을 입력해 주세요"
          />
        </label>
        <br />
        <label htmlFor="user_nickname" className={styles.label}>
          닉네임
          <input
            className={styles.input}
            id="user_nickname"
            type="text"
            name="nickname"
            required
            onChange={handleChange}
            placeholder="닉네임을 입력해 주세요"
          />
        </label>
        <br />
        <label htmlFor="user_pw" className={styles.label}>
          비밀번호
          <input
            className={styles.input}
            id="user_pw"
            type="password"
            name="password"
            placeholder="8자 이상 입력해 주세요"
            required
            onChange={handleChange}
          />
        </label>
        <br />
        {/* <input type="submit" value="가입하기" /> */}
        <LoginSubmitButton isActive={isBtnActive}>가입하기</LoginSubmitButton>
      </form>
    </div>
  );
}
