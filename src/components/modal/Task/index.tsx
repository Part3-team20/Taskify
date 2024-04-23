'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../Modal';
import styles from './Task.module.scss';
// eslint-disable-next-line import/extensions
import Profile from '@/components/common/Profile/Profile';
import Comments from './Comment/Comments';
import KabobMenu from './Kabob/KabobMenu';
// eslint-disable-next-line import/extensions
import LabelChip from '@/components/common/Chip/LabelChip';

interface TaskProps {
  title: string;
  description: string;
  tags?: string[];
  dueDate?: string;
  assignee: {
    nickname: string;
    profileImageUrl?: string;
  };
  imageUrl?: string;
}

export default function Task({ title, description, tags, dueDate, assignee, imageUrl }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* 카드와 추후 연결 */}
      <button type="button" onClick={() => setIsOpen(true)}>
        모달열기
      </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} style={{ width: '760px', height: 'auto', maxHeight: '730px' }}>
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
                <div className={styles.labels}>
                  <LabelChip type="columns" label="progress" />
                  {/* eslint-disable-next-line react/self-closing-comp */}
                  <span className={styles.divide}></span>
                  {/* 컬럼은 다른 props와 달리 컬럼 id로 find를 해야해서 임의로 값 생성 */}
                  <div className={styles.tags}>
                    {tags && tags.map((tag) => <LabelChip key={tag} type="tag" label={tag} />)}
                  </div>
                </div>
                <div className={styles.contents}>{description}</div>
                <div className={styles.imgBox}>
                  <img src={imageUrl} alt="본문 첨부 이미지" />
                  {/* <Image src={imageUrl} alt="본문 첨부 이미지" className={styles.img} /> */}
                </div>
                <div className={styles.comments}>
                  <Comments />
                </div>
              </div>
              <div className={styles.information}>
                <ul>
                  {assignee && (
                    <li className={styles.infoBox}>
                      <span className={styles.subtitle}>담당자</span>
                      <div className={styles.assignee}>
                        <Profile profileImageUrl={assignee.profileImageUrl} />
                        <span className={styles.name}>{assignee.nickname}</span>
                      </div>
                    </li>
                  )}
                  <li className={styles.infoBox}>
                    <span className={styles.subtitle}>마감일</span>
                    <span className={styles.dueDate}>{dueDate}</span>
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
