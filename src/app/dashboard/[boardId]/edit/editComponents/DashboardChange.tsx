'use client';

import { ChangeEvent, useState } from 'react';
import ColorChip from '@/components/common/chip/ColorChip';
import BasicSubmitButton from '@/components/common/Button/BasicSubmitButton';
import styles from './DashboardChange.module.scss';

export default function DashboaradChange() {
  const [selectedColor, setSelectedColor] = useState('');
  const [dashboardName, setDashboardName] = useState('');

  const handleSelectColor = (color: any) => {
    /* TODO */
    setSelectedColor(color);
    console.log(selectedColor);
  };

  const handleChangeDashboardName = (e: ChangeEvent<HTMLInputElement>) => {
    setDashboardName(e.target.value);
  };

  const isInput = dashboardName !== ''; // input 값 있는지 확인

  /* TODO 현재 id의 정보 불러오기 + 대쉬보드 수정 요청 보내기 */

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>비브리지</p>
        <ColorChip onSelect={handleSelectColor} />
      </div>
      <p className={styles.dashboardName}>대시보드 이름</p>
      <input
        className={styles.inputDashboardName}
        placeholder="변경할 대시보드 이름을 입력해주세요."
        value={dashboardName}
        onChange={handleChangeDashboardName}
      />
      <div className={styles.buttonConatienr}>
        <BasicSubmitButton color="violet" isActive={isInput}>
          변경
        </BasicSubmitButton>
      </div>
    </div>
  );
}
