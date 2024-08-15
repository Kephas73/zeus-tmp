const useRowSkill = (dataSkillDateTime) => {
  const createData = (data) => data;

  const rows = [
    createData([
      {
        name: '入電数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
      },
      {
        name: '受電数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.numberOfCallsReceived} 件`,
      },
      {
        name: '受電率',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric5: `${dataSkillDateTime.callReceivedRate}%`,
      },
    ]),
    createData([
      {
        name: '稼働席数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 席`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 席`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 席`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 席`,
        metric5: `${dataSkillDateTime.numberOfActiveSeats} 席`,
      },
      {
        name: '稼働時間',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric5: `${dataSkillDateTime.upTime} 分`,
      },
      {
        name: '合計通話時間',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric5: `${dataSkillDateTime.totalTalkTime} 分`,
      },
      {
        name: '平均通話時間',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric5: `${dataSkillDateTime.averageTalkTime} 分`,
      },
    ]),
    createData([
      {
        name: '不在数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.numberOfMissedCalls} 件`,
      },
      {
        name: '切断数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.numberOfBreaks} 件`,
      },
    ]),
    createData([
      {
        name: '待ち呼数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.numberOfCallsWaiting} 件`,
      },
      {
        name: '待ち呼率',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls}%`,
        metric5: `${dataSkillDateTime.callWaitingRate}%`,
      },
      {
        name: '待ち呼　平均待機時間',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 分`,
        metric5: `${dataSkillDateTime.callWaitingAverageWaitingTime} 分`,
      },
      {
        name: '待ち呼　接続成功数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.callWaitingNumberOfSuccessfulConnections} 件`,
      },
      {
        name: '待ち呼　離脱数',
        metric1: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric2: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric3: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric4: `${dataSkillDateTime.numberOfIncomingCalls} 件`,
        metric5: `${dataSkillDateTime.callWaitingNumberOfExits} 件`,
      },
    ]),
  ];

  return rows;
};

export default useRowSkill;
