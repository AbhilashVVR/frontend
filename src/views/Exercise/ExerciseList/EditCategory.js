/* eslint-disable no-unused-vars */
import { Box, Button, Checkbox, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import config from "config";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";


const EditCategory = () => {
  const { exerciseId } = useParams();
  const [subCategoryList, setSubCategoryList] = React.useState([]);
  const [dataName, setDataName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = React.useState(false);


 
  React.useEffect(() => {
    fetch(`${config.apiServer}/category/getAllCategory`)
      .then((res) => res.json())
      .then((data) => {
        const singleData = data.find((item) => item.id === exerciseId);
        setDataName(singleData.categoryName);
      });
  }, [exerciseId]);

  React.useEffect(() => {
    fetch(`${config.apiServer}/category/getAllSubCategories/${exerciseId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategoryList(data);
        setIsLoading(false);
      });
  }, [exerciseId, isUpdated]);

  const subCatagory = subCategoryList.map(
    (item, index) => 
      item.subCategoryName,
  );
  const gradesValue = subCategoryList.map(
    (item, index) => item.subCategoryGrades
  );

  const subId = subCategoryList.map((item, index) => item.id);
  const subIsEnable = subCategoryList.map((item, index) => item.isEnabled);
  if (isLoading) return null;
  const initialValues = {
    subExercise: [...subCategoryList],
    exerciseName: dataName,
  };

  //submit
   const handleExerciseData = (values) => {
     // values.exerciseName = exerciseName;
     const data = {
       exerciseName: values.exerciseName,
       subCategory: values.subExercise.map((sc) => {
         return sc;
       }),
     };

     fetch(`${config.apiServer}/category/${exerciseId}`, {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     })
       .then((res) => res.json())
       .then(() => {
         swal("Update successful", "", "success");
         navigate("/admin/exercise/exercise-list");
       })
       .catch((err) => { 
          swal("Update failed", "", "error");
          
        });
   };
  const enableDisable = (id, data) => {
    fetch(`${config.apiServer}/category/${id}/enableDisableSubCategory`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsUpdated(!isUpdated);
          swal(`Update successful`, "", "success");
        }
      })
      .catch((err) => { });

  
  };

  const handleBackToList = () => { 
    navigate("/admin/exercise/exercise-list");
  }

  return (
    <MainCard title="Edit exercise">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          handleExerciseData(values);
          formikHelpers.resetForm();
        }}
        
      >
        {({ values, errors, touched }) => (
          <Form>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={12}>
                <Field
                  id="exerciseName"
                  as={TextField}
                  name="exerciseName"
                  label="Exercise Name"
                  margin="normal"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                  color="secondary"
                  type="name"
                  value={dataName}
                  readOnly
                  disabled
                  error={
                    Boolean(errors.exerciseName) &&
                    Boolean(touched.exerciseName)
                  }
                  helperText={
                    Boolean(touched.exerciseName) && errors.exerciseName
                  }
                  //   required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FieldArray name="subExercise">
                  {({ remove, push }) => (
                    <div>
                      {values?.subExercise?.length > 0 &&
                        values.subExercise.map((exercise, index) => (
                          <Grid
                            key={index}
                            container
                            rowSpacing={1}
                            columnSpacing={{
                              xs: 1,
                              sm: 2,
                              md: 3,
                            }}
                            style={{
                              marginBottom: "20px",
                            }}
                          >
                            <Grid item xs={12} md={12}>
                              {index === 0 && (
                                <Button
                                  sx={{
                                    mb: 2,
                                  }}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => push("")}
                                >
                                  Add Sub-Category
                                </Button>
                              )}
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <Typography
                                variant="h4"
                                display="block"
                                gutterBottom
                                sx={{
                                  mb: 2,
                                }}
                              >
                                SubExercise - {index+1}
                              </Typography>
                              <Field
                                as={TextField}
                                label="Sub-Exercise"
                                name={`subExercise[${index}].subCategoryName`}
                                // type="text"
                                style={{
                                  width: "100%",
                                  marginBottom: "0",
                                }}
                                valuedefault={subCatagory[index] || ""}
                                color="secondary"
                                required
                              />
                              <span>
                                <Switch
                                  onClick={(e) =>
                                    enableDisable(
                                      subId[index],
                                      e.target.checked
                                    )
                                  }
                                  defaultChecked={
                                    subIsEnable[index] ? true : false
                                  }
                                  color="secondary"
                                />{" "}
                                {subIsEnable[index] ? "Enable" : "Disable"}
                              </span>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              {/* //checkbox  */}
                              <Typography
                                variant="h4"
                                display="block"
                                gutterBottom
                                sx={{
                                  mb: 2,
                                }}
                              >
                                Grades
                              </Typography>

                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("1")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="1"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="1"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("2")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="2"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="2"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("3")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="3"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="3"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("4")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="4"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="4"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("5")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="5"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="5"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("6")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="6"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="6"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={
                                    <Checkbox
                                      color="secondary"
                                      defaultChecked={
                                        gradesValue[index]?.includes("other")
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label="Other"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="other"
                                />
                              </label>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Box>
                                {subCategoryList.length < index + 1 && (
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => remove(index)}
                                    sx={{
                                      mt: 4,
                                    }}
                                  >
                                    Delete
                                  </Button>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        ))}
                    </div>
                  )}
                </FieldArray>
              </Grid>
            </Grid>

            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
            <Button
              onClick={handleBackToList}
              variant="contained" color="error" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};

export default EditCategory;
