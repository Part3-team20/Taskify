'use client';

import React, { ChangeEvent, useState } from 'react';
import ModalInput from '../ModalInput';
import styles from './CommentInput.module.scss';

export default function CommentInput() {
  const [comment, setComment] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    /* TODO : POST comment */
  };
  return (
    <form className={styles.container}>
      <ModalInput
        placeholder="댓글 작성하기"
        value={comment}
        onChange={handleChange}
        style={{ width: '416px', height: '110px' }}
      >
        <button className={styles.postComment} type="button" onClick={handlePostComment}>
          입력
        </button>
      </ModalInput>
    </form>
  );
}
