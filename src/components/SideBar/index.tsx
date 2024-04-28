'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDashboard } from '@/contexts/dashboardContext';
import CreateDashboard from '@/components/Modal/CreateDashboard';
import ModalPortal from '@/components/Modal/ModalPortal';
import IconTextButton from '../common/Button/IconTextButton';
import SideBarListItem from './SideBarListItem';
import PaginationButton from '../common/Button/PaginationButton';
import styles from './SideBar.module.scss';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    sideDashboards: { dashboards, totalCount },
    setSideDashboards,
    getDashboardsData,
  } = useDashboard();

  const handlePageChange = async (pageNumber: number) => {
    setPage(pageNumber);
    getDashboardsData(10, setSideDashboards, pageNumber);
  };

  return (
    <aside className={styles.container}>
      <Link className={styles.logoLink} href="/mydashboard">
        <h1 className={styles.logo}>
          <Image width="29" height="33" src="/images/mainLogo.svg" alt="taskify" priority />
          <Image className={styles.logoText} width="80" height="22" src="/images/Taskify.svg" alt="taskify" priority />
        </h1>
      </Link>
      <div className={styles.dashboardList}>
        <div className={styles.titleBox}>
          <span className={styles.title}>Dash Boards</span>
          <IconTextButton className="" handleClick={() => setIsOpen(true)}>
            <Image width="20" height="20" src="/images/add_box.svg" alt="대시보드 추가 아이콘" />
          </IconTextButton>
        </div>
        <ul className={styles.list}>
          {dashboards && dashboards.map((data) => <SideBarListItem key={data.id} data={data} />)}
        </ul>
        {totalCount > 10 && (
          <PaginationButton
            className={styles.pagination}
            hasNext={totalCount - page * 10 > 0}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <ModalPortal>
        <CreateDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </ModalPortal>
    </aside>
  );
}
