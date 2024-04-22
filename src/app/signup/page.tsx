'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetchPost from '@/hooks/useFetchPost';
import LoginSubmitButton from '@/components/common/Button/LoginSubmitButton';
import logo from '../../../public/images/mainLogo.svg';
import eyeOff from '../../../public/images/eye-off.svg';
import eyeOn from '../../../public/images/eye-on.svg';
import styles from './Signup.module.scss';

export default function SignUpPage() {
  const { fetchPost } = useFetchPost();
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isMoreThanEight, setIsMoreThanEight] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);

  const passwordType = isPasswordShow ? 'text' : 'password';
  const confirmPasswordType = isConfirmPasswordShow ? 'text' : 'password';

  function handleChange(e: any) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: FormEvent) => {
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

  const handleTogglePassword = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setIsConfirmPasswordShow((prev) => !prev);
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

    // 비밀번호 8자 이하 확인
    if (password.trim().length > 0 && password.trim().length < 8) {
      setIsMoreThanEight(false);
    } else {
      setIsMoreThanEight(true);
    }
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
        <label htmlFor="user_pw" className={`${styles.label} ${styles.labelPw}`}>
          비밀번호
          <input
            className={styles.input}
            id="user_pw"
            type={passwordType}
            name="password"
            placeholder="8자 이상 입력해 주세요"
            required
            onChange={handleChange}
          />
          <button className={styles.togglePw} type="button" onClick={handleTogglePassword}>
            {isPasswordShow ? <Image src={eyeOn} alt="eye-on" /> : <Image src={eyeOff} alt="eye-off" />}
          </button>
        </label>
        {!isMoreThanEight && <p className={styles.errorMessage}>8자 이상 입력해주세요.</p>}
        <label htmlFor="user_confirmPw" className={`${styles.label} ${styles.labelPw}`}>
          비밀번호 확인
          <input
            className={styles.input}
            id="user_confirmPw"
            type={confirmPasswordType}
            name="confirmPassword"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            required
            onChange={handleChange}
          />
          <button className={styles.togglePw} type="button" onClick={handleToggleConfirmPassword}>
            {isConfirmPasswordShow ? <Image src={eyeOn} alt="eye-on" /> : <Image src={eyeOff} alt="eye-off" />}
          </button>
        </label>
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
