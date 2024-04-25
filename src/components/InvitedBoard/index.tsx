'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInvite } from '@/contexts/inviteContext';
import InviteList from './InviteList';
import styles from './InvitedBoard.module.scss';
import InvitedBoardSearchForm from './InvitedBoardSearchForm';

export default function InvitedBoard() {
  const [keyword, setKeyword] = useState<string>('');
  const { invitationData, cursorId, fetchMoreData, isSearched } = useInvite();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && cursorId) {
          fetchMoreData(keyword);
        }
      });
    });

    observer.observe(container);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(container);
    };
  }, [cursorId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      {invitationData?.length === 0 && !isSearched ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <Image fill src="/images/unsubscribe_icon.svg" alt="초대 없음 아이콘" />
          </span>
          <p className={styles.emptyMessage}>아직 초대받은 대시보드가 없어요</p>
        </div>
      ) : (
        <>
          <InvitedBoardSearchForm keyword={keyword} setKeyword={setKeyword} />
          <div ref={containerRef}>
            <InviteList />
          </div>
        </>
      )}
    </div>
  );
}
