import { useEffect } from 'react';
import { getMonthDay, getYearMonth } from '../../../../utils/formatDate';
import { CALL_STATUS_CATCH, CALL_STATUS_STOP } from '../../../../constants/data';
import { roomChangeLogs } from '../../../../data/roomChangeLogs';

//filter data operator by Year month
export function useYearMonthEffect(filteredData, dateYearMonth, setDataOverallYearMonth) {
  useEffect(() => {

    //number call coming
    const numberOfIncomingCalls = filteredData.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);
      if (getYearMonth(dateYearMonth) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    //number call received
    const numberOfCallsReceived = filteredData.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);
      if (getYearMonth(dateYearMonth) === date) {
        let sum = 0;
        item.calls.forEach((i) => {
          if(i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_STOP) sum++;
        });
        accumulator = accumulator + sum;
      }
      return accumulator;
    }, 0);

    // total talk time
    const totalTalkTime = filteredData.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);

      if (getYearMonth(dateYearMonth) === date) {
        accumulator += item.duration;
      }
      return accumulator;
    }, 0);

    //call received date
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

    // average talk time
    const averageTalkTime = numberOfCallsReceived > 0 ?  Math.ceil((totalTalkTime / numberOfCallsReceived) * 10) / 10 : 0;

    //count time waiting
    const hostIds = filteredData.map(item => item.hostId);

    const filteredPrevValue = roomChangeLogs.filter(value => {
      return value.prevValue.status === 1 && hostIds.includes(value.prevValue.hostId);
    });

    const timeWaitingDifferencePrev = filteredPrevValue.map(value => {
      const newValueTimestamp = value.newValue.timestamp._seconds;
      const prevValueTimestamp = value.prevValue.timestamp._seconds;
      const timeWaitingInMinutes = (newValueTimestamp - prevValueTimestamp) / 60;

      return {
        ...value,
        timeWaitingInMinutes,
      };
    });
    const timeWaiting = timeWaitingDifferencePrev.reduce((total, log) => {
      return total + log.timeWaitingInMinutes;
    }, 0);

    // total operating time
    const upTime = Math.ceil((totalTalkTime + timeWaiting) * 10) / 10;

    setDataOverallYearMonth((prev) => ({
      ...prev,
      numberOfIncomingCalls,
      numberOfCallsReceived,
      callReceivedRate,
      totalTalkTime,
      averageTalkTime,
      upTime
    }));
  }, [filteredData, dateYearMonth, setDataOverallYearMonth]);
}

//filter data operator by day month
export function useMonthDayEffect(filteredData, dateMonthDay, setDataOverallMonthDay) {
  useEffect(() => {

    //number call coming
    const numberOfIncomingCalls = filteredData.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    //number call received
    const numberOfCallsReceived = filteredData.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        let sum = 0;
        item.calls.forEach((i) => {
          if(i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_STOP) sum++;
        });
        accumulator = accumulator + sum;
      }
      return accumulator;
    }, 0);

    //call received date
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

    // total talk time

    const totalTalkTime = filteredData.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    // average talk time
    const averageTalkTime = numberOfCallsReceived > 0 ?  Math.ceil((totalTalkTime / numberOfCallsReceived) * 10) / 10 : 0;

    //count time waiting
    const hostIds = filteredData.map(item => item.hostId);

    const filteredPrevValue = roomChangeLogs.filter(value => {
      return value.prevValue.status === 1 && hostIds.includes(value.prevValue.hostId);
    });

    const timeWaitingDifferencePrev = filteredPrevValue.map(value => {
      const newValueTimestamp = value.newValue.timestamp._seconds;
      const prevValueTimestamp = value.prevValue.timestamp._seconds;
      const timeWaitingInMinutes = (newValueTimestamp - prevValueTimestamp) / 60;

      return {
        ...value,
        timeWaitingInMinutes,
      };
    });
    const timeWaitingPrev = timeWaitingDifferencePrev.reduce((total, log) => {
      return total + log.timeWaitingInMinutes;
    }, 0);

    // total operating time
    const upTime = Math.ceil((totalTalkTime + timeWaitingPrev) * 10) / 10;

    setDataOverallMonthDay((prev) => ({
      ...prev,
      numberOfIncomingCalls,
      numberOfCallsReceived,
      callReceivedRate,
      totalTalkTime,
      averageTalkTime,
      upTime
    }));
  }, [filteredData, dateMonthDay, setDataOverallMonthDay]);
}