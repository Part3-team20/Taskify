'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import styles from './defaultPageStyle.module.scss';

export default function ErrorPage() {
  const returnPage = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src="/images/mainLogo.svg" width={100} height={100} alt="taskify" priority />
      </Link>
      <h1 className={styles.title}>Error! 😵‍💫</h1>
      <p className={styles.desc}>페이지를 불러오는데 실패했어요.</p>
      <Button color="violet" handleClick={returnPage}>
        돌아가기
      </Button>
    </div>
  );
}
