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
function createData(data) {
  return data
}

const rows = [
  createData([
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    }
  ]),
  createData([
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    }
  ]),
  createData([
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    }
  ]),
  createData([
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    }
  ]),
  createData([
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    },
    {
      name: 'Item 1',
      metric1: 200,
      metric2: 100,
      metric3: 70.9,
      metric4: 1000,
    }
  ])
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
          {rows.map((rows) => {
            console.log(rows)
            return rows.map((data) => {
              console.log(data)
              return  (
                <StyledTableRow key={data.name}>
                  <StyledTableCell component="th" scope="row">
                    {data.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{data.metric1}</StyledTableCell>
                  <StyledTableCell align="center">{data.metric2}</StyledTableCell>
                  <StyledTableCell align="center">{data.metric3}</StyledTableCell>
                  <StyledTableCell align="center">{data.metric4}</StyledTableCell>
                </StyledTableRow>
              )
            })
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
