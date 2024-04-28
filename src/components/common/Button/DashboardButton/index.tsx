import Image from 'next/image';
import Link from 'next/link';
import { Dashboard } from '@/types/DashboardTypes';
import styles from './DashboardButton.module.scss';

interface DashboardButtonProps {
  data: Dashboard;
}

export default function DashboardButton({ data }: DashboardButtonProps) {
  const { id, title, color, createdByMe } = data;
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
