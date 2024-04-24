'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useFetchWithToken from '@/hooks/useFetchToken';
import styles from './SideBar.module.scss';
import IconTextButton from '../common/Button/IconTextButton';
import SideBarListItem from './SideBarListItem';
import PaginationButton from '../common/Button/PaginationButton';
import CreateDashboard from '../modal/CreateDashboard';

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

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState<Cursor>({ cursorId: 0, totalCount: 0 });
  const [dashboards, setDashboards] = useState<Dashboard[] | null>(null);

  const { fetchWithToken: getDashboardList, loading, error } = useFetchWithToken();

  /**
   * @TODO
   * -pagination
   * -로딩 처리
   * -dashboardList 데이터 전역 전환
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
    <aside className={styles.container}>
      <Link className={styles.logoLink} href="/">
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
          {loading && '로딩중...'}
          {dashboards && dashboards.map((data) => <SideBarListItem key={data.id} data={data} />)}
        </ul>
        {cursor.totalCount > 10 && (
          <PaginationButton
            className={styles.pagination}
            hasNext={cursor.totalCount - cursor.cursorId * 10 > 0}
            currentPage={1}
            onPageChange={() => {}}
          />
        )}
      </div>
      <CreateDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </aside>
  );
}
