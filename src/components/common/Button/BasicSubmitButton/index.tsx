import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './BasicSubmitButton.module.scss';

const cx = classNames.bind(styles);

type SubmitButtonType = 'submit' | 'reset' | 'button';

interface BasicSubmitButtonProps {
  color: 'violet' | 'white';
  children: ReactNode;
  isActive: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: SubmitButtonType;
}

export default function BasicSubmitButton({
  color,
  children,
  isActive,
  handleClick,
  type = 'submit',
}: BasicSubmitButtonProps) {
  return (
    <button className={cx('container', color)} type={type} disabled={!isActive} onClick={handleClick}>
      {children}
    </button>
  );
}
