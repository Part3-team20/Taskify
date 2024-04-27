import Link from 'next/link';
import Image from 'next/image';
import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>페이지가 없거나 접근할 수 없어요</h1>
      <Image src="/images/fullLogo.svg" alt="Taskify로고" width={280} height={360} />
      <Link href="/">홈 화면 이동</Link>
    </div>
  );
}
