'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDashboard } from '@/contexts/dashboardContext';
import Profile from '@/components/common/Profile';
import useFetchWithToken from '@/hooks/useFetchToken';
import { Dashboard } from '@/types/DashboardTypes';
import styles from './EachDashBoardHeader.module.scss';

interface ProfileProps {
  nickname: string;
  profileImageUrl?: string;
}

interface Members {
  members: {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
  }[];
  totalCount: number;
}

// export default function EachDashBoardHeader({ boardId }: { boardId: number }) {
export default function EachDashBoardHeader() {
  const { fetchWithToken } = useFetchWithToken();
  // 디바이스(PC, Tablet, Mobile) 감지용. hook 으로 만들기도 가능.
  const [deviceType, setDeviceType] = useState('');
  const [profile, setProfile] = useState<ProfileProps>({
    nickname: '',
    profileImageUrl: '',
  });

  const [dashboard, setDashboard] = useState<Dashboard>({
    id: 0,
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    userId: 0,
    createdByMe: false,
  });

  const [members, setMembers] = useState<Members>({
    members: [],
    totalCount: 0,
  });
  const { dashboardId: boardId } = useDashboard();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/users/me`);
        setProfile({ nickname: response.nickname, profileImageUrl: response.profileImageUrl });
      } catch (error: any) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [fetchWithToken]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/dashboards/${boardId}`);
        setDashboard(response);
      } catch (error: any) {
        console.error('Failed to fetch dashboard:', error);
      }
    };

    if (boardId) {
      fetchDashboard();
    }
  }, [boardId, fetchWithToken]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/members?dashboardId=${boardId}`);
        setMembers(response);
      } catch (error: any) {
        console.error('Failed to fetch dashboard members:', error);
      }
    };

    if (boardId) {
      fetchMembers();
    }
  }, [boardId, fetchWithToken]);

  return (
    <header className={styles.header}>
      {/* 개별 대시보드 제목 */}
      <div className={styles.dashBoardTitle}>
        {dashboard?.title}{' '}
        {dashboard?.createdByMe && <Image src="/images/crown_icon.svg" alt="crown" width={20} height={16} />}
      </div>

      <div className={styles.nav}>
        {/* 관리, 초대하기 버튼 */}
        {dashboard?.createdByMe && (
          <div className={styles.buttons}>
            <Link href={`/dashboard/${dashboard?.id}/edit`} className={styles.button}>
              <Image src="/images/settings_icon.svg" alt="dashboard-setting" width={20} height={20} />
              관리
            </Link>
            <div className={styles.button}>
              <Image src="/images/add_box.svg" alt="dashboard-invitation" width={20} height={20} />
              초대하기
            </div>
          </div>
        )}

        {/* 대시보드 멤버 목록. PC 에선 4명, Tablet이나 Mobile 에서는 2명까지 보여주고, 그 이상은 숫자로 표시해줌. */}
        <ul
          className={styles.members}
          style={
            deviceType === 'PC'
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                { width: `${members?.totalCount > 4 ? 162 : 31 * members?.totalCount + 7}px` }
              : // eslint-disable-next-line no-unsafe-optional-chaining
                { width: `${members?.totalCount > 2 ? 100 : 31 * members?.totalCount + 7}px` }
          }
        >
          {members?.members.slice(0, 4).map((member, index) => (
            <li
              key={member.id}
              className={`${styles.member} ${index > 1 ? styles.onlyVisibleOnPC : ''}`}
              style={{ left: `-${index * 7}px` }}
            >
              <Profile profileImageUrl={member.profileImageUrl} />
            </li>
          ))}
          {deviceType === 'PC'
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              members?.totalCount > 4 && <li className={styles.excess}>{`+${members?.totalCount - 4}`}</li>
            : // eslint-disable-next-line no-unsafe-optional-chaining
              members?.totalCount > 2 && <li className={styles.excess}>{`+${members?.totalCount - 2}`}</li>}
        </ul>

        <hr className={styles.boundary} />

        {/* 내 프로필 */}
        <Link href="/mypage">
          <div className={styles.profile}>
            <Profile profileImageUrl={profile?.profileImageUrl} />
            <span className={styles.nickname}>{profile?.nickname}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
