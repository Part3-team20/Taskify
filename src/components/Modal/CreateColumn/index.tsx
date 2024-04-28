'use client';

import React, { useEffect, useState } from 'react';
import Modal from '..';
import styles from './CreateColumn.module.scss';
import NameInput from '../ModalInput/NameInput';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import ModalButton from '../ModalButton/Button';

type CreateColumnProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  existingTitles: string[];
};

export default function CreateColumn({ isOpen, onClose, onCreate, existingTitles }: CreateColumnProps) {
  const [title, setTitle] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isUnique = !existingTitles.includes(title);
    setIsValid(title.trim() !== '' && isUnique);
  }, [title, existingTitles]);

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
          <ModalButton color="white" handleClick={onClose}>
            취소
          </ModalButton>
          <ModalSubmitButton isActive={isValid} onClick={handleCreate}>
            생성
          </ModalSubmitButton>
        </div>
      </div>
    </Modal>
  );
}
