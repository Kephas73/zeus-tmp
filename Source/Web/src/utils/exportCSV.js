import { saveAs } from 'file-saver';
import { getYearMonthDay } from './formatDate';

/**
 * @param {Array} rows
 * @param {String} fileName
 * @param {Date} dateYearMonth
 * @param {Date} dateMonthDay
 */
export const exportToCSV = (rows, fileName = 'ExportedData.csv', dateYearMonth, dateMonthDay) => {
  const headers = [
    '項目',
    `年 / 月: ${dateYearMonth.getFullYear()}-${String(dateYearMonth.getMonth() + 1).padStart(2, '0')}`,
    `月 / 日: ${String(dateMonthDay.getMonth() + 1).padStart(2, '0')}-${String(dateMonthDay.getDate()).padStart(2, '0')}`,
  ];

  const csvContent = rows
    .map((group) => group.map((data) => `${data.name},${data.metric1},${data.metric2}`).join('\n'))
    .join('\n');

  const csvData = [headers.join(','), csvContent].join('\n');
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, fileName);
};

export const exportToCSVSkill = (
  rows,
  fileName = 'ExportedData.csv',
  fromDayMonthYear,
  toDayMonthYear
) => {
  const headers = [
    '項目, EN英語, CN中国語, KR韓国語, ESスペイン語, PTポルトガル語',
    `年 / 月 / 日: ${getYearMonthDay(fromDayMonthYear)}`,
    `年 / 月 / 日: ${getYearMonthDay(toDayMonthYear)}`,
  ];

  const metrics = Object.keys(rows.ENGLISH);

  const csvContent = metrics
    .map((metric) => {
      return [
        metric,
        rows.ENGLISH[metric],
        rows.CHINESE[metric],
        rows.KOREAN[metric],
        rows.SPAIN[metric],
        rows.PORTUGAL[metric],
      ].join(',');
    })
    .join('\n');

  const csvData = [headers.join(','), csvContent].join('\n');
  const bom = '\uFEFF'; // Add BOM for UTF-8 encoding
  const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, fileName);
};
