import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ColumnsDropDown.module.scss';
import arrowDown from '../../../../public/images/dropdown_icon.svg';
import check from '../../../../public/images/check.svg';

export default function ColumnsDropDown() {
  // 일단 mock 데이터로 작업함
  // 이후에 props로 columns data 받아야 할 듯
  const data = [
    {
      id: 1,
      title: 'To Do',
      teamId: '20',
      createdAt: '2024-04-17T06:30:29.059Z',
      updatedAt: '2024-04-17T06:30:29.059Z',
    },
    {
      id: 2,
      title: 'On Progress',
      teamId: '20',
      createdAt: '2024-04-17T06:30:29.059Z',
      updatedAt: '2024-04-17T06:30:29.059Z',
    },
    {
      id: 3,
      title: 'Done',
      teamId: '20',
      createdAt: '2024-04-17T06:30:29.059Z',
      updatedAt: '2024-04-17T06:30:29.059Z',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(data[0].title);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    setSelectedValue(target.innerText);
  };

  const options = data.map((item) => (
    <li className={styles.selectItem} key={item.id}>
      <button className={styles.itemBtn} type="button" onClick={handleSelect}>
        {selectedValue === item.title ? <Image className={styles.checkIcon} src={check} alt="checked" /> : null}
        <span className={styles.btnText}>{item.title}</span>
      </button>
    </li>
  ));

  return (
    <div className={styles.selectContainer}>
      {/* 입력 Input은 이후에 구현 예정 */}
      <button className={styles.selectBtn} type="button" onClick={handleToggle}>
        <span className={styles.btnText}>{selectedValue}</span>
        <Image src={arrowDown} alt="arrowDown" />
      </button>
      {isOpen && <ul className={styles.selectList}>{options}</ul>}
    </div>
  );
}
