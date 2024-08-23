import {
  CALL_STATUS_CATCH,
  CALL_STATUS_NO_ONE_AVAILABLE,
  CALL_STATUS_NO_REPLY,
  CALL_STATUS_STOP,
  ROOM_CALLING,
  ROOM_ONLINE,
  ROOM_TALKING,
  WAITING_GUESTS_STATUS_CONNECTED,
  WAITING_GUESTS_STATUS_DISCONNECT,
  CHINESE,
  ENGLISH,
  KOREAN,
  PORTUGAL,
  SPAIN,
  CALL_STATUS_FINISHED,
} from '../../../../constants/data';
import { calls } from '../../../../data/calls';
import { roomChangeLogs } from '../../../../data/roomChangeLogs';
import { waitingGuests } from '../../../../data/waitingGuests';
import { getYearMonthDay } from '../../../../utils/formatDate';
import { roundToDecimalPlaces } from '../../../../utils/roundDecimal';

export const formatDataForLanguages = (fromDateTime, toDateTime) => {
  // Filter calls based on the date range
  const filteredCalls = calls.filter((item) => {
    const itemDate = getYearMonthDay(item.timestamp);
    const fromDate = getYearMonthDay(fromDateTime);
    const toDate = getYearMonthDay(toDateTime);
    return itemDate >= fromDate && itemDate <= toDate;
  });

  const filteredRoomChangeLogs = roomChangeLogs.filter((item) => {
    const date = getYearMonthDay(item.prevValue.timestamp._seconds * 1000);
    const fromDate = getYearMonthDay(fromDateTime);
    const toDate = getYearMonthDay(toDateTime);
    return date >= fromDate && date <= toDate;
  });

  const filteredWaitingGuests = waitingGuests.filter((item) => {
    const date = getYearMonthDay(item.start);
    const fromDate = getYearMonthDay(fromDateTime);
    const toDate = getYearMonthDay(toDateTime);
    return date >= fromDate && date <= toDate;
  });

  // Function to calculate the number of received calls for a language
  const funcNumberOfCallsReceived = (callsForLanguage) => {
    const numberOfCallsReceived = callsForLanguage.reduce((accumulator, item) => {
      let sum = 0;
      item.calls.forEach((i) => {
        if (i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_FINISHED) sum++;
      });
      accumulator = accumulator + sum;
      return accumulator;
    }, 0);

    return numberOfCallsReceived;
  };

  const funcCountNumberOfActiveSeats = (language, funcGetDate, dateTime) => {
    const formatDataForLanguages = filteredRoomChangeLogs.filter((room) => {
      return room.prevValue.skills.filter((skill) => skill === language);
    });
    const numberOfActiveSeats = formatDataForLanguages.reduce((accumulator, item) => {
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
  const funcCountTimeWaiting = (language, fromDateTime, toDateTime) => {
    const formatDataForLanguages = filteredRoomChangeLogs.filter((room) => {
      const timestampSeconds = room.newValue.timestamp._seconds;
      const isWithinTimeRange =
        timestampSeconds >= fromDateTime._seconds && timestampSeconds <= toDateTime._seconds;

      return isWithinTimeRange && room.prevValue.skills.includes(language);
    });

    const totalTimeWaiting = formatDataForLanguages.reduce((accumulator, item) => {
      if (item.prevValue.status === ROOM_ONLINE) {
        const timeWaiting = item.newValue.timestamp._seconds - item.prevValue.timestamp._seconds;
        accumulator += timeWaiting;
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
  const funcGetTotalTalkTime = (callsForLanguage, funcGetDate, dateTime) => {
    const totalTalkTime = callsForLanguage.reduce((accumulator, item) => {
      const date = funcGetDate(item.timestamp);
      if (funcGetDate(dateTime) === date) {
        accumulator += item.duration;
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
  const funcCountNumberOfMissedCalls = (callsForLanguage, fromDateTime, toDateTime) => {
    const numberOfMissedCalls = callsForLanguage.reduce((accumulator, item) => {
      let sum = 0;
      item.calls.forEach((i) => {
        const callTime = i.timestamp * 1000;
        if (callTime >= fromDateTime._seconds && callTime <= toDateTime._seconds) {
          if (i.status === CALL_STATUS_NO_REPLY || i.status === CALL_STATUS_NO_ONE_AVAILABLE) {
            sum++;
          }
        }
      });
      accumulator += sum;
      return accumulator;
    }, 0);
    return numberOfMissedCalls;
  };

  /**
   * @param {Function} funcGetDate
   * @param {Date} dateTime
   * @returns {number}
   */
  const funcCountNumberOfBreaks = (callsForLanguage, funcGetDate, dateTime) => {
    const numberOfBreaks = callsForLanguage.reduce((accumulator, item) => {
      const date = funcGetDate(item.timestamp);
      if (funcGetDate(dateTime) === date) {
        let sum = 0;
        item.calls.forEach((i) => {
          if (i.status === CALL_STATUS_STOP) sum++;
        });
        accumulator += sum;
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
  const getCallWaitingAverageWaitingTime = (language, funcGetDate, dateTime) => {
    let numberWaitingGuests = 0;
    const filterWaitingTimeForLanguage = filteredWaitingGuests.filter(
      (e) => e.skillId === language
    );
    const callWaitingTotalWaitingTime = filterWaitingTimeForLanguage.reduce((accumulator, item) => {
      const date = funcGetDate(item.start);
      if (funcGetDate(dateTime) === date) {
        numberWaitingGuests++;
        const timeWait = item.end - item.start;
        accumulator += timeWait;
      }
      return accumulator;
    }, 0);
    return numberWaitingGuests > 0 ? callWaitingTotalWaitingTime / numberWaitingGuests : 0;
  };

  /**
   * @param {Function} funcGetDate
   * @param {Date} dateTime
   * @returns {number}
   */
  const funcCountCallWaitingNumberOfSuccessfulConnections = (language, funcGetDate, dateTime) => {
    const filterWaitingTimeForLanguage = filteredWaitingGuests.filter(
      (e) => e.skillId === language
    );
    const callWaitingNumberOfSuccessfulConnections = filterWaitingTimeForLanguage.reduce(
      (accumulator, item) => {
        const date = funcGetDate(item.start);
        if (funcGetDate(dateTime) === date) {
          if (item.status === WAITING_GUESTS_STATUS_CONNECTED) accumulator++;
        }
        return accumulator;
      },
      0
    );
    return callWaitingNumberOfSuccessfulConnections;
  };

  /**
   * @param {Function} funcGetDate
   * @param {Date} dateTime
   * @returns {number}
   */
  const funcCountCallWaitingNumberOfExits = (language, funcGetDate, dateTime) => {
    const filterWaitingTimeForLanguage = filteredWaitingGuests.filter(
      (e) => e.skillId === language
    );
    const callWaitingNumberOfExits = filterWaitingTimeForLanguage.reduce((accumulator, item) => {
      const date = funcGetDate(item.start);
      if (funcGetDate(dateTime) === date) {
        if (item.status === WAITING_GUESTS_STATUS_DISCONNECT) accumulator++;
      }
      return accumulator;
    }, 0);
    return callWaitingNumberOfExits;
  };

  // Function to calculate call received rate
  const funcCallReceivedRate = (numberOfIncomingCalls, numberOfCallsReceived) => {
    if (numberOfIncomingCalls > 0) {
      const resultRate = (numberOfCallsReceived / numberOfIncomingCalls) * 100;
      return parseFloat(resultRate.toFixed(2));
    }
    return 0;
  };

  const calculateDataForLanguage = (language) => {
    const callsForLanguage = filteredCalls.filter((e) => e.skillId === language);

    const numberOfIncomingCalls = callsForLanguage.reduce(
      (acc, item) => acc + item.calls.length,
      0
    );

    const numberOfCallsReceived = funcNumberOfCallsReceived(callsForLanguage);
    const callReceivedRate = funcCallReceivedRate(numberOfIncomingCalls, numberOfCallsReceived);
    const countNumberOfActiveSeats = funcCountNumberOfActiveSeats(
      language,
      getYearMonthDay,
      fromDateTime
    );
    const totalTalkTime = funcGetTotalTalkTime(callsForLanguage, getYearMonthDay, fromDateTime);
    const countTimeWaiting = funcCountTimeWaiting(language, getYearMonthDay, fromDateTime);
    const countNumberOfMissedCalls = funcCountNumberOfMissedCalls(
      callsForLanguage,
      getYearMonthDay,
      fromDateTime
    );
    const countNumberOfBreaks = funcCountNumberOfBreaks(
      callsForLanguage,
      getYearMonthDay,
      fromDateTime
    );
    const callWaitingAverageWaitingTime = getCallWaitingAverageWaitingTime(
      language,
      getYearMonthDay,
      fromDateTime
    );
    const callWaitingNumberOfSuccessFulConnections =
      funcCountCallWaitingNumberOfSuccessfulConnections(getYearMonthDay, fromDateTime);
    const callWaitingNumberOfExits = funcCountCallWaitingNumberOfExits(
      language,
      getYearMonthDay,
      fromDateTime
    );
    const upTime = totalTalkTime + countTimeWaiting; // seconds
    const averageTalkTime = totalTalkTime / numberOfCallsReceived;
    const numberOfCallsWaiting =
      numberOfIncomingCalls -
      countNumberOfMissedCalls -
      countNumberOfBreaks +
      callWaitingNumberOfSuccessFulConnections;
    const callWaitingRate =
      (numberOfCallsWaiting /
      (numberOfIncomingCalls - countNumberOfMissedCalls - countNumberOfBreaks)) * 100;
    return {
      入電数: `${numberOfIncomingCalls} 件`,
      受電数: `${numberOfCallsReceived} 件`,
      受電率: `${roundToDecimalPlaces(callReceivedRate, 2)}%`,
      稼働席数: `${roundToDecimalPlaces(countNumberOfActiveSeats, 2)} 席`,
      稼働時間: `${roundToDecimalPlaces(upTime / 60, 2)} 分`,
      合計通話時間: `${roundToDecimalPlaces(totalTalkTime / 60, 2)} 分`,
      平均通話時間: `${roundToDecimalPlaces(averageTalkTime / 60, 2)} 分`,
      不在数: `${countNumberOfMissedCalls} 件`,
      切断数: `${countNumberOfBreaks} 件`,
      待ち呼数: `${numberOfCallsWaiting} 件`,
      待ち呼率: `${roundToDecimalPlaces(callWaitingRate, 2)}%`,
      '待ち呼　平均待機時間': `${roundToDecimalPlaces(
        callWaitingAverageWaitingTime / (60 * 1000),
        2
      )} 分`,
      '待ち呼　接続成功数': `${callWaitingNumberOfSuccessFulConnections} 件`,
      '待ち呼　離脱数': `${callWaitingNumberOfExits} 件`,
    };
  };

  return {
    ENGLISH: calculateDataForLanguage(ENGLISH),
    CHINESE: calculateDataForLanguage(CHINESE),
    KOREAN: calculateDataForLanguage(KOREAN),
    SPAIN: calculateDataForLanguage(SPAIN),
    PORTUGAL: calculateDataForLanguage(PORTUGAL),
  };
};
