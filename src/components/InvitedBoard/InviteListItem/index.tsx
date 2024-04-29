'use client';

import { useInvite } from '@/contexts/inviteContext';
import Toast from '@/util/Toast';
import { INVITATIONS } from '@/constants/ApiUrl';
import { useDashboard } from '@/contexts/dashboardContext';
import useFetchWithToken from '@/hooks/useFetchToken';
import Button from '@/components/common/Button/Button';
import styles from './InviteListItem.module.scss';

interface InviteListItemProps {
  title: string;
  nickname: string;
  id: number;
}

export default function InviteListItem({ title, id, nickname }: InviteListItemProps) {
  const { invitationData, setInvitationData } = useInvite();
  const {
    reloadDashboard,
    myDashboards: { page: myDashboardsPage },
    sideDashboards: { page: sideDashboardsPage },
  } = useDashboard();

  const { fetchWithToken: inviteResponse } = useFetchWithToken();

  /**
   * @TODO
   * -대시보드 수락했을 경우 사이드바, 대시보드 리스트에 값이 추가되어야 하는 문제
   */

  const onConfirmInvite = async (response: boolean) => {
    const temp = [...invitationData];
    try {
      await inviteResponse(`${INVITATIONS}/${id}`, 'PUT', {
        inviteAccepted: response,
      });
      setInvitationData((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      setInvitationData(temp);
      console.log(error);
      Toast.error('초대 응답에 실패했어요.');
    }
  };

  const onAcceptClick = async () => {
    await onConfirmInvite(true);
    reloadDashboard(myDashboardsPage, sideDashboardsPage);
  };

  const onRejectClick = async () => {
    await onConfirmInvite(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.label}>이름</span>
        <span className={styles.dashboardTitle}>{title}</span>
      </div>
      <div>
        <span className={styles.label}>초대자</span>
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <div className={styles.buttonBox}>
        <Button color="violet" handleClick={onAcceptClick} maxWidth>
          수락
        </Button>
        <Button color="white" handleClick={onRejectClick} maxWidth>
          거절
        </Button>
      </div>
    </div>
  );
}
