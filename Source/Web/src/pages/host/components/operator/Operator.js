import React, { useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ExcelJS from 'exceljs';
import '../skill/skill.css';
import constants from '../../../../constants';
import DatePickerMonthDay from '../overall/DatePickerMonthDay';
import DatePickerYearMonth from '../overall/DatePickerYearMonth';

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

const useStyles = makeStyles(constants.tableRowStyles);

const rows = [
  {
    name: '入電数',
    metric1: 200,
    metric2: 100,
  },
  {
    name: '受電数',
    metric1: 150,
    metric2: 120,
  },
  {
    name: '受電率',
    metric1: 180,
    metric2: 110,
  },
  {
    name: '稼働時間',
    metric1: 180,
    metric2: 110,
  },
  {
    name: '合計通話時間',
    metric1: 180,
    metric2: 110,
  },
  {
    name: '平均通話時間',
    metric1: 180,
    metric2: 110,
  },
];

export default function CustomTable() {
  const classes = useStyles();
  const tableRef = useRef(null);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Define columns for the worksheet
    worksheet.columns = [
      { header: '項目', key: 'name', width: 20 },
      { header: '年 / 月', key: 'metric1', width: 15 },
      { header: '月 / 日', key: 'metric2', width: 15 },
    ];

    // Add rows to the worksheet
    rows.forEach(row => {
      worksheet.addRow({
        name: row.name,
        metric1: row.metric1,
        metric2: row.metric2,
      });
    });

    // Create buffer and write file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="table-operator">
      <TableContainer component={Paper} className={classes.container}>
        <div className="container-header">
          <div className="performance-text">スキル別パフォーマンス</div>
          <button className="button-csv" onClick={exportToExcel}>Excel 出力</button>
        </div>

        <div className="container-header-operator">
          <div className="performance-text">オペレータID</div>
          <div className="input-operator">
            <TextField id="outlined-basic" variant="outlined" />
          </div>
          <div>
            <button className="button-setting">設定</button>
          </div>
        </div>
        <Table className="table-operator" aria-label="customized table" ref={tableRef}>
          <TableHead>
            <TableRow className="header-operator">
              <StyledTableCell>項目</StyledTableCell>
              <StyledTableCell align="center">
                <div className='datetime'>
                  <DatePickerYearMonth />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className='datetime'>
                  <DatePickerMonthDay />
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {data.name}
                </StyledTableCell>
                <StyledTableCell align="center">{data.metric1}</StyledTableCell>
                <StyledTableCell align="center">{data.metric2}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
