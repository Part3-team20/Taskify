import { MouseEventHandler, ReactNode } from 'react';
import styles from './ModalSubmitButton.module.scss';

// button
interface ModalSubmitButtonProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  onClick?: MouseEventHandler;
  type?: 'reset' | 'submit' | 'button';
}

export default function ModalSubmitButton({
  children,
  isActive,
  className,
  onClick,
  type = 'submit',
}: ModalSubmitButtonProps) {
  return (
    <button type={type} className={`${styles.container} ${className}`} disabled={!isActive} onClick={onClick}>
      {children}
    </button>
  );
}
