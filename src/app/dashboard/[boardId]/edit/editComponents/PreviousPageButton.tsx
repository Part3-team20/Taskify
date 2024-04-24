import Image from 'next/image';
import Link from 'next/link';
import styles from './PreviousPageButton.module.scss';

export default function PreviosPageButton() {
  return (
    <div>
      <Link href="./" className={styles.previousPage}>
        <Image src="/images/arrowReverse_icon.svg" width={20} height={20} alt="previosPage" />
        <p> 돌아가기</p>
      </Link>
    </div>
  );
}
