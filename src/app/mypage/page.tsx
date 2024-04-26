'use client';

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import CommonLayout from '@/layouts/CommonLayout';
import GoBackButton from '@/components/common/Button/GoBackButton';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import BasicSubmitButton from '@/components/common/Button/BasicSubmitButton';
import useFetchWithToken from '@/hooks/useFetchToken';
import { CHANGE_PASSWORD, USERS } from '@/constants/ApiUrl';
import { useRouter } from 'next/navigation';
import Toast from '@/util/Toast';

import styles from './MyPage.module.scss';

export default function MyPage() {
  const router = useRouter();
  const { fetchWithToken } = useFetchWithToken();
  const [profile, setProfile] = useState<{ nickName: string; profileImageUrl: string | undefined }>({
    nickName: '',
    profileImageUrl: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [passwords, setPasswords] = useState({ password: '', newPassword: '', passwordCheck: '' });
  const [email, setEmail] = useState<string | undefined>('');

  const fetchUserData = useCallback(async () => {
    try {
      const result = await fetchWithToken(`${USERS}`, 'GET');
      setProfile({
        nickName: result.nickname,
        profileImageUrl: result.profileImageUrl,
      });
      setEmail(result.email);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, []);

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, nickName: e.target.value }));
  };

  const handlePasswordChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, newPassword } = passwords;

    try {
      await fetchWithToken(`${CHANGE_PASSWORD}`, 'PUT', {
        password,
        newPassword,
      });
      Toast.success('비밀번호를 변경했습니다');
      router.refresh();
    } catch (err: any) {
      // Error 객체에서 Message만 추출
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  const handleLogoutClick = () => {
    window.localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <CommonLayout>
      <div className={styles.container}>
        <GoBackButton />
        <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
          <h1>프로필</h1>
          <div className={styles.inputs}>
            <FileInput setFile={setImageFile} className={styles.fileInput} />
            <div className={styles.textInputs}>
              <Input labelName="이메일" name="email" placeholder={email} disabled />
              <Input
                labelName="닉네임"
                name="nickName"
                value={profile.nickName}
                required
                onChange={handleNickNameChange}
              />
            </div>
          </div>
          <div className={styles.button}>
            <BasicSubmitButton color="violet" isActive={Boolean(profile.nickName)} handleClick={() => {}}>
              저장
            </BasicSubmitButton>
          </div>
        </form>
        <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
          <h1>비밀번호 변경</h1>
          <div className={styles.inputs}>
            <Input
              labelName="현재 비밀번호"
              name="password"
              placeholder="현재 비밀번호 입력"
              onChange={handlePasswordChange}
              required
            />
            <Input
              labelName="새 비밀번호"
              name="newPassword"
              placeholder="새 비밀번호 입력"
              onChange={handlePasswordChange}
              required
            />
            <Input
              labelName="새 비밀번호 확인"
              name="passwordCheck"
              placeholder="새 비밀번호 입력"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className={styles.button}>
            <BasicSubmitButton color="violet" isActive handleClick={() => {}}>
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
