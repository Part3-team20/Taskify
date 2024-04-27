'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import CommonLayout from '@/layouts/CommonLayout';
import GoBackButton from '@/components/common/Button/GoBackButton';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import BasicSubmitButton from '@/components/common/Button/BasicSubmitButton';
import styles from './MyPage.module.scss';
import useFetchWithToken from '@/hooks/useFetchToken';

type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null | undefined;
  createdAt: string;
  updatedAt: string;
};

export default function MyPage() {
  const { fetchWithToken } = useFetchWithToken();
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: null,
    createdAt: '',
    updatedAt: '',
  });

  const [profile, setProfile] = useState<{ nickName: string; profileImageUrl: string | null }>({
    nickName: '',
    profileImageUrl: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [password, setPassword] = useState({ password: '', newPassword: '', passwordCheck: '' });

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, nickName: e.target.value }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const formData = new FormData();
      const profileBody = {
        nickname: profile.nickName,
        profileImageUrl: undefined,
      };
      const ImageBody = formData;
      const accessToken = localStorage.getItem('accessToken');
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/users/me`, 'PUT', profileBody);
      await fetch(`https://sp-taskify-api.vercel.app/4-20/users/me/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        body: ImageBody,
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handlePasswordSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const body = {
        password: password.password,
        newPassword: password.newPassword,
      };
      const newPassword = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/auth/password`, 'PUT', body);
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  const handleLogoutClick = (e: MouseEvent<HTMLDivElement>) => {
    window.localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/users/me`);
        setUser(response);
        setProfile({ nickName: response?.nickname, profileImageUrl: response?.profileImageUrl });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [fetchWithToken]);

  return (
    <CommonLayout>
      <div className={styles.container}>
        <GoBackButton />
        <form onSubmit={(e) => e.preventDefault()} className={styles.profileForm}>
          <h1>프로필</h1>
          <div className={styles.inputs}>
            <FileInput
              setFile={setImageFile}
              className={styles.fileInput}
              defaultImage={profile?.profileImageUrl || ''}
            />
            <div className={styles.textInputs}>
              <Input labelName="이메일" name="email" placeholder={user?.email} disabled />
              <Input
                labelName="닉네임"
                name="nickName"
                value={profile?.nickName}
                required
                onChange={handleNickNameChange}
              />
            </div>
          </div>
          <div className={styles.button}>
            <BasicSubmitButton
              color="violet"
              isActive={Boolean(profile?.nickName)}
              handleClick={handleProfileSubmit}
              type="button"
            >
              저장
            </BasicSubmitButton>
          </div>
        </form>
        <form onSubmit={(e) => e.preventDefault()} className={styles.passwordForm}>
          <h1>비밀번호 변경</h1>
          <div className={styles.inputs}>
            <Input
              labelName="현재 비밀번호"
              name="password"
              placeholder="현재 비밀번호 입력"
              onChange={handlePasswordChange}
              type="password"
              required
            />
            <Input
              labelName="새 비밀번호"
              name="newPassword"
              placeholder="새 비밀번호 입력"
              onChange={handlePasswordChange}
              type="password"
              required
            />
            <Input
              labelName="새 비밀번호 확인"
              name="passwordCheck"
              placeholder="새 비밀번호 입력"
              onChange={handlePasswordChange}
              type="password"
              required
            />
          </div>
          <div className={styles.button}>
            <BasicSubmitButton
              color="violet"
              isActive={Boolean(
                password?.password && password?.newPassword && password?.newPassword === password.passwordCheck
              )}
              handleClick={handlePasswordSubmit}
              type="button"
            >
              변경
            </BasicSubmitButton>
          </div>
        </form>
        <div className={styles.logout} onClick={handleLogoutClick}>
          로그아웃
        </div>
      </div>
    </CommonLayout>
  );
}
