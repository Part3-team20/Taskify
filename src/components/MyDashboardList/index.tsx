'use client';

import { useState } from 'react';
import { useDashboard } from '@/contexts/dashboardContext';
import AddButton from '../common/Button/AddButton';
import DashboardButton from '../common/Button/DashboardButton';
import PaginationButton from '../common/Button/PaginationButton';
import CreateDashboard from '../Modal/CreateDashboard';
import ModalPortal from '../Modal/ModalPortal';
import styles from './MyDashboardList.module.scss';

export default function MyDashboardList() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    myDashboards: { dashboards, totalCount },
    setMyDashboards,
    getDashboardsData,
  } = useDashboard();

  const handlePageChange = async (pageNumber: number) => {
    setPage(pageNumber);
    getDashboardsData(5, setMyDashboards, pageNumber);
  };
  /**
   * @TODO
   * -로딩 처리
   */

  return (
    <div className={styles.container}>
      <ul className={styles.dashboardContainer}>
        {dashboards &&
          dashboards.map((data) => (
            <li key={data.id} className={styles.item}>
              <DashboardButton data={data} />
            </li>
          ))}
        <li className={styles.item}>
          <AddButton
            handleClick={() => {
              setIsOpen(true);
            }}
            dashboard
          >
            새로운 대시보드
          </AddButton>
        </li>
      </ul>
      <div className={styles.paginationContainer}>
        <span className={styles.paginationText}>
          {Math.ceil(totalCount / 5)} 페이지 중 {page}
        </span>
        <PaginationButton
          className={styles.pagination}
          hasNext={totalCount - page * 5 > 0}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
      <ModalPortal>
        <CreateDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </ModalPortal>
    </div>
  );
}
