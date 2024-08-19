import dayjs from 'dayjs';

const YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss';
const YYYY_MM_DD = 'YYYY-MM-DD';
const YYYY_MM = 'YYYY-MM';
const YYYY = 'YYYY';
const MM_DD = 'MM-DD';
const MM = 'MM';
const NUMBER = 'number';
const STRING = 'string';

export const getFullDate = (date) => {
  if (date instanceof Date) {
    return dayjs(date).format(YYYY_MM_DD_HH_MM_SS);
  }

  if (typeof date === NUMBER && date > 0) {
    return dayjs(date).format(YYYY_MM_DD_HH_MM_SS);
  }
  if (typeof date === STRING) {
    const dateTime = dayjs(new Date(date)).format(YYYY_MM_DD_HH_MM_SS);
    return dateTime;
  }
  return false;
};

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

export const getYear = (date) => {
  if (date instanceof Date) {
    return dayjs(date).format(YYYY);
  }
  if (typeof date === NUMBER && date > 0) {
    return dayjs(date).format(YYYY);
  }
  if (typeof date === STRING) {
    const year = dayjs(new Date(date)).format(YYYY);
    return year;
  }
  return false;
};


export const getMonth = (date) => {
  if (date instanceof Date) {
    return dayjs(date).format(MM);
  }
  if (typeof date === NUMBER && date > 0) {
    return dayjs(date).format(MM);
  }
  if (typeof date === STRING) {
    const year = dayjs(new Date(date)).format(MM);
    return year;
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
