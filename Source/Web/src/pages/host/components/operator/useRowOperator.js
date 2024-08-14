import React from 'react';

const useRow = (dataOverallYearMonth, dataOverallMonthDay) => {

  const createData = (data) => data

  const rows = [
    createData([
      {
        name: '入電数',
        metric1: dataOverallYearMonth.numberOfIncomingCalls,
        metric2: dataOverallMonthDay.numberOfIncomingCalls,
      },
      {
        name: '受電数',
        metric1: dataOverallYearMonth.numberOfCallsReceived,
        metric2: dataOverallMonthDay.numberOfCallsReceived,
      },
      {
        name: '受電率',
        metric1: dataOverallYearMonth.callReceivedRate,
        metric2: dataOverallMonthDay.callReceivedRate,
      },
      {
        name: '稼働時間',
        metric1: dataOverallYearMonth.upTime,
        metric2: dataOverallMonthDay.upTime,
      },
      {
        name: '合計通話時間',
        metric1: dataOverallYearMonth.totalTalkTime,
        metric2: dataOverallMonthDay.totalTalkTime,
      },
      {
        name: '平均通話時間',
        metric1: dataOverallYearMonth.averageTalkTime,
        metric2: dataOverallMonthDay.averageTalkTime,
      },
    ]),
  ];

  return rows;
};

export default useRow;
