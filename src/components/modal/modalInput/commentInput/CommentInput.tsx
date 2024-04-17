import React, { ChangeEvent, useState } from 'react';
import ModalInput from '../ModalInput';
import styles from './CommentInput.module.scss';

export default function CommentInput() {
  const [comment, setComment] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className={styles.container}>
      <ModalInput placeholder="댓글 작성하기" value={comment} onChange={handleChange}>
        <button className={styles.postComment} type="button">
          입력
        </button>
      </ModalInput>
    </div>
  );
}
