'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import useFetchWithToken from '@/hooks/useFetchToken';
import Modal from '@/components/Modal';
import { CardProps } from '@/types/DashboardTypes';
import { CARDS } from '@/constants/ApiUrl';
import LabelChip from '@/components/common/Chip/LabelChip';
import Profile from '@/components/common/Profile';
import Comments from './Comment/Comments';
import KebobMenu from './Kebob/KebobMenu';
import styles from './Task.module.scss';

interface TaskProps {
  dashboardId: number;
  columnId: number;
  cardId: number;
  onClose: () => void;
  isOpen: boolean;
  onDeleteCard: (cardId: number) => Promise<void>;
  handleModifyOpen: () => void;
  columnName: string;
}

export default function Task({
  dashboardId,
  columnId,
  cardId,
  onClose,
  isOpen,
  onDeleteCard,
  handleModifyOpen,
  columnName,
}: TaskProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [cardDetails, setCardDetails] = useState<CardProps | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleButtonClose = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const fetchCardDetails = async () => {
      try {
        const response = await fetchWithToken(`${CARDS}/${cardId}`);
        setCardDetails(response); // 상태에 카드 정보 저장
      } catch (error) {
        console.error('Failed to fetch card details:', error);
      }
    };

    fetchCardDetails();
  }, [cardId, isOpen, fetchWithToken]);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!cardDetails) return null; // 데이터가 없는 경우 아무것도 표시하지 않음

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        style={{ width: 'auto', height: 'auto', maxHeight: '730px', overflow: 'hidden', margin: '20px' }}
      >
        <div className={styles.taskModal} ref={scrollRef}>
          <div className={styles.modalHeader}>
            <h2>{cardDetails.title}</h2>
            <div className={styles.buttons}>
              <div className={styles.kabob}>
                <KebobMenu onDelete={() => onDeleteCard(cardId)} handleModifyOpen={handleModifyOpen} />
              </div>
              <button onClick={handleButtonClose} type="button">
                <Image src="/images/close_icon.svg" alt="닫기 버튼" width={32} height={32} />
              </button>
            </div>
          </div>
          <div>
            <article className={styles.modalContainer}>
              <div className={styles.contentArea}>
                <div className={styles.labels}>
                  <LabelChip type="columns" label={columnName} />
                  {/* eslint-disable-next-line react/self-closing-comp */}
                  <span className={styles.divide}></span>
                  {/* 컬럼은 다른 props와 달리 컬럼 id로 find를 해야해서 임의로 값 생성 */}
                  <div className={styles.tags}>
                    {cardDetails.tags && cardDetails.tags.map((tag) => <LabelChip key={tag} type="tag" label={tag} />)}
                  </div>
                </div>
                <div className={styles.contents}>{cardDetails.description}</div>
                {cardDetails.imageUrl && (
                  <div className={styles.imgBox}>
                    <Image src={cardDetails.imageUrl} alt="본문 첨부 이미지" layout="fill" objectFit="cover" />
                  </div>
                )}
                <div className={styles.comments}>
                  <Comments cardId={cardId} columnId={columnId} dashboardId={dashboardId} />
                </div>
              </div>
              <div className={styles.information}>
                <ul>
                  {cardDetails.assignee && (
                    <li className={styles.infoBox}>
                      <span className={styles.subtitle}>담당자</span>
                      <div className={styles.assignee}>
                        <Profile profileImageUrl={cardDetails.assignee.profileImageUrl} />
                        <span className={styles.name}>{cardDetails.assignee.nickname}</span>
                      </div>
                    </li>
                  )}
                  <li className={styles.infoBox}>
                    <span className={styles.subtitle}>마감일</span>
                    <span className={styles.dueDate}>{cardDetails.dueDate}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </Modal>
    </div>
  );
}
