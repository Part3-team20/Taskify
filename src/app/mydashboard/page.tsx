import CommonLayout from '@/layouts/CommonLayout';
import { InviteProvider } from '@/contexts/inviteContext';
import InvitedBoard from '@/components/InvitedBoard';
import MyDashboardList from '@/components/MyDashboardList';
import styles from './MyDashboard.module.scss';

export default function MyDashboard() {
  return (
    <CommonLayout>
      <div className={styles.container}>
        <MyDashboardList />
        <InviteProvider>
          <InvitedBoard />
        </InviteProvider>
      </div>
    </CommonLayout>
  );
}
