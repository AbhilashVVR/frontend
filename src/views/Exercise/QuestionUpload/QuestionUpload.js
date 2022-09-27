import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Suspense } from "react";
import MainCard from "ui-component/cards/MainCard";
import config from 'config'
import { makeStyles } from "@mui/styles";
import swal from "sweetalert";
import parse from "html-react-parser";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  FormHelperText,
  TablePagination,
  TableRow,
} from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons";
// import UpdateModal from "./UpdateModal";
const UpdateModal = React.lazy(() => import("./UpdateModal"));
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
const QuestionUpload = () => {
  //state
  const [allSubAndGrades, setAllSubAndGrades] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [subCategory, setSubCategory] = React.useState([]);
  const [id, setId] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [callData, setCallData] = React.useState(false);
  const [singleQuestion, setSingleQuestion] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({
    id:""
   
  });
//modal
  const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  //pagination
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  const classes = useStyles();
  

  //all question view
    React.useEffect(() => {
      fetch(
        `${config.apiServer}/excercise/getAllExcerciseByGameCategoryAndGrade/1NsQnbDwUw1Cbdgbr50j/5`
      )
        .then((res) => res.json())
        .then((data) => {
          const temp = [];
          const subcategoryData = data.Items;
          for (let i = 0; i < subcategoryData.length; i += 1) {
            const d = subcategoryData[i];
            d.sl = i + 1;
            temp.push(d);
          }
          setAllSubAndGrades(temp);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
            buttons: true,
          });
        });
    }, [callData]);

  
  //all subcategory name,grade 
  React.useEffect(() => {
    fetch(`${config.apiServer}/category/getAllSubCategories`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategory(data?.Items);
      })
      .catch((err) =>
        swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          buttons: true,
          dangerMode: true,
        })
      );
  }, []);

  const handleChange = (event) => { 
    // console.log(event.target.value);
    setId(event.target.value);
  }
  const handleChangeGarde = (event) => { 
    setGrade(event.target.value);
  }


  //filtering data get
  const handleSubmit = (event) => {
    event.preventDefault();
    if (id === "") {
      setFormErrors({
        id: "Please select a game",
        
      });
    } else {
      setFormErrors({
        id: "",
        
        
      });
      fetch(
        `${config.apiServer}/excercise/getAllExcerciseByGameCategoryAndGrade/${id}/${grade}`
      )
        .then((res) => res.json())
        .then((data) => {
          const temp = [];
          const subcategoryData = data.Items;
          for (let i = 0; i < subcategoryData.length; i += 1) {
            const d = subcategoryData[i];
            d.sl = i + 1;
            temp.push(d);
          }
          setAllSubAndGrades(temp);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: 'Something went wrong',
            icon: "error",
            buttons: true
          });
        })
    }
  }


  //delete
  const handleDelete = id => {
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
        fetch(`${config.apiServer}/excercise/deleteExcerciseQuestion/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              swal({
                title: "Deleted!",
                text: "Your Question has been deleted.",
                icon: "success",
                buttons: true,
              })
              setCallData(!callData);
            }
          })
          .catch((err) => {
            swal({
              title: "Error",
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


  //reset 
  const handleReset = () => {
    setCallData(!callData);
    setId("");
    setGrade("");
  }


//update
  const handleEdit = (id) => { 
    handleOpen();
    // console.log(id);
    setSingleQuestion({});
    fetch(`${config.apiServer}/excercise/getexcercise/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).length === 0) { 
          return;
        }
        setSingleQuestion(data); 
      })
      .catch((err) => {
        swal({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
        });
        })
  }
  return (
    <>
      <MainCard title="Question Upload">
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formErrors.id.length > 0}>
                <InputLabel id="demo-simple-select-label">
                  Sub-Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={id}
                  label="Sub-Category"
                  onChange={handleChange}
                >
                  {subCategory?.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item?.subCategoryName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formErrors.id.length > 0 && <span>{formErrors.id}</span>}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={grade}
                  label="Grade"
                  onChange={handleChangeGarde}
                  disabled={id === ""}
                >
                  {subCategory?.map(
                    (item) =>
                      item?.id === id &&
                      item?.subCategoryGrades?.map((i, index) => (
                        <MenuItem value={i} key={index}>
                          {i}
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
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
                <TableCell align="center">Question</TableCell>
                <TableCell align="center">Option A</TableCell>
                <TableCell align="center">Option B</TableCell>
                <TableCell align="center">Option C</TableCell>
                <TableCell align="center">Option D</TableCell>
                <TableCell align="center">Answer</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allSubAndGrades
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((allSubAndGrade, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.grade}
                      {/* {allSubAndGrade?.sl} */}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.level}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "30%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.question?parse?.(allSubAndGrade?.question):""}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.option1}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.option2}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.option3}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.option4}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "5%",
                        textAlign: "center",
                      }}
                    >
                      {allSubAndGrade?.correctAnswer}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "5%",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        color="secondary"
                        onClick={() => handleEdit(allSubAndGrade?.id)}
                      >
                        {<IconEdit />}
                      </Button>
                      {singleQuestion?.id && (
                        <Suspense fallback={""}>
                          <UpdateModal
                            open={open}
                            handleClose={handleClose}
                            singleQuestion={singleQuestion}
                            setCallData={setCallData}
                            callData={callData}
                          />
                        </Suspense>
                      )}
                      <Button
                        color="secondary"
                        onClick={(e) => handleDelete(allSubAndGrade?.id)}
                      >
                        {<IconTrash />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, 300, 500]}
          component="div"
          count={allSubAndGrades.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
};

export default QuestionUpload;
