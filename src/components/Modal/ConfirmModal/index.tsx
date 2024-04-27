'use client';

import React, { ReactNode } from 'react';
import Modal from '@/components/Modal';
import styles from './ConfirmModal.module.scss';
import ModalButton from '../ModalButton/Button/index';

type ConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
};

export default function ConfirmModal({ isOpen, onClose, onConfirm, children }: ConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: '540', height: '250' }}>
      <div className={styles.container}>
        <div className={styles.text}>{children}</div>
        <div className={styles.buttons}>
          <ModalButton color="white" handleClick={onClose}>
            취소하기
          </ModalButton>
          <ModalButton color="violet" handleClick={onConfirm}>
            삭제하기
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
}
