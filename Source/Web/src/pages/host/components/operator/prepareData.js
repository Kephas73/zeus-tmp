const prepareData = (dataOverallYearMonth, dataOverallMonthDay) => {
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
  ];

  return rows;
};

export default prepareData;
