import styles from './DashBoardHeader.module.scss';
import Profile from '../../Profile';

const mockData = {
  id: 1,
  email: 'cksdyd324@gmail.com',
  nickname: '진찬용',
  profileImageUrl: undefined,
  createdAt: '2024-04-19T12:30:21.029Z',
  updatedAt: '2024-04-19T12:30:21.029Z',
};

export default function DashBoardHeader() {
  return (
    <header className={styles.header}>
      내 대시보드
      <div className={styles.profile}>
        <Profile profileImageUrl={mockData.profileImageUrl} />
        <span className={styles.nickname}>{mockData.nickname}</span>
      </div>
    </header>
  );
}
