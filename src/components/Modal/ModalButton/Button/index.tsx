import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalButton.module.scss';

const cx = classNames.bind(styles);
interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'violet' | 'white';
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ModalButton({ color, children, handleClick, ...props }: ModalButtonProps) {
  return (
    <button className={cx('container', color)} type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
