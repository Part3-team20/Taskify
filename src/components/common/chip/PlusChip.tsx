import React from 'react';
import Image from 'next/image';
import styles from './plusChip.module.scss';

interface PlusChipProps {
  type: 'small' | 'large';
}

export default function PlusChip({ type }: PlusChipProps): JSX.Element {
  const chipClass = type === 'small' ? styles.small : styles.large;

  return (
    <div className={`${styles.plusChip} ${chipClass}`}>
      <Image src="/images/add_btn.svg" alt="추가 버튼" width={16} height={16} />
    </div>
  );
}
