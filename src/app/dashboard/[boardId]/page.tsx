import CommonLayout from '@/layouts/CommonLayout';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  return (
    <CommonLayout>
      <div className={styles.container}>Dashboard 페이지</div>
    </CommonLayout>
  );
}
