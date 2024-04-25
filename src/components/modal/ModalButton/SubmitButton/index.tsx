import { ReactNode } from 'react';
import styles from './ModalSubmitButton.module.scss';

interface ModalSubmitButtonProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

export default function ModalSubmitButton({ children, isActive, className }: ModalSubmitButtonProps) {
  return (
    <button type="submit" className={`${styles.container} ${className}`} disabled={!isActive}>
      {children}
    </button>
  );
}
