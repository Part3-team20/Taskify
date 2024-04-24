'use client';

// eslint-disable-next-line import/extensions
import CommonLayout from '@/layouts/CommonLayout';
import styles from './Dashboard.module.scss';
// eslint-disable-next-line import/extensions
import Column from '@/components/Column';
import mockCards from '@/components/Column/mock.json';
// eslint-disable-next-line import/extensions
import AddButton from '@/components/common/Button/AddButton';

export default function Dashboard() {
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
          <Column title="title" cards={mockCards} onAddCard={handleAddCard} />
          <Column title="title" cards={mockCards} onAddCard={handleAddCard} />
          <Column title="title" cards={mockCards} onAddCard={handleAddCard} />
        </div>
        <div className={styles.btnBox}>
          {/* eslint-disable-next-line react/no-children-prop */}
          <AddButton handleClick={handleAddColumn} children="새로운 컬럼 추가하기" />
        </div>
      </div>
    </CommonLayout>
  );
}
