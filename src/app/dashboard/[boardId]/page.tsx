'use client';

import { useEffect, useState } from 'react';
import { Dashboard as Column } from '@/types/DashboardTypes';
import CommonLayout from '@/layouts/CommonLayout';
import styles from './Dashboard.module.scss';
import ColumnComponent from '@/components/Column';
import AddButton from '@/components/common/Button/AddButton';
import useFetchWithToken from '@/hooks/useFetchToken';
import CreateColumn from '@/components/Modal/CreateColumn';

export default function Dashboard({ params }: { params: { boardId: number } }) {
  const { fetchWithToken } = useFetchWithToken();
  const [columns, setColumns] = useState<Column[]>([]);
  const { boardId } = params;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddColumn = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/columns?dashboardId=${boardId}`);
        setColumns(response.data);
      } catch (error) {
        console.error('Failed to fetch columns:', error);
      }
    };

    if (boardId) {
      fetchColumns();
    }
  }, [boardId, fetchWithToken]);

  const handleCreateColumn = async (title: string) => {
    try {
      const body = {
        title,
        dashboardId: Number(boardId),
      };
      const newColumn = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/columns`, 'POST', body);
      setColumns((prevColumns) => [...prevColumns, newColumn]); // 직접 새 컬럼을 상태에 추가
      setIsCreateModalOpen(false); // 성공 후 모달 닫기
    } catch (error) {
      console.error('Failed to create column:', error);
    }
  };

  const handleUpdateColumn = async (columnId: any, newTitle: any) => {
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/columns/${columnId}`, 'PUT', { title: newTitle });
      const updatedColumns = columns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      );
      setColumns(updatedColumns);
    } catch (error) {
      console.error('Failed to update column:', error);
    }
  };

  const handleDeleteColumn = async (columnId: any) => {
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/columns/${columnId}`, 'DELETE');
      const filteredColumns = columns.filter((column) => column.id !== columnId);
      setColumns(filteredColumns);
    } catch (error) {
      console.error('Failed to delete column:', error);
    }
  };

  return (
    <CommonLayout>
      <div className={styles.container}>
        <div className={styles.columnBox}>
          {columns.map((column) => (
            <ColumnComponent
              key={column.id}
              columnId={column.id}
              title={column.title}
              onAddCard={() => console.log('Add card button clicked!')}
              onUpdate={handleUpdateColumn}
              onDelete={handleDeleteColumn}
              existingTitles={columns.map((c) => c.title)}
              dashboardId={boardId}
            />
          ))}
        </div>
        <div className={styles.btnBox}>
          {/* eslint-disable-next-line react/no-children-prop */}
          <AddButton handleClick={handleAddColumn}>새로운 컬럼 추가하기</AddButton>
          {/* Modal component rendered conditionally */}
          {isCreateModalOpen && (
            <CreateColumn
              isOpen={isCreateModalOpen}
              onClose={handleCloseModal}
              onCreate={handleCreateColumn}
              existingTitles={columns.map((column) => column.title)}
            />
          )}
        </div>
      </div>
    </CommonLayout>
  );
}
