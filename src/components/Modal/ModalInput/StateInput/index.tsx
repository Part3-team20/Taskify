'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import arrowDown from '@/../public/images/dropdown_icon.svg';
import check from '@/../public/images/check.svg';
import LabelChip from '@/components/common/Chip/LabelChip';
import styles from './StateInput.module.scss';

interface StateInputProps {
  columns: {
    id: number;
    title: string;
    teamId: number;
    createdAt: Date | string;
    updatedAt: Date | string;
  }[];
  defaultColumnId: number;
  onChange: (key: string, value: number) => void;
}

export default function StateInput({ columns, defaultColumnId, onChange }: StateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const divRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const defaultColumn = columns.find((column) => column.id === defaultColumnId);
    setSelectedValue(defaultColumn ? defaultColumn.title : '미정');
  }, [columns]);

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

  const options = columns.map((item) => (
    <li className={styles.selectItem} key={item.id}>
      <button
        className={styles.itemBtn}
        type="button"
        onClick={() => {
          setSelectedValue(item.title);
          onChange('columnId', item.id);
          setIsOpen(false);
        }}
      >
        {selectedValue === item.title ? <Image className={styles.checkIcon} src={check} alt="checked" /> : null}
        <div className={styles.chips}>
          <LabelChip type="columns" label={item.title} />
        </div>
      </button>
    </li>
  ));

  return (
    <div className={styles.container} ref={divRef}>
      <input
        className={styles.input}
        style={{ borderColor: `${isOpen ? '#5534DA' : '#D9D9D9'}` }}
        readOnly
        onClick={handleToggle}
      />
      <div className={styles.chip}>
        <LabelChip type="columns" label={selectedValue} />
      </div>
      <Image src={arrowDown} alt="arrow" width={26} height={26} className={styles.arrow} onClick={handleToggle} />
      {isOpen && <ul className={styles.selectList}>{options}</ul>}
    </div>
  );
}
