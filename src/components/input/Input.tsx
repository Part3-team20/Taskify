import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: 'email' | 'password';
}

const Input = (props: InputProps) => {
  return <input {...props} className={styles.customInput} />;
};

export default Input;
