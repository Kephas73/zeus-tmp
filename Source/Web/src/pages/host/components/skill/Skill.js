import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Customizing table cell styles
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#929291",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    border: "1px solid #E0E0E0", // Border for cells
    padding: "10px 16px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #636363",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
  },
}))(TableRow);

// Example data
function createData(name, metric1, metric2, metric3, metric4) {
  return { name, metric1, metric2, metric3, metric4 };
}

const rows = [
  createData('Item 1', 200, 150, 77.5, 1000),
  createData('Item 2', 300, 120, 65.2, 1200),
  createData('Item 3', 250, 170, 80.3, 1100),
  createData('Item 4', 275, 160, 75.4, 1050),
  createData('Item 5', 225, 180, 85.5, 1300),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="center">Metric 1</StyledTableCell>
            <StyledTableCell align="center">Metric 2</StyledTableCell>
            <StyledTableCell align="center">Metric 3</StyledTableCell>
            <StyledTableCell align="center">Metric 4</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.metric1}</StyledTableCell>
              <StyledTableCell align="center">{row.metric2}</StyledTableCell>
              <StyledTableCell align="center">{row.metric3}</StyledTableCell>
              <StyledTableCell align="center">{row.metric4}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
