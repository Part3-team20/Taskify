import React, { useState } from 'react';
import { CardObject } from '@/types/DashboardTypes';
import Image from 'next/image';
import LabelChip from '@/components/common/Chip/LabelChip';
import Profile from '@/components/common/Profile';
import Task from '@/components/Modal/Task';
import styles from './Card.module.scss';
import ModalPortal from '../Modal/ModalPortal';
import ModifyTask from '../Modal/ModifyTask';

interface CardDetail {
  id?: number;
  title: string;
  tags?: string[];
  dueDate?: string;
  description?: string;
  assignee: {
    id?: number;
    nickname?: string;
    profileImageUrl?: string;
  };
  imageUrl?: string;
  dashboardId: number;
  columnId: number;
  onDeleteCard: (cardId: number) => Promise<void>;
  onModifyCard: (modifiedCard: CardObject) => void;
  columnName: string;
}

export default function Card({
  id,
  title,
  tags,
  assignee,
  imageUrl,
  dueDate,
  dashboardId,
  columnId,
  description,
  onDeleteCard,
  onModifyCard,
  columnName,
}: CardDetail) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [isModifyTaskModalOpen, setIsModifyTaskModalOpen] = useState(false);

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModifyOpen = () => {
    setIsModifyTaskModalOpen(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <button type="button" className={styles.card} onClick={handleCardClick}>
        {imageUrl && (
          <div className={styles.image}>
            <Image src={imageUrl} alt="카드 대표 이미지" layout="fill" objectFit="cover" />
          </div>
        )}
        <div className={styles.body}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.container}>
            <div className={styles.tags}>{tags?.map((tag) => <LabelChip key={tag} label={tag} type="tag" />)}</div>
            <div className={styles.bottom}>
              {dueDate && (
                <div className={styles.time}>
                  <Image src="/images/calendar_icon.svg" alt="캘린더 아이콘" width={18} height={18} />
                  <time dateTime={dueDate}>{dueDate}</time>
                </div>
              )}
              <div className={styles.profile}>
                <Profile profileImageUrl={assignee?.profileImageUrl} />
              </div>
            </div>
          </div>
        </div>
      </button>
      <ModalPortal>
        {isModalOpen && id !== undefined ? (
          <Task
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            cardId={id}
            dashboardId={dashboardId}
            columnId={columnId}
            onDeleteCard={onDeleteCard}
            handleModifyOpen={handleModifyOpen}
            columnName={columnName}
          />
        ) : null}
      </ModalPortal>
      <ModalPortal>
        {isModifyTaskModalOpen && id !== undefined ? (
          <ModifyTask
            isOpen={isModifyTaskModalOpen}
            onClose={() => setIsModifyTaskModalOpen(false)}
            dashboardId={Number(dashboardId)}
            columnId={columnId}
            defaultCard={{ id, title, description, tags, dueDate, assignee, imageUrl }}
            onModifyCard={onModifyCard}
          />
        ) : null}
      </ModalPortal>
    </>
  );
}
