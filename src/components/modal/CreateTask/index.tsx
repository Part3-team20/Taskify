'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './CreateTask.module.scss';
import Modal from '@/components/Modal';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import FileInput from '@/components/common/FileInput';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import ModalInput from '../ModalInput';
import AssigneeInput from '../ModalInput/AssigneeInput';
import useFetchWithToken from '@/hooks/useFetchToken';

interface CreateTaskProps {
  dashboardId: number;
  columnId: number;
}

type Members = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  isOwner: boolean;
};

export default function CreateTask({ dashboardId, columnId }: CreateTaskProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<Members[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotInputChange = (key: string, value: number | string | string[] | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateTask = async () => {
    try {
      const body = { ...form, imageUrl: imageFile ? URL.createObjectURL(imageFile) : '' };
      const newCard = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/cards`, 'POST', body);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetchWithToken(
          `https://sp-taskify-api.vercel.app/4-20/members?dashboardId=${dashboardId}`
        );
        setMembers(response.members);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };

    if (dashboardId) {
      fetchMembers();
    }
  }, [dashboardId, fetchWithToken]);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달열기
      </button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} className={styles.modal}>
        <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
          <h1 className={styles.title}>할 일 생성</h1>
          <label className={styles.formSection}>
            <div className={styles.labelName}>담당자</div>
            <AssigneeInput members={members} onChange={handleNotInputChange} />
          </label>
          <label className={styles.formSection}>
            <div className={styles.labelName}>
              제목<span style={{ color: '#5534DA' }}> *</span>
            </div>
            <ModalInput
              name="title"
              placeholder="제목을 입력해주세요"
              value={form.title}
              onChange={(e) => {
                handleInputChange(e);
                console.log(form);
              }}
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
              onChange={(e) => {
                handleInputChange(e);
                console.log(form);
              }}
            />
          </label>
          <DeadLineInput onChange={handleNotInputChange} />
          <TagInput onChange={handleNotInputChange} />
          <label className={styles.formSection}>
            <div className={styles.labelName}>이미지</div>
            <FileInput setFile={setImageFile} />
          </label>
          <div className={styles.buttons}>
            <ModalSubmitButton isActive className={styles.cancelButton} onClick={handleCloseModal} type="button">
              취소
            </ModalSubmitButton>
            <ModalSubmitButton
              isActive={Boolean(form.title && form.description)}
              onClick={handleCreateTask}
              type="button"
            >
              생성
            </ModalSubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
