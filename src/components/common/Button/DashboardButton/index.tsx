import Image from 'next/image';
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
  handleClick: (id: number) => void;
}

export default function DashboardButton({ id, title, color, createdByMe, handleClick }: DashboardButtonProps) {
  const onClick = () => {
    // 부모 컴포넌트에서 handleClick 이벤트를 받아와 개별 대시보드의 id를 넘겨 페이지 이동
    handleClick(id);
  };

  return (
    <button className={styles.container} type="button" onClick={onClick}>
      <span className={styles.color} style={{ backgroundColor: color }} />
      <p className={styles.title}>
        {title}
        {createdByMe && (
          <span className={styles.icon}>
            <Image fill src="/images/crown_icon.svg" alt="왕관 아이콘" />
          </span>
        )}
      </p>
      <Image width="18" height="18" src="/images/arrow_icon.svg" alt="화살표 아이콘" />
    </button>
  );
}
