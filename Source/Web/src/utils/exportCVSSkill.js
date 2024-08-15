import { saveAs } from 'file-saver';
import moment from 'moment';
/**
 * @param {Array} rows
 * @param {String} fileName
 * @param {Date} dateYearMonth
 * @param {Date} dateMonthDay
 */
export const exportToCSVSkill = (rows, fileName = 'ExportedData.csv', fromDayMonthYear, toDayMonthYear) => {
  const headers = ['項目',
    `年 / 月: ${moment(fromDayMonthYear).format('DD/MM/YYYY')}`,
    `月 / 日: ${moment(toDayMonthYear).format('DD/MM/YYYY')}`
  ];

  const csvContent = rows.map(group =>
    group.map(data =>
      `${data.name},${data.metric1},${data.metric2},${data.metric3},${data.metric4},${data.metric5}`
    ).join('\n')
  ).join('\n');

  const csvData = [headers.join(','), csvContent].join('\n');
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, fileName);
};
