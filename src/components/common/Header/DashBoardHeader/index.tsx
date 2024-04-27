'use client';

import Link from 'next/link';
import Profile from '../../Profile';
import styles from './DashBoardHeader.module.scss';
import { useEffect, useState } from 'react';
import useFetchWithToken from '@/hooks/useFetchToken';

type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export default function DashBoardHeader() {
  const { fetchWithToken } = useFetchWithToken();
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: undefined,
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/users/me`);
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [fetchWithToken]);

  return (
    <header className={styles.header}>
      내 대시보드
      <Link href="/mypage">
        <div className={styles.profile}>
          <Profile profileImageUrl={user?.profileImageUrl} />
          <span className={styles.nickname}>{user?.nickname}</span>
        </div>
      </Link>
    </header>
  );
}
