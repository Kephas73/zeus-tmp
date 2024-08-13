import React from 'react';
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
import DatePickerDayMonthYear from '../overall/DatePickerDayMonthYear';

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
    {
      name: 'Item 2',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
    {
      name: 'Item 2',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
      metric5: 1000,
    },
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
    <div className="container">
      <TableContainer component={Paper} className={classes.container}>
        <div className="container-header">
          <div className="performance-text">スキル別パフォーマンス</div>
          <button className="button-csv">CSV 出力</button>
        </div>
        <div className="container-dateTime">
          <div>期間指定</div>
          <div><DatePickerDayMonthYear/></div>
          <div><DatePickerDayMonthYear/></div>
        </div>
        <Table className={classes.table} aria-label="customized table">
          <TableHead >
            <TableRow >
              <StyledTableCell>項目</StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <span className="languages">EN</span>
                  <span>英語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <span className="languages">CN</span>
                  <span>中国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <span className="languages">KR</span>
                  <span>韓国語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <span className="languages">ES</span>
                  <span>スペイン語</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div>
                  <span className="languages">PT</span>
                  <span>ポルトガル語</span>
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
                    <StyledTableCell align="center">{data.metric3}</StyledTableCell>
                    <StyledTableCell align="center">{data.metric4}</StyledTableCell>
                    <StyledTableCell align="center">{data.metric5}</StyledTableCell>
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
