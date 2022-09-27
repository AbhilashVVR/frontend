import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import React, { Suspense } from "react";
import MainCard from "ui-component/cards/MainCard";
import config from "config";
import { makeStyles } from "@mui/styles";
import parse from "html-react-parser";
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
import { IconEdit, IconTrash } from "@tabler/icons";
import { useEffect } from "react";
import swal from "sweetalert";
const GameQuestionUpdateModal = React.lazy(() =>
  import("./GameQuestionUpdateModal")
);
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
const GameQuestionUpload = () => {
  const [filteringData, setFilteringData] = React.useState([]);
  const [allGames, setAllGames] = React.useState([]);
  const [id, setId] = React.useState("");
  const [gradeValue, setGradeValue] = React.useState("");
  const [levelValue, setLevelValue] = React.useState("");
  const [singleQuestion, setSingleQuestion] = React.useState({});
  const grades = [1, 2, 3, 4, 5, 6, "Others"];

  //form validation
  const [formErrors, setFormErrors] = React.useState({
    grade: "",
    id: "",
    level: "",
  });

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();

  //all games
  useEffect(() => {
    fetch(`${config.apiServer}/game/get-games`)
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data);
      })
      .catch((err) => {
        swal("Error", "Something went wrong", "error");
      });
  }, []);

  //id
  const handleChangeGameName = (e) => {
    setId(e.target.value);
  };

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === "" || gradeValue === "" || levelValue === "") {
      setFormErrors({
        id: "Please select a game",
        grade: "Please select a grade",
        level: "Please select a level",
      });
    } else {
      setFormErrors({
        id: "",
        grade: "",
        level: "",
      });
      fetch(
        `${config.apiServer}/singleque/get/${gradeValue}/${levelValue}/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setFilteringData(data.Items);
        })
        .catch((err) => {
          swal({
            title: "Failed",
            text: "Failed to fetch data",
            icon: "error",
            buttons: true,
          });
        });
    }
  };

  //reset
  const handleReset = (e) => {
    e.preventDefault();
    setFilteringData([]);
    setGradeValue("");
    setId("");
    setLevelValue("");
  };

  //handle delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log("delete");
        //fetch data
        fetch(
          `${config.apiServer}/singleque/deleteSinglePlayerQuestion/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              swal({
                title: "Deleted!",
                text: "Your Question has been deleted.",
                icon: "success",
                buttons: true,
              });
            }
          })
          .catch((err) => {
            swal({
              title: err,
              text: "Please try again!",
              icon: "error",
              buttons: true,
            });
          });
      } else {
        swal({
          title: "Your data is safe!",
          text: "Your data is safe!",
          icon: "success",
        });
      }
    });
  };

  //single question
  const handleEdit = (id) => {
    handleOpen();
    setSingleQuestion({});
    fetch(`${config.apiServer}/singleque/getSinglePlayerQuestion/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          return;
        }
        setSingleQuestion(data);
      })
      .catch((er) => {
        swal({
          title: "Failed",
          text: "Something went wrong",
          icon: "error",
          buttons: true,
        });
      });
  };

  return (
    <>
      <MainCard title="Question Upload">
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={formErrors.id.length > 0}>
                <InputLabel id="demo-simple-select-label">Games</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={id}
                  label="Games"
                  onChange={handleChangeGameName}
                >
                  {allGames.map((game) => (
                    <MenuItem key={game?.id} value={game?.id}>
                      {game?.gameName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formErrors.id.length > 0 && <span>{formErrors?.id}</span>}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={formErrors.grade.length > 0}>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gradeValue}
                  label="Grade"
                  onChange={(e) => setGradeValue(e.target.value)}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formErrors.grade.length > 0 && (
                    <span>{formErrors.grade}</span>
                  )}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Level"
                variant="outlined"
                value={levelValue}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return;
                  } else {
                    setLevelValue(e.target.value);
                  }
                }}
                color="secondary"
                error={formErrors.level.length > 0}
                helperText={
                  formErrors.level.length > 0 && <span>{formErrors.level}</span>
                }
              />
            </Grid>

            <Grid item xs={12} md={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mx: 2 }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </MainCard>
      <MainCard sx={{ mt: 1 }}>
        {/* table */}
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeaderCell}>
                {/* <TableCell align="center">Sl. No.</TableCell> */}
                <TableCell align="center">Grade</TableCell>
                <TableCell align="center">Level</TableCell>
                {id === "nDiny1GkmGtp99kvoTQN" && (
                  <>
                    <TableCell align="center">Question</TableCell>
                    <TableCell align="center">Option A</TableCell>
                    <TableCell align="center">Option B</TableCell>
                    <TableCell align="center">Option C</TableCell>
                  </>
                )}
                {id === "N8m7QQi6AizzRWhbihHs" && (
                  <TableCell align="center">Words</TableCell>
                )}
                <TableCell align="center">Answer</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteringData?.length > 0 ? (
                filteringData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((fData) => (
                    <TableRow key={fData?.id}>
                      <TableCell
                        sx={{
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        {fData?.grade}
                        {/* {allSubAndGrade?.sl} */}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        {fData?.level}
                      </TableCell>
                      {id === "nDiny1GkmGtp99kvoTQN" && (
                        <>
                          <TableCell
                            sx={{
                              width: "30%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.question ? parse?.(fData?.question) : ""}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.option1}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.option2}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.option3}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.correctAnswer}
                          </TableCell>
                        </>
                      )}
                      {
                        id === "N8m7QQi6AizzRWhbihHs" && <>
                          <TableCell
                            sx={{
                              width: "30%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.words}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {fData?.answer}
                          </TableCell>
                        </>
                      }
                      <TableCell
                        sx={{
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          color="secondary"
                          onClick={() => handleEdit(fData?.id)}
                        >
                          {<IconEdit />}
                        </Button>
                        {singleQuestion?.id && (
                          <Suspense fallback={""}>
                            <GameQuestionUpdateModal
                              open={open}
                              handleClose={handleClose}
                              singleQuestion={singleQuestion}
                              id={id}
                            />
                          </Suspense>
                        )}
                        <Button
                          color="secondary"
                          onClick={(e) => handleDelete(fData?.id)}
                        >
                          {<IconTrash />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Box sx={{ textAlign: "center" }}>
                      <h3>No Data Found</h3>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteringData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
};

export default GameQuestionUpload;
