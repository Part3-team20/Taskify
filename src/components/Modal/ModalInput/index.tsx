import React, { ReactNode } from 'react';
import styles from './ModalInput.module.scss';

// modalInput
interface ModalInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  style?: React.CSSProperties;
  name?: string;
}

export default function ModalInput({ placeholder, value, onChange, children, style, name }: ModalInputProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.modalInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        name={name}
      />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
}
