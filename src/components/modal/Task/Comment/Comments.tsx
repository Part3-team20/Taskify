import React, { useCallback, useEffect, useState } from 'react';
import CommentInput from '@/components/Modal/ModalInput/CommentInput/CommentInput';
import Profile from '@/components/common/Profile/Profile';
import styles from './Comments.module.scss';
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

  const fetchComments = useCallback(async () => {
    try {
      const result = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/comments?cardId=${cardId}`, 'GET');
      setComments(result.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, [fetchWithToken, cardId]);

  const handlePostComment = useCallback(
    async (content: string) => {
      const url = `https://sp-taskify-api.vercel.app/4-20/comments`;
      const body = {
        content,
        cardId,
        columnId,
        dashboardId: Number(dashboardId),
      };
      try {
        await fetchWithToken(url, 'POST', body);
        fetchComments(); // 댓글 목록을 다시 불러옵니다
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    },
    [fetchWithToken, cardId, columnId, dashboardId, fetchComments]
  );

  const handlePutComment = useCallback(
    async (content: string, id: number) => {
      const url = `https://sp-taskify-api.vercel.app/4-20/comments/${id}`;
      const body = { content };
      try {
        await fetchWithToken(url, 'PUT', body);
        fetchComments(); // 댓글 목록을 다시 불러옵니다
        setEditingCommentId(null); // 편집 상태를 초기화합니다
      } catch (error) {
        console.error('Failed to update comment:', error);
      }
    },
    [fetchWithToken, fetchComments]
  );

  const handleDeleteComment = useCallback(
    async (id: number) => {
      try {
        const url = `https://sp-taskify-api.vercel.app/4-20/comments/${id}`;
        await fetchWithToken(url, 'DELETE');
        // 서버에서 삭제 후 상태 업데이트로 댓글 목록에서 바로 제거
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    },
    [fetchWithToken, setComments]
  );

  useEffect(() => {
    console.log('Comments updated:', comments);
  }, [comments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className={styles.comments}>
      <p className={styles.commentTitle}>댓글</p>
      <CommentInput onCommentSubmit={handlePostComment} initialContent="" style={{ width: '450px' }} />

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
                    onCommentSubmit={(content) => handlePutComment(content, comment.id)}
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
                  <button className={styles.commentBtn} type="button" onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
