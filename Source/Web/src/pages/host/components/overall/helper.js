import {
  CALL_STATUS_CATCH,
  CALL_STATUS_FINISHED,
  CALL_STATUS_NO_ONE_AVAILABLE,
  CALL_STATUS_NO_REPLY,
  CALL_STATUS_STOP,
  ROOM_CALLING,
  ROOM_ONLINE,
  ROOM_TALKING,
  WAITING_GUESTS_STATUS_CONNECTED,
  WAITING_GUESTS_STATUS_DISCONNECT,
  YEAR_MONTH,
} from '../../../../constants/data';
import { calls } from '../../../../data/calls';
import { roomChangeLogs } from '../../../../data/roomChangeLogs';
import { waitingGuests } from '../../../../data/waitingGuests';
import { getMonth, getYear } from '../../../../utils/formatDate';
import { roundToDecimalPlaces } from '../../../../utils/roundDecimal';

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countNumberOfIncomingCalls = (funcGetDate, dateTime) => {
  const numberOfIncomingCalls = calls.reduce((accumulator, item) => {
    const date = funcGetDate(item.timestamp);
    if (funcGetDate(dateTime) === date) {
      accumulator = accumulator + item.calls.length;
    }
    return accumulator;
  }, 0);
  return numberOfIncomingCalls;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countNumberOfCallsReceived = (funcGetDate, dateTime) => {
  const numberOfCallsReceived = calls.reduce((accumulator, item) => {
    const date = funcGetDate(item.timestamp);
    if (funcGetDate(dateTime) === date) {
      let sum = 0;
      item.calls.forEach((i) => {
        if (i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_FINISHED) sum++;
      });
      accumulator = accumulator + sum;
    }
    return accumulator;
  }, 0);

  return numberOfCallsReceived;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countNumberOfActiveSeats = (funcGetDate, dateTime) => {
  const numberOfActiveSeats = roomChangeLogs.reduce((accumulator, item) => {
    if (
      item.prevValue.status === ROOM_ONLINE ||
      item.prevValue.status === ROOM_CALLING ||
      item.prevValue.status === ROOM_TALKING
    ) {
      const date = funcGetDate(item.prevValue.timestamp._seconds * 1000);
      if (funcGetDate(dateTime) === date) accumulator++;
    }
    return accumulator;
  }, 0);
  return numberOfActiveSeats;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number} - seconds
 */
export const countTimeWaiting = (funcGetDate, dateTime) => {
  const totalTimeWaiting = roomChangeLogs.reduce((accumulator, item) => {
    if (item.prevValue.status === ROOM_ONLINE) {
      const date = funcGetDate(item.prevValue.timestamp._seconds * 1000);
      if (funcGetDate(dateTime) === date) {
        const timeWaiting = item.newValue.timestamp._seconds - item.prevValue.timestamp._seconds;
        accumulator += timeWaiting;
      }
    }
    return accumulator;
  }, 0);
  return totalTimeWaiting;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number} - seconds
 */
export const getTotalTalkTime = (funcGetDate, dateTime) => {
  const totalTalkTime = calls.reduce((accumulator, item) => {
    const date = funcGetDate(item.timestamp);
    if (funcGetDate(dateTime) === date) {
      accumulator = accumulator + item.duration;
    }
    return accumulator;
  }, 0);

  return totalTalkTime;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countNumberOfMissedCalls = (funcGetDate, dateTime) => {
  const numberOfMissedCalls = calls.reduce((accumulator, item) => {
    const date = funcGetDate(item.timestamp);
    if (funcGetDate(dateTime) === date) {
      let sum = 0;
      item.calls.forEach((i) => {
        if (i.status === CALL_STATUS_NO_REPLY || i.status === CALL_STATUS_NO_ONE_AVAILABLE) sum++;
      });
      accumulator = accumulator + sum;
    }
    return accumulator;
  }, 0);
  return numberOfMissedCalls;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countNumberOfBreaks = (funcGetDate, dateTime) => {
  const numberOfBreaks = calls.reduce((accumulator, item) => {
    const date = funcGetDate(item.timestamp);
    if (funcGetDate(dateTime) === date) {
      let sum = 0;
      item.calls.forEach((i) => {
        if (i.status === CALL_STATUS_STOP) sum++;
      });
      accumulator = accumulator + sum;
    }
    return accumulator;
  }, 0);
  return numberOfBreaks;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number} - milliseconds
 */
export const getCallWaitingAverageWaitingTime = (funcGetDate, dateTime) => {
  let numberWaitingGuests = 0;
  const callWaitingTotalWaitingTime = waitingGuests.reduce((accumulator, item) => {
    const date = funcGetDate(item.start);
    if (funcGetDate(dateTime) === date) {
      numberWaitingGuests++;
      const timeWait = item.end - item.start;
      accumulator += timeWait;
    }
    return accumulator;
  }, 0);
  return callWaitingTotalWaitingTime / numberWaitingGuests;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countCallWaitingNumberOfSuccessfulConnections = (funcGetDate, dateTime) => {
  const callWaitingNumberOfSuccessfulConnections = waitingGuests.reduce((accumulator, item) => {
    const date = funcGetDate(item.start);
    if (funcGetDate(dateTime) === date) {
      if (item.status === WAITING_GUESTS_STATUS_CONNECTED) accumulator++;
    }
    return accumulator;
  }, 0);
  return callWaitingNumberOfSuccessfulConnections;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @returns {number}
 */
export const countCallWaitingNumberOfExits = (funcGetDate, dateTime) => {
  const callWaitingNumberOfExits = waitingGuests.reduce((accumulator, item) => {
    const date = funcGetDate(item.start);
    if (funcGetDate(dateTime) === date) {
      if (item.status === WAITING_GUESTS_STATUS_DISCONNECT) accumulator++;
    }
    return accumulator;
  }, 0);
  return callWaitingNumberOfExits;
};

/**
 * @param {Function} funcGetDate
 * @param {Date} dateTime
 * @param {number} checkDate
 * @returns {object} - dataOverallYearMonth or dataOverallMonthDay
 */
export const getDataOverall = (funcGetDate, dateTime, checkDate) => {
  const numberOfIncomingCalls = countNumberOfIncomingCalls(funcGetDate, dateTime);

  const numberOfCallsReceived = countNumberOfCallsReceived(funcGetDate, dateTime);

  const callReceivedRate = (numberOfCallsReceived / numberOfIncomingCalls) * 100;

  let numberOfActiveSeats = 0;
  let numberOfActiveSeatsAverage = 0;
  if (checkDate === YEAR_MONTH) {
    numberOfActiveSeats = countNumberOfActiveSeats(getYear, dateTime);
    numberOfActiveSeatsAverage = numberOfActiveSeats / 12;
  } else {
    numberOfActiveSeats = countNumberOfActiveSeats(getMonth, dateTime);
    numberOfActiveSeatsAverage = numberOfActiveSeats / 30;
  }

  const timeWaiting = countTimeWaiting(funcGetDate, dateTime); // seconds
  const totalTalkTime = getTotalTalkTime(funcGetDate, dateTime); // seconds

  const upTime = totalTalkTime + timeWaiting; // seconds

  const averageTalkTime = totalTalkTime / numberOfCallsReceived; // seconds

  const numberOfMissedCalls = countNumberOfMissedCalls(funcGetDate, dateTime);

  const numberOfBreaks = countNumberOfBreaks(funcGetDate, dateTime);

  const callWaitingAverageWaitingTime = getCallWaitingAverageWaitingTime(funcGetDate, dateTime); // milliseconds

  const callWaitingNumberOfSuccessfulConnections = countCallWaitingNumberOfSuccessfulConnections(
    funcGetDate,
    dateTime
  );

  const callWaitingNumberOfExits = countCallWaitingNumberOfExits(funcGetDate, dateTime);

  const numberOfCallsWaiting =
    numberOfIncomingCalls -
    numberOfMissedCalls -
    numberOfBreaks +
    callWaitingNumberOfSuccessfulConnections;

  const callWaitingRate =
    (numberOfCallsWaiting / (numberOfIncomingCalls - numberOfMissedCalls - numberOfBreaks)) * 100;

  return {
    numberOfIncomingCalls,
    numberOfCallsReceived,
    callReceivedRate: roundToDecimalPlaces(callReceivedRate, 2),
    numberOfActiveSeats: roundToDecimalPlaces(numberOfActiveSeatsAverage, 2),
    upTime: roundToDecimalPlaces(upTime / 60, 2),
    totalTalkTime: roundToDecimalPlaces(totalTalkTime / 60, 2),
    averageTalkTime: roundToDecimalPlaces(averageTalkTime / 60, 2),
    numberOfMissedCalls,
    numberOfBreaks,
    numberOfCallsWaiting,
    callWaitingRate: roundToDecimalPlaces(callWaitingRate, 2),
    callWaitingAverageWaitingTime: roundToDecimalPlaces(
      callWaitingAverageWaitingTime / (60 * 1000),
      2
    ),
    callWaitingNumberOfSuccessfulConnections,
    callWaitingNumberOfExits,
  };
};

/**
 * @param {Date} dataOverallYearMonth
 * @param {Date} dataOverallMonthDay
 * @returns {Array}
 */
export const createRows = (dataOverallYearMonth, dataOverallMonthDay) => {
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
