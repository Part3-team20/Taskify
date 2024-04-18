import React from 'react';
import Image from 'next/image';

import styles from './Card.module.scss';
import LabelChip from '../common/chip/LabelChip';
import Profile from '../profile/Profile';

interface CardProps {
  title: string;
  tags?: string[];
  profileImageUrl: string;
  imageUrl?: string;
  dueDate?: string;
}

export default function Card({ title, tags, profileImageUrl, imageUrl, dueDate }: CardProps) {
  return (
    <div className={styles.card}>
      {imageUrl && (
        <div className={styles.image}>
          <Image src={imageUrl} alt="카드 대표 이미지" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.tags}>
        <div className={styles.tags}>
          {tags?.map((tag) => <LabelChip key={tag} size="large" label={tag} type="tag" />)}
        </div>
      </div>
      {dueDate && (
        <div className={styles.time}>
          <Image src="/image/calendar_icon.svg" alt="캘린더 아이콘" />
          <time dateTime={dueDate}>{dueDate}</time>
        </div>
      )}
      <Profile url={profileImageUrl} />
    </div>
  );
}
