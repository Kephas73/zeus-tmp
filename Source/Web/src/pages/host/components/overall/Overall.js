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
import './style.css';
import dayjs from 'dayjs';
import { getMonthDay, getYearMonth, getYearMonthDay } from '../../../../utils/formatDate';
import { calls } from '../../../../data/calls'

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

function createData(data) {
  return data;
}

const rows = [
  createData([
    {
      name: '入電数',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '受電数',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '受電率',
      metric1: 159,
      metric2: 6.0,
    },
  ]),
  createData([
    {
      name: '稼働席数',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '稼働時間',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '合計通話時間',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '平均通話時間',
      metric1: 159,
      metric2: 6.0,
    },
  ]),
  createData([
    {
      name: '不在数',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '切断数',
      metric1: 159,
      metric2: 6.0,
    },
  ]),
  createData([
    {
      name: '待ち呼数',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '待ち呼率',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '待ち呼　平均待機時間',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '待ち呼　接続成功数',
      metric1: 159,
      metric2: 6.0,
    },
    {
      name: '待ち呼　離脱数',
      metric1: 159,
      metric2: 6.0,
    },
  ]),
];

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
  const [dateYearMonth, setDateYearMonth] = useState(new Date());
  const [dateMonthDay, setDateMonthDay] = useState(new Date());






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
