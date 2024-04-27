// 추후 삭제
import Image from 'next/image';
import styles from './defaultPageStyle.module.scss';

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <Image src="/images/mainLogo.svg" width={80} height={80} alt="taskify" priority />
      <h2 className={styles.subtitle}>Loading...</h2>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    </div>
  );
}
