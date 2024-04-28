'use client';

import Link from 'next/link';
import Profile from '../../Profile';
import styles from './DashBoardHeader.module.scss';
import { useEffect, useState } from 'react';
import useFetchWithToken from '@/hooks/useFetchToken';

interface Profile {
  nickname: string;
  profileImageUrl?: string;
}

export default function DashBoardHeader() {
  const { fetchWithToken } = useFetchWithToken();
  const [profile, setProfile] = useState<Profile>({ nickname: '', profileImageUrl: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/users/me`);
        setProfile({ nickname: response.nickname, profileImageUrl: response.profileImageUrl });
      } catch (error: any) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchUser();
  }, [fetchWithToken]);

  return (
    <header className={styles.header}>
      내 대시보드
      <Link href="/mypage">
        <div className={styles.profile}>
          <Profile profileImageUrl={profile?.profileImageUrl} />
          <span className={styles.nickname}>{profile?.nickname}</span>
        </div>
      </Link>
    </header>
  );
}
