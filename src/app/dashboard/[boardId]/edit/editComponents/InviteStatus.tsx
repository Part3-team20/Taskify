import PaginationButton from '@/components/common/Button/PaginationButton';
import ModalInvite from '@/components/modal/modalInvite/ModalInvite';
import Button from '@/components/common/Button/Button';
import styles from './InviteStatus.module.scss';

export default function InviteStatus(id: any) {
  console.log('test용', id);
  const mockData = {
    totalCount: 5,
    invitations: [
      {
        id: 0,
        inviter: {
          nickname: 'inviter1',
          email: 'inviter1@example.com',
          id: 0,
        },
        teamId: 'team1',
        dashboard: {
          title: 'dashboard1',
          id: 0,
        },
        invitee: {
          nickname: 'invitee1',
          email: 'invitee1@example.com',
          id: 1,
        },
        inviteAccepted: false,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
      {
        id: 1,
        inviter: {
          nickname: 'inviter2',
          email: 'inviter2@example.com',
          id: 1,
        },
        teamId: 'team2',
        dashboard: {
          title: 'dashboard2',
          id: 1,
        },
        invitee: {
          nickname: 'invitee2',
          email: 'invitee2@example.com',
          id: 2,
        },
        inviteAccepted: false,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
      {
        id: 2,
        inviter: {
          nickname: 'inviter3',
          email: 'inviter3@example.com',
          id: 2,
        },
        teamId: 'team3',
        dashboard: {
          title: 'dashboard3',
          id: 2,
        },
        invitee: {
          nickname: 'invitee3',
          email: 'invitee3@example.com',
          id: 3,
        },
        inviteAccepted: false,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
      {
        id: 3,
        inviter: {
          nickname: 'inviter4',
          email: 'inviter4@example.com',
          id: 3,
        },
        teamId: 'team4',
        dashboard: {
          title: 'dashboard4',
          id: 3,
        },
        invitee: {
          nickname: 'invitee4',
          email: 'invitee4@example.com',
          id: 4,
        },
        inviteAccepted: false,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
      {
        id: 4,
        inviter: {
          nickname: 'inviter5',
          email: 'inviter5@example.com',
          id: 4,
        },
        teamId: 'team5',
        dashboard: {
          title: 'dashboard5',
          id: 4,
        },
        invitee: {
          nickname: 'invitee5',
          email: 'invitee5@example.com',
          id: 5,
        },
        inviteAccepted: true,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
    ],
  };
  const handleCancelInvite = (userId: any) => {
    console.log(userId, '취소');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>초대 내역</p>
        <div className={styles.pagination}>
          <p className={styles.paginationNumber}>1 페이지 중 1</p>
          <PaginationButton className="" hasNext />
          <ModalInvite />
        </div>
      </div>
      <p className={styles.email}>이메일</p>
      {mockData?.invitations
        .filter((invite) => !invite.inviteAccepted) // inviteAccepted가 false인 초대만 필터링
        .map((invite) => (
          <div className={styles.emailSection}>
            <div className={styles.emailList}>
              <p key={invite.id}>{invite.invitee.email}</p>
              <Button color="white" handleClick={() => handleCancelInvite(invite.id)}>
                취소
              </Button>
            </div>
            <hr className={styles.contour} />
          </div>
        ))}
    </div>
  );
}
