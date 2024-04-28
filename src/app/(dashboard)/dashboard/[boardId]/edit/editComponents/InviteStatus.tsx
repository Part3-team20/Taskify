'use client';

// 추후 삭제
import { useEffect, useState } from 'react';
import { useBoardId } from '@/contexts/idContext';
import { DASHBOARDS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import PaginationButton from '@/components/common/Button/PaginationButton';
import ModalInvite from '@/components/Modal/ModalInvite';
import Button from '@/components/common/Button/Button';
import Toast from '@/util/Toast';
import styles from './InviteStatus.module.scss';

interface Invite {
  id: number;
  inviteAccepted: boolean;
  invitee: {
    email: string;
  };
}

export default function InviteStatus() {
  const boardId = useBoardId() || 0;
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
      Toast.success('삭제되었습니다.');
    } catch (err: any) {
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWithToken(`${DASHBOARDS}/${boardId}/invitations`, 'GET');
        setInviteData(responseData.invitations);
      } catch (err: any) {
        const errorMessage = err.toString().substr(7);
        Toast.error(errorMessage);
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
            <ModalInvite btnColor="violet" boardId={boardId} />
          </div>
        </div>
      </div>
      <div className={styles.subcontainer}>
        <p className={styles.email}>이메일</p>
        <div className={styles.onMobileSize}>
          <ModalInvite btnColor="violet" boardId={boardId} />
        </div>
      </div>

      {inviteList
        .filter((invite) => !invite.inviteAccepted)
        .map((invite, index) => (
          <div key={invite.id} className={styles.emailSection}>
            <div className={styles.emailList}>
              <p key={invite.id} className={styles.inviteEmail}>
                {invite.invitee.email}
              </p>
              <Button color="white" handleClick={() => handleCancelInvite(invite.id)} cancel>
                취소
              </Button>
            </div>
            {index !== inviteList.length - 1 && <hr className={styles.contour} />}
          </div>
        ))}
    </div>
  );
}
