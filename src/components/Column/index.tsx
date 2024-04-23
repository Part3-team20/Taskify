import React from 'react';
import Image from 'next/image';
import styles from './Column.module.scss';
import Card from '../Card/Card';
import NumberChip from '../common/Chip/NumberChip';
import AddButton from '../common/Button/AddButton';

interface ColumnProps {
  title: string;
  cards: [{ title: string; tags?: string[]; profileImageUrl?: string; imageUrl?: string; dueDate?: string }];
  onAddCard: () => void;
}

export default function Column({ title, cards, onAddCard }: ColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>
          <div className={styles.iconCircle} />
          <h2>{title}</h2>
          <NumberChip number={cards.length} />
        </div>
        <Image src="/images/settings_icon.svg" fill alt="설정 아이콘" />
      </div>
      <div className={styles.columnBody}>
        <AddButton handleClick={onAddCard} />
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
