import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicSubmitButton.module.scss';

const cx = classNames.bind(styles);

interface BasicSubmitButtonProps {
  color: 'violet' | 'white';
  children: ReactNode;
  isActive: boolean;
}

export default function BasicSubmitButton({ color, children, isActive }: BasicSubmitButtonProps) {
  return (
    <button className={cx('container', color)} type="submit" disabled={!isActive}>
      {children}
    </button>
  );
}
