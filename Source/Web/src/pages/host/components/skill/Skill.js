import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './skill.css';
import constants from '../../../../constants';
import DatePickerDayMonthYear from './DatePickerDayMonthYear';
import useRowSkill from './useRowSkill';
import { calls } from '../../../../data/calls';
import { getYearMonthDay } from '../../../../utils/formatDate';
import { CALL_STATUS_CATCH, CALL_STATUS_STOP } from '../../../../constants/data';
import { exportToCSVSkill } from '../../../../utils/exportCSV';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: constants.backgroundColorHead,
    color: theme.palette.common.white,
    border: '1px solid #fff',
  },
  body: {
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

const useStyles = makeStyles(constants.tableRowStyles);

export default function CustomTable() {
  const classes = useStyles();

  const [dataSkillDateTime, setDataSkillDateTime] = useState({
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

  const [fromDateTime, setFromDateTime] = useState(new Date());
  const [toDateTime, setToDateTime] = useState(new Date());
  const rows = useRowSkill(dataSkillDateTime);
  useEffect(() => {
    const numberOfIncomingCalls = calls.reduce((accumulator, item) => {
      const date = getYearMonthDay(item.timestamp);
      console.log('date: ' + date);
      if (getYearMonthDay(fromDateTime) === date) {
        accumulator = accumulator + item.calls.length;
      }
      return accumulator;
    }, 0);

    const numberOfCallsReceived = calls.reduce((accumulator, item) => {
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

    setDataSkillDateTime((prev) => ({
      ...prev,
      numberOfIncomingCalls,
      numberOfCallsReceived,
      callReceivedRate,
    }));
  }, [fromDateTime]);

  return (
    <div className="container">
      <TableContainer component={Paper} className={classes.container}>
        <div className="container-header">
          <div className="performance-text">スキル別パフォーマンス</div>
          <button className="button-csv"  onClick={() => exportToCSVSkill(rows, 'data-host-skill.csv', fromDateTime, toDateTime)}>CSV 出力</button>
        </div>
        <div className="container-dateTime">
          <div className="text-filter">期間指定</div>
          <div>
            <DatePickerDayMonthYear />
          </div>
          <div className="tilde-filter">
            ~
          </div>
          <div>
            <DatePickerDayMonthYear />
          </div>
        </div>
        <Table className={`${classes.table} custom-tableBody`} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.cellHead}>項目</StyledTableCell>
              <StyledTableCell className={classes.cellHead} align="center">
                <div>
                  <span className="languages">EN</span>
                  <span>英語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.cellHead}>
                <div>
                  <span className="languages">CN</span>
                  <span>中国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.cellHead}>
                <div>
                  <span className="languages">KR</span>
                  <span>韓国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.cellHead}>
                <div>
                  <span className="languages">ES</span>
                  <span>スペイン語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.cellHead}>
                <div>
                  <span className="languages">PT</span>
                  <span>ポルトガル語</span>
                </div>
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
                    <StyledTableCell align="right">{data.metric3}</StyledTableCell>
                    <StyledTableCell align="right">{data.metric4}</StyledTableCell>
                    <StyledTableCell align="right">{data.metric5}</StyledTableCell>
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
