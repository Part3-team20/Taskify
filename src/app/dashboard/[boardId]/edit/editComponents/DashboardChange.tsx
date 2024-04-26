'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useBoardId } from '@/contexts/idContext';
import useFetchWithToken from '@/hooks/useFetchToken';
import ColorChip from '@/components/common/Chip/ColorChip';
import BasicSubmitButton from '@/components/common/Button/BasicSubmitButton';
import styles from './DashboardChange.module.scss';

export default function DashboaradChange() {
  const boardId = useBoardId();

  const [selectedColor, setSelectedColor] = useState('');
  const [dashboardName, setDashboardName] = useState(''); // 입력 후 GET 된 값

  const [pendingInput, setPendingInput] = useState(''); // 입력중인 값
  const { fetchWithToken } = useFetchWithToken();

  const handleSelectColor = (color: any) => {
    setSelectedColor(color);
    console.log(selectedColor);
  };

  const handleChangeDashboardName = (e: ChangeEvent<HTMLInputElement>) => {
    setPendingInput(e.target.value);
  };

  const isInput = dashboardName !== ''; // input 값 있는지 확인

  /* PUT 대시보드 정보 변경 */
  const handlePutDashboard = async () => {
    console.log('전송 값 : ', boardId, selectedColor, dashboardName);
    try {
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/dashboards/${boardId}`, 'PUT', {
        title: pendingInput,
        color: selectedColor,
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWithToken(
          `https://sp-taskify-api.vercel.app/4-20/dashboards/${boardId}`,
          'GET'
        );
        console.log(responseData);
        setDashboardName(responseData.title);
        setSelectedColor(responseData.color);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
    /* 현재 페이지의 id로 현재 대시보드의 이름,색상을 가져오기 (placeholder) */
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>{dashboardName}</p>
        <ColorChip onSelect={handleSelectColor} />
      </div>
      <p className={styles.dashboardName}>대시보드 이름</p>
      <input
        className={styles.inputDashboardName}
        placeholder="대시보드 이름을 입력해주세요."
        value={pendingInput}
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
