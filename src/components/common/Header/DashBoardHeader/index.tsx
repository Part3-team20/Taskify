'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useFetchWithToken from '@/hooks/useFetchToken';
import Profile from '../../Profile';
import styles from './DashBoardHeader.module.scss';

interface ProfileData {
  nickname: string;
  profileImageUrl?: string;
}

export default function DashBoardHeader({ path }: { path: string }) {
  const { fetchWithToken } = useFetchWithToken();
  const [profile, setProfile] = useState<ProfileData>({ nickname: '', profileImageUrl: '' });

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
      {path === '/mydashboard' ? '내 대시보드' : '계정관리'}
      <Link href="/mypage">
        <div className={styles.profile}>
          <Profile profileImageUrl={profile?.profileImageUrl} />
          <span className={styles.nickname}>{profile?.nickname}</span>
        </div>
      </Link>
    </header>
  );
}
