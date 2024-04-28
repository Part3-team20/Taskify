'use client';

// 추후 삭제
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardProvider } from '@/contexts/dashboardContext';
import SideBar from '@/components/SideBar';
import DashBoardHeader from '@/components/common/Header/DashBoardHeader';
import EachDashBoardHeader from '@/components/common/Header/DashBoardHeader/EachDashBoardHeader';
import styles from './layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  // const params = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (router && !accessToken) {
      router.push('/login');
    }
  }, []);

  return (
    <DashboardProvider>
      <SideBar />
      <div className={styles.rightSide}>
        <div className={styles.header}>
          {/* {path === '/mydashboard' ? <DashBoardHeader /> : <EachDashBoardHeader boardId={Number(params.boardId)} />} */}
          {path === '/mydashboard' ? <DashBoardHeader /> : <EachDashBoardHeader />}
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </DashboardProvider>
  );
}
