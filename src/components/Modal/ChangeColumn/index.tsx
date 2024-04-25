'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import styles from './ChangeColumn.module.scss';
import ModalButton from '../ModalButton/Button/index';
import NameInput from '../ModalInput/NameInput';

type ChangeColumnProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (newTitle: string) => void;
  onDelete: () => void;
  existingTitles: string[];
};

export default function ChangeColumn({ isOpen, onClose, onChange, onDelete, existingTitles }: ChangeColumnProps) {
  const [title, setTitle] = useState('');

  const handleChange = () => {
    onChange(title);
    onClose(); // 모달 닫기 추가
  };

  const handleDelete = () => {
    onDelete();
    onClose(); // 모달 닫기 추가
  };

  // 중복 검사에 실패하면 토스트
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: '540px', height: '301px' }}>
      <div className={styles.container}>
        <div className={styles.text}>
          <span>컬럼 관리</span>
        </div>
        <div className={styles.input}>
          <NameInput value={title} onChange={(e) => setTitle(e.target.value)} existingTitles={existingTitles} />
        </div>
        <button className={styles.delete} type="button" onClick={handleDelete}>
          삭제하기
        </button>
        <div className={styles.buttons}>
          <ModalButton color="white" handleClick={onClose}>
            취소
          </ModalButton>
          <ModalButton color="violet" handleClick={handleChange}>
            변경
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
}
