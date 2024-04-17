import React, { ReactNode } from 'react';
import styles from './modalInput.module.scss';

interface ModalInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

export default function ModalInput({ placeholder, value, onChange, children }: ModalInputProps) {
  return (
    <div className={styles.container}>
      <input className={styles.modalInput} placeholder={placeholder} value={value} onChange={onChange} />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
}
