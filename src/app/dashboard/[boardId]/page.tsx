'use client';

import { useEffect, useState } from 'react';
import { Dashboard as Column } from '@/types/DashboardTypes';
import CommonLayout from '@/layouts/CommonLayout';
import styles from './Dashboard.module.scss';
import ColumnComponent from '@/components/Column';
import AddButton from '@/components/common/Button/AddButton';
import useFetchWithToken from '@/hooks/useFetchToken';

export default function Dashboard({ params }: { params: { boardId: number } }) {
  const { fetchWithToken } = useFetchWithToken();
  const [columns, setColumns] = useState<Column[]>([]);
  const { boardId } = params;

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

  const handleAddCard = () => {
    // 카드 추가 로직을 구현합니다.
    console.log('Add card button clicked!');
  };

  const handleAddColumn = () => {
    console.log('Add column button clicked!');
  };

  return (
    <CommonLayout>
      <div className={styles.container}>
        <div className={styles.columnBox}>
          {columns.map((column: Column) => (
            <ColumnComponent
              key={column.id}
              columnId={column.id}
              title={column.title}
              onAddCard={handleAddCard}
              dashboardId={boardId}
            />
          ))}
        </div>
        <div className={styles.btnBox}>
          {/* eslint-disable-next-line react/no-children-prop */}
          <AddButton handleClick={handleAddColumn} children="새로운 컬럼 추가하기" />
        </div>
      </div>
    </CommonLayout>
  );
}
