import {
  Button,
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
import { IconEdit, IconTrash } from "@tabler/icons";
import config from "config";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import EditReward from "../edit";

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

const ListRewards = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rewardData, setRewardData] = useState([]);
  const [singleReward, setSingleReward] = useState({});
  const [pageReload, setPageReload] = useState(false);

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

  // get all rewards
  useEffect(() => {
    fetch(`${config.apiServer}/rewards/getAllRewards`)
      .then((res) => res.json())
      .then((data) => {
        const temp = [];

        for (let i = 0; i < data.length; i += 1) {
          const updateData = data[i];
          updateData.sl = i + 1;
          temp.push(updateData);
        }
        setRewardData(temp);
      })
    .catch({})
  }, [pageReload]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You Want to Delete!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${config.apiServer}/rewards/deleteRewards`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              swal("Delete Successfully");
              const remainingData = rewardData?.filter(
                (reward) => reward.id !== id
              );
              setRewardData(remainingData);
            }
          });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  const handleEdit = (id) => {
    handleOpen();
    const v = rewardData.find((reward) => reward.id === id);
    setSingleReward(v);
  };

  return (
    <>
      <MainCard title="Rewards List">
        <Paper>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.tableHeaderCell}>
                  <TableCell align="center">SI. No.</TableCell>
                  <TableCell align="center">Reward Name</TableCell>
                  <TableCell align="center">Coin</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rewardData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <TableRow key={index}>
                      <TableCell align="center" component="th" scope="row">
                        {row?.sl}
                      </TableCell>
                      <TableCell align="center">{row.rewardName}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          onClick={() => handleEdit(row.id)}
                        >
                          {<IconEdit />}
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => handleDelete(row.id)}
                        >
                          {<IconTrash />}
                        </Button>
                        <EditReward
                          open={open}
                          handleClose={handleClose}
                          singleReward={singleReward}
                          pageReload={pageReload}
                          setPageReload={setPageReload}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rewardData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </MainCard>
    </>
  );
};

export default ListRewards;
