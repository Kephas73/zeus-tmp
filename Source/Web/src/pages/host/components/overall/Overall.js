import { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DatePickerYearMonth from './DatePickerYearMonth';
import DatePickerMonthDay from './DatePickerMonthDay';
import constants from '../../../../constants';
import './overall.css';
import { getMonthDay, getYearMonth, getYear, getMonth } from '../../../../utils/formatDate';
import { roundToDecimalPlaces } from '../../../../utils/roundDecimal';
import useRow from './useRow';

import { exportToCSV } from '../../../../utils/exportCSV';
import {
  countCallWaitingNumberOfExits,
  countCallWaitingNumberOfSuccessfulConnections,
  countNumberOfActiveSeats,
  countNumberOfBreaks,
  countNumberOfCallsReceived,
  countNumberOfIncomingCalls,
  countNumberOfMissedCalls,
  countTimeWaiting,
  getCallWaitingAverageWaitingTime,
  getTotalTalkTime,
} from './helper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: constants.backgroundColorHead,
    color: theme.palette.common.white,
    width: '33.33%',
    '&:nth-of-type(2), &:nth-of-type(3)': {
      textAlign: 'center',
    },
  },
  body: {
    width: '33.33%',
    fontSize: 14,
    height: constants.heightTableRow,
    border: '1px solid var(--color-line-bland)',
    padding: '0px 16px',
    backgroundColor: 'var(--color-white)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  ...constants.tableRowStyles,
  table: {
    ...constants.tableRowStyles.table,
    minWidth: 560,
  },
  cellHead: {
    borderRight: '1px solid var(--text-color-gray-bland)',
  },
  title: {
    display: 'inline-block',
    marginTop: 45,
    color: 'var(--text-color-gray-bland)',
    paddingLeft: 12,
  },
  fieldActiveSeats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstSpan: {
    color: 'var(--text-color-gray-bland)',
    fontSize: 8,
    transform: 'translateY(1px)',
  },
});

export default function Overall() {
  const classes = useStyles();

  const [dataOverallYearMonth, setDataOverallYearMonth] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    numberOfActiveSeats: 0,
    upTime: 0,
    totalTalkTime: 0,
    averageTalkTime: 0,
    numberOfMissedCalls: 0,
    numberOfBreaks: 0,
    numberOfCallsWaiting: 0,
    callWaitingRate: 0,
    callWaitingAverageWaitingTime: 0,
    callWaitingNumberOfSuccessfulConnections: 0,
    callWaitingNumberOfExits: 0,
  });

  const [dataOverallMonthDay, setDataOverallMonthDay] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    numberOfActiveSeats: 0,
    upTime: 0,
    totalTalkTime: 0,
    averageTalkTime: 0,
    numberOfMissedCalls: 0,
    numberOfBreaks: 0,
    numberOfCallsWaiting: 0,
    callWaitingRate: 0,
    callWaitingAverageWaitingTime: 0,
    callWaitingNumberOfSuccessfulConnections: 0,
    callWaitingNumberOfExits: 0,
  });

  const [dateYearMonth, setDateYearMonth] = useState(new Date());
  const [dateMonthDay, setDateMonthDay] = useState(new Date());
  const rows = useRow(dataOverallYearMonth, dataOverallMonthDay);

  useEffect(() => {
    const numberOfIncomingCalls = countNumberOfIncomingCalls(getYearMonth, dateYearMonth);

    const numberOfCallsReceived = countNumberOfCallsReceived(getYearMonth, dateYearMonth);

    const callReceivedRate = (numberOfCallsReceived / numberOfIncomingCalls) * 100;

    const numberOfActiveSeats = countNumberOfActiveSeats(getYear, dateYearMonth);
    const numberOfActiveSeatsAverageMonthly = numberOfActiveSeats / 12;

    const timeWaiting = countTimeWaiting(getYearMonth, dateYearMonth); // seconds
    const totalTalkTime = getTotalTalkTime(getYearMonth, dateYearMonth); // seconds

    const upTime = totalTalkTime + timeWaiting; // seconds

    const averageTalkTime = totalTalkTime / numberOfIncomingCalls; // seconds

    const numberOfMissedCalls = countNumberOfMissedCalls(getYearMonth, dateYearMonth);

    const numberOfBreaks = countNumberOfBreaks(getYearMonth, dateYearMonth);

    const callWaitingAverageWaitingTime = getCallWaitingAverageWaitingTime(
      getYearMonth,
      dateYearMonth
    ); // milliseconds

    const callWaitingNumberOfSuccessfulConnections = countCallWaitingNumberOfSuccessfulConnections(
      getYearMonth,
      dateYearMonth
    );

    const callWaitingNumberOfExits = countCallWaitingNumberOfExits(getYearMonth, dateYearMonth);

    const numberOfCallsWaiting =
      numberOfIncomingCalls -
      numberOfMissedCalls -
      numberOfBreaks +
      callWaitingNumberOfSuccessfulConnections;
    const callWaitingRate =
      numberOfCallsWaiting / (numberOfIncomingCalls - numberOfMissedCalls - numberOfBreaks);

    setDataOverallYearMonth((prev) => ({
      ...prev,
      numberOfIncomingCalls,
      numberOfCallsReceived,
      callReceivedRate: roundToDecimalPlaces(callReceivedRate, 2),
      numberOfActiveSeats: roundToDecimalPlaces(numberOfActiveSeatsAverageMonthly, 2),
      upTime: roundToDecimalPlaces(upTime / 60, 2),
      totalTalkTime: roundToDecimalPlaces(totalTalkTime / 60, 2),
      averageTalkTime: roundToDecimalPlaces(averageTalkTime / 60, 1),
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
    }));
  }, [dateYearMonth]);

  useEffect(() => {
    const numberOfIncomingCalls = countNumberOfIncomingCalls(getMonthDay, dateMonthDay);

    const numberOfCallsReceived = countNumberOfCallsReceived(getMonthDay, dateMonthDay);

    const callReceivedRate = (numberOfCallsReceived / numberOfIncomingCalls) * 100;

    const numberOfActiveSeatsMonth = countNumberOfActiveSeats(getMonth, dateMonthDay);
    const numberOfActiveSeatsAverageDay = numberOfActiveSeatsMonth / 30;

    const timeWaiting = countTimeWaiting(getMonthDay, dateMonthDay); // seconds
    const totalTalkTime = getTotalTalkTime(getMonthDay, dateMonthDay); // seconds

    const upTime = totalTalkTime + timeWaiting; // seconds

    const averageTalkTime = totalTalkTime / numberOfIncomingCalls; // seconds

    const numberOfMissedCalls = countNumberOfMissedCalls(getMonthDay, dateMonthDay);

    const numberOfBreaks = countNumberOfBreaks(getMonthDay, dateMonthDay);

    const callWaitingAverageWaitingTime = getCallWaitingAverageWaitingTime(
      getMonthDay,
      dateMonthDay
    ); // milliseconds

    const callWaitingNumberOfSuccessfulConnections = countCallWaitingNumberOfSuccessfulConnections(
      getMonthDay,
      dateMonthDay
    );

    const callWaitingNumberOfExits = countCallWaitingNumberOfExits(getMonthDay, dateMonthDay);

    const numberOfCallsWaiting =
      numberOfIncomingCalls -
      numberOfMissedCalls -
      numberOfBreaks +
      callWaitingNumberOfSuccessfulConnections;
    const callWaitingRate =
      numberOfCallsWaiting / (numberOfIncomingCalls - numberOfMissedCalls - numberOfBreaks);

    setDataOverallMonthDay((prev) => ({
      ...prev,
      numberOfIncomingCalls,
      numberOfCallsReceived,
      callReceivedRate: roundToDecimalPlaces(callReceivedRate, 2),
      numberOfActiveSeats: roundToDecimalPlaces(numberOfActiveSeatsAverageDay, 2),
      upTime: roundToDecimalPlaces(upTime / 60, 2),
      totalTalkTime: roundToDecimalPlaces(totalTalkTime / 60, 2),
      averageTalkTime: roundToDecimalPlaces(averageTalkTime / 60, 1),
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
    }));
  }, [dateMonthDay]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        const numberOfActiveSeatsYear = countNumberOfActiveSeats(getYear, dateYearMonth);
        const numberOfActiveSeatsMonth = countNumberOfActiveSeats(getMonth, dateMonthDay);

        setDataOverallYearMonth((prev) => ({
          ...prev,
          numberOfActiveSeats: roundToDecimalPlaces(numberOfActiveSeatsYear / 12, 2),
        }));
        setDataOverallMonthDay((prev) => ({
          ...prev,
          numberOfActiveSeats: roundToDecimalPlaces(numberOfActiveSeatsMonth / 30, 2),
        }));
      },
      5 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, []);

  const addText = (text, data) => {
    return (
      <p className={classes.fieldActiveSeats}>
        <span className={classes.firstSpan}>{text}</span>
        <span>{data}</span>
      </p>
    );
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <div className="host-overall-container-header">
        <div className="host-overall-performance-text">全体パフォーマンス</div>
        <button
          className="host-overall-button-csv"
          onClick={() => exportToCSV(rows, 'data-host-overall.csv', dateYearMonth, dateMonthDay)}
        >
          CSV 出力
        </button>
      </div>
      <span className={classes.title}>月毎・日毎</span>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className="host-custom-date-picker">
          <TableRow className="host-table-row">
            <StyledTableCell className={classes.cellHead}>項目</StyledTableCell>
            <StyledTableCell className={classes.cellHead} align="right">
              <DatePickerYearMonth
                dateYearMonth={dateYearMonth}
                setDateYearMonth={setDateYearMonth}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <DatePickerMonthDay dateMonthDay={dateMonthDay} setDateMonthDay={setDateMonthDay} />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className="host-global-text">
          {rows.map((group) =>
            group.map((data, dataIndex) => {
              const isLastRow = dataIndex === group.length - 1;
              const isFieldActiveSeats = data.name === '稼働席数';
              return (
                <StyledTableRow key={data.name} className={isLastRow ? classes.lastRow : ''}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={isLastRow ? classes.categoryCell : ''}
                  >
                    {data.name}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {isFieldActiveSeats ? addText('日の平均', data.metric1) : data.metric1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isFieldActiveSeats ? addText('日の平均', data.metric2) : data.metric2}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
