import React from 'react';
import styles from './NumberChip.module.scss';

interface NumberChipProps {
  number: number;
}

export default function NumberChip({ number }: NumberChipProps): JSX.Element {
  return <div className={styles.numberChip}>{number}</div>;
}
