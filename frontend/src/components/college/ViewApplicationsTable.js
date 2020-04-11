import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";


function descendingComparator(a, b, orderBy) {
  if (b[ orderBy ] < a[ orderBy ]) {
    return -1;
  }
  if (b[ orderBy ] > a[ orderBy ]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [ el, index ]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[ 0 ], b[ 0 ]);
    if (order !== 0) return order;
    return a[ 1 ] - b[ 1 ];
  });
  return stabilizedThis.map(el => el[ 0 ]);
}

const headCells = [
  { id: "userid", numeric: false, disablePadding: false, label: "User ID" }, // calories
  { id: "APP_STATUS", numeric: false, disablePadding: false, label: "Application Status" },
  { id: "college_class", numeric: true, disablePadding: false, label: "College Class" },
  { id: "high_school_name", numeric: false, disablePadding: false, label: "High School Name" }, // fat
  { id: "high_school_state", numeric: false, disablePadding: false, label: "High School State" }, // carbs
  { id: "GPA", numeric: false, disablePadding: false, label: "GPA" }, // protein
  { id: "SAT", numeric: true, disablePadding: false, label: "SAT" },
  { id: "ACT_composite", numeric: true, disablePadding: false, label: "ACT" },
  { id: "major_1", numeric: false, disablePadding: false, label: "Major" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        { headCells.map(headCell => (
          <TableCell
            key={ headCell.id }
            align={ headCell.numeric ? "right" : "left" }
            padding={ headCell.disablePadding ? "none" : "default" }
            sortDirection={ orderBy === headCell.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : "asc" }
              onClick={ createSortHandler(headCell.id) }
            >
              { headCell.label }
              { orderBy === headCell.id ? (
                <span className={ classes.visuallyHidden }>
                  { order === "desc" ? "sorted descending" : "sorted ascending" }
                </span>
              ) : null }
            </TableSortLabel>
          </TableCell>
        )) }
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf([ "asc", "desc" ]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [ order, setOrder ] = React.useState("asc");
  const [ orderBy, setOrderBy ] = React.useState("similarity_score");
  const [ selected, setSelected ] = React.useState([]);
  const [ page, setPage ] = React.useState(0);
  const [ dense, setDense ] = React.useState(false);
  const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
  const rows = props.students;


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    console.log(isAsc)
    console.log(property)
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <TableContainer>
          <Table
            className={ classes.table }
            aria-labelledby="tableTitle"
            size={ dense ? "small" : "medium" }
            aria-label="enhanced table"
          >
            {/* { console.log('props', props) } */}
            <EnhancedTableHead
              classes={ classes }
              numSelected={ selected.length }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              rowCount={ rows.length }
            />
            <TableBody>
              { stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={ isItemSelected }
                      tabIndex={ -1 }
                      key={ row.name }
                      selected={ isItemSelected }
                    >
                      <TableCell align="right">{ row.userid }</TableCell>
                      <TableCell align="right">{ Math.round(row.APP_STATUS*100) }%</TableCell>
                      <TableCell align="right">{ row.high_school_name }</TableCell>
                      <TableCell align="right">{ row.high_school_state }</TableCell>
                      <TableCell align="right">{ row.GPA }</TableCell>
                      <TableCell align="right">{ row.SAT }</TableCell>
                      <TableCell align="right">{ row.ACT_composite }</TableCell>
                      <TableCell align="right">{ row.major_1 }</TableCell>
                      <TableCell align="right">{ row.college_class }</TableCell>
                    </TableRow>
                  );
                }) }
              { emptyRows > 0 && (
                <TableRow style={ { height: (dense ? 33 : 53) * emptyRows } }>
                  <TableCell colSpan={ 6 } />
                </TableRow>
              ) }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [ 5, 10, 25 ] }
          component="div"
          count={ rows.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </Paper>
    </div>
  );
}
