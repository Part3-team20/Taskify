'use client';

import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './FileInput.module.scss';

interface FileInputPropsInModal extends InputHTMLAttributes<HTMLInputElement> {
  setFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  defaultImage: string | null | undefined;
  usageLocation: 'modal';
  columnId: number;
}

interface FileInputPropsInMypage extends InputHTMLAttributes<HTMLInputElement> {
  setFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  defaultImage: string | null | undefined;
  usageLocation: 'mypage';
  columnId?: number;
}

export default function FileInput({
  className,
  setFile,
  defaultImage,
  usageLocation,
  columnId,
  ...props
}: FileInputPropsInModal | FileInputPropsInMypage) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const apiUrl =
      usageLocation === 'mypage'
        ? 'https://sp-taskify-api.vercel.app/4-20/users/me/image'
        : `https://sp-taskify-api.vercel.app/4-20/columns/${columnId}/card-image`;

    if (file) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });
        const result = await response.json();
        setFile(result.profileImageUrl);
        setPreview(URL.createObjectURL(file));
      } catch (error) {
        console.log(error);
      }
    } else {
      setPreview(null);
      setFile(undefined);
    }
  };

  const handleFileClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setPreview(null);
      setFile(undefined);
    }
  };

  useEffect(() => {
    setPreview(defaultImage || null);
  }, [defaultImage]);

  return (
    <div>
      <label className={`${styles.previewContainer} ${className}`}>
        <Image
          src={preview || '/images/add_btn.svg'}
          alt="preview"
          fill={!!preview}
          width={preview ? undefined : 28}
          height={preview ? undefined : 28}
          className={styles.preview}
        />
        <input
          {...props}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          ref={fileInputRef}
        />
      </label>
      {usageLocation === 'mypage' ? (
        <div className={styles.clearOnMypage}>
          <button type="button" onClick={handleFileClear} className={styles.clearButton}>
            초기화
          </button>
        </div>
      ) : (
        <div className={styles.clearOnModal}>
          <button type="button" onClick={handleFileClear} className={styles.clearButton}>
            <Image src="/images/remove_icon.svg" alt="clear" fill style={{ objectFit: 'cover' }} />
          </button>
        </div>
      )}
    </div>
  );
}
