import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import styles from './PasswordInput.module.scss';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  labelName: string;
}

function PasswordInput({ labelName, error, errorMessage, ...props }: PasswordInputProps) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const passwordType = isPasswordShow ? 'text' : 'password';

  const handleTogglePassword = () => {
    setIsPasswordShow((prev) => !prev);
  };

  return (
    <label className={styles.label}>
      {labelName}
      <input {...props} className={`${styles.input} ${error && styles.error}`} type={passwordType} />
      {error && <div className={styles.errorMessage}>{errorMessage}</div>}
      <button className={styles.toggleBtn} type="button" onClick={handleTogglePassword}>
        {/* <Image src="/images/eye-on.svg" width={25} height={25} alt="eye-on" /> */}
        {isPasswordShow ? (
          <Image src="/images/eye-on.svg" alt="eye-on" width={25} height={25} />
        ) : (
          <Image src="/images/eye-off.svg" alt="eye-off" width={25} height={25} />
        )}
      </button>
    </label>
  );
}

export default PasswordInput;
