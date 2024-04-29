'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import arrowDown from '@/../public/images/dropdown_icon.svg';
import check from '@/../public/images/check.svg';
import Profile from '@/components/common/Profile';
import styles from './AssigneeInput.module.scss';

interface AssigneeInputProps {
  members: {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    isOwner: boolean;
  }[];
  onChange: (key: string, value: number | undefined) => void;
  defaultMember?: { id?: number; nickname?: string; profileImageUrl?: string };
}

export default function AssigneeInput({ members, onChange, defaultMember }: AssigneeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    nickname: defaultMember?.nickname,
    profileImageUrl: defaultMember?.profileImageUrl,
  });
  const divRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const options = members.map((item) => (
    <li className={styles.selectItem} key={item.id}>
      <button
        className={styles.itemBtn}
        type="button"
        onClick={() => {
          setSelectedValue({ nickname: item.nickname, profileImageUrl: item.profileImageUrl || '' });
          onChange('assigneeUserId', item.userId);
          setIsOpen(false);
        }}
      >
        {selectedValue.nickname === item.nickname ? (
          <Image className={styles.checkIcon} src={check} alt="checked" />
        ) : null}
        <div className={styles.profile}>
          <Profile profileImageUrl={item.profileImageUrl ? item.profileImageUrl : ''} />
          <span className={styles.btnText}>{item.nickname}</span>
        </div>
      </button>
    </li>
  ));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        handleToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={divRef}>
      {selectedValue.nickname && (
        <div className={styles.inputProfile}>
          <Profile profileImageUrl={selectedValue.profileImageUrl} />
        </div>
      )}
      <input
        className={`${styles.input} ${selectedValue.nickname || styles.noValueInput}`}
        value={selectedValue.nickname}
        placeholder="담당자를 선택해주세요"
        readOnly
        onClick={handleToggle}
        style={{ borderColor: `${isOpen ? '#5534DA' : '#D9D9D9'}` }}
      />
      <Image src={arrowDown} alt="arrow" width={26} height={26} className={styles.arrow} onClick={handleToggle} />
      {isOpen && <ul className={styles.selectList}>{options}</ul>}
      <div className={styles.clearButton}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          onClick={() => {
            setSelectedValue({ nickname: '', profileImageUrl: '' });
            onChange('assigneeUserId', undefined);
          }}
        >
          <Image src="/images/remove_icon.svg" alt="clear" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}
