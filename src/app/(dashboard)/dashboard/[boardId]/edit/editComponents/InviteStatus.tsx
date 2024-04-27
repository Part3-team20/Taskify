'use client';

// 추후 삭제
import { useEffect, useState } from 'react';
import { useBoardId } from '@/contexts/idContext';
import { DASHBOARDS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import PaginationButton from '@/components/common/Button/PaginationButton';
import ModalInvite from '@/components/Modal/ModalInvite';
import Button from '@/components/common/Button/Button';
import styles from './InviteStatus.module.scss';

interface Invite {
  id: number;
  inviteAccepted: boolean;
  invitee: {
    email: string;
  };
}

export default function InviteStatus() {
  const boardId = useBoardId();
  const [inviteData, setInviteData] = useState<Invite[]>([]);
  const { fetchWithToken } = useFetchWithToken();

  const [currentPage, setCurrentPage] = useState(1);
  const PAGESIZE = 4;
  const startIndex = (currentPage - 1) * PAGESIZE;
  const endIndex = startIndex + PAGESIZE;
  const inviteList = inviteData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCancelInvite = async (userId: number) => {
    try {
      await fetchWithToken(`${DASHBOARDS}/${boardId}/invitations/${userId}`, 'DELETE');
      setInviteData((prevInvites) => prevInvites.filter((invite) => invite.id !== userId));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWithToken(`${DASHBOARDS}}/${boardId}/invitations`, 'GET');
        setInviteData(responseData.invitations);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [boardId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>초대 내역</p>
        <div className={styles.pagination}>
          <p className={styles.paginationNumber}>
            {Math.ceil(inviteData.length / PAGESIZE)} 페이지 중 {currentPage}
          </p>
          <PaginationButton
            className=""
            hasNext={currentPage < Math.ceil(inviteData.length / PAGESIZE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className={styles.onPcSize}>
            <ModalInvite />
          </div>
        </div>
      </div>
      <div className={styles.subcontainer}>
        <p className={styles.email}>이메일</p>
        <div className={styles.onMobileSize}>
          <ModalInvite />
        </div>
      </div>

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
