'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SideBar.module.scss';
import IconTextButton from '../button/IconTextButton';
import SideBarListItem from './SideBarListItem';
import PaginationButton from '../button/PaginationButton';
import Modal from '../modal/Modal';

// mock data
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

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  // 추후 데이터로 받아올 부분
  const totalCount = 11;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
          {dashboardData.map((data) => (
            <SideBarListItem key={data.id} data={data} />
          ))}
        </ul>
        {totalCount > 10 && <PaginationButton className={styles.pagination} hasNext={false} />}
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal} style={{ width: '540px', height: '334px' }}>
        <div>새로운 대시보드</div>
      </Modal>
    </aside>
  );
}
