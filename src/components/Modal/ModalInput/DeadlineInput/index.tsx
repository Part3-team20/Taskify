'use client';

import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Image from 'next/image';
import styles from './DeadlineInput.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}

export default function DeadLineInput({
  onChange,
  defaultValue = null,
}: {
  onChange: (key: string, value: string) => void;
  defaultValue?: Date | string | null;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    // eslint-disable-next-line no-nested-ternary
    typeof defaultValue === 'object' ? defaultValue : typeof defaultValue === 'string' ? new Date(defaultValue) : null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange('dueDate', date ? formatDate(date) : '');
  };

  return (
    <div className={styles.container}>
      <p className={styles.deadline}>마감일</p>
      <div className={styles.inputContainer}>
        <Image
          className={styles.calendarIcon}
          src="/images/calendar_icon.svg"
          alt="calendarIcon"
          width={20}
          height={20}
        />
        <ReactDatePicker
          className={styles.datePicker}
          placeholderText="날짜를 입력해주세요."
          closeOnScroll
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy.MM.dd h:mm aa"
        />
      </div>
    </div>
  );
}
