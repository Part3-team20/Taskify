import { useInvite } from '@/contexts/inviteContext';
import InviteListItem from '../InviteListItem';
import styles from './inviteList.module.scss';

export default function InviteList() {
  const { invitationData } = useInvite();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>이름</span>
        <span>초대자</span>
        <span>수락 여부</span>
      </div>
      <ul className={styles.list}>
        {invitationData.map(({ title, nickname, id }) => (
          <li key={id} className={styles.item}>
            <InviteListItem title={title} nickname={nickname} id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
