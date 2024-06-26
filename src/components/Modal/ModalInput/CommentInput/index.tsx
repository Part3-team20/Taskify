'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './CommentInput.module.scss';

interface CommentInputProps {
  onCommentSubmit: (content: string) => void;
  initialContent: string;
}

export default function CommentInput({ onCommentSubmit, initialContent = '' }: CommentInputProps) {
  const [comment, setComment] = useState(initialContent);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className={styles.commentForm}>
      <form className={styles.postForm} onSubmit={(e) => e.preventDefault()}>
        <textarea
          className={styles.textarea}
          placeholder="댓글 작성하기"
          value={comment}
          onChange={handleChange}
          rows={3}
        />
        <button type="button" className={styles.postComment} onClick={handleSubmit} disabled={!comment.trim()}>
          입력
        </button>
      </form>
    </div>
  );
}
