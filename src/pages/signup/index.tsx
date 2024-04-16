import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from '../api/axios';
import logo from '../../../public/images/mainLogo.svg';
import styles from './signup.module.scss';

export default function SignUpPage() {
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    password: '',
  });

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
      await axios.post('/users', {
        email,
        nickname,
        password,
      });
    } catch (err) {
      console.log('Error submitting data:', err);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src={logo} alt="logo" />
      </Link>
      <p className={styles.greetingText}>첫 방문을 환영합니다!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="user_email">이메일</label>
        <input
          id="user_email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          placeholder="이메일을 입력해 주세요"
        />
        <br />
        <label htmlFor="user_nickname">닉네임</label>
        <input
          id="user_nickname"
          type="text"
          name="nickname"
          required
          onChange={handleChange}
          placeholder="닉네임을 입력해 주세요"
        />
        <br />
        <label htmlFor="user_pw">비밀번호</label>
        <input
          id="user_pw"
          type="password"
          name="password"
          placeholder="8자 이상 입력해 주세요"
          required
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="가입하기" />
      </form>
    </div>
  );
}
