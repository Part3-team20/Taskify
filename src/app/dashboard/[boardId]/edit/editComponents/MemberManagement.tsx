'use client';

import { useEffect, useState } from 'react';
import useFetchWithToken from '@/hooks/useFetchToken';
import PaginationButton from '@/components/common/Button/PaginationButton';
import Profile from '@/components/common/Profile/Profile';
import Button from '@/components/common/Button/Button';
import styles from './MemberManagement.module.scss';

interface Member {
  id: number;
  nickname: string;
  userId: number;
}
export default function MemberManagement({ boardId }: { boardId: number }) {
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

  const handleDeleteMember = async (userId: number) => {
    console.log(userId, '해당 멤버 삭제');
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/members/${userId}`, 'DELETE');
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWithToken(
          `https://sp-taskify-api.vercel.app/4-20/members?page=1&size=20&dashboardId=${boardId}`,
          'GET'
        );
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
              <Button color="white" handleClick={() => handleDeleteMember(member.userId)}>
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
