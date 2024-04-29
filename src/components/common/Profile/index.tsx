import Image from 'next/image';
import React from 'react';
import styles from './Profile.module.scss';

const BASE_PROFILE_IMG = '/images/ProfileImg.svg';

interface ProfileProps {
  profileImageUrl?: string;
}

export default function Profile({ profileImageUrl }: ProfileProps) {
  const imgSrc = profileImageUrl || BASE_PROFILE_IMG;
  return (
    <div className={styles.profile}>
      <Image
        src={imgSrc}
        alt="profileImg"
        fill
        loading="lazy"
        sizes="(max-width: 768px) 1.625rem, (max-width: 1200px) 2.125rem, 33vw"
      />
    </div>
  );
}
