'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './StateInput.module.scss';
import arrowDown from '@/../public/images/dropdown_icon.svg';
import check from '@/../public/images/check.svg';
import LabelChip from '@/components/common/Chip/LabelChip';

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

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const defaultColumn = columns.find((column) => column.id === defaultColumnId);
    setSelectedValue(defaultColumn ? defaultColumn.title : '미정');
  }, []);

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
    <div className={styles.container}>
      <input className={styles.input} value={''} />
      <div className={styles.chip}>
        <LabelChip type="columns" label={selectedValue} />
      </div>
      <Image src={arrowDown} alt={'arrow'} width={26} height={26} className={styles.arrow} onClick={handleToggle} />
      {isOpen && <ul className={styles.selectList}>{options}</ul>}
    </div>
  );
}
