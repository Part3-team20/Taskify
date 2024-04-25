import React, { useEffect, useState } from 'react';
import Profile from '@/components/common/Profile/Profile';
import CommentInput from '../../modalInput/commentInput/CommentInput';
// import useFormattedDate from '../../../../hook/useFormattedDate';
// eslint-disable-next-line import/extensions
import styles from './Comments.module.scss';
import DeleteTask from '../../DeleteTask';

interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function Comments() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  // 목 데이터
  useEffect(() => {
    const mockComments = [
      {
        id: 1,
        content: 'This is a mock comment',
        createdAt: '2024-04-21T21:46:35.646Z',
        cardId: 101,
        author: {
          id: 1,
          nickname: 'User One',
          profileImageUrl:
            'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/3-7_1520_1712645279291.png',
        },
      },
      {
        id: 2,
        content: 'Another example comment',
        createdAt: '2024-03-21T21:46:35.646Z',
        cardId: 102,
        author: { id: 2, nickname: 'User Two' },
      },
    ];
    const formattedComments = mockComments.map((comment) => ({
      ...comment,
      createdAt: formatDate(comment.createdAt),
    }));

    setComments(formattedComments);
  }, []);

  const handleCommentSubmit = async (content: string) => {
    console.log('Submit comment:', content);
  };

  // const handleCommentDelete = async (id: number) => {
  //   console.log('Delete comment ID:', id);
  // };

  const openDeleteModal = (id: number) => {
    setCommentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
  };

  // 이후 수정 예정
  //
  // useEffect(() => {
  //   const loadComments = async () => {
  //     try {
  //       const data = await fetchComments();
  //       setComments(data.comments);
  //     } catch (error) {
  //       console.error('Failed to fetch comments', error);
  //     }
  //   };

  //   loadComments();
  // }, []);

  // const handleCommentSubmit = async (content: string) => {
  //   if (editingCommentId !== null) {
  //     try {
  //       const updatedComment = await updateComment(editingCommentId, content);
  //       setComments((prev) => prev.map((comment) => (comment.id === editingCommentId ? updatedComment : comment)));
  //     } catch (error) {
  //       console.error('Failed to update comment', error);
  //     }
  //   } else {
  //     try {
  //       const newComment = await addComment(content);
  //       setComments((prev) => [...prev, newComment]);
  //     } catch (error) {
  //       console.error('Failed to add comment', error);
  //     }
  //   }
  //   setEditingCommentId(null);
  // };

  // const handleCommentDelete = async (id: number) => {
  //   try {
  //     const success = await deleteComment(id);
  //     if (success) {
  //       setComments((prev) => prev.filter((comment) => comment.id !== id));
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete comment', error);
  //   }
  // };

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
