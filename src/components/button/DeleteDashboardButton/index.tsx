import { useRouter } from 'next/router';
import styles from './DeleteDashboardButton.module.scss';

interface DeleteDashboardButtonProps {
  handleDelete: (id: string) => void;
}

export default function DeleteDashboardButton({ handleDelete }: DeleteDashboardButtonProps) {
  const router = useRouter();
  const id = router.query.id as string;

  const onDelete = () => {
    // 해당 페이지의 id값을 handleDelete 함수에 전달
    handleDelete(id);
  };

  return (
    <button className={styles.container} type="button" onClick={onDelete}>
      대시보드 삭제하기
    </button>
  );
}
