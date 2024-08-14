const useRowSkill = (dataSkillDateTime) => {
  const createData = (data) => data;

  const rows = [
    createData([
      {
        name: '入電数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.numberOfIncomingCalls,
      },
      {
        name: '受電数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.numberOfCallsReceived,
      },
      {
        name: '受電率',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.callReceivedRate,
      },
    ]),
    createData([
      {
        name: '稼働席数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.numberOfActiveSeats,
      },
      {
        name: '稼働時間',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.upTime,
      },
      {
        name: '合計通話時間',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.totalTalkTime,
      },
      {
        name: '平均通話時間',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.averageTalkTime,
      },
    ]),
    createData([
      {
        name: '不在数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.numberOfMissedCalls,
      },
      {
        name: '切断数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.numberOfBreaks,
      },
    ]),
    createData([
      {
        name: '待ち呼数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.numberOfCallsWaiting,
      },
      {
        name: '待ち呼率',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.callWaitingRate,
      },
      {
        name: '待ち呼　平均待機時間',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.callWaitingAverageWaitingTime,
      },
      {
        name: '待ち呼　接続成功数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.callWaitingNumberOfSuccessfulConnections,
      },
      {
        name: '待ち呼　離脱数',
        metric1: dataSkillDateTime.numberOfIncomingCalls,
        metric2: dataSkillDateTime.numberOfIncomingCalls,
        metric3: dataSkillDateTime.numberOfIncomingCalls,
        metric4: dataSkillDateTime.numberOfIncomingCalls,
        metric5: dataSkillDateTime.callWaitingNumberOfExits,
      },
    ]),
  ];

  return rows;
};

export default useRowSkill;
