'use client';

import React, { useState } from 'react';
import Modal from '..';
import styles from './CreateColumn.module.scss';
import ModalButton from '../ModalButton/Button/index';
import NameInput from '../ModalInput/NameInput';

type CreateColumnProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  existingTitles: string[];
};

export default function CreateColumn({ isOpen, onClose, onCreate, existingTitles }: CreateColumnProps) {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    onCreate(title);
  };

  // 중복 검사에 실패하면 토스트
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: '540px', height: '301px' }}>
      <div className={styles.container}>
        <div className={styles.text}>
          <span>새 컬럼 생성</span>
        </div>
        <div className={styles.input}>
          <NameInput value={title} onChange={(e) => setTitle(e.target.value)} existingTitles={existingTitles} />
        </div>
        <div className={styles.buttons}>
          <ModalButton color="violet" handleClick={handleCreate}>
            생성하기
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
}
