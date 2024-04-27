import Image from 'next/image';
import React from 'react';
import styles from './Profile.module.scss';

const BASE_PROFILE_IMG = '/images/profileImg.svg';

interface ProfileProps {
  profileImageUrl?: string;
}

export default function Profile({ profileImageUrl }: ProfileProps) {
  const imgSrc = profileImageUrl || BASE_PROFILE_IMG;
  return (
    <div className={styles.profile}>
      <Image src={imgSrc} alt="profileImg" layout="fill" objectFit="cover" />
    </div>
  );
}
