import { useMemo } from 'react';

// 날짜만 포매팅하는 훅
export function useFormattedDate(dateString: string) {
  const formattedDate = useMemo(() => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    return `${year}-${paddedMonth}-${paddedDay}`;
  }, [dateString]);

  return formattedDate;
}

// 날짜와 시간을 포매팅하는 훅
export function useFormattedDateTime(dateString: string) {
  const formattedDateTime = useMemo(() => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    return `${year}-${paddedMonth}-${paddedDay} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }, [dateString]);

  return formattedDateTime;
}
