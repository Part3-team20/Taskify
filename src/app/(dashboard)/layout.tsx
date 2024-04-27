'use client';

// 추후 삭제
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideBar from '@/components/SideBar';
import DashBoardHeader from '@/components/common/Header/DashBoardHeader';
import EachDashBoardHeader from '@/components/common/Header/DashBoardHeader/EachDashBoardHeader';
import styles from './layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();

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
          {path === '/mydashboard' ? <DashBoardHeader /> : <EachDashBoardHeader boardId={Number(params.boardId)} />}
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
