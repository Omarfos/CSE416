import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  const rows = [
    createData('Average GPA', '3.0', '4.0'),
    createData('Average SAT Math', props.SAT_math, 800),
    createData('Average SAT EBRW', props.SAT_math, 800),
    createData('Average ACT composite', 34, 36),
  ];


  return (

    <TableContainer component={ Paper }>
      { console.log('props', props) }
      <Table className={ classes.table } aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Statistical Summary</StyledTableCell>
            <StyledTableCell align="right">All Matching Users</StyledTableCell>
            <StyledTableCell align="right">All Accepted Matching Users</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => (
            <StyledTableRow key={ row.name }>
              <StyledTableCell component="th" scope="row">
                { row.name }
              </StyledTableCell>
              <StyledTableCell align="right">{ row.calories }</StyledTableCell>
              <StyledTableCell align="right">{ row.fat }</StyledTableCell>
            </StyledTableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
