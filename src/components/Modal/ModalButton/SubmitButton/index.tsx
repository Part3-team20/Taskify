import { MouseEventHandler, ReactNode } from 'react';
import styles from './ModalSubmitButton.module.scss';

interface ModalSubmitButtonProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  onClick?: MouseEventHandler;
}

export default function ModalSubmitButton({ children, isActive, className, onClick }: ModalSubmitButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type="submit" className={`${styles.container} ${className}`} disabled={!isActive} onClick={onClick}>
      {children}
    </button>
  );
}
