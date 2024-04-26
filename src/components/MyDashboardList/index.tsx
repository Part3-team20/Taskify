'use client';

import { useEffect, useState } from 'react';
import useFetchWithToken from '@/hooks/useFetchToken';
import AddButton from '../common/Button/AddButton';
import DashboardButton from '../common/Button/DashboardButton';
import PaginationButton from '../common/Button/PaginationButton';
import styles from './MyDashboardList.module.scss';
import CreateDashboard from '../Modal/CreateDashboard';
import ModalPortal from '../Modal/ModalPortal';

interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface Cursor {
  page: number;
  totalCount: number;
}

export default function MyDashboardList() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState<Cursor>({ page: 1, totalCount: 0 });
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);

  const { fetchWithToken: getDashboardList, error } = useFetchWithToken();

  const handlePageChange = (pageNumber: number) => {
    setPage((prevPage) => ({ ...prevPage, page: pageNumber }));
  };

  /**
   * @TODO
   * -로딩 처리
   */
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboardList(
        `https://sp-taskify-api.vercel.app/4-20/dashboards?navigationMethod=pagination&page=${page.page}&size=5`,
        'GET'
      );
      if (response) {
        setDashboards(response.dashboards);
        setPage((prevPage) => ({ ...prevPage, totalCount: response.totalCount }));
      }
      if (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page.page]);

  return (
    <div className={styles.container}>
      <ul className={styles.dashboardContainer}>
        {dashboards &&
          dashboards.map(({ id, title, createdByMe, color }) => (
            <li key={id} className={styles.item}>
              <DashboardButton id={id} title={title} createdByMe={createdByMe} color={color} />
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
        <span>
          {Math.ceil(page.totalCount / 5)} 페이지 중 {page.page}
        </span>
        <PaginationButton
          className={styles.pagination}
          hasNext={page.totalCount - page.page * 5 > 0}
          currentPage={page.page}
          onPageChange={handlePageChange}
        />
      </div>
      <ModalPortal>
        <CreateDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </ModalPortal>
    </div>
  );
}
