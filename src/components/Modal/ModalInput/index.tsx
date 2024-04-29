import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import styles from './ModalInput.module.scss';

interface ModalInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  style?: React.CSSProperties;
  name?: string;
}

export default function ModalInput({
  placeholder,
  value,
  onChange,
  children,
  style,
  name,
  onKeyDown,
}: ModalInputProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.modalInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
        name={name}
      />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
}
