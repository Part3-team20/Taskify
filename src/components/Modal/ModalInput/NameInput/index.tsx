'use client';

import React, { ChangeEvent, useState } from 'react';
import ModalInput from '@/components/Modal/ModalInput';
import styles from './NameInput.module.scss';
import ModalInput from '../../ModalInput';

type NameInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  existingTitles: string[];
};

export default function NameInput({ value, onChange, existingTitles }: NameInputProps) {
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setIsDuplicate(existingTitles.includes(newValue));
    onChange(e);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>이름</p>
      <div className={styles.input}>
        <ModalInput
          placeholder="새로운 프로젝트"
          value={value}
          onChange={handleChange}
          style={{ height: 48, maxWidth: 484, width: '100%' }}
        />
      </div>
      {isDuplicate && <p className={styles.error}>중복된 컬럼 이름 입니다.</p>}
    </div>
  );
}
