'use client';

import { InputHTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './FileInput.module.scss';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setFile: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  defaultImage?: string | null | undefined;
}

export default function FileInput({ className, setFile, defaultImage, ...props }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('https://sp-taskify-api.vercel.app/4-20/users/me/image', {
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
      setFile(null);
    }
  };

  useEffect(() => {
    setPreview(defaultImage || null);
  }, [defaultImage]);

  return (
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
        defaultValue={defaultImage ? defaultImage : undefined}
        className={styles.fileInput}
      />
    </label>
  );
}
