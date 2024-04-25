'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import ColorChip from '@/components/common/chip/ColorChip';
import BasicSubmitButton from '@/components/common/Button/BasicSubmitButton';
import styles from './DashboardChange.module.scss';

const mockData = {
  id: 1,
  title: 'Task for Today',
  color: '#ff0000',
  createdAt: '2024-04-22T15:22:12.569Z',
  updatedAt: '2024-04-22T15:22:12.569Z',
  createdByMe: true,
  userId: 456,
};

export default function DashboaradChange(id: any) {
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
  const handlePutDashboard = () => {
    /* PUT 대시보드 정보 변경 */
    console.log('전송 값 : ', id, selectedColor, dashboardName);
  };

  useEffect(() => {
    console.log('현재 페이지의 id', id);
    /* 현재 페이지의 id로 현재 대시보드의 이름,색상을 가져오기 (placeholder)
        [ /{teamId}/dashboards/{dashboardId} ]
      */
    // setDashboardName(mockData[parseInt(id, 10)].title);
    setDashboardName(mockData.title);
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>{dashboardName}</p>
        {/* 현재 대시보드 이름. 임시로 비브리지로 설정 */}
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
        <BasicSubmitButton color="violet" isActive={isInput} handleClick={handlePutDashboard}>
          변경
        </BasicSubmitButton>
      </div>
    </div>
  );
}
