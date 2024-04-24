'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useInvite } from '@/contexts/inviteContext';
import styles from './InvitedBoardSearchForm.module.scss';

export default function InvitedBoardSearchForm() {
  const [value, setValue] = useState<string>('');
  const { searchInvitation } = useInvite();

  const onSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchInvitation(value);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.container} onSubmit={onSearchFormSubmit}>
      <label htmlFor="search" className={styles.inputBox}>
        <span className={styles.iconBox}>
          <Image fill src="/images/search_icon.svg" alt="검색 아이콘" />
        </span>
        <input
          className={styles.input}
          value={value}
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
