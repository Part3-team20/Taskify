'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import styles from './ChangeColumn.module.scss';
import ModalButton from '../ModalButton/Button/index';
import NameInput from '../ModalInput/NameInput';
import ConfirmModal from '../ConfirmModal';
import ModalSubmitButton from '../ModalButton/SubmitButton';

type ChangeColumnProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (newTitle: string) => void;
  onDelete: () => void;
  existingTitles: string[];
  columnTitle: string;
};

export default function ChangeColumn({
  columnTitle,
  isOpen,
  onClose,
  onChange,
  onDelete,
  existingTitles,
}: ChangeColumnProps) {
  const [title, setTitle] = useState(columnTitle);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = () => {
    onChange(title);
    onClose();
  };

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    const isTitleValid = title.trim() !== '' && !existingTitles.includes(title);
    setIsValid(isTitleValid);
  }, [title, existingTitles]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style={{
        width: 'auto',
        height: '301px',
        margin: '20px',
      }}
    >
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
          <ModalSubmitButton isActive={isValid} onClick={handleChange}>
            변경
          </ModalSubmitButton>
        </div>
      </div>
      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete}>
        <span className={styles.modalText}>정말로 삭제하시겠습니까?</span>
        <p className={styles.modalSubText}>컬럼의 모든 카드가 삭제됩니다.</p>
      </ConfirmModal>
    </Modal>
  );
}
