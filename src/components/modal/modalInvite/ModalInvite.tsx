'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import Modal from '../Modal';

import styles from './ModalInvite.module.scss';

export default function ModalInvite() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handlePostInvite = () => {
    /* TODO : 초대하기  로직 */
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달클릭
      </button>
      <Modal isOpen={isOpen} onClose={handleClickCancel} style={{ width: '33.75rem', height: '17.25rem' }}>
        <div className={styles.modalContainer}>
          <p className={styles.invite}>초대하기</p>
          <p className={styles.email}>이메일</p>
          <input className={styles.emailInput} placeholder="이메일 입력" />
          <div className={styles.btnContainer}>
            <Button color="white" cancel handleClick={handleClickCancel}>
              취소
            </Button>
            <Button color="violet" invite handleClick={handlePostInvite}>
              초대
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
