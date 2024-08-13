import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../skill/skill.css';
import constants from '../../../../constants';
import DatePickerMonthDay from '../overall/DatePickerMonthDay';
import DatePickerYearMonth from '../overall/DatePickerYearMonth';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

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

function createData(data) {
  return data;
}

const rows = [
  createData([
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },

    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
  ]),
  createData([
    {
      name: 'Item 2',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
  ]),
  createData([
    {
      name: 'Item 3',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
    {
      name: 'Item 3',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
    },
  ]),
  createData([
    {
      name: 'Item 4',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
    {
      name: 'Item 4',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
  ]),
];

export default function CustomTable() {
  const classes = useStyles();

  return (
    <div className="table-operator">
      <TableContainer component={Paper} className={classes.container}>
        <div className="container-header">
          <div className="performance-text">スキル別パフォーマンス</div>
          <button className="button-csv">CSV 出力</button>
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
        <Table className="table-operator" aria-label="customized table">
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
