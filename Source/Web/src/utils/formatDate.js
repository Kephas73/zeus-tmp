import dayjs from 'dayjs';

const YYYY_MM_DD = 'YYYY-MM-DD';
const YYYY_MM = 'YYYY-MM';
const MM_DD = 'MM-DD';
const NUMBER = 'number';
const STRING = 'string';

export const getYearMonthDay = (date) => {
  if (date instanceof Date) {
    return dayjs(date).format(YYYY_MM_DD);
  }

  if (typeof date === NUMBER && date > 0) {
    return dayjs(date).format(YYYY_MM_DD);
  }
  if (typeof date === STRING) {
    const dateTime = dayjs(new Date(date)).format(YYYY_MM_DD);
    return dateTime;
  }

  return false;
};

export const getYearMonth = (date) => {
  if (date instanceof Date) {
    return dayjs(date).format(YYYY_MM);
  }
  if (typeof date === NUMBER && date > 0) {
    return dayjs(date).format(YYYY_MM);
  }
  if (typeof date === STRING) {
    const yearMonth = dayjs(new Date(date)).format(YYYY_MM);
    return yearMonth;
  }
  return false;
};

export const getMonthDay = (date) => {
  if (date instanceof Date) {
    return dayjs(date).format(MM_DD);
  }
  if (typeof date === NUMBER && date > 0) {
    return dayjs(date).format(MM_DD);
  }
  if (typeof date === STRING) {
    const monthDay = dayjs(new Date(date)).format(MM_DD);
    return monthDay;
  }
  return false;
};

/** 
// timestamp
const timestamp = 1722486742101;

console.log(getYearMonthDay(timestamp)); // "2024-07-01"
console.log(getYearMonth(timestamp)); // "2024-07"
console.log(getMonthDay(timestamp)); // "07-01"

// string
const dateString = 'Fri Sep 13 2024 16:06:10 GMT+0700 (Giờ Đông Dương)';

console.log(getYearMonthDay(dateString)); // "2024-09-13"
console.log(getYearMonth(dateString)); // "2024-09"
console.log(getMonthDay(dateString)); // "09-13"

*/
