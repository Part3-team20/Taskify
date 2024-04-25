import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftItems}>@codeit - 2024</div>
        <div className={styles.centerItems}>
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
        <div className={styles.rightItems}>
          <Link href="https://mail.google.com">
            <Image src="/images/email_icon.svg" alt="email" width={20} height={20} />
          </Link>
          <Link href="https://www.facebook.com/">
            <Image src="/images/facebook_icon.svg" alt="facebook" width={20} height={20} />
          </Link>
          <Link href="https://www.instagram.com/">
            <Image src="/images/instagram_icon.svg" alt="instagram" width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
