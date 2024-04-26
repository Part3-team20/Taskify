import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  labelName: string;
}

export default function Input({ labelName, error, errorMessage, ...props }: InputProps) {
  return (
    <label className={styles.label}>
      {labelName}
      <input {...props} className={`${styles.input} ${error && styles.error}`} />
      {error && <div className={styles.errorMessage}>{errorMessage}</div>}
    </label>
  );
}
