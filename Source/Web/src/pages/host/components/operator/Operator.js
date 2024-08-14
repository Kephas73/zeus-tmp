import React, { useEffect, useRef, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import '../skill/skill.css';
import constants from '../../../../constants';
import DatePickerMonthDay from '../overall/DatePickerMonthDay';
import DatePickerYearMonth from '../overall/DatePickerYearMonth';
import useRow from './useRowOperator';
import { calls } from '../../../../data/calls';
import { getMonthDay, getYearMonth } from '../../../../utils/formatDate';
import { CALL_STATUS_CATCH, CALL_STATUS_STOP } from '../../../../constants/data';
import { exportToCSV } from '../../../../utils/exportCSV'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: constants.backgroundColorHead,
    color: theme.palette.common.white,
    border: '1px solid #fff',
    height: '40px',
    padding: '0 8px',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
    height: constants.heightTableRow,
    border: '1px solid #E0E0E0',
    padding: '0px 16px',
    backgroundColor: '#fff',
  },
  table: {
    width: '100px'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: '#000',
      padding: '10px 14px',
      backgroundColor: '#fff',
    },
    '& .MuiOutlinedInput-input': {
      borderColor: '#ccc',
      borderRadius: '4px',
      padding: '0 0 0 6px',
    },
  },
})(TextField);


const useStyles = makeStyles(constants.tableRowStyles);

export default function CustomTable() {
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
  const [hostLoginId, setHostLoginId] = useState(''); // State cho hostLoginId
  const [filteredData, setFilteredData] = useState([]); // State để lưu dữ liệu lọc

  const rows = useRow(dataOverallYearMonth, dataOverallMonthDay, filteredData);

  // Hàm xử lý khi nhấn nút "Cài đặt"
  const handleSearch = () => {
    const filteredCalls = calls.filter((item) => item.hostLoginId === hostLoginId);
    setFilteredData(filteredCalls);
  };

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
  }, [filteredData, dateYearMonth]);

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
  }, [filteredData, dateMonthDay]);

  return (
    <div className="table-operator">
      <TableContainer component={Paper} className={classes.container}>
        <div className="container-header">
          <div className="performance-text">オペレータパフォーマンス</div>
          <button
            className="button-csv"
            onClick={() => exportToCSV(rows, 'FileCSV.csv', dateYearMonth, dateMonthDay)}
          >CSV出力</button>
        </div>

        <div className="container-header-operator">
          <div className="performance-text">オペレータID</div>
          <div className="input-operator">
            <StyledTextField
              id="outlined-basic"
              variant="outlined"
              value={hostLoginId}
              onChange={(e) => setHostLoginId(e.target.value)}
              className="text-input-operator"
            />
          </div>
          <div>
            <button
              className="button-setting"
              onClick={handleSearch}
            >
              設定
            </button>
          </div>
        </div>
        <Table className="table-operator" aria-label="customized table" ref={tableRef}>
          <TableHead>
            <TableRow className="header-operator">
              <StyledTableCell>項目</StyledTableCell>
              <StyledTableCell align="center">
                <div className="datetime">
                  <DatePickerYearMonth
                    dateYearMonth={dateYearMonth}
                    setDateYearMonth={setDateYearMonth}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className='datetime'>
                  <DatePickerMonthDay dateMonthDay={dateMonthDay} setDateMonthDay={setDateMonthDay} />
                </div>
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
    </div>
  );
}
