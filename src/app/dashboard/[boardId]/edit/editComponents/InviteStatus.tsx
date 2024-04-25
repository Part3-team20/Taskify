'use client';

import { useState } from 'react';
import PaginationButton from '@/components/common/Button/PaginationButton';
import ModalInvite from '@/components/Modal/ModalInvite';
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
        inviteAccepted: false,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
      {
        id: 5,
        inviter: {
          nickname: 'inviter6',
          email: 'inviter6@example.com',
          id: 5,
        },
        teamId: 'team6',
        dashboard: {
          title: 'dashboard6',
          id: 5,
        },
        invitee: {
          nickname: 'invitee6',
          email: 'invitee6@example.com',
          id: 6,
        },
        inviteAccepted: false,
        createdAt: '2024-04-22T07:57:04.979Z',
        updatedAt: '2024-04-22T07:57:04.979Z',
      },
    ],
  };
  const handleCancelInvite = (userId: any) => {
    console.log(userId, '취소');
  };
  const [currentPage, setCurrentPage] = useState(1);
  const PAGESIZE = 4;
  const startIndex = (currentPage - 1) * PAGESIZE;
  const endIndex = startIndex + PAGESIZE;
  const inviteList = mockData.invitations.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>초대 내역</p>
        <div className={styles.pagination}>
          <p className={styles.paginationNumber}>
            {Math.ceil(mockData.invitations.length / PAGESIZE)} 페이지 중 {currentPage}
          </p>
          <PaginationButton
            className=""
            hasNext={currentPage < Math.ceil(mockData.invitations.length / PAGESIZE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <ModalInvite />
        </div>
      </div>
      <p className={styles.email}>이메일</p>
      {inviteList
        .filter((invite) => !invite.inviteAccepted)
        .map((invite) => (
          <div className={styles.emailSection}>
            <div className={styles.emailList}>
              <p key={invite.id} className={styles.inviteEmail}>
                {invite.invitee.email}
              </p>
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
