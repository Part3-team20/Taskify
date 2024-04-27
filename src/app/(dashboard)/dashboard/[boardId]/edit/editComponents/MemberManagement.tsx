'use client';

// 추후 삭제
import { useEffect, useState } from 'react';
import { useBoardId } from '@/contexts/idContext';
import { MEMBERS } from '@/constants/ApiUrl';
import Image from 'next/image';
import useFetchWithToken from '@/hooks/useFetchToken';
import PaginationButton from '@/components/common/Button/PaginationButton';
import Profile from '@/components/common/Profile';
import Button from '@/components/common/Button/Button';
import Toast from '@/util/Toast';
import styles from './MemberManagement.module.scss';

interface Member {
  id: number;
  nickname: string;
  userId: number;
  memberId: number;
  profileImageUrl: string;
}
export default function MemberManagement({ createUserId }: { createUserId: number }) {
  const boardId = useBoardId();
  const { fetchWithToken } = useFetchWithToken();
  const [memberData, setMemberData] = useState<Member[]>([]);

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
      // 10582
      await fetchWithToken(`${MEMBERS}/${memberId}`, 'DELETE');
      // const updatedMemberData = memberData.filter((member) => member.memberId !== memberId);
      // setMemberData(updatedMemberData);
      // setMemberData((prevMember) => prevMember.filter((member) => member.memberId !== memberId));
      window.location.reload();
    } catch (err: any) {
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWithToken(`${MEMBERS}?page=1&size=20&dashboardId=${boardId}`, 'GET');
        setMemberData(responseData.members);
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
        {memberList.map((member, index) => (
          <div className={styles.memberSection} key={member.id}>
            <div className={styles.memberList}>
              <div className={styles.profile}>
                <Profile profileImageUrl={member.profileImageUrl} />
                <p className={styles.memberNickname}>{member.nickname}</p>
              </div>
              {member.userId !== createUserId ? (
                <Button color="white" handleClick={() => handleDeleteMember(member.id)}>
                  삭제
                </Button>
              ) : (
                <div className={styles.crownIcon}>
                  <Image src="/images/crown_icon.svg" alt="왕관 이미지" width={20} height={20} />
                </div>
              )}
            </div>
            {index !== memberList.length - 1 && <hr className={styles.contour} />}
          </div>
        ))}
      </div>
    </div>
  );
}
