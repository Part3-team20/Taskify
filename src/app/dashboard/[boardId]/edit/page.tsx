'use client';

import { useParams, useRouter } from 'next/navigation';
import useFetchWithToken from '@/hooks/useFetchToken';
import IdProvider from '@/contexts/idContext';
import CommonLayout from '@/layouts/CommonLayout';
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

  const handleDeleteDashboard = async (dashboardId: number) => {
    /* 대쉬보드 삭제  */
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/dashboards/${dashboardId}`, 'DELETE');
      router.push('/mydashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <IdProvider boardId={id}>
      <CommonLayout>
        <div className={styles.container}>
          <PreviosPageButton />
          <DashboaradChange />
          <MemberManagement />
          <InviteStatus />
          <DeleteDashboardButton handleDelete={() => handleDeleteDashboard(id)} />
        </div>
      </CommonLayout>
    </IdProvider>
  );
}
