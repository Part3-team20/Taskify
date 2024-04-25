'use client';

import Image from 'next/image';
import { useInvite } from '@/contexts/inviteContext';
import InviteList from './InviteList';
import styles from './InvitedBoard.module.scss';
import InvitedBoardSearchForm from './InvitedBoardSearchForm';

export default function InvitedBoard() {
  const { invitationData } = useInvite();
  /**
   * @TODOS
   * -검색결과 없는 경우
   */

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      {invitationData?.length !== 0 ? (
        <>
          <InvitedBoardSearchForm />
          <InviteList />
        </>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <Image fill src="/images/unsubscribe_icon.svg" alt="초대 없음 아이콘" />
          </span>
          <p className={styles.emptyMessage}>아직 초대받은 대시보드가 없어요</p>
        </div>
      )}
    </div>
  );
}
