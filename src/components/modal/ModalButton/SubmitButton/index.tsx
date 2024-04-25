import { ReactNode } from 'react';
import styles from './ModalSubmitButton.module.scss';

// button
interface ModalSubmitButtonProps {
  children: ReactNode;
  isActive: boolean;
}

export default function ModalSubmitButton({ children, isActive }: ModalSubmitButtonProps) {
  return (
    <button type="submit" className={styles.container} disabled={!isActive}>
      {children}
    </button>
  );
}
