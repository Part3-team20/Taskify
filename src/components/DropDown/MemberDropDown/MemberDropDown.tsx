import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MemberDropDown.module.scss';
import arrowDown from '../../../../public/images/dropdown_icon.svg';
import check from '../../../../public/images/check.svg';

export default function MembersDropDown() {
  // 일단 mock 데이터로 작업함
  // 이후에 props로 members data 받아야 할 듯
  const members = [
    {
      id: 1,
      userId: 1,
      email: '1111@codeit.com',
      nickname: '유아름',
      profileImageUrl: 'none',
      createdAt: '2024-04-17T06:30:29.059Z',
      updatedAt: '2024-04-17T06:30:29.059Z',
      isOwner: true,
    },
    {
      id: 2,
      userId: 2,
      email: '2222@codeit.com',
      nickname: '김혜중',
      profileImageUrl: 'none',
      createdAt: '2024-04-17T06:30:29.059Z',
      updatedAt: '2024-04-17T06:30:29.059Z',
      isOwner: true,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(members[0].nickname);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (e: any) => {
    setSelectedValue(e.target.innerText);
  };

  const options = members.map((item) => (
    <li className={styles.selectItem} key={item.id}>
      <button className={styles.itemBtn} type="button" onClick={handleSelect}>
        {selectedValue === item.nickname ? <Image className={styles.checkIcon} src={check} alt="checked" /> : null}
        <span className={styles.btnText}>{item.nickname}</span>
      </button>
    </li>
  ));

  return (
    <div className={styles.selectContainer}>
      <button className={styles.selectBtn} type="button" onClick={handleToggle}>
        <span className={styles.btnText}>{selectedValue}</span>
        <Image src={arrowDown} alt="arrowDown" />
      </button>
      {isOpen && <ul className={styles.selectList}>{options}</ul>}
    </div>
  );
}
