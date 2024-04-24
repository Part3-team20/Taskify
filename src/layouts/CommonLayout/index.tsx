import { ReactNode } from 'react';
import SideBar from '@/components/SideBar';
import DashBoardHeader from '@/components/common/Header/DashBoardHeader';
import styles from './CommonLayout.module.scss';

interface CommonLayoutProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
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
