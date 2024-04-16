import Image from 'next/image';
import React, { useState } from 'react';
import styles from './Profile.module.scss';

const BASE_PROFILE_IMG = '/images/profile.svg';

export default function Profile() {
  const [profileImg, setProfileImg] = useState(BASE_PROFILE_IMG);

  return (
    <div className={styles.profile}>
      <Image src={profileImg} alt="profileImg" width={23} height={23} />
    </div>
  );
}
