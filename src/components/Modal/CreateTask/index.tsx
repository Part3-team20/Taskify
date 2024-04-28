'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './CreateTask.module.scss';
import Modal from '@/components/Modal';
import FileInput from '@/components/common/FileInput';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import ModalSubmitButton from '../ModalButton/SubmitButton';
import ModalInput from '../ModalInput';
import AssigneeInput from '../ModalInput/AssigneeInput';
import useFetchWithToken from '@/hooks/useFetchToken';
import Toast from '@/util/Toast';

interface CreateTaskProps {
  dashboardId: number;
  columnId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface Members {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  isOwner: boolean;
}

export default function CreateTask({ dashboardId, columnId, isOpen, onClose }: CreateTaskProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [members, setMembers] = useState<Members[]>([]);
  const [imageFile, setImageFile] = useState<string | null | undefined>(null);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotInputChange = (key: string, value: number | string | string[] | null | undefined) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateTask = async () => {
    try {
      const body = { ...form, imageUrl: imageFile };
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/cards`, 'POST', body);
      Toast.success('카드를 생성했습니다');
      onClose();
    } catch (err: any) {
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetchWithToken(
          `https://sp-taskify-api.vercel.app/4-20/members?dashboardId=${dashboardId}`
        );
        setMembers(response.members);
      } catch (error: any) {
        console.error('Failed to fetch members:', error);
      }
    };

    if (dashboardId) {
      fetchMembers();
    }
  }, [dashboardId, fetchWithToken]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
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

        <DeadLineInput onChange={handleNotInputChange} />

        <TagInput onChange={handleNotInputChange} />

        <div className={styles.formSection}>
          <div className={styles.labelName}>이미지</div>
          <FileInput setFile={setImageFile} usageLocation="modal" defaultImage={null} columnId={columnId} />
        </div>

        <div className={styles.buttons}>
          <ModalSubmitButton isActive className={styles.cancelButton} onClick={onClose} type="button">
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
  );
}
