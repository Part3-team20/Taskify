'use client';

import { ChangeEvent, useState } from 'react';
import useFetchWithToken from '@/hooks/useFetchToken';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import Modal from '../Modal';
import styles from './ModalInvite.module.scss';

export default function ModalInvite({ boardId }: { boardId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const { fetchWithToken } = useFetchWithToken();

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePostInvite = async () => {
    /* TODO : 초대하기  로직 */
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/dashboards/${boardId}/invitations`, 'POST', {
        email: emailValue,
      });
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
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
          <input
            className={styles.emailInput}
            placeholder="이메일 입력"
            value={emailValue}
            onChange={handleChangeEmail}
          />
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
