import { ReactNode } from 'react';
import SideBar from '@/components/SideBar/index';
import styles from './CommonLayout.module.scss';

interface CommonLayoutProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <>
      <SideBar />
      <div className={styles.rightSide}>
        <div className={styles.header}>헤더</div>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
