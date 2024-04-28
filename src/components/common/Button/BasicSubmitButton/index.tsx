import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicSubmitButton.module.scss';

const cx = classNames.bind(styles);

interface BasicSubmitButtonProps {
  color: 'violet' | 'white';
  children: ReactNode;
  isActive: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function BasicSubmitButton({ color, children, isActive, handleClick }: BasicSubmitButtonProps) {
  return (
    <button className={cx('container', color)} type="submit" disabled={!isActive} onClick={handleClick}>
      {children}
    </button>
  );
}
