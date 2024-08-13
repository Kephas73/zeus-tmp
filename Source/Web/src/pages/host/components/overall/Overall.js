
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
    marginTop: 30,
    color: '#c3c3c3',
    paddingLeft: 12,
  },
});

export default function Overall() {
  const classes = useStyles();
  const [dataOverall, setDataOverall] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    numberOfActiveSeats: 0,
    upTime: 0,
    totalTalktime: 0,
    averageTalkTime: 0,
    numberOfmissedCalls: 0,
    numberOfBreaks: 0,
    numberOfCallsWaiting: 0,
    callWaitingRate: 0,
    callWaitingAverageWaitingTime: 0,
    callWaitingNumberOfSuccessfulConnections: 0,
    callWaitingNumberOfExits: 0,
  });

  const [dataOverallYearMonth, setDataOverallYearMonth] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    numberOfActiveSeats: 0,
    upTime: 0,
    totalTalktime: 0,
    averageTalkTime: 0,
    numberOfmissedCalls: 0,
    numberOfBreaks: 0,
    numberOfCallsWaiting: 0,
    callWaitingRate: 0,
    callWaitingAverageWaitingTime: 0,
    callWaitingNumberOfSuccessfulConnections: 0,
    callWaitingNumberOfExits: 0,
  });

  const [dataOverallMonthDay, setDataOverallMonthDay] = useState({
    numberOfIncomingCalls: 20,
    numberOfCallsReceived: 0,
    callReceivedRate:  0,
    numberOfActiveSeats: 0,
    upTime: 0,
    totalTalktime: 0,
    averageTalkTime: 0,
    numberOfmissedCalls: 0,
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
    setDateYearMonth(prev => ({
      ...prev,
      numberOfIncomingCalls: 50
    }))
  }, [])


  console.log('rows ', rows)

  return (
    <TableContainer component={Paper} className={classes.container}>
      <div className="overall-container-header">
        <div className="overall-performance-text">全体パフォーマンス</div>
        <button className="overall-button-csv">CSV 出力</button>
      </div>
      <span className={classes.title}>月毎・日毎</span>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
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
        <TableBody>
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
                  <StyledTableCell align="center">{data.metric1}</StyledTableCell>
                  <StyledTableCell align="center">{data.metric2}</StyledTableCell>
                </StyledTableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
