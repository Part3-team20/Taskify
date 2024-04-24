'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Column.module.scss';
import Card from '../Card/Card';
import NumberChip from '../common/Chip/NumberChip';
import AddButton from '../common/Button/AddButton';

interface CardProps {
  title: string;
  tags?: string[];
  imageUrl?: string;
  profileImageUrl?: string;
  dueDate?: string;
}

interface ColumnProps {
  title: string;
  cards: CardProps[];
  onAddCard: () => void;
}

export default function Column({ title, cards, onAddCard }: ColumnProps) {
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
        {cards.map((card) => (
          <Card
            title={card.title}
            tags={card.tags}
            profileImageUrl={card.profileImageUrl}
            imageUrl={card.imageUrl}
            dueDate={card.dueDate}
          />
        ))}
      </div>
    </div>
  );
}
