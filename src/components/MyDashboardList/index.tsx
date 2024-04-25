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
  cursorId: number;
  totalCount: number;
}

export default function MyDashboardList() {
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState<Cursor>({ cursorId: 0, totalCount: 0 });
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);

  const { fetchWithToken: getDashboardList, loading, error } = useFetchWithToken();

  /**
   * @TODO
   * -pagination
   * -페이지 내 출력 개수
   */
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboardList(
        'https://sp-taskify-api.vercel.app/4-20/dashboards?navigationMethod=pagination',
        'GET'
      );
      if (response) {
        setDashboards(response.dashboards);
        setCursor({ cursorId: response.cursorId, totalCount: response.totalCount });
      }
      if (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.dashboardContainer}>
        {loading && '로딩중...'}
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
        <span>1 페이지 중 1</span>
        <PaginationButton
          className={styles.pagination}
          hasNext={cursor.totalCount - cursor.cursorId * 5 > 0}
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
      <ModalPortal>
        <CreateDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </ModalPortal>
    </div>
  );
}
