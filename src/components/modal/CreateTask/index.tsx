'use client';

import React, { ChangeEvent, useState } from 'react';
import styles from './CreateTask.module.scss';
import Modal from '@/components/Modal';
import MembersDropDown from '../ModalDropDown/MemberDropDown';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import FileInput from '@/components/common/FileInput';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import ModalInput from '../ModalInput';

interface CreateTaskProps {
  dashboardId: number;
  columnId: number;
}

export default function CreateTask({ dashboardId, columnId }: CreateTaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    assigneeUserId: 0,
    dashboardId,
    columnId,
    title: '',
    description: '',
    dueDate: '',
    tags: [''],
    imageUrl: '',
  });
  const [imageFile, setFile] = useState<File | null>(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          <label className={styles.formSection}>
            <div className={styles.labelName}>
              제목<span style={{ color: '#5534DA' }}> *</span>
            </div>
            <ModalInput
              name="title"
              placeholder="제목을 입력해주세요"
              value={form.title}
              onChange={handleInputChange}
              style={{ fontSize: '0.875rem' }}
            />
          </label>
          <label className={styles.formSection}>
            <div className={styles.labelName}>
              설명<span style={{ color: '#5534DA' }}> *</span>
            </div>
            <textarea
              name="description"
              className={styles.textarea}
              placeholder="설명을 입력해 주세요"
              value={form.description}
              onChange={handleInputChange}
            />
          </label>
          <DeadLineInput />
          <TagInput />
          <label className={styles.formSection}>
            <div className={styles.labelName}>이미지</div>
            <FileInput setFile={setFile} />
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
