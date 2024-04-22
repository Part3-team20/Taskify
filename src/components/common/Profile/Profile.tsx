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
      {/* <Image src={imgSrc} alt="profileImg" width={23} height={23} /> */}
      {/* 아직 이미지 호스트 주소를 알 수 없어서 이미지 확인을 위해 img 태그를 남겼습니다. */}
      {/* 목데이터 활용할땐 아래 코드로 사용하시면 됩니다 */}
      <img className={styles.profileImg} src={imgSrc} alt="profileImg" />
    </div>
  );
}
