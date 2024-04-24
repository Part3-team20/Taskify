import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import LandingPageHeader from '@/components/common/Header/LandingPageHeader';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <LandingPageHeader />
      <div className={styles.container}>
        <div className={styles.contentsWrapper}>
          <div className={styles.topContent}>
            <Image src="/images/landing/top1.png" alt="top_image" width={722} height={422} />
            <h1>
              새로운 일정 관리 <span>Taskify</span>
            </h1>
            <div className={styles.description}>
              <p>Taskify는 사용자가 해야 할 일을 간편하게 등록하고 관리할 수 있는 도구입니다.</p>
              <p>
                일정을 추가하고 수정하며 중요한 일들을 우선순위에 따라 정리하여 효율적으로 시간을 관리할 수 있습니다.
              </p>
              <p>
                사용자의 생산성 향상을 위해 설계된 이 앱은 간단한 인터페이스와 다양한 기능을 제공하여 일상 생활을
                조직화하는 데 도움을 줍니다.
              </p>
            </div>
            <Link href="/login">
              <div className={styles.btn}>로그인하기</div>
            </Link>
          </div>
          <div className={styles.middleContent}>
            <div className={`${styles.point1} ${styles.pointCard}`}>
              <div className={styles.textContent}>
                <h1>Point 1</h1>
                <p>일의 우선순위를</p>
                <p>관리하세요</p>
              </div>
              <div className={styles.imageContent}>
                <Image src="/images/landing/middle1.png" alt="middle1_image" width={594} height={497} />
              </div>
            </div>
            <div className={`${styles.point2} ${styles.pointCard}`}>
              <div className={styles.textContent}>
                <h1>Point 2</h1>
                <p>해야 할 일을</p>
                <p>등록하세요</p>
              </div>
              <div className={styles.imageContent}>
                <Image src="/images/landing/middle2.png" alt="middle2_image" width={436} height={502} />
              </div>
            </div>
          </div>
          <div className={styles.bottomContent}>
            <h1 className={styles.title}>생산성을 높이는 다양한 설정 ⚡</h1>
            <div className={styles.cardList}>
              <div className={styles.cardItem}>
                <div className={styles.top}>
                  <Image src="/images/landing/bottom1.png" alt="dashboard" width={300} height={123} />
                </div>
                <div className={styles.bottom}>
                  <h2>대시보드 설정</h2>
                  <p>대시보드 사진과 이름을 변경할 수 있어요.</p>
                </div>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.top}>
                  <Image src="/images/landing/bottom2.png" alt="invite" width={300} height={230} />
                </div>
                <div className={styles.bottom}>
                  <h2>초대</h2>
                  <p>새로운 팀원을 초대할 수 있어요.</p>
                </div>
              </div>
              <div className={styles.cardItem}>
                <div className={styles.top}>
                  <Image src="/images/landing/bottom3.png" alt="member" width={300} height={195} />
                </div>
                <div className={styles.bottom}>
                  <h2>구성원</h2>
                  <p>구성원을 초대하고 내보낼 수 있어요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
