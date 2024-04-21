import React, { useEffect, useState } from 'react';
import CommentInput from '../../ModalInput/commentInput/CommentInput';

interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
}

const teamId = 20;

export default function Comments() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  useEffect(() => {
    // 댓글 조회
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/${teamId}/comments`, {
          headers: {
            // 'Authorization': 'Bearer your-token-here', // 인증 헤더 필요 시 추가
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error('댓글 조회에 실패했습니다.', error);
      }
    };

    fetchComments();
  }, []);

  const handleCommentSubmit = async (content: string) => {
    if (editingCommentId !== null) {
      // 댓글 수정
      try {
        const response = await fetch(`/api/${teamId}/comments/${editingCommentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer your-token-here', // 인증 헤더 필요 시 추가
          },
          body: JSON.stringify({ content }),
        });
        const updatedComment = await response.json();
        setComments((prev) => prev.map((comment) => (comment.id === editingCommentId ? updatedComment : comment)));
      } catch (error) {
        console.error('댓글 수정에 실패했습니다.', error);
      }
    } else {
      // 댓글 추가
      try {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer your-token-here', // 인증 헤더 필요 시 추가
          },
          // body: JSON.stringify({
          //   content,
          //   cardId: /* 해당 cardId */,
          //   columnId: /* 해당 columnId */,
          //   dashboardId: /* 해당 dashboardId */
          // }),
        });
        const newComment = await response.json();
        setComments((prev) => [...prev, newComment]);
      } catch (error) {
        console.error('댓글 추가에 실패했습니다.', error);
      }
    }
    setEditingCommentId(null); // 추가/수정 완료 후 상태 초기화
  };

  // 댓글 삭제
  const handleCommentDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/${teamId}/comments/${id}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization': 'Bearer your-token-here', // 인증 헤더 필요 시 추가
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <p>댓글</p>
      {/* 새 댓글 추가 필드 */}
      <CommentInput onCommentSubmit={(content) => handleCommentSubmit(content)} initialContent="" />

      {/* 댓글 목록 */}
      {comments.map((comment) => (
        <div key={comment.id}>
          {/* 댓글 표시 */}
          <img src={comment.author.profileImageUrl} alt={`${comment.author.nickname}'s profile`} />
          <span>{comment.author.nickname}</span>
          <span>{comment.createdAt}</span>
          {editingCommentId === comment.id ? (
            // 수정 중인 댓글 입력 필드: 수정 버튼 클릭 시만 표시
            <div>
              <CommentInput onCommentSubmit={handleCommentSubmit} initialContent={comment.content} />
              <button type="button" onClick={() => setEditingCommentId(null)}>
                취소
              </button>
            </div>
          ) : (
            <div>
              <p>{comment.content}</p>
              <button type="button" onClick={() => setEditingCommentId(comment.id)}>
                수정
              </button>
              <button type="button" onClick={() => handleCommentDelete(comment.id)}>
                삭제
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
