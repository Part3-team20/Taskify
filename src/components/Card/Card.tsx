import React from 'react';
import Image from 'next/image';

import styles from './Card.module.scss';
import LabelChip from '../common/Chip/LabelChip';
import Profile from '../common/Profile/Profile';

interface CardProps {
  title: string;
  tags?: string[];
  profileImageUrl?: string;
  imageUrl?: string;
  dueDate?: string;
}

export default function Card({ title, tags, profileImageUrl, imageUrl, dueDate }: CardProps) {
  return (
    <div className={styles.card}>
      {imageUrl && (
        <div className={styles.image}>
          {/* <Image src={imageUrl} alt="카드 대표 이미지" layout="fill" objectFit="cover" /> */}
          <img src={imageUrl} alt="카드 대표 이미지" style={{ width: '100%', height: '100%' }} />
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
              <Profile profileImageUrl={profileImageUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
