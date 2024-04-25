import { ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './AddButton.module.scss';

const cx = classNames.bind(styles);

interface AddButtonProps {
  children?: ReactNode;
  dashboard?: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddButton({ children = null, dashboard = false, handleClick }: AddButtonProps) {
  return (
    <button
      className={cx('container', children ? 'hasChildren' : null, dashboard && 'dashboard')}
      type="button"
      onClick={handleClick}
    >
      {children}
      <div className={styles.iconBox}>
        <Image src="/images/add_fill_box.svg" fill alt="추가하기 아이콘" />
      </div>
    </button>
  );
}
