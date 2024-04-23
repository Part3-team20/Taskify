'use client';

import React, { useState } from 'react';
import styles from './CreateTask.module.scss';
import Modal from '../Modal';
import TitleInput from '../modalInput/titleInput/TitleInput';
import Input from '@/components/common/input';
import MembersDropDown from '../ModalDropDown/MemberDropDown/MemberDropDown';

export default function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달열기
      </button>
      <MembersDropDown />
      <Modal isOpen={isOpen} onClose={handleCloseModal} style={{ width: '31.25rem', height: '56.25rem' }}>
        <div className={styles.container}>
          <h1>할 일 생성</h1>
          <form>
            <select></select>
            <Input labelName="담당자" type="select" />
            <TitleInput />
          </form>
        </div>
      </Modal>
    </div>
  );
}
