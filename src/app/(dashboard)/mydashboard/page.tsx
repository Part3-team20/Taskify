// 추후 삭제
import { InviteProvider } from '@/contexts/inviteContext';
import InvitedBoard from '@/components/InvitedBoard';
import MyDashboardList from '@/components/MyDashboardList';
import styles from './MyDashboard.module.scss';

export default function MyDashboard() {
  return (
    <div className={styles.container}>
      <MyDashboardList />
      <InviteProvider>
        <InvitedBoard />
      </InviteProvider>
    </div>
  );
}
