import React from 'react';

const useRow = (dataOverallYearMonth, dataOverallMonthDay) => {

    console.log('dataOverallYearMonth ', dataOverallYearMonth)

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
    ]),
    createData([
      {
        name: '稼働席数',
        metric1: dataOverallYearMonth.numberOfActiveSeats,
        metric2: dataOverallMonthDay.numberOfActiveSeats,
      },
      {
        name: '稼働時間',
        metric1: dataOverallYearMonth.upTime,
        metric2: dataOverallMonthDay.upTime,
      },
      {
        name: '合計通話時間',
        metric1: dataOverallYearMonth.totalTalktime,
        metric2: dataOverallMonthDay.totalTalktime,
      },
      {
        name: '平均通話時間',
        metric1: dataOverallYearMonth.averageTalkTime,
        metric2: dataOverallMonthDay.averageTalkTime,
      },
    ]),
    createData([
      {
        name: '不在数',
        metric1: dataOverallYearMonth.numberOfmissedCalls,
        metric2: dataOverallMonthDay.numberOfmissedCalls,
      },
      {
        name: '切断数',
        metric1: dataOverallYearMonth.numberOfBreaks,
        metric2: dataOverallMonthDay.numberOfBreaks,
      },
    ]),
    createData([
      {
        name: '待ち呼数',
        metric1: dataOverallYearMonth.numberOfCallsWaiting,
        metric2: dataOverallMonthDay.numberOfCallsWaiting,
      },
      {
        name: '待ち呼率',
        metric1: dataOverallYearMonth.callWaitingRate,
        metric2: dataOverallMonthDay.callWaitingRate,
      },
      {
        name: '待ち呼　平均待機時間',
        metric1: dataOverallYearMonth.callWaitingAverageWaitingTime,
        metric2: dataOverallMonthDay.callWaitingAverageWaitingTime,
      },
      {
        name: '待ち呼　接続成功数',
        metric1: dataOverallYearMonth.callWaitingNumberOfSuccessfulConnections,
        metric2: dataOverallMonthDay.callWaitingNumberOfSuccessfulConnections,
      },
      {
        name: '待ち呼　離脱数',
        metric1: dataOverallYearMonth.callWaitingNumberOfExits,
        metric2: dataOverallMonthDay.callWaitingNumberOfExits,
      },
    ]),
  ];

  return rows;
};

export default useRow;
