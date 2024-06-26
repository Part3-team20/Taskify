'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import FileInput from '@/components/common/FileInput';
import useFetchWithToken from '@/hooks/useFetchToken';
import Toast from '@/util/Toast';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import ModalInput from '../ModalInput';
import AssigneeInput from '../ModalInput/AssigneeInput';
import ModalButton from '../ModalButton/Button';
import styles from './CreateTask.module.scss';

interface CreateTaskProps {
  dashboardId: number;
  columnId: number;
  isOpen: boolean;
  onClose: () => void;
  onAddCard: any;
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

interface Form {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
}

export default function CreateTask({ dashboardId, columnId, isOpen, onClose, onAddCard }: CreateTaskProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [members, setMembers] = useState<Members[]>([]);
  const [imageFile, setImageFile] = useState<string | null | undefined>(undefined);
  const [form, setForm] = useState<Form>({
    dashboardId: Number(dashboardId),
    columnId,
    title: '',
    description: '',
    tags: [],
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
      const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/cards`, 'POST', body);
      Toast.success('카드를 생성했습니다');
      onAddCard(response);
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

        <div className={styles.formSection}>
          <div className={styles.labelName}>담당자</div>
          <AssigneeInput members={members} onChange={handleNotInputChange} />
        </div>

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
          <ModalButton handleClick={onClose} color="white">
            취소
          </ModalButton>
          <ModalButton color="violet" handleClick={handleCreateTask} disabled={!form.title || !form.description}>
            생성
          </ModalButton>
        </div>
      </form>
    </Modal>
  );
}
