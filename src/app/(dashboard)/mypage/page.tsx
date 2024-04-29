'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import GoBackButton from '@/components/common/Button/GoBackButton';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import useFetchWithToken from '@/hooks/useFetchToken';
import { CHANGE_PASSWORD, USERS } from '@/constants/ApiUrl';
import { useRouter } from 'next/navigation';
import Toast from '@/util/Toast';
import LogoutModal from '@/components/Modal/LogoutModal';
import Button from '@/components/common/Button/Button';
import styles from './MyPage.module.scss';

export default function MyPage() {
  const router = useRouter();
  const { fetchWithToken } = useFetchWithToken();
  const [profile, setProfile] = useState<{ nickName: string; profileImageUrl?: string }>({
    nickName: '',
    profileImageUrl: '',
  });
  const [imageFile, setImageFile] = useState<string | null | undefined>(undefined);
  const [passwords, setPasswords] = useState({ password: '', newPassword: '', passwordCheck: '' });
  const [email, setEmail] = useState<string | undefined>('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const result = await fetchWithToken(`${USERS}`, 'GET');
      setProfile({
        nickName: result.nickname,
        profileImageUrl: result.profileImageUrl,
      });
      setEmail(result.email);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, nickName: e.target.value }));
  };

  const handlePasswordChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = async () => {
    try {
      const body = {
        nickname: profile.nickName,
        profileImageUrl: imageFile,
      };
      await fetchWithToken(`https://sp-taskify-api.vercel.app/4-20/users/me`, 'PUT', body);
      Toast.success('프로필을 변경했습니다');
      router.refresh();
    } catch (err: any) {
      const errorMessage = err.toString().substr(7);
      Toast.error(errorMessage);
    }
  };

  const handlePasswordSubmit = async () => {
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
    router.push('/');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={styles.container}>
      <GoBackButton />
      <form onSubmit={(e) => e.preventDefault()} className={styles.profileForm}>
        <h1>프로필</h1>
        <div className={styles.inputs}>
          <FileInput
            setFile={setImageFile}
            className={styles.fileInput}
            defaultImage={profile?.profileImageUrl || null}
            usageLocation="mypage"
          />
          <div className={styles.textInputs}>
            <Input className={styles.mypageInput} labelName="이메일" name="email" placeholder={email} disabled />
            <Input
              className={styles.mypageInput}
              labelName="닉네임"
              name="nickName"
              value={profile?.nickName}
              required
              onChange={handleNickNameChange}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button color="violet" disabled={!profile?.nickName} handleClick={handleProfileSubmit} type="button">
            저장
          </Button>
        </div>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className={styles.passwordForm}>
        <h1>비밀번호 변경</h1>
        <div className={styles.inputs}>
          <Input
            className={styles.mypageInput}
            labelName="현재 비밀번호"
            name="password"
            placeholder="현재 비밀번호 입력"
            onChange={handlePasswordChange}
            type={visiblePassword ? 'text' : 'password'}
            required
          />
          <Input
            className={styles.mypageInput}
            labelName="새 비밀번호"
            name="newPassword"
            placeholder="새 비밀번호 입력"
            onChange={handlePasswordChange}
            type={visibleNewPassword ? 'text' : 'password'}
            required
          />
          <Input
            className={styles.mypageInput}
            labelName="새 비밀번호 확인"
            name="passwordCheck"
            placeholder="새 비밀번호 입력"
            onChange={handlePasswordChange}
            type="password"
            required
          />
          <Image
            src={visiblePassword ? '/images/eye-on.svg' : '/images/eye-off.svg'}
            alt="password-visibility"
            width={24}
            height={24}
            className={styles.passwordVisible}
            onClick={() => setVisiblePassword((prev) => !prev)}
          />
          <Image
            src={visibleNewPassword ? '/images/eye-on.svg' : '/images/eye-off.svg'}
            alt="newPassword-visibility"
            width={24}
            height={24}
            className={styles.newPasswordVisible}
            onClick={() => setVisibleNewPassword((prev) => !prev)}
          />
        </div>
        <div className={styles.button}>
          <Button
            color="violet"
            disabled={
              !(
                Boolean(passwords?.password) &&
                Boolean(passwords?.newPassword) &&
                passwords?.newPassword === passwords?.passwordCheck
              )
            }
            handleClick={handlePasswordSubmit}
            type="button"
          >
            변경
          </Button>
        </div>
      </form>
      <div className={styles.logout}>
        <button type="button" className={styles.logoutButton} onClick={() => setIsLogoutModalOpen(true)}>
          로그아웃
        </button>
      </div>
      {isLogoutModalOpen && (
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogoutClick}
        />
      )}
    </div>
  );
}
