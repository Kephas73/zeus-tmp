import { CALL_STATUS_CATCH, CALL_STATUS_STOP, CHINESE, ENGLISH, KOREAN, PORTUGAL, SPAIN } from "../../../../constants/data";
import { calls } from "../../../../data/calls";
import { getYearMonthDay } from "../../../../utils/formatDate";

export const formatDataForLanguages = () => {
    return {
        ENGLISH: calls.filter((e) => e.skillId === ENGLISH),
        CHINESE: calls.filter((e) => e.skillId === CHINESE),
        KOREAN: calls.filter((e) => e.skillId === KOREAN),
        SPAIN: calls.filter((e) => e.skillId === SPAIN),
        PORTUGAL: calls.filter((e) => e.skillId === PORTUGAL),
    };
}
export const funcNumberOfIncomingCalls = (fromDateTime) => {
    return calls.reduce((accumulator, item) => {
        const date = getYearMonthDay(item.timestamp);
        if (getYearMonthDay(fromDateTime) === date) {
          accumulator = accumulator + item.calls.length;
        }
        return accumulator;
      }, 0);
}

export const funcNumberOfCallsReceived = (fromDateTime) => {
    return calls.reduce((accumulator, item) => {
        const date = getYearMonthDay(item.timestamp);
        if (getYearMonthDay(fromDateTime) === date) {
          let sum = 0;
          item.calls.forEach((i) => {
            if (i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_STOP) sum++;
          });
          accumulator = accumulator + sum;
        }
        return accumulator;
      }, 0);
}

export const funcCallReceivedRate = (numberOfIncomingCalls, numberOfCallsReceived) => {
    let callReceivedRate = 0;
    if (numberOfIncomingCalls > 0) {
      const resultRate = (numberOfCallsReceived / numberOfIncomingCalls) * 100;
      const roundedResultRate = resultRate.toFixed(2);
      if (roundedResultRate.indexOf('.') !== -1 && parseFloat(roundedResultRate) % 1 === 0) {
        callReceivedRate = parseInt(roundedResultRate, 10);
      } else {
        callReceivedRate = parseFloat(roundedResultRate);
      }
    }
    return callReceivedRate
}