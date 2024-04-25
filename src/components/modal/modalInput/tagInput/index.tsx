'use client';

import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import LabelChip from '@/components/common/Chip/LabelChip';
import styles from './TagInput.module.scss';

// tag input
export default function TagInput() {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tag.trim() !== '') {
      // Enter 입력 event
      if (tagList.length >= 5) {
        // 태그 5개 까지 적용
        setTag('');
        return;
      }
      if (!tagList.includes(tag.trim())) {
        // 중복되는 태그 검사
        setTagList([...tagList, tag.trim()]);
        setTag('');
      }
      setTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    // 클릭시 tag 삭제
    setTagList(tagList.filter((tagItem) => tagItem !== tagToDelete));
  };

  return (
    <div className={styles.container}>
      <p className={styles.tagText}>태그</p>
      <div className={styles.inputContainer}>
        <div className={styles.tagList}>
          {tagList?.map((tagItem) => (
            <button type="button" className={styles.tagItem} onClick={() => handleDeleteTag(tagItem)}>
              <LabelChip key={tagItem} label={tagItem} type="tag" />
            </button>
          ))}
        </div>
        <input
          placeholder="입력 후 Enter"
          value={tag}
          onChange={handleChangeTag}
          onKeyDown={handleKeyPress}
          className={styles.tagInput}
        />
      </div>
    </div>
  );
}
