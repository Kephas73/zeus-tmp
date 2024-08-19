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
} from '../../../../constants/data';
import { calls } from '../../../../data/calls';
import { roomChangeLogs } from '../../../../data/roomChangeLogs';
import { waitingGuests } from '../../../../data/waitingGuests';


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
