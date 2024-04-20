import { ReactNode } from 'react';
import styles from './LoginSubmitButton.module.scss';

interface LoginSubmitButtonProps {
  children: ReactNode;
  isActive: boolean;
}

export default function LoginSubmitButton({ children, isActive }: LoginSubmitButtonProps) {
  return (
    <button className={styles.container} type="submit" disabled={!isActive}>
      {children}
    </button>
  );
}
