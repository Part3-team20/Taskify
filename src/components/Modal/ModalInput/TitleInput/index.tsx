'use client';

// titleInput

import React, { ChangeEvent, useState } from 'react';
import styles from './TitleInput.module.scss';
import ModalInput from '..';

export default function TitleInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /* TODO 중복 처리  */
  //

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        제목<span>*</span>
      </p>
      <ModalInput placeholder="제목을 입력해주세요." value={inputValue} onChange={handleChange} />
    </div>
  );
}
