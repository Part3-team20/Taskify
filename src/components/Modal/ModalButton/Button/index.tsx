import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalButton.module.scss';

// button
const cx = classNames.bind(styles);

interface ModalButtonProps {
  color: 'violet' | 'white';
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ModalButton({ color, children, handleClick }: ModalButtonProps) {
  return (
    <button className={cx('container', color)} type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
