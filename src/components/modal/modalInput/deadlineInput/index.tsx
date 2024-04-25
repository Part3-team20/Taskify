'use client';

import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Image from 'next/image';
import styles from './DeadlineInput.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

// dueDate
export default function DeadLineInput() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
