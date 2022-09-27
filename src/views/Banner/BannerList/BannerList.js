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
import Switch from "@mui/material/Switch";
import { makeStyles } from "@mui/styles";
import config from "config";
import React from "react";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
// mui style component
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

const BannerList = () => {
// states
  const [banners, setBanners] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [enabled, setEnabled] = React.useState(null);
// pagination handles
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();
// enable-disable handle
  const handleChange = (id, isEnable) => {
    fetch(`${config.apiServer}/banner/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isEnable }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEnabled(!enabled);
        if (data) {
          swal(`Update successful`, "", "success");
        }
      })
      .catch((err) => {});
  };
// GET ALL Banner DATA
  React.useEffect(() => {
    fetch(`${config.apiServer}/banner/getBanner`)
      .then((res) => res.json())
      .then((data) => {
        const temp = [];
        for (let i = 0; i < data.length; i += 1) {
          const b = data[i];
          b.sl = i + 1;
          temp.push(b);
        }
        setBanners(temp);
      })
      .catch((err) => {});
  }, [enabled]);

  return (
    <>
      <MainCard title="Banner List">
        {/* table */}
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeaderCell}>
                <TableCell align="center">Sl. No.</TableCell>
                <TableCell align="center">Banner</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {banners
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((banner, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                        color: "#5E35B1",
                      }}
                    >
                      {banner.sl}
                    </TableCell>
                    <TableCell sx={{ width: "70%" }} align="center">
                      <img
                        src={banner?.banner}
                        alt=""
                        style={{
                          width: "50%",
                          height: "150px",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "20%" }} align="left">
                      <Switch
                        defaultChecked={banner.isEnable}
                        color="secondary"
                        onChange={() =>
                          handleChange(banner?.id, banner?.isEnable)
                        }
                      />
                      {banner?.isEnable ? "Enable" : "Disable"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={banners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
};

export default BannerList;
