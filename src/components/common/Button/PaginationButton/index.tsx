'use client';

import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './PaginationButton.module.scss';

const cx = classNames.bind(styles);

interface PaginationButtonProps {
  hasNext: boolean; // 받아오는 데이터와 로직에 따라 이 부분은 추후 변경
  className: string;
}

export default function PaginationButton({ hasNext, className }: PaginationButtonProps) {
  const [page, setPage] = useState(1);

  // 페이지네이션 관련 로직 추후 변경 필요
  const onClickPrev = () => {
    if (page === 1) return;
    setPage((prevPage) => prevPage - 1);
  };

  const onClickNext = () => {
    if (!hasNext) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={cx('container', className)}>
      <button type="button" className={cx('button', 'left')} disabled={page === 1} onClick={onClickPrev}>
        <span className={styles.icon}>
          <Image
            fill
            src={page !== 1 ? '/images/arrow_icon.svg' : 'images/arrow_icon_disabled.svg'}
            alt="이전 페이지"
            priority
          />
        </span>
      </button>
      <button type="button" className={styles.button} disabled={!hasNext} onClick={onClickNext}>
        <span className={styles.icon}>
          <Image
            fill
            src={hasNext ? '/images/arrow_icon.svg' : 'images/arrow_icon_disabled.svg'}
            alt="다음 페이지"
            priority
          />
        </span>
      </button>
    </div>
  );
}
