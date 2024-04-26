'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Profile from '@/components/common/Profile';
import styles from './EachDashBoardHeader.module.scss';

const mockUser = {
  id: 1,
  email: 'cksdyd324@gmail.com',
  nickname: '진찬용',
  profileImageUrl: undefined,
  createdAt: '2024-04-19T12:30:21.029Z',
  updatedAt: '2024-04-19T12:30:21.029Z',
};

const mockDashBoard = {
  id: 1,
  title: '비브리지',
  color: 'blue',
  createdAt: '2024-04-20T01:16:07.710Z',
  updatedAt: '2024-04-20T01:16:07.710Z',
  createdByMe: true,
  userId: 1,
};

const mockMember = {
  userId: 0,
  email: 'cksdyd324@gmail.com',
  nickname: '진찬용',
  profileImageUrl: undefined,
  createdAt: '2024-04-20T05:52:24.247Z',
  updatedAt: '2024-04-20T05:52:24.248Z',
  isOwner: true,
};

const mockMembers = {
  members: Array.from({ length: 5 }, (_, index) => ({ id: index, ...mockMember })),
  totalCount: 5,
};

export default function EachDashBoardHeader() {
  // 디바이스(PC, Tablet, Mobile) 감지용. hook 으로 만들기도 가능.
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const checkDeviceType = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setDeviceType('PC');
        return;
      }
      if (screenWidth >= 768) {
        setDeviceType('Tablet');
        return;
      }
      setDeviceType('Mobile');
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return (
    <header className={styles.header}>
      {/* 개별 대시보드 제목 */}
      <div className={styles.dashBoardTitle}>
        {mockDashBoard.title}{' '}
        {mockDashBoard.createdByMe && <Image src="/images/crown_icon.svg" alt="crown" width={20} height={16} />}
      </div>

      <div className={styles.nav}>
        {/* 관리, 초대하기 버튼 */}
        <div className={styles.buttons}>
          {mockDashBoard.createdByMe && (
            <Link href={`/dashboard/${mockDashBoard.id}/edit`} className={styles.button}>
              <Image src="/images/settings_icon.svg" alt="dashboard-setting" width={20} height={20} />
              관리
            </Link>
          )}
          <div className={styles.button}>
            <Image src="/images/add_box.svg" alt="dashboard-invitation" width={20} height={20} />
            초대하기
          </div>
        </div>

        {/* 대시보드 멤버 목록. PC 에선 4명, Tablet이나 Mobile 에서는 2명까지 보여주고, 그 이상은 숫자로 표시해줌. */}
        <ul
          className={styles.members}
          style={
            deviceType === 'PC'
              ? { width: `${mockMembers.totalCount > 4 ? 162 : 31 * mockMembers.totalCount + 7}px` }
              : { width: `${mockMembers.totalCount > 2 ? 100 : 31 * mockMembers.totalCount + 7}px` }
          }
        >
          {mockMembers.members.slice(0, 4).map((member, index) => (
            <li
              key={member.id}
              className={`${styles.member} ${index > 1 ? styles.onlyVisibleOnPC : ''}`}
              style={{ left: `-${index * 7}px` }}
            >
              <Profile profileImageUrl={member.profileImageUrl} />
            </li>
          ))}
          {deviceType === 'PC'
            ? mockMembers.totalCount > 4 && <li className={styles.excess}>{`+${mockMembers.totalCount - 4}`}</li>
            : mockMembers.totalCount > 2 && <li className={styles.excess}>{`+${mockMembers.totalCount - 2}`}</li>}
        </ul>

        <hr className={styles.boundary} />

        {/* 내 프로필 */}
        <div className={styles.profile}>
          <Profile profileImageUrl={mockUser.profileImageUrl} />
          <span className={styles.nickname}>{mockUser.nickname}</span>
        </div>
      </div>
    </header>
  );
}
