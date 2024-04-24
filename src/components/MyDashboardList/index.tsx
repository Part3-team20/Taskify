'use client';

import { useState } from 'react';
import AddButton from '../common/Button/AddButton';
import DashboardButton from '../common/Button/DashboardButton';
import PaginationButton from '../common/Button/PaginationButton';
import styles from './MyDashboardList.module.scss';
import CreateDashboard from '../modal/CreateDashboard';
import ModalPortal from '../modal/ModalPortal';

const dashboardData = [
  {
    id: 1,
    title: '비브리지',
    color: '#125515',
    createdAt: '2024-04-18T09:45:26.609Z',
    updatedAt: '2024-04-18T09:45:26.609Z',
    createdByMe: true,
    userId: 0,
  },
  {
    id: 2,
    title: '코드잇',
    color: '#a9238e',
    createdAt: '2024-04-18T09:45:26.609Z',
    updatedAt: '2024-04-18T09:45:26.609Z',
    createdByMe: false,
    userId: 0,
  },
  {
    id: 3,
    title: '3분기 계획 기이이이이이이이이이이이이이이이이이이이인 제목',
    color: '#8abdef',
    createdAt: '2024-04-18T09:45:26.609Z',
    updatedAt: '2024-04-18T09:45:26.609Z',
    createdByMe: true,
    userId: 0,
  },
];

export default function MyDashboardList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <ul className={styles.dashboardContainer}>
        {dashboardData.map(({ id, title, createdByMe, color }) => (
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
        <PaginationButton className={styles.pagination} hasNext={false} currentPage={1} onPageChange={() => {}} />
      </div>
      {/* 새로운 대시보드 추가 모달 */}
      <ModalPortal>
        <CreateDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </ModalPortal>
    </div>
  );
}
