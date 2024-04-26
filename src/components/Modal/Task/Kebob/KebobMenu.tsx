import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DeleteTask from '../../DeleteTask';
import styles from './KebobMenu.module.scss';

type MenuOption = '수정하기' | '삭제하기';

export default function KebobMenu() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 메뉴 바깥을 클릭하면 메뉴를 숨기는 로직
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [menuRef]);

  const handleKebobClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleOptionClick = (option: MenuOption) => {
    console.log(`Option selected: ${option}`);
    setMenuVisible(false);

    if (option === '삭제하기') {
      setIsDeleteModalOpen(true); // 삭제 모달 열기
    }
  };

  return (
    <div className={styles.kebobMenuContainer} ref={menuRef}>
      <button type="button" className={styles.kebobIcon} onClick={handleKebobClick}>
        <Image src="/images/kebab_icon.svg" alt="추가 버튼" width={28} height={28} />
      </button>

      {isMenuVisible && (
        <div className={styles.menuOptions}>
          <button type="button" onClick={() => handleOptionClick('수정하기')}>
            수정하기
          </button>
          <button type="button" onClick={() => handleOptionClick('삭제하기')}>
            삭제하기
          </button>
        </div>
      )}

      <DeleteTask isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </div>
  );
}
