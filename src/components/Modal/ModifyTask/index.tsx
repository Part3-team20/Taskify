'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { CardObject } from '@/types/DashboardTypes';
import FileInput from '@/components/common/FileInput';
import Toast from '@/util/Toast';
import useFetchWithToken from '@/hooks/useFetchToken';
import DeadLineInput from '../ModalInput/DeadlineInput';
import TagInput from '../ModalInput/TagInput';
import AssigneeInput from '../ModalInput/AssigneeInput';
import StateInput from '../ModalInput/StateInput';
import ModalInput from '../ModalInput';
import ModalButton from '../ModalButton/Button';
import styles from './ModifyTask.module.scss';

interface ModifyTaskProps {
  defaultCard: CardObject;
  columnId: number;
  dashboardId: number;
  isOpen: boolean;
  onClose: () => void;
  onModifyCard: (modifiedCard: CardObject) => void;
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

interface Columns {
  id: number;
  title: string;
  teamId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface Form {
  assigneeUserId?: number;
  columnId: number;
  title: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
}

export default function ModifyTask({
  defaultCard,
  columnId,
  dashboardId,
  isOpen,
  onClose,
  onModifyCard,
}: ModifyTaskProps) {
  const { fetchWithToken } = useFetchWithToken();
  const [members, setMembers] = useState<Members[]>([]);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [imageFile, setImageFile] = useState<string | null | undefined>(undefined);
  const [form, setForm] = useState<Form>({
    columnId,
    assigneeUserId: defaultCard.assignee?.id,
    title: defaultCard.title,
    description: defaultCard.description,
    dueDate: defaultCard?.dueDate,
    tags: defaultCard?.tags,
    imageUrl: defaultCard?.imageUrl,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotInputChange = (key: string, value: number | string | string[] | null | undefined) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleModifyTask = async () => {
    try {
      const body = { ...form, imageUrl: imageFile };
      const response = await fetchWithToken(
        `https://sp-taskify-api.vercel.app/4-20/cards/${defaultCard.id}`,
        'PUT',
        body
      );
      Toast.success('카드를 수정했습니다');
      onModifyCard(response);
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

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetchWithToken(
          `https://sp-taskify-api.vercel.app/4-20/columns?dashboardId=${dashboardId}`
        );
        setColumns(response.data);
      } catch (error: any) {
        console.error('Failed to fetch columns:', error);
      }
    };

    if (dashboardId) {
      fetchColumns();
    }
  }, [dashboardId, fetchWithToken]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>할 일 수정</h1>

        <div className={styles.topSection}>
          <div className={styles.formSection}>
            <div className={styles.labelName}>상태</div>
            <StateInput defaultColumnId={columnId} columns={columns} onChange={handleNotInputChange} />
          </div>
          <div className={styles.formSection}>
            <div className={styles.labelName}>담당자</div>
            <AssigneeInput defaultMember={defaultCard.assignee} members={members} onChange={handleNotInputChange} />
          </div>
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

        <DeadLineInput onChange={handleNotInputChange} defaultValue={form?.dueDate} />

        <TagInput onChange={handleNotInputChange} defaultValue={form?.tags} />

        <div className={styles.formSection}>
          <div className={styles.labelName}>이미지</div>
          <FileInput
            usageLocation="modal"
            defaultImage={form.imageUrl || null}
            columnId={columnId}
            setFile={setImageFile}
          />
        </div>

        <div className={styles.buttons}>
          <ModalButton handleClick={onClose} color="white">
            취소
          </ModalButton>
          <ModalButton color="violet" handleClick={handleModifyTask} disabled={!form.title || !form.description}>
            수정
          </ModalButton>
        </div>
      </form>
    </Modal>
  );
}
