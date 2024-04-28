'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Image from 'next/image';
import styles from './ColorChip.module.scss';

// ColorChip
// Image
const COLORS = ['#7ac555', '#760dde', '#ffa500', '#76a5ea', '#e876ea'];

interface ColorChipProps {
  onSelect: (color: string) => void;
  mode: 'create' | 'edit';
}

export default function ColorChip({ onSelect, mode }: ColorChipProps): JSX.Element {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setIsPickerOpen(false);
    onSelect(color);
  };

  // 컬러 피커
  const handleCustomColor = (color: string) => {
    setSelectedColor(color);
    onSelect(color);
  };

  // 컬러 피커 바깥 클릭을 감지하기 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.colorChipContainer}>
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`${styles.colorChip} ${mode === 'edit' ? styles.mobileEdit : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        >
          {selectedColor === color && <Image src="/images/check_icon.svg" alt="Selected" width={24} height={24} />}
        </button>
      ))}

      <button
        type="button"
        className={`${styles.colorChip} ${selectedColor && !COLORS.includes(selectedColor) ? '' : styles.picker} `}
        onClick={() => setIsPickerOpen(true)}
        style={{ backgroundColor: selectedColor && !COLORS.includes(selectedColor) ? selectedColor : 'transparent' }}
      >
        {selectedColor && !COLORS.includes(selectedColor) ? (
          <Image src="/images/check_icon.svg" alt="Selected" width={24} height={24} />
        ) : (
          <Image src="/images/add_btn.svg" alt="Add color" width={24} height={24} />
        )}
      </button>

      {isPickerOpen && (
        <div className={styles.colorPicker} ref={pickerRef}>
          <HexColorPicker color={selectedColor} onChange={handleCustomColor} />
        </div>
      )}
    </div>
  );
}
