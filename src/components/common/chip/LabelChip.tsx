import React from 'react';
import styles from './labelChip.module.scss';

// 백그라운드와 텍스트 색상 배열
const BACKGROUNDCOLORS = ['#E7F7DB', '#F1EFFD', '#F9EEE3', '#E0F2F6', '#F7E4F2', '#D7D7D7'];
const TEXTCOLORS = ['#7ac555', '#760dde', '#ffa500', '#76a5ea', '#e876ea', '#4b4b4b'];

// 색상 인덱스 카운터
let colorIndex = 0;

interface LabelChipProps {
  size: 'large' | 'small';
  label: string;
  type: 'columns' | 'tag';
}

export default function LabelChip({ size, label, type }: LabelChipProps) {
  // 컴포넌트가 생성될 때마다 색상 인덱스 업데이트
  const backgroundColor = BACKGROUNDCOLORS[colorIndex % BACKGROUNDCOLORS.length];
  const textColor = TEXTCOLORS[colorIndex % TEXTCOLORS.length];
  colorIndex += 1;

  const classNames = `${styles.labelChip} ${styles[size]} ${styles[type]}`;

  return (
    <div className={classNames} style={{ backgroundColor, color: textColor }}>
      {type === 'columns' && <div className={styles.iconCircle} style={{ backgroundColor: textColor }} />}
      {label}
    </div>
  );
}
