import React from 'react';
import styles from './numberChip.module.scss';

// number
interface NumberChipProps {
  number: number;
}

// NumberChip
export default function NumberChip({ number }: NumberChipProps): JSX.Element {
  return <div className={styles.numberChip}>{number}</div>;
}
