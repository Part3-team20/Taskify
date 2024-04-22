'use client';

import { InputHTMLAttributes, useRef, useState } from 'react';
import styles from './FileInput.module.scss';
import Image from 'next/image';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function FileInput({ name, onChange }: FileInputProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  return (
    <div>
      {/* <img src={image ? image : '/images/add_btn.svg'} /> */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
