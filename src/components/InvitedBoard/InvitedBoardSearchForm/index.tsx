'use client';

import Image from 'next/image';
import { useInvite } from '@/contexts/inviteContext';
import styles from './InvitedBoardSearchForm.module.scss';

interface InvitedBoardSearchFormProps {
  keyword: string;
  setKeyword: (newKeyword: string) => void;
}

export default function InvitedBoardSearchForm({ keyword, setKeyword }: InvitedBoardSearchFormProps) {
  const { searchInvitation } = useInvite();

  const onSearchFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchInvitation(keyword);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form className={styles.container} onSubmit={onSearchFormSubmit}>
      <label htmlFor="search" className={styles.inputBox}>
        <span className={styles.iconBox}>
          <Image fill src="/images/search_icon.svg" alt="검색 아이콘" />
        </span>
        <input
          className={styles.input}
          value={keyword}
          type="text"
          placeholder="검색"
          id="search"
          name="search"
          onChange={onInputChange}
        />
      </label>
    </form>
  );
}
