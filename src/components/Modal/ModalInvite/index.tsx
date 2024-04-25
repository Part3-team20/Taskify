'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal/index';
import Button from '@/components/common/Button/Button';
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
      <Button color="violet" handleClick={() => setIsOpen(true)}>
        <Image className={styles.inviteIcon} src="/images/add_box.svg" width={16} height={16} alt="invite" />
        초대하기
      </Button>
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
