'use client';

import { useParams } from 'next/navigation';
import CommonLayout from '@/layouts/CommonLayout';
import DeleteDashboardButton from '@/components/common/Button/DeleteDashboardButton';
import DashboaradChange from './editComponents/DashboardChange';
import PreviosPageButton from './editComponents/PreviousPageButton';
import MemberManagement from './editComponents/MemberManagement';
import InviteStatus from './editComponents/InviteStatus';
import styles from './BoardEdit.module.scss';

export default function BoardEdit() {
  /* 현재 페이지의 id를 받아와 각 컴포넌트에 id값 전달
      id는 CommonLayout에서 받아와야함.
  */

  const { boardId } = useParams();

  console.log(boardId); // 타입 string

  const handleDeleteDashboard = (id: any) => {
    /* TODO 대쉬보드 삭제 구현 */
    console.log(id, '삭제');
  };

  return (
    <CommonLayout>
      <div className={styles.container}>
        <PreviosPageButton />
        <DashboaradChange id={boardId} />
        <MemberManagement id={boardId} />
        <InviteStatus id={boardId} />
        <DeleteDashboardButton handleDelete={() => handleDeleteDashboard(boardId)} />
      </div>
    </CommonLayout>
  );
}
