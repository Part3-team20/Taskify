import React, { useCallback, useEffect, useState } from 'react';
import CommentInput from '../../ModalInput/commentInput/CommentInput';
import Profile from '@/components/common/Profile/Profile';
import styles from './Comments.module.scss';
import DeleteTask from '../../DeleteTask';
import useFetchWithToken from '@/hooks/useFetchToken';
import { CommentProps } from '@/types/DashboardTypes';

interface Comment {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export default function Comments({ cardId, columnId, dashboardId }: Comment) {
  const { fetchWithToken } = useFetchWithToken();
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      const result = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/comments?cardId=${cardId}`, 'GET');
      setComments(result.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, [fetchWithToken, cardId]);

  const handleCommentSubmit = useCallback(
    async (content: string, id = null) => {
      const method = id ? 'PUT' : 'POST';
      const url = `https://sp-taskify-api.vercel.app/4-20/comments${id ? `/${id}` : ''}`;
      const body = {
        content,
        cardId,
        columnId,
        dashboardId,
      };

      try {
        await fetchWithToken(url, method, body);
        fetchComments(); // After adding or updating a comment, re-fetch comments
        setEditingCommentId(null); // Reset editing state
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    },
    [fetchWithToken, cardId, columnId, dashboardId, fetchComments]
  );

  const openDeleteModal = (id: any) => {
    setCommentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className={styles.comments}>
      <p className={styles.commentTitle}>댓글</p>
      <CommentInput onCommentSubmit={handleCommentSubmit} initialContent="" style={{ width: '450px' }} />

      {comments.map((comment) => (
        <div className={styles.commentContainer} key={comment.id}>
          <Profile profileImageUrl={comment.author.profileImageUrl} />
          <div className={styles.commentBox}>
            <div className={styles.commentHeader}>
              <span className={styles.nickname}>{comment.author.nickname}</span>
              <span className={styles.createdAt}>{comment.createdAt}</span>
            </div>
            {editingCommentId === comment.id ? (
              <div className={styles.commentBody}>
                <div>
                  <CommentInput
                    onCommentSubmit={handleCommentSubmit}
                    initialContent={comment.content}
                    style={{ width: '400px' }}
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
                <div className={styles.btnBox}>
                  <button className={styles.commentBtn} type="button" onClick={() => setEditingCommentId(comment.id)}>
                    수정
                  </button>
                  <button className={styles.commentBtn} type="button" onClick={() => openDeleteModal(comment.id)}>
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <DeleteTask isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </div>
  );
}
