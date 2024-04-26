'use client';

import React, { useState } from 'react';

import Modal from '@/components/Modal';
import FileInput from '@/components/common/FileInput';
import TitleInput from '../ModalInput/TitleInput';
import MembersDropDown from '../ModalDropDown/MemberDropDown';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import styles from './CreateTask.module.scss';

export default function CreateTask() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달열기
      </button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} className={styles.modal}>
        <form className={styles.container}>
          <h1 className={styles.title}>할 일 생성</h1>
          <label className={styles.formSection}>
            <div className={styles.labelName}>담당자</div>
            <MembersDropDown />
          </label>
          <TitleInput />
          <label className={styles.formSection}>
            <div className={styles.labelName}>
              설명<span style={{ color: '#5534DA' }}>*</span>
            </div>
            <textarea className={styles.textarea} placeholder="설명을 입력해 주세요" />
          </label>
          <DeadLineInput />
          <TagInput />
          <label className={styles.formSection}>
            <div className={styles.labelName}>이미지</div>
            <FileInput />
          </label>
          <div className={styles.buttons}>
            <ModalSubmitButton isActive className={styles.cancelButton}>
              취소
            </ModalSubmitButton>
            <ModalSubmitButton isActive>생성</ModalSubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
