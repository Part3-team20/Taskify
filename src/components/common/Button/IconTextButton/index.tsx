import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './IconTextButton.module.scss';

const cx = classNames.bind(styles);

interface IconTextButtonProps {
  className: string;
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function IconTextButton({ className, children, handleClick }: IconTextButtonProps) {
  return (
    <button className={cx('container', `${className}`)} type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
