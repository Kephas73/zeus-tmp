import React from 'react';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#929291",
    color: theme.palette.common.white,
    width: '33.33%',
    '&:nth-of-type(2), &:nth-of-type(3)': {
      textAlign: 'center', 
    },
  },
  body: {
    fontSize: 14,
    width: '33.33%',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('入電数', 159, 6.0),
  createData('受電数', 237, 9.0),
  createData('受電率', 262, 16.0),
  createData('稼働席数', 305, 3.7),
  createData('稼働時間', 356, 16.0),
  createData('合計通話時間', 159, 6.0),
  createData('平均通話時間', 237, 9.0),
  createData('不在数', 262, 16.0),
  createData('切断数', 305, 3.7),
  createData('待ち呼数', 356, 16.0),
  createData('待ち呼率', 159, 6.0),
  createData('待ち呼　平均待機時間', 237, 9.0),
  createData('待ち呼　接続成功数', 262, 16.0),
  createData('待ち呼　離脱数', 305, 3.7),
];

const useStyles = makeStyles({
  table: {
    minWidth: 560,
  },
  row: {
    height: 5,
  },
  colBorderRight: {
    borderRight: '1px solid red'
  }
});

export default function Overall() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.colBorderRight}>項目</StyledTableCell>
            <StyledTableCell className={classes.colBorderRight} align="right"><DatePickerYearMonth/></StyledTableCell>
            <StyledTableCell align="right"><DatePickerMonthDay/></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name} className={classes.row}>
              <StyledTableCell className={classes.colBorderRight} component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell className={classes.colBorderRight} align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
