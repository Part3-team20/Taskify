import CommonLayout from '@/layouts/CommonLayout';
import styles from './MyPage.module.scss';
import GoBackButton from '@/components/common/Button/GoBackButton';

export default function MyPage() {
  return (
    <CommonLayout>
      <div className={styles.container}>
        <GoBackButton />
      </div>
    </CommonLayout>
  );
}
