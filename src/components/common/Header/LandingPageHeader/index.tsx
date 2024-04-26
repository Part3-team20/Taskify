import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingPageHeader.module.scss';

export default function LandingPageHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/mainLogo.svg" alt="logo" className={styles.logoImg} width={28.8} height={33.1} />
          <Image src="/images/Taskify.svg" alt="taskify" className={styles.taskify} width={80} height={22} />
        </Link>
        <div className={styles.auth}>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </header>
  );
}
