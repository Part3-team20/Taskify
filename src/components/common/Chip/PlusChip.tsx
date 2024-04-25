import React from 'react';
import Image from 'next/image';
import styles from './PlusChip.module.scss';

export default function PlusChip(): JSX.Element {
  return (
    <div className={`${styles.plusChip}`}>
      <Image src="/images/add_btn.svg" alt="추가 버튼" width={16} height={16} />
    </div>
  );
}
