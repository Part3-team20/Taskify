import CommonLayout from '@/layouts/CommonLayout';
import styles from './MyPage.module.scss';
import CreateTask from '@/components/modal/CreateTask';

export default function MyPage() {
  return (
    <CommonLayout>
      <div className={styles.container}>MyPage 페이지</div>
      <CreateTask />
    </CommonLayout>
  );
}
