import { useEffect } from 'react';
import { getMonthDay, getYearMonth } from '../../../../utils/formatDate';
import { CALL_STATUS_CATCH, CALL_STATUS_STOP } from '../../../../constants/data';
import { roomChangeLogs } from '../../../../data/roomChangeLogs';

export function useYearMonthEffect(filteredData, dateYearMonth, setDataOverallYearMonth) {
  useEffect(() => {
    const numberOfIncomingCalls = filteredData.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);
      if (getYearMonth(dateYearMonth) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

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

    const totalTalkTime = filteredData.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);

      if (getYearMonth(dateYearMonth) === date) {
        accumulator += item.duration;
      }
      return accumulator;
    }, 0);

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

    const averageTalkTime = numberOfCallsReceived > 0 ? totalTalkTime / numberOfCallsReceived : 0;

    //count time waiting
    const hostIds = filteredData.map(item => item.hostId);
    const filteredNewValue = roomChangeLogs.filter(value => {
      return value.newValue.status === 1 && value.prevValue.status === 0 && hostIds.includes(value.newValue.hostId);
    });

    const filteredPrevValue = roomChangeLogs.filter(value => {
      return value.prevValue.status === 1 && hostIds.includes(value.prevValue.hostId);
    });

    const TimeWaitingDifferenceNew = filteredNewValue.map(value => {
      const newValueTimestamp = value.newValue.timestamp._seconds;
      const prevValueTimestamp = value.prevValue.timestamp._seconds;
      const timeWaitingInMinutes = (newValueTimestamp - prevValueTimestamp) / 60;
      return {
        ...value,
        timeWaitingInMinutes,
      };
    });

    const TimeWaitingDifferencePrev = filteredPrevValue.map(value => {
      const newValueTimestamp = value.newValue.timestamp._seconds;
      const prevValueTimestamp = value.prevValue.timestamp._seconds;
      const timeWaitingInMinutes = (newValueTimestamp - prevValueTimestamp) / 60;

      return {
        ...value,
        timeWaitingInMinutes,
      };
    });
    const TimeWaitingPrev = TimeWaitingDifferencePrev.reduce((total, log) => {
      return total + log.timeWaitingInMinutes;
    }, 0);
    const TimeWaitingNew = TimeWaitingDifferenceNew.reduce((total, log) => {
      return total + log.timeWaitingInMinutes;
    }, 0);

    const totalWaitingTime = TimeWaitingPrev + TimeWaitingNew;
    const upTime = Math.ceil((totalTalkTime + totalWaitingTime) * 10) / 10;

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

export function useMonthDayEffect(filteredData, dateMonthDay, setDataOverallMonthDay) {
  useEffect(() => {
    const numberOfIncomingCalls = filteredData.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

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
    const totalTalkTime = filteredData.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    const averageTalkTime = numberOfCallsReceived > 0 ? totalTalkTime / numberOfCallsReceived : 0;

    //count time waiting
    const hostIds = filteredData.map(item => item.hostId);
    const filteredNewValue = roomChangeLogs.filter(value => {
      return value.newValue.status === 1 && value.prevValue.status === 0 && hostIds.includes(value.newValue.hostId);
    });
    const filteredPrevValue = roomChangeLogs.filter(value => {
      return value.prevValue.status === 1 && hostIds.includes(value.prevValue.hostId);
    });

    const TimeWaitingDifferenceNew = filteredNewValue.map(value => {
      const newValueTimestamp = value.newValue.timestamp._seconds;
      const prevValueTimestamp = value.prevValue.timestamp._seconds;
      const timeWaitingInMinutes = (newValueTimestamp - prevValueTimestamp) / 60;
      return {
        ...value,
        timeWaitingInMinutes,
      };
    });

    const TimeWaitingDifferencePrev = filteredPrevValue.map(value => {
      const newValueTimestamp = value.newValue.timestamp._seconds;
      const prevValueTimestamp = value.prevValue.timestamp._seconds;
      const timeWaitingInMinutes = (newValueTimestamp - prevValueTimestamp) / 60;

      return {
        ...value,
        timeWaitingInMinutes,
      };
    });
    const TimeWaitingPrev = TimeWaitingDifferencePrev.reduce((total, log) => {
      return total + log.timeWaitingInMinutes;
    }, 0);
    const TimeWaitingNew = TimeWaitingDifferenceNew.reduce((total, log) => {
      return total + log.timeWaitingInMinutes;
    }, 0);

    const totalWaitingTime = TimeWaitingPrev + TimeWaitingNew;
    const upTime = Math.ceil((totalTalkTime + totalWaitingTime) * 10) / 10;

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