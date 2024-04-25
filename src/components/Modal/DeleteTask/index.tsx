'use client';

import React from 'react';
import Modal from '..';
import styles from './DeleteTask.module.scss';
import ModalButton from '../ModalButton/Button/index';

type DeleteTaskProps = {
  isOpen: boolean;
  onClose: () => void;
};

// delete task
export default function DeleteTask({ isOpen, onClose }: DeleteTaskProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: '540', height: '250' }}>
      <div className={styles.container}>
        <div className={styles.deleteText}>
          <span>정말 삭제하시겠습니까?</span>
          <p>한번 삭제하신 내용은 되돌릴수 없습니다.</p>
        </div>
        <div className={styles.buttons}>
          <ModalButton color="white" handleClick={onClose}>
            취소하기
          </ModalButton>
          <ModalButton color="violet" handleClick={onClose}>
            삭제하기
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
}
