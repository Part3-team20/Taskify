import React from 'react';
import styles from './LabelChip.module.scss';

// 백그라운드와 텍스트 색상 상수 배열
const BACKGROUNDCOLORS = ['#E7F7DB', '#F1EFFD', '#F9EEE3', '#E0F2F6', '#F7E4F2', '#D7D7D7'];
const TEXTCOLORS = ['#7ac555', '#760dde', '#ffa500', '#76a5ea', '#e876ea', '#4b4b4b'];

// 컬럼용 고정 색상
const COLUMN_BACKGROUND = '#F1EFFD';
const COLUMN_TEXT_COLOR = '#760dde';

// 색상 인덱스 카운터
let colorIndex = 0;

interface LabelChipProps {
  label: string;
  type: 'columns' | 'tag';
}

export default function LabelChip({ label, type }: LabelChipProps) {
  let backgroundColor;
  let textColor;

  if (type === 'columns') {
    // 컬럼 타입일 경우 고정된 색상을 사용
    backgroundColor = COLUMN_BACKGROUND;
    textColor = COLUMN_TEXT_COLOR;
  } else {
    // 태그 타입일 경우 순차적인 색상을 사용
    backgroundColor = BACKGROUNDCOLORS[colorIndex % BACKGROUNDCOLORS.length];
    textColor = TEXTCOLORS[colorIndex % TEXTCOLORS.length];
    colorIndex += 1; // 다음 태그에 다른 색상을 사용하기 위해 인덱스 증가
  }

  const classNames = `${styles.labelChip} ${styles[type]}`;

  return (
    <div className={classNames} style={{ backgroundColor, color: textColor }}>
      {type === 'columns' && <div className={styles.iconCircle} style={{ backgroundColor: textColor }} />}
      {label}
    </div>
  );
}
