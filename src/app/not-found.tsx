'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import styles from './defaultPageStyle.module.scss';

export default function NotFound() {
  const returnPage = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src="/images/mainLogo.svg" width={100} height={100} alt="taskify" priority />
      </Link>
      <h1 className={styles.subtitle}>Page Not Found 😵‍💫</h1>
      <p className={styles.desc}>존재하지 않는 페이지예요.</p>
      <Button color="violet" handleClick={returnPage}>
        돌아가기
      </Button>
    </div>
  );
}
