import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from '@/api/axios';
import logo from '../../../public/images/mainLogo.svg';
import styles from './login.module.scss';

export default function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
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

    const { email, password } = values;

    try {
      await axios.post(
        '/auth/login',
        {
          email,
          password,
        }
        // { withCredentials: true }
      );
      router.push('/');
    } catch (err) {
      console.log('Error submitting data:', err);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image className={styles.logo} src={logo} alt="logo" />
      </Link>
      <p className={styles.greetingText}>오늘도 만나서 반가워요!</p>
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
        <label htmlFor="user_pw">비밀번호</label>
        <input
          id="user_pw"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          required
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="로그인" />
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
