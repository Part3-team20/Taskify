'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CardProps } from '@/types/DashboardTypes';
import { CARDS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import styles from './Column.module.scss';
import Card from '../Card/Card';
import NumberChip from '../common/Chip/NumberChip';
import AddButton from '../common/Button/AddButton';
import ChangeColumn from '../Modal/ChangeColumn';

interface ColumnProps {
  dashboardId: number;
  columnId: number;
  title: string;
  onAddCard: () => void;
  existingTitles: string[];
  onUpdate: (columnId: number, newTitle: string) => void;
  onDelete: (columnId: number) => void;
}

export default function Column({
  columnId,
  title,
  onAddCard,
  onUpdate,
  onDelete,
  existingTitles,
  dashboardId,
}: ColumnProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [cards, setCards] = useState<CardProps[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/cards/${cardId}`, 'DELETE');
      // 성공적으로 삭제 후 상태 업데이트
      setCards((currentCards) => currentCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsResponse = await fetchWithToken(`${CARDS}?columnId=${columnId}`);
        setCards(cardsResponse.cards || []);
      } catch (error) {
        console.error(`Failed to fetch cards for column ${columnId}:`, error);
      }
    };

    fetchCards();
  }, [columnId, fetchWithToken]);

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>
          <div className={styles.title}>
            <div className={styles.iconCircle} />
            <h2>{title}</h2>
          </div>
          <NumberChip number={cards.length} />
        </div>
        <button type="button" onClick={handleOpenEditModal} className={styles.settingButton}>
          <Image className={styles.setting} src="/images/settings_icon.svg" width={24} height={24} alt="설정 아이콘" />
        </button>
      </div>
      <div className={styles.columnBody}>
        <div className={styles.addBtn}>
          <AddButton handleClick={onAddCard} />
        </div>
        {cards.length > 0 &&
          cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              tags={card.tags}
              assignee={card.assignee}
              imageUrl={card.imageUrl}
              dueDate={card.dueDate}
              dashboardId={dashboardId}
              columnId={columnId}
              onDeleteCard={handleDeleteCard}
            />
          ))}
      </div>
      {isEditModalOpen && (
        <ChangeColumn
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          existingTitles={existingTitles}
          onChange={(newTitle) => onUpdate(columnId, newTitle)}
          onDelete={() => onDelete(columnId)}
          columnTitle={title}
        />
      )}
    </div>
  );
}
