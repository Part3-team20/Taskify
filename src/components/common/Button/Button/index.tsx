import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type Color = 'violet' | 'white';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
  invite?: boolean;
  cancel?: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  color,
  children,
  handleClick,
  invite = false,
  cancel = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx('container', color, invite && 'invite', cancel && 'cancel')}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
