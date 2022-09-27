import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

// ==============================|| User Table ||============================== //

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
  },
  tableHeaderCell: {
    "& .MuiTableCell-head": {
      fontWeight: 700,
      color: theme.palette.secondary.main,
      fontSize: 16,
    },
  },
}));

const MainTable = forwardRef(({ titles, data, ...others }, ref) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();
  return (
    <Paper>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-label='simple table'
          ref={ref}
          {...others}
        >
          <TableHead>
            <TableRow className={classes.tableHeaderCell}>
              {titles.map((title, id) => (
                <TableCell align='center' key={id}>
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => (
                  <TableRow key={i}>
                    {Object.keys(item).map((key, i) => (
                      <TableCell key={i} align='center'>
                        {item[key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
});

MainTable.propTypes = {
  titles: PropTypes.array,
  data: PropTypes.array,
};

export default MainTable;
