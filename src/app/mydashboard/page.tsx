import CommonLayout from '@/layouts/CommonLayout';
import styles from './MyDashboard.module.scss';

export default function MyDashboard() {
  return (
    <CommonLayout>
      <div className={styles.container}>MyDashboard 페이지</div>
    </CommonLayout>
  );
}
