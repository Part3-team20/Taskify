'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import FileInput from '@/components/common/FileInput';
import TitleInput from '../ModalInput/TitleInput';
import MembersDropDown from '../ModalDropDown/MemberDropDown';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import styles from './ModifyTask.module.scss';

interface ModifyTaskProps {
  columnId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModifyTask({ columnId, isOpen, onClose }: ModifyTaskProps) {
  const [form, setForm] = useState({
    columnId: 0,
    assigneeUserId: 0,
    title: 'string',
    description: 'string',
    dueDate: 'string',
    tags: ['string'],
    imageUrl: 'string',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>할 일 수정</h1>
        <div className={styles.topSection}>
          <label className={styles.formSection}>
            <div className={styles.labelName}>상태</div>
            <MembersDropDown />
          </label>
          <label className={styles.formSection}>
            <div className={styles.labelName}>담당자</div>
            <MembersDropDown />
          </label>
        </div>
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
          <ModalSubmitButton isActive className={styles.cancelButton} onClick={onClose} type="button">
            취소
          </ModalSubmitButton>
          <ModalSubmitButton type="button" isActive>
            생성
          </ModalSubmitButton>
        </div>
      </form>
    </Modal>
  );
}
