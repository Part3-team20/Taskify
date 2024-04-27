'use client';

// 추후 삭제
import { useEffect, useState } from 'react';
import { useBoardId } from '@/contexts/idContext';
import { MEMBERS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import PaginationButton from '@/components/common/Button/PaginationButton';
import Profile from '@/components/common/Profile';
import Button from '@/components/common/Button/Button';
import styles from './MemberManagement.module.scss';

interface Member {
  id: number;
  nickname: string;
  userId: number;
  memberId: number;
}
export default function MemberManagement() {
  const boardId = useBoardId();
  const { fetchWithToken } = useFetchWithToken();
  const [memberData, setMemberData] = useState<Member[]>([]);
  console.log(boardId);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGESIZE = 4;

  const startIndex = (currentPage - 1) * PAGESIZE;
  const endIndex = startIndex + PAGESIZE;
  const memberList = memberData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteMember = async (memberId: number) => {
    try {
      await fetchWithToken(`${MEMBERS}/${memberId}`, 'DELETE');
      // const updatedMemberData = memberData.filter((member) => member.userId !== userId);
      // setMemberData(updatedMemberData);

      setMemberData((prevMember) => prevMember.filter((member) => member.memberId !== memberId));
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWithToken(`${MEMBERS}?page=1&size=20&dashboardId=${boardId}`, 'GET');
        console.log(responseData);
        setMemberData(responseData.members);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [boardId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.memberTitle}>구성원</p>
        <div className={styles.pagination}>
          <p className={styles.pageNum}>
            {Math.ceil(memberData.length / PAGESIZE)} 페이지 중 {currentPage}
          </p>
          <PaginationButton
            className=""
            hasNext={currentPage < Math.ceil(memberData.length / PAGESIZE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <p className={styles.name}>이름</p>
      <div className={styles.member}>
        {memberList.map((member) => (
          <div className={styles.memberSection} key={member.id}>
            <div className={styles.memberList}>
              <div className={styles.profile}>
                {/* <Profile profileImageUrl={member.profileImageUrl} /> */}
                <Profile />
                <p className={styles.memberNickname}>{member.nickname}</p>
              </div>
              <Button color="white" handleClick={() => handleDeleteMember(member.id)} cancel>
                삭제
              </Button>
            </div>
            <hr className={styles.contour} />
          </div>
        ))}
      </div>
    </div>
  );
}
