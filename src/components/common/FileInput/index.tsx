'use client';

import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import styles from './FileInput.module.scss';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  defaultImage?: string | undefined;
}

export default function FileInput({ className, setFile, defaultImage, ...props }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPreview(file ? URL.createObjectURL(file) : null);
    setFile(file);
  };

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
      <input {...props} type="file" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
    </label>
  );
}
