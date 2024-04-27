'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useFetchWithToken from '@/hooks/useFetchToken';
import IdProvider from '@/contexts/idContext';
import { DASHBOARDS, USERS } from '@/constants/ApiUrl';
import DeleteDashboardButton from '@/components/common/Button/DeleteDashboardButton';
import PreviosPageButton from './editComponents/PreviousPageButton';
import MemberManagement from './editComponents/MemberManagement';
import InviteStatus from './editComponents/InviteStatus';
import DashboaradChange from './editComponents/DashboardChange';
import styles from './BoardEdit.module.scss';

export default function BoardEdit() {
  /* 현재 페이지의 boardId를 받아와 각 컴포넌트에 id값 전달
      id는 CommonLayout에서 받아와야함.
  */
  const { fetchWithToken } = useFetchWithToken();
  const router = useRouter();
  const { boardId } = useParams();

  const id = Number(boardId);

  const [createDashboardUserId, setCreateDashboardUserId] = useState<number | undefined>(undefined);

  const handleDeleteDashboard = async (dashboardId: number) => {
    /* 대쉬보드 삭제  */
    try {
      await fetchWithToken(`${DASHBOARDS}/${dashboardId}`, 'DELETE');
      router.push('/mydashboard');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const createUser = await fetchWithToken(`${DASHBOARDS}/${boardId}`);
        const currentUser = await fetchWithToken(`${USERS}`);
        const createUserId = createUser.userId;
        const currentUserId = currentUser.id;
        setCreateDashboardUserId(createUserId); // props 전달위해 ..
        if (createUserId !== currentUserId) {
          router.push('./');
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <IdProvider boardId={id}>
      <div className={styles.container}>
        <PreviosPageButton />
        <DashboaradChange />
        <MemberManagement createUserId={createDashboardUserId || 0} />
        <InviteStatus />
        <DeleteDashboardButton handleDelete={() => handleDeleteDashboard(id)} />
      </div>
    </IdProvider>
  );
}
