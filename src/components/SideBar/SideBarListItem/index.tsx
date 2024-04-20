import Image from 'next/image';
import Link from 'next/link';
import styles from './SideBarListItem.module.scss';

interface SideBarListItemProps {
  data: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };
}

// sidebar
export default function SideBarListItem({ data }: SideBarListItemProps) {
  const { id, title, color, createdByMe } = data;
  return (
    <li key={id}>
      <Link href={`/dashboard/${id}`}>
        <div className={styles.container}>
          <span className={styles.color} style={{ backgroundColor: color }} />
          <div className={styles.title}>
            <p className={styles.text}>{title}</p>
            {createdByMe && (
              <span className={styles.icon}>
                <Image fill src="/images/crown_icon.svg" alt="왕관 아이콘" />
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
