'use client';

import { useState } from 'react';
import PaginationButton from '@/components/common/Button/PaginationButton';
import Profile from '@/components/common/Profile/Profile';
import Button from '@/components/common/Button/Button';
import styles from './MemberManagement.module.scss';

export default function MemberManagement(id: any) {
  console.log(id);
  const mockData = {
    members: [
      {
        id: 0,
        userId: 0,
        email: 'user0@example.com',
        nickname: 'user0',
        profileImageUrl: 'https://example.com/profile0.jpg',
        createdAt: '2024-04-22T06:42:35.077Z',
        updatedAt: '2024-04-22T06:42:35.077Z',
        isOwner: true,
      },
      {
        id: 1,
        userId: 1,
        email: 'user1@example.com',
        nickname: 'user1',
        profileImageUrl: 'https://example.com/profile1.jpg',
        createdAt: '2024-04-22T06:42:35.077Z',
        updatedAt: '2024-04-22T06:42:35.077Z',
        isOwner: false,
      },
      {
        id: 2,
        userId: 2,
        email: 'user2@example.com',
        nickname: 'user2',
        profileImageUrl: 'https://example.com/profile2.jpg',
        createdAt: '2024-04-22T06:42:35.077Z',
        updatedAt: '2024-04-22T06:42:35.077Z',
        isOwner: false,
      },
      {
        id: 3,
        userId: 3,
        email: 'user3@example.com',
        nickname: 'user3',
        profileImageUrl: 'https://example.com/profile3.jpg',
        createdAt: '2024-04-22T06:42:35.077Z',
        updatedAt: '2024-04-22T06:42:35.077Z',
        isOwner: false,
      },
      {
        id: 4,
        userId: 4,
        email: 'user4@example.com',
        nickname: 'user4',
        profileImageUrl: 'https://example.com/profile4.jpg',
        createdAt: '2024-04-22T06:42:35.077Z',
        updatedAt: '2024-04-22T06:42:35.077Z',
        isOwner: false,
      },
    ],
    totalCount: 4,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // 페이지당 보여질 멤버 수
  const totalPages = Math.ceil(mockData.members.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMembers = mockData.members.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteMember = (userId: any) => {
    console.log(userId, '해당 멤버 삭제');
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>구성원</p>
        <div className={styles.pagination}>
          <p>{`${totalPages} 페이지 중 ${currentPage}`}</p>
          <Button color="white" handleClick={() => handlePageChange(currentPage - 1)}>
            이전
          </Button>
          <Button color="white" handleClick={() => handlePageChange(currentPage + 1)}>
            다음
          </Button>
        </div>
      </div>
      <p className={styles.name}>이름</p>
      <div className={styles.member}>
        {currentMembers.map((member) => (
          <div className={styles.memberSection}>
            <div className={styles.memberList}>
              <div className={styles.profile}>
                <Profile />
                <p key={member.id}>{member.nickname}</p>
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
