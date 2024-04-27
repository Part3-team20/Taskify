import React, { useCallback, useEffect, useState } from 'react';

import useFetchWithToken from '@/hooks/useFetchToken';
// import InfiniteScroll from 'react-infinite-scroll-component';
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
  // const [hasMore, setHasMore] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [size, setSize] = useState<number>(5);

  // const fetchMoreComments = useCallback(async () => {
  //   try {
  //     const result = await fetchWithToken(
  //       `https://sp-taskify-api.vercel.app/4-20/comments?size=${size}&cardId=${cardId}`,
  //       'GET'
  //     );
  //     const formattedComments = result.comments.map((comment: any) => ({
  //       ...comment,
  //       createdAt: formatDateTime(comment.createdAt),
  //     }));
  //     setComments((prevComments) => [...prevComments, ...formattedComments]);
  //     // 무한 스크롤을 위해 hasMore를 적절히 설정
  //     setHasMore(formattedComments.length === size);
  //   } catch (error) {
  //     console.error('더 많은 댓글을 불러오는 데 실패했습니다:', error);
  //   }
  // }, [fetchWithToken, cardId, size]);

  const fetchComments = useCallback(async () => {
    try {
      const result = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/comments?cardId=${cardId}`, 'GET');
      const formattedComments = result.comments.map((comment: any) => ({
        ...comment,
        createdAt: formatDateTime(comment.createdAt),
      }));
      setComments(formattedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, [fetchWithToken, cardId]);

  const handlePostComment = useCallback(
    async (content: string) => {
      const url = COMMENTS;
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
      const url = `${COMMENTS}/${id}`;
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
        const url = `${COMMENTS}/${id}`;
        await fetchWithToken(url, 'DELETE');
        // 서버에서 삭제 후 상태 업데이트로 댓글 목록에서 바로 제거
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
        setIsConfirmOpen(false);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    },
    [fetchWithToken]
  );

  const openConfirmModal = (id: number) => {
    setDeleteCommentId(id);
    setIsConfirmOpen(true);
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // // 스크롤 위치 감지하여 size 값을 업데이트하고 더 많은 댓글을 가져옴
  // const handleScroll = () => {
  //   const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  //   const scrollHeight =
  //     (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
  //   const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  //   const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

  //   if (scrolledToBottom) {
  //     // 스크롤이 가장 아래에 도달하면 fetchMoreComments를 호출하여 새로운 댓글을 가져옴
  //     fetchMoreComments();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className={styles.comments}>
      <p className={styles.commentTitle}>댓글</p>
      <CommentInput onCommentSubmit={handlePostComment} initialContent="" />

      {/* <InfiniteScroll dataLength={comments.length} next={fetchMoreComments} hasMore={hasMore} loader={undefined}> */}
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
                    <button className={styles.commentBtn} type="button" onClick={() => openConfirmModal(comment.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {/* </InfiniteScroll> */}
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
