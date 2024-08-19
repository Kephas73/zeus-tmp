const useRow = (dataOverallYearMonth, dataOverallMonthDay) => {
  const createData = (data) => data;

  const rows = [
    createData([
      {
        name: '入電数',
        metric1: `${dataOverallYearMonth.numberOfIncomingCalls} 件`,
        metric2: `${dataOverallMonthDay.numberOfIncomingCalls} 件`,
      },
      {
        name: '受電数',
        metric1: `${dataOverallYearMonth.numberOfCallsReceived} 件`,
        metric2: `${dataOverallMonthDay.numberOfCallsReceived} 件`,
      },
      {
        name: '受電率',
        metric1: `${dataOverallYearMonth.callReceivedRate}%`,
        metric2: `${dataOverallMonthDay.callReceivedRate}%`,
      },
    ]),
    createData([
      {
        name: '稼働席数',
        metric1: `${dataOverallYearMonth.numberOfActiveSeats} 席`,
        metric2: `${dataOverallMonthDay.numberOfActiveSeats} 席`,
      },
      {
        name: '稼働時間',
        metric1: `${dataOverallYearMonth.upTime} 分`,
        metric2: `${dataOverallMonthDay.upTime} 分`,
      },
      {
        name: '合計通話時間',
        metric1: `${dataOverallYearMonth.totalTalkTime} 分`,
        metric2: `${dataOverallMonthDay.totalTalkTime} 分`,
      },
      {
        name: '平均通話時間',
        metric1: `${dataOverallYearMonth.averageTalkTime} 分`,
        metric2: `${dataOverallMonthDay.averageTalkTime} 分`,
      },
    ]),
    createData([
      {
        name: '不在数',
        metric1: `${dataOverallYearMonth.numberOfMissedCalls} 件`,
        metric2: `${dataOverallMonthDay.numberOfMissedCalls} 件`,
      },
      {
        name: '切断数',
        metric1: `${dataOverallYearMonth.numberOfBreaks} 件`,
        metric2: `${dataOverallMonthDay.numberOfBreaks} 件`,
      },
    ]),
    createData([
      {
        name: '待ち呼数',
        metric1: `${dataOverallYearMonth.numberOfCallsWaiting} 件`,
        metric2: `${dataOverallMonthDay.numberOfCallsWaiting} 件`,
      },
      {
        name: '待ち呼率',
        metric1: `${dataOverallYearMonth.callWaitingRate}%`,
        metric2: `${dataOverallMonthDay.callWaitingRate}%`,
      },
      {
        name: '待ち呼　平均待機時間',
        metric1: `${dataOverallYearMonth.callWaitingAverageWaitingTime} 分`,
        metric2: `${dataOverallMonthDay.callWaitingAverageWaitingTime} 分`,
      },
      {
        name: '待ち呼　接続成功数',
        metric1: `${dataOverallYearMonth.callWaitingNumberOfSuccessfulConnections} 件`,
        metric2: `${dataOverallMonthDay.callWaitingNumberOfSuccessfulConnections} 件`,
      },
      {
        name: '待ち呼　離脱数',
        metric1: `${dataOverallYearMonth.callWaitingNumberOfExits} 件`,
        metric2: `${dataOverallMonthDay.callWaitingNumberOfExits} 件`,
      },
    ]),
  ];

  return rows;
};

export default useRow;
