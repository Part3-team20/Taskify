'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserProvider } from '@/contexts/userContext';
import { DashboardProvider } from '@/contexts/dashboardContext';
import SideBar from '@/components/SideBar';
import DashBoardHeader from '@/components/common/Header/DashBoardHeader';
import EachDashBoardHeader from '@/components/common/Header/DashBoardHeader/EachDashBoardHeader';
import styles from './layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (router && !accessToken) {
      router.push('/login');
    }
  }, []);

  return (
    <UserProvider>
      <DashboardProvider>
        <SideBar />
        <div className={styles.rightSide}>
          <div className={styles.header}>
            {path === '/mydashboard' || path === '/mypage' ? <DashBoardHeader path={path} /> : <EachDashBoardHeader />}
          </div>
          <main className={styles.main}>{children}</main>
        </div>
      </DashboardProvider>
    </UserProvider>
  );
}
