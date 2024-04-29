'use client';

import React from 'react';
import Modal from '@/components/Modal';
import styles from './LogoutModal.module.scss';
import ModalButton from '../ModalButton/Button/index';

type LogoutProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: '540', height: '250' }}>
      <div className={styles.container}>
        <div className={styles.text}>정말 로그아웃 하시겠습니까?</div>
        <div className={styles.buttons}>
          <ModalButton color="white" handleClick={onClose}>
            취소하기
          </ModalButton>
          <ModalButton color="violet" handleClick={onConfirm}>
            로그아웃
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
}
