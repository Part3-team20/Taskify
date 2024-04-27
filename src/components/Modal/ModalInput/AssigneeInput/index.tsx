'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AssigneeInput.module.scss';
import arrowDown from '@/../public/images/dropdown_icon.svg';
import check from '@/../public/images/check.svg';

interface AssigneeInputProps {
  members: {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    isOwner: boolean;
  }[];
  onChange: (key: string, value: number) => void;
}

export default function AssigneeInput({ members, onChange }: AssigneeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    setSelectedValue(target.innerText);
  };

  const options = members.map((item) => (
    <li className={styles.selectItem} key={item.id}>
      <button
        className={styles.itemBtn}
        type="button"
        onClick={(e) => {
          handleSelect(e);
          onChange('assigneeUserId', item.userId);
        }}
      >
        {selectedValue === item.nickname ? <Image className={styles.checkIcon} src={check} alt="checked" /> : null}
        <span className={styles.btnText}>{item.nickname}</span>
      </button>
    </li>
  ));

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={selectedValue}
        placeholder="이름을 입력해주세요"
        onFocus={handleToggle}
        onChange={handleToggle}
      />
      {isOpen && <ul className={styles.selectList}>{options}</ul>}
    </div>
  );
}
