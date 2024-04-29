'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CardObject } from '@/types/DashboardTypes';
import { CARDS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import styles from './Column.module.scss';
import Card from '../Card/Card';
import NumberChip from '../common/Chip/NumberChip';
import AddButton from '../common/Button/AddButton';
import ChangeColumn from '../Modal/ChangeColumn';
import CreateTask from '../Modal/CreateTask';

interface ColumnProps {
  dashboardId: number;
  columnId: number;
  title: string;
  existingTitles: string[];
  onUpdate: (columnId: number, newTitle: string) => void;
  onDelete: (columnId: number) => void;
}

export default function Column({ columnId, title, onUpdate, onDelete, existingTitles, dashboardId }: ColumnProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [cards, setCards] = useState<CardObject[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<CardObject[]>([]);
  const cardsPerPage = 3;
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [cursorId, setCursorId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const handleCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  const fetchInitialCards = async () => {
    try {
      const response = await fetchWithToken(`${CARDS}?size=${cardsPerPage}&columnId=${columnId}`);
      setCards(response.cards);
      setVisibleCards(response.cards.slice(0, cardsPerPage));
      setTotalCount(response.totalCount);
      setCursorId(response.cursorId);
    } catch (error) {
      console.error(`Failed to fetch cards:`, error);
    }
  };

  const handleShowMoreCards = async () => {
    if (!cursorId) return;
    try {
      const response = await fetchWithToken(`${CARDS}?size=${cardsPerPage}&columnId=${columnId}&cursorId=${cursorId}`);
      const newCards = [...cards, ...response.cards];
      setCards(newCards);
      setVisibleCards(newCards);
      setCursorId(response.cursorId);
      console.log(newCards);
    } catch (error) {
      console.error('Failed to load more cards:', error);
    }
  };

  useEffect(() => {
    fetchInitialCards();
  }, [columnId]);

  const handleAddCard = (newCard: any) => {
    setCards((prevCards) => [...prevCards, newCard]);
    setVisibleCards((prevVisible) => [...prevVisible, newCard]);
    handleCloseCreateTaskModal();
  };

  const handleModifyCard = (modifiedCard: CardObject) => {
    const updatedCards = cards.map((card) => (card.id === modifiedCard.id ? modifiedCard : card));
    setCards(updatedCards);
    setVisibleCards((updatedVisible) =>
      updatedVisible.map((card) => (card.id === modifiedCard.id ? modifiedCard : card))
    );
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/cards/${cardId}`, 'DELETE');
      // 성공적으로 삭제 후 상태 업데이트
      setCards((currentCards) => currentCards.filter((card) => card.id !== cardId));
      setVisibleCards((currentVisible) => currentVisible.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>
          <div className={styles.title}>
            <div className={styles.iconCircle} />
            <h2>{title}</h2>
          </div>
          <NumberChip number={totalCount} />
        </div>
        <button type="button" onClick={handleOpenEditModal} className={styles.settingButton}>
          <Image className={styles.setting} src="/images/settings_icon.svg" width={24} height={24} alt="설정 아이콘" />
        </button>
      </div>
      <div className={styles.columnBody}>
        <div className={styles.addBtn}>
          <AddButton handleClick={handleOpenCreateTaskModal} />
        </div>
        {/* visibleCards 배열을 렌더링하여 보여줌 */}
        {visibleCards.map((card) => (
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
            description={card.description}
            onDeleteCard={handleDeleteCard}
            onModifyCard={handleModifyCard}
            columnName={title}
          />
        ))}
        {totalCount > visibleCards.length && (
          <button type="button" onClick={handleShowMoreCards} className={styles.showMoreButton}>
            + 더보기
          </button>
        )}
      </div>
      {isCreateTaskModalOpen && (
        <CreateTask
          dashboardId={dashboardId}
          columnId={columnId}
          isOpen={isCreateTaskModalOpen}
          onClose={handleCloseCreateTaskModal}
          onAddCard={handleAddCard}
        />
      )}
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
