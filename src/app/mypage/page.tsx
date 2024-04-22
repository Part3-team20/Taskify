import CommonLayout from '@/layouts/CommonLayout';
import styles from './MyPage.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MyPage() {
  const router = useRouter();

  return (
    <CommonLayout>
      <div className={styles.container}>
        <button className={styles.goBackButton} onClick={() => router.back()}>
          <Image src={'/images/arrow_icon.svg'} alt="돌아가기" width={20} height={20} style={{ rotate: '180deg' }} />
          돌아가기
        </button>
      </div>
    </CommonLayout>
  );
}
