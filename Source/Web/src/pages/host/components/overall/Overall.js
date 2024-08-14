
import { useState, useEffect, useMemo } from 'react';
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
import './style.css';
import dayjs from 'dayjs';
import { getMonthDay, getYearMonth, getYearMonthDay } from '../../../../utils/formatDate';
import { calls } from '../../../../data/calls'
import useRow from './useRow';
import { CALL_STATUS_CATCH, CALL_STATUS_STOP } from '../../../../constants/data';
import { exportToCSV } from '../../../../utils/exportCSV'

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
    border: '1px solid #E0E0E0',
    padding: '0px 16px',
    backgroundColor: '#fff',
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
    borderRight: '1px solid #c3c3c3',
  },
  title: {
    display: 'inline-block',
    marginTop: 43,
    color: '#c3c3c3',
    paddingLeft: 12,
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

  // const sum = calls.reduce((accumulator, currentValue) => accumulator + currentValue.calls.length, 0)

  useEffect(() => {
    const numberOfIncomingCalls = calls.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);
      if (getYearMonth(dateYearMonth) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    const numberOfCallsReceived = calls.reduce((accumulator, item) => {
      const date = getYearMonth(item.timestamp);
      if (getYearMonth(dateYearMonth) === date) {
        let sum = 0;
        item.calls.forEach((i) => {
          if(i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_STOP) sum++;
        })
        accumulator = accumulator + sum;
      }
      return accumulator;
    }, 0);

    let callReceivedRate = 0;
    if(numberOfIncomingCalls > 0) {
      const resultRate = (numberOfCallsReceived/numberOfIncomingCalls) * 100
      const roundedResultRate  = resultRate.toFixed(2)
      if (roundedResultRate.indexOf('.') !== -1 && parseFloat(roundedResultRate) % 1 === 0) {
        callReceivedRate = parseInt(roundedResultRate, 10);
      } else {
        callReceivedRate = parseFloat(roundedResultRate);
      }
    } 

    setDataOverallYearMonth((prev) => ({
      ...prev,
      numberOfIncomingCalls,
      numberOfCallsReceived,
      callReceivedRate
    }));
  }, [dateYearMonth]);

  useEffect(() => {
    const numberOfIncomingCalls = calls.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    const numberOfCallsReceived = calls.reduce((accumulator, item) => {
      const date = getMonthDay(item.timestamp);
      if (getMonthDay(dateMonthDay) === date) {
        let sum = 0;
        item.calls.forEach((i) => {
          if(i.status === CALL_STATUS_CATCH || i.status === CALL_STATUS_STOP) sum++;
        })
        accumulator = accumulator + sum;
      }
      return accumulator;
    }, 0);

    let callReceivedRate = 0;
    if(numberOfIncomingCalls > 0) {
      const resultRate = (numberOfCallsReceived/numberOfIncomingCalls) * 100
      const roundedResultRate  = resultRate.toFixed(2)
      if (roundedResultRate.indexOf('.') !== -1 && parseFloat(roundedResultRate) % 1 === 0) {
        callReceivedRate = parseInt(roundedResultRate, 10);
      } else {
        callReceivedRate = parseFloat(roundedResultRate);
      }
    } 

    setDataOverallMonthDay((prev) => ({
        ...prev,
        numberOfIncomingCalls,
        numberOfCallsReceived,
        callReceivedRate,
    }));
  }, [dateMonthDay]);

  return (
    <TableContainer component={Paper} className={classes.container}>
      <div className="overall-container-header">
        <div className="overall-performance-text">全体パフォーマンス</div>
        <button className="overall-button-csv" onClick={() => exportToCSV(rows, 'data-host-overall.csv', dateYearMonth, dateMonthDay)}>CSV 出力</button>
      </div>
      <span className={classes.title}>月毎・日毎</span>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className="custom-date-picker">
          <TableRow>
            <StyledTableCell className={classes.cellHead}>項目</StyledTableCell>
            <StyledTableCell className={classes.cellHead} align="right" 
            >
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
        <TableBody className="global-text">
          {rows.map((group) =>
            group.map((data, dataIndex) => {
              const isLastRow = dataIndex === group.length - 1;
              return (
                <StyledTableRow key={data.name} className={isLastRow ? classes.lastRow : ''}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={isLastRow ? classes.categoryCell : ''}
                  >
                    {data.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{data.metric1}</StyledTableCell>
                  <StyledTableCell align="right">{data.metric2}</StyledTableCell>
                </StyledTableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
