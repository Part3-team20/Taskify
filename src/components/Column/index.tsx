'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Column.module.scss';
import Card from '../Card/Card';
import NumberChip from '../common/Chip/NumberChip';
import AddButton from '../common/Button/AddButton';
import useFetchWithToken from '@/hooks/useFetchToken';
import { CardProps } from '@/types/DashboardTypes';

interface ColumnProps {
  dashboardId: number;
  columnId: number;
  title: string;
  onAddCard: () => void;
}

export default function Column({ dashboardId, columnId, title, onAddCard }: ColumnProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsResponse = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/cards?columnId=${columnId}`);
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
        <Image className={styles.setting} src="/images/settings_icon.svg" width={24} height={24} alt="설정 아이콘" />
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
            />
          ))}
      </div>
    </div>
  );
}
