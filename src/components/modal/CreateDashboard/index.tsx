import { useEffect, useState } from 'react';
import ColorChip from '@/components/common/chip/ColorChip';
import Modal from '..';
import ModalInput from '../modalInput/ModalInput';
import styles from './CreateDashboard.module.scss';
import ModalButton from '../ModalButton/Button';
import ModalSubmitButton from '../ModalButton/SubmitButton';

interface CreateDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDashboard({ isOpen, onClose }: CreateDashboardProps) {
  /**
   *  @TODOS
   * -모달 인풋 가로 길이 조정
   * -실제 POST 리퀘스트 로직
   * */

  const initialValues = { title: '', color: '#7ac555' };
  const [values, setValues] = useState(initialValues);
  const [isActive, setIsActive] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.title.trim() === '') return;

    /* POST 리퀘스트로 추후 변경 */
    console.log(values);

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
    if (values.title.trim() !== '') {
      setIsActive(() => true);
    } else {
      setIsActive(() => false);
    }
  }, [values.title]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ width: 'auto', height: 'auto' }}>
      <div className={styles.container}>
        <h3 className={styles.title}>새로운 대시보드</h3>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.input}>
            <span className={styles.label}>대시보드 이름</span>
            <ModalInput placeholder="" value={values.title} onChange={onChangeInput} />
          </div>
          <ColorChip onSelect={(newColor) => setValues((prevValues) => ({ ...prevValues, color: newColor }))} />
          <div className={styles.buttonBox}>
            <ModalButton color="white" handleClick={handleClose}>
              취소
            </ModalButton>
            <ModalSubmitButton isActive={isActive}>생성</ModalSubmitButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
