import React, { useCallback, useEffect, useState } from 'react';

import useFetchWithToken from '@/hooks/useFetchToken';
import { CommentProps } from '@/types/DashboardTypes';
import { COMMENTS } from '@/constants/ApiUrl';
import CommentInput from '@/components/Modal/ModalInput/CommentInput';
import Profile from '@/components/common/Profile';
import styles from './Comments.module.scss';
import ConfirmModal from '../../ConfirmModal';

interface Comment {
  cardId: number;
  columnId: number;
  dashboardId: number;
  currentUserId?: number;
}

function formatDateTime(dateString: string) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${year}.${paddedMonth}.${paddedDay} ${paddedHours}:${paddedMinutes}`;
}

export default function Comments({ cardId, columnId, dashboardId, currentUserId }: Comment) {
  const { fetchWithToken } = useFetchWithToken();
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursorId, setCursorId] = useState<number | null>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState<number>(5);
  const [loading, setLoading] = useState(false);

  const fetchMoreComments = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const url = `https://sp-taskify-api.vercel.app/4-20/comments?size=${size}&cardId=${cardId}${cursorId ? `&cursorId=${cursorId}` : ''}`;
      const result = await fetchWithToken(url, 'GET');
      const newComments = result.comments.map((comment: any) => ({
        ...comment,
        createdAt: formatDateTime(comment.createdAt),
      }));
      setComments((prevComments) => {
        const existingIds = new Set(prevComments.map((c) => c.id));
        const filteredNewComments = newComments.filter((c: any) => !existingIds.has(c.id));
        return [...prevComments, ...filteredNewComments];
      });
      setCursorId(typeof result.cursorId === 'number' ? result.cursorId : null);
      setHasMore(result.cursorId != null);
    } catch (error) {
      console.error('Failed to load more comments:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchWithToken, cardId, size, cursorId, loading]);

  const loadMoreComments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const url = `https://sp-taskify-api.vercel.app/4-20/comments?size=5&cardId=${cardId}${cursorId ? `&cursorId=${cursorId}` : ''}`;
    try {
      const result = await fetchWithToken(url, 'GET');
      const newComments = result.comments.map((comment: any) => ({
        ...comment,
        createdAt: formatDateTime(comment.createdAt),
      }));
      setComments((prev) => [...prev, ...newComments]);
      setCursorId(typeof result.cursorId === 'number' ? result.cursorId : null);
      setHasMore(result.cursorId != null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!comments.length && hasMore) {
      fetchMoreComments();
    }
  }, [fetchMoreComments, comments.length, hasMore]);

  const handlePostComment = useCallback(
    async (content: string) => {
      const url = COMMENTS;
      const body = { content, cardId, columnId, dashboardId: Number(dashboardId) };
      try {
        const newComment = await fetchWithToken(url, 'POST', body);
        newComment.createdAt = formatDateTime(newComment.createdAt);
        setComments((prevComments) => [newComment, ...prevComments]);
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    },
    [fetchWithToken, cardId, columnId, dashboardId]
  );

  const handlePutComment = useCallback(
    async (content: string, id: number) => {
      const url = `${COMMENTS}/${id}`;
      const body = { content };
      try {
        await fetchWithToken(url, 'PUT', body);
        setComments((prevComments) =>
          prevComments.map((comment) => (comment.id === id ? { ...comment, content } : comment))
        );
        setEditingCommentId(null); // 수정 후 인풋을 닫음
      } catch (error) {
        console.error('Failed to update comment:', error);
      }
    },
    [fetchWithToken]
  );

  const handleDeleteComment = useCallback(
    async (id: number) => {
      try {
        const url = `${COMMENTS}/${id}`;
        await fetchWithToken(url, 'DELETE');
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
        setIsConfirmOpen(false); // 모달을 닫음
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    },
    [fetchWithToken]
  );

  const openConfirmModal = useCallback((id: number, isOpen: boolean) => {
    setDeleteCommentId(id);
    setIsConfirmOpen(isOpen);
  }, []);

  return (
    <div className={styles.comments}>
      <p className={styles.commentTitle}>댓글</p>
      <CommentInput onCommentSubmit={handlePostComment} initialContent="" />

      {comments.map((comment) => (
        <div className={styles.commentContainer} key={comment.id}>
          <Profile profileImageUrl={comment.author.profileImageUrl || undefined} />
          <div className={styles.commentBox}>
            <div className={styles.commentHeader}>
              <span className={styles.nickname}>{comment.author.nickname}</span>
              {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
              <span className={styles.createdAt}>{comment.createdAt}</span>
            </div>
            {editingCommentId === comment.id ? (
              <div className={styles.commentBody}>
                <div className={styles.editing}>
                  <CommentInput
                    onCommentSubmit={(content: string) => handlePutComment(content, comment.id)}
                    initialContent={comment.content}
                  />
                </div>
                <div className={styles.btnBox}>
                  <button className={styles.commentBtn} type="button" onClick={() => setEditingCommentId(null)}>
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.commentBody}>
                <p className={styles.commentText}>{comment.content}</p>
                {comment.author.id === currentUserId && (
                  <div className={styles.btnBox}>
                    <button className={styles.commentBtn} type="button" onClick={() => setEditingCommentId(comment.id)}>
                      수정
                    </button>
                    <button
                      className={styles.commentBtn}
                      type="button"
                      onClick={() => openConfirmModal(comment.id, true)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {hasMore && (
        <button type="button" onClick={loadMoreComments} disabled={loading}>
          댓글 더 보기
        </button>
      )}
      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => deleteCommentId && handleDeleteComment(deleteCommentId)}
        >
          <p className={styles.modalSubText}>댓글을 삭제할까요?</p>
        </ConfirmModal>
      )}
    </div>
  );
}
