/* eslint-disable no-console */

'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import ModalInput from '../ModalInput';
import styles from './CommentInput.module.scss';

interface CommentInputProps {
  onCommentSubmit: (content: string) => void;
  initialContent: string;
}

export default function CommentInput({ onCommentSubmit, initialContent = '' }: CommentInputProps) {
  const [comment, setComment] = useState(initialContent);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    onCommentSubmit(comment); // 댓글 내용을 상위 컴포넌트로 전달
    setComment(''); // 필드 초기화
  };

  useEffect(() => {
    setComment(initialContent); // 수정 시 기존 내용으로 필드 설정
  }, [initialContent]);

  return (
    <div>
      <form className={styles.container}>
        <ModalInput
          placeholder="댓글 작성하기"
          value={comment}
          onChange={handleChange}
          style={{ width: '100%', height: '100%' }}
        >
          <button type="button" className={styles.postComment} onClick={handleSubmit}>
            입력
          </button>
        </ModalInput>
      </form>
    </div>
  );
}
