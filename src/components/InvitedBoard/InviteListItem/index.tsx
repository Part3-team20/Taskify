'use client';

import { useInvite } from '@/contexts/inviteContext';
import Button from '@/components/common/Button/Button';
import styles from './InviteListItem.module.scss';

interface InviteListItemProps {
  title: string;
  nickname: string;
  id: number;
}

export default function InviteListItem({ title, id, nickname }: InviteListItemProps) {
  const { acceptInvitation, rejectInvitation } = useInvite();

  const onAcceptClick = () => {
    acceptInvitation(id);
  };

  const onRejectClick = () => {
    rejectInvitation(id);
  };

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.label}>이름</span>
        <span className={styles.dashboardTitle}>{title}</span>
      </div>
      <div>
        <span className={styles.label}>초대자</span>
        {nickname}
      </div>
      <div className={styles.buttonBox}>
        <Button color="violet" handleClick={onAcceptClick}>
          수락
        </Button>
        <Button color="white" handleClick={onRejectClick}>
          거절
        </Button>
      </div>
    </div>
  );
}
