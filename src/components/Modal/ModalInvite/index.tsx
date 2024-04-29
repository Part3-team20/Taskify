'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
// import { useBoardId } from '@/contexts/idContext';
import { DASHBOARDS } from '@/constants/ApiUrl';
import useFetchWithToken from '@/hooks/useFetchToken';
import Image from 'next/image';
import Modal from '@/components/Modal';
import Toast from '@/util/Toast';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import ModalButton from '../ModalButton/Button';
import styles from './ModalInvite.module.scss';

interface ModalInviteProps {
  btnColor: 'violet' | 'white';
  boardId: number | null;
}

export default function ModalInvite({ btnColor, boardId }: ModalInviteProps) {
  // const boardId = useBoardId();
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
    if (!boardId) return;

    try {
      const responseInviteData = await fetchWithToken(`${DASHBOARDS}/${boardId}/invitations`);

      if (responseInviteData && responseInviteData.invitations) {
        const isDuplicationInvitation = responseInviteData.invitations.map(
          (invitation: any) => invitation.invitee.email
        );
        if (!isDuplicationInvitation.includes(emailValue)) {
          await fetchWithToken(`${DASHBOARDS}/${boardId}/invitations`, 'POST', {
            email: emailValue,
          });
          window.location.reload();
          Toast.success('해당 유저를 초대하였습니다');
        } else {
          Toast.error('이미 초대된 이메일입니다.');
        }
      } else {
        Toast.error('잠시 후 다시 시도해주세요.');
      }
    } catch (err: any) {
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePostInvite();
    }
  };

  return (
    <div>
      <button type="button" className={`${styles.inviteBtn} ${styles[btnColor]}`} onClick={() => setIsOpen(true)}>
        <Image className={styles.inviteIcon} src="/images/add_box.svg" width={16} height={16} alt="invite" />
        초대하기
      </button>
      <Modal isOpen={isOpen} onClose={handleClickCancel} style={{ width: 'auto', height: 'auto' }}>
        <form className={styles.modalContainer} onSubmit={handlePostInvite}>
          <p className={styles.invite}>초대하기</p>
          <p className={styles.email}>이메일</p>
          <input
            className={styles.emailInput}
            placeholder="이메일 입력"
            value={emailValue}
            onChange={handleChangeEmail}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.btnContainer}>
            <ModalButton color="white" handleClick={handleClickCancel}>
              취소
            </ModalButton>
            <ModalSubmitButton isActive={!!emailValue.trim()}>초대</ModalSubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
