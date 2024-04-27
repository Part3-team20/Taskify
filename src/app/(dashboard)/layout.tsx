'use client';

// 추후 삭제
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideBar from '@/components/SideBar';
import DashBoardHeader from '@/components/common/Header/DashBoardHeader';
import styles from './layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (router && !accessToken) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <SideBar />
      <div className={styles.rightSide}>
        <div className={styles.header}>
          <DashBoardHeader />
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
