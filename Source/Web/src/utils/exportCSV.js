import { saveAs } from 'file-saver';

/**
 * @param {Array} rows
 * @param {String} fileName
 * @param {Date} dateYearMonth
 * @param {Date} dateMonthDay
 */
export const exportToCSV = (rows, fileName = 'ExportedData.csv', dateYearMonth, dateMonthDay) => {
  const headers = ['項目',
    `年 / 月: ${dateYearMonth.getFullYear()}-${String(dateYearMonth.getMonth() + 1).padStart(2, '0')}`,
    `月 / 日: ${String(dateMonthDay.getMonth() + 1).padStart(2, '0')}-${String(dateMonthDay.getDate()).padStart(2, '0')}`
  ];

  const csvContent = rows.map(group =>
    group.map(data =>
      `${data.name},${data.metric1},${data.metric2}`
    ).join('\n')
  ).join('\n');

  const csvData = [headers.join(','), csvContent].join('\n');
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, fileName);
};
