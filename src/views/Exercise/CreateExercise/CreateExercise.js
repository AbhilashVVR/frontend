/* eslint-disable no-unused-vars */
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import config from "config";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import { array, object, string } from "yup";

const CreateExercise = () => {
  const navigate = useNavigate();

  const initialValues = {
    subExercise: [""],
    exerciseName: "",
  };


  const handleExerciseData = (values) => {
    const data = {};
    data.exerciseName = values.exerciseName;
    data.subCategory = values.subExercise.map((subC) => {
      return subC;
    });
    fetch(`${config.apiServer}/category/createCategory`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        swal({
          title: "Success",
          text: "Exercise Created Successfully",
          icon: "success",
          buttons: true,
        }).then(() => {
          navigate("/admin/exercise/exercise-list");
        });
      })
      .catch((err) => {});
  };

  return (
    <MainCard title="Exercise Creation">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          values.exerciseName = values.exerciseName.toString();
          handleExerciseData(values);
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          exerciseName: string().required("Exercise Name is required"),
          subExercise: array().required("Sub-Exercise is required"),
        })}
      >
        {({ values, errors, isValid, touched, dirty }) => (
          <Form>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={12}>
                <Field
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
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <Grid item xs={12} md={12}>
                              {index === 0 && (
                                <Button
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
                                type="text"
                                style={{
                                  width: "100%",
                                }}
                                color="secondary"
                                error={
                                  Boolean(errors.subExercise) &&
                                  Boolean(touched.subExercise)
                                }
                                helperText={
                                  Boolean(touched.subExercise) &&
                                  errors.subExercise
                                }
                                required
                              />
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
                                  control={<Checkbox color="secondary" />}
                                  label="1"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="1"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={<Checkbox color="secondary" />}
                                  label="2"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="2"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={<Checkbox color="secondary" />}
                                  label="3"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="3"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={<Checkbox color="secondary" />}
                                  label="4"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="4"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={<Checkbox color="secondary" />}
                                  label="5"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="5"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={<Checkbox color="secondary" />}
                                  label="6"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="6"
                                />
                              </label>
                              <label>
                                <Field
                                  as={FormControlLabel}
                                  control={<Checkbox color="secondary" />}
                                  label="Other"
                                  name={`subExercise[${index}].subCategoryGrades`}
                                  value="other"
                                />
                              </label>
                            </Grid>

                            <Grid item xs={12} md={2}>
                              <Box>
                                {index > 0 && (
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

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!dirty || !isValid}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};

export default CreateExercise;
