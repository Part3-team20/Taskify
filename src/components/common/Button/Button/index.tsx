import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  color: 'violet' | 'white';
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  invite?: boolean;
  cancel?: boolean;
}

export default function Button({ color, children, handleClick, invite, cancel }: ButtonProps) {
  return (
    <button
      className={cx('container', color, invite && 'invite', cancel && 'cancel')}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  invite: false,
  cancel: false,
};
