import { useInvite } from '@/contexts/inviteContext';
import InviteListItem from '../InviteListItem';
import styles from './inviteList.module.scss';

export default function InviteList() {
  const { invitationData, isSearched } = useInvite();

  return (
    <div className={styles.container}>
      {invitationData.length === 0 && isSearched ? (
        <p className={styles.noResult}>검색 결과를 찾을 수 없습니다.</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
