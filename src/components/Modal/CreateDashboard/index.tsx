import { useEffect, useState } from 'react';
import ColorChip from '@/components/common/Chip/ColorChip';
import Modal from '@/components/Modal';
import ModalInput from '@/components/Modal/ModalInput/index';
import useFetchWithToken from '@/hooks/useFetchToken';
import ModalButton from '@/components/Modal/ModalButton/Button';
import ModalSubmitButton from '@/components/Modal/ModalButton/SubmitButton';
import styles from './CreateDashboard.module.scss';

interface CreateDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDashboard({ isOpen, onClose }: CreateDashboardProps) {
  /**
   *  @TODOS
   * -error 처리
   * -POST 후 대시보드 목록 다시 받아오기
   * */

  const initialValues = { title: '', color: '#7ac555' };
  const [values, setValues] = useState(initialValues);
  const [isActive, setIsActive] = useState(false);

  const { fetchWithToken: postDashboard, loading, error } = useFetchWithToken();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.title.trim() === '') return;

    await postDashboard(`https://sp-taskify-api.vercel.app/4-20/dashboards`, 'POST', values);

    if (error) {
      console.log(error);
    }

    setValues(() => initialValues);
    onClose();
  };

  const handleClose = () => {
    setValues(() => initialValues);
    onClose();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, title: e.target.value }));
  };

  useEffect(() => {
    if (values.title.trim() !== '' && loading === false) {
      setIsActive(() => true);
    } else {
      setIsActive(() => false);
    }
  }, [values.title, loading]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: 'auto', height: 'auto' }}>
      <div className={styles.container}>
        <h3 className={styles.title}>새로운 대시보드</h3>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.input}>
            <span className={styles.label}>대시보드 이름</span>
            <ModalInput placeholder="새로운 대시보드" value={values.title} onChange={onChangeInput} />
          </div>
          <ColorChip onSelect={(newColor) => setValues((prevValues) => ({ ...prevValues, color: newColor }))} />
          <div className={styles.buttonBox}>
            <ModalButton color="white" handleClick={handleClose}>
              취소
            </ModalButton>
            <ModalSubmitButton isActive={isActive}>{loading ? '로딩중...' : '생성'}</ModalSubmitButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}