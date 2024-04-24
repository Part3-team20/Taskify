import Image from 'next/image';
import Link from 'next/link';
import styles from './DashboardButton.module.scss';

// 대시보드 데이터 타입
// interface DashboardDataProps {
//   id: number;
//   title: string;
//   color: string;
//   createdAt: string;
//   updatedAt: string;
//   createdByMe: boolean;
//   userId: number;
// }

interface DashboardButtonProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

export default function DashboardButton({ id, title, color, createdByMe }: DashboardButtonProps) {
  return (
    <Link className={styles.container} href={`/dashboard/${id}`}>
      <span className={styles.color} style={{ backgroundColor: color }} />
      <p className={styles.title}>
        <span className={styles.text}>{title}</span>
        {createdByMe && (
          <span className={styles.icon}>
            <Image fill src="/images/crown_icon.svg" alt="왕관 아이콘" />
          </span>
        )}
      </p>
      <Image width="18" height="18" src="/images/arrow_icon.svg" alt="화살표 아이콘" />
    </Link>
  );
}
