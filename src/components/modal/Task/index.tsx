'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../Modal';
import styles from './Task.module.scss';
// eslint-disable-next-line import/extensions
import Profile from '@/components/common/Profile/Profile';
import Comments from './Comment/Comments';
import KabobMenu from './Kabob/KabobMenu';

interface TaskProps {
  title: string;
}

export default function Task({ title }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달열기
      </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} style={{ width: '730px', height: 'auto' }}>
        <div className={styles.taskModal}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <div className={styles.buttons}>
              <div className={styles.kabob}>
                <KabobMenu />
              </div>
              <button onClick={handleCloseModal} type="button">
                <Image src="/images/close_icon.svg" alt="닫기 버튼" width={32} height={32} />
              </button>
            </div>
          </div>
          <div>
            <article className={styles.modalContainer}>
              <div className={styles.contentArea}>
                <div className={styles.labels}>tag</div>
                <div className={styles.contents}>content</div>
                <div className={styles.commentsArea}>comment</div>
                <Comments />
              </div>
              <div className={styles.information}>
                <ul>
                  <li className={styles.manager}>
                    <span className={styles.subtitle}>담당자</span>
                    <div>
                      <Profile />
                      <span className={styles.name}>담당자 이름</span>
                    </div>
                  </li>
                  <li>
                    <span className={styles.subtitle}>마감일</span>
                    <span className={styles.dueDate}>dueDate</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </Modal>
    </div>
  );
}
