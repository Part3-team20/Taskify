'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './GoBackButton.module.scss';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button className={styles.goBackButton} type="button" onClick={() => router.back()}>
      <Image src="/images/arrow_icon.svg" alt="돌아가기" width={20} height={20} className={styles.arrow} />
      돌아가기
    </button>
  );
}
