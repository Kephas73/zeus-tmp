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
import { MONTH_DAY, YEAR_MONTH } from '../../../../constants/data';
import { getMonthDay, getYearMonth, getYear, getMonth } from '../../../../utils/formatDate';
import { roundToDecimalPlaces } from '../../../../utils/roundDecimal';
import { exportToCSV } from '../../../../utils/exportCSV';
import { countNumberOfActiveSeats, createRows, getDataOverall } from './helper';

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
  hostOverallContainerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '2px solid var(--color-line)',
    padding: '15px 5px 5px 12px',
  },
  hostOverallPerformanceText: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-color-gray-bold)',
  },
  hostOverallButtonCsv: {
    padding: '2px 25px',
    backgroundColor: 'var(--background-color-btn-csv)',
    border: 'none',
    borderRadius: '5px',
    color: 'var(--color-white)',
    cursor: 'pointer',
    fontSize: '12px',
  },
  hostCustomDatePicker: {
    '& .MuiTableCell-root': {
      padding: '0px 16px !important',
    },
    '& .MuiInputBase-root': {
      padding: '4px !important',
      marginTop: '0px !important',
    },
    '& .MuiFormControl-root': {
      marginTop: '12px !important',
      marginBottom: '7px !important',
    },
  },
  hostTableRow: {
    '& th:first-child': {
      borderRadius: '8px 0 0 0',
    },
    '& th:last-child': {
      borderRadius: '0 8px 0 0',
    },
  },
  hostGlobalText: {
    '& th, & td': {
      color: 'var(--text-color-gray)',
    },
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
  const rows = createRows(dataOverallYearMonth, dataOverallMonthDay);

  useEffect(() => {
    const data = getDataOverall(getYearMonth, dateYearMonth, YEAR_MONTH);
    setDataOverallYearMonth((prev) => ({
      ...prev,
      ...data,
    }));
  }, [dateYearMonth]);

  useEffect(() => {
    const data = getDataOverall(getMonthDay, dateMonthDay, MONTH_DAY);
    setDataOverallMonthDay((prev) => ({
      ...prev,
      ...data,
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
  });

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
      <div className={classes.hostOverallContainerHeader}>
        <div className={classes.hostOverallPerformanceText}>全体パフォーマンス</div>
        <button
          className={classes.hostOverallButtonCsv}
          onClick={() => exportToCSV(rows, 'data-host-overall.csv', dateYearMonth, dateMonthDay)}
        >
          CSV 出力
        </button>
      </div>
      <span className={classes.title}>月毎・日毎</span>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.hostCustomDatePicker}>
          <TableRow className={classes.hostTableRow}>
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
        <TableBody className={classes.hostGlobalText}>
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
                    {isFieldActiveSeats ? addText('[月平均]', data.metric1) : data.metric1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isFieldActiveSeats ? addText('[1日平均]', data.metric2) : data.metric2}
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
