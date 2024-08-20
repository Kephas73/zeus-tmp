import React, { useRef, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './operator.css';
import constants from '../../../../constants';
import DatePickerMonthDay from './DatePickerMonthDay';
import DatePickerYearMonth from './DatePickerYearMonth';
import useRow from './useRowOperator';
import { calls } from '../../../../data/calls';
import { exportToCSV } from '../../../../utils/exportCSV';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useYearMonthEffect, useMonthDayEffect } from './useEffect';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: constants.backgroundColorHead,
    color: theme.palette.common.white,
    border: '1px solid var(--color-white)',
    width: '33.33%',
    height: '40px',
    padding: '0 8px',
    fontSize: 16,
  },
  body: {
    width: '33.33%',
    fontSize: 14,
    height: constants.heightTableRow,
    border: '1px solid var(--color-line-bland)',
    padding: '0px 16px',
    backgroundColor: 'var(--color-white)',
  }
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
  colorOption: {
    color: 'var(--text-color-gray-bold)',
    fontSize: '14px',
    '& .MuiOutlinedInput-input': {
      padding: '0 0 0 10px',
      backgroundColor:'var(--color-white)',
    },
  }
});

export default function Operator() {
  const classes = useStyles();
  const tableRef = useRef(null);

  const [dataOverallYearMonth, setDataOverallYearMonth] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    upTime: 0,
    totalTalkTime: 0,
    averageTalkTime: 0,
  });

  const [dataOverallMonthDay, setDataOverallMonthDay] = useState({
    numberOfIncomingCalls: 0,
    numberOfCallsReceived: 0,
    callReceivedRate: 0,
    upTime: 0,
    totalTalkTime: 0,
    averageTalkTime: 0,
  });

  const [dateYearMonth, setDateYearMonth] = useState(new Date());
  const [dateMonthDay, setDateMonthDay] = useState(new Date());
  const [hostId, setHostId] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const rows = useRow(dataOverallYearMonth, dataOverallMonthDay, filteredData);

  const uniqueHostIds = Array.from(new Set(calls.map(call => call.hostLoginId))).filter(id => id);

  const handleSearch = () => {
    const filteredCalls = calls.filter((item) => item.hostLoginId === hostId);
    setFilteredData(filteredCalls);
  };

  useYearMonthEffect(filteredData, dateYearMonth, setDataOverallYearMonth);
  useMonthDayEffect(filteredData, dateMonthDay, setDataOverallMonthDay);

  return (
      <TableContainer component={Paper} className={classes.container}>
        <div className="host-operator-container-header">
          <div className="host-performance-text">オペレータパフォーマンス</div>
          <button
            className="host-button-csv"
            onClick={() => exportToCSV(rows, 'FileCSV.csv', dateYearMonth, dateMonthDay)}
          >CSV 出力</button>
        </div>

        <div className="host-container-header-operator">
          <div className="host-performance-text">オペレータ ID</div>
          <div className="host-input-operator">
            <FormControl variant="outlined" className="host-text-input-operator">
              <Select
                native
                className={classes.colorOption}
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
                inputProps={{
                  name: 'Host login ID',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option key={'default'} value={''} disabled>
                  オペレータ ID
                </option>
                {uniqueHostIds.map(id => (
                  <option key={id} className={classes.colorOption} value={id}>
                    {id}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
          <button
              className="host-button-setting"
              onClick={handleSearch}
            >
              設定
            </button>
          </div>
        </div>
        <Table className={classes.table} aria-label="customized table" ref={tableRef}>
          <TableHead className="host-custom-date-picker">
            <TableRow className="host-header-operator host-table-row">
              <StyledTableCell className={classes.cellHead}>項目</StyledTableCell>
              <StyledTableCell className={classes.cellHead} align="right" >
                <div>
                  <DatePickerYearMonth
                    dateYearMonth={dateYearMonth}
                    setDateYearMonth={setDateYearMonth}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <DatePickerMonthDay dateMonthDay={dateMonthDay} setDateMonthDay={setDateMonthDay} />
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="host-global-text">
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
