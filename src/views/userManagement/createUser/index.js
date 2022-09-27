import { Button, Grid, TextField } from "@mui/material";
import config from "config";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import * as Yup from "yup";

const CreateUser = () => {
  const navigate = useNavigate();
  // initial values
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    grade: "",
    school: "",
    board: "",
    pincode: "",
  };

  // schema validation
  const validationSchema = Yup.object({
    firstName: Yup.string().required("required field"),
    lastName: Yup.string(),
    userName: Yup.string(),
    email: Yup.string().email().required("required field"),
    password: Yup.string().min(6).required("required field"),
    mobileNumber: Yup.string().max(10),
    grade: Yup.number().min(1).max(7).required("required field"),
    school: Yup.string(),
    board: Yup.string(),
    pincode: Yup.number().min(100000).max(999999),
  });

  // submit handler
  const onSubmit = (values) => {
    const temp = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      userName: values.userName.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      mobileNumber: values.mobileNumber.trim(),
      grade: values.grade.trim(),
      school: values.school.trim(),
      board: values.board.trim(),
      pincode: values.pincode.trim(),
    };

    fetch(`${config.apiServer}/user/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(temp),
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Successfully created").then(() => {
          navigate("/admin/users/list-users");
        });
      });
  };

  return (
    <MainCard title="User Creation">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {/* form */}
        <Form>
          <Grid container rowSpacing={0} columnSpacing={3}>
            {/* fields */}
            <Field name="firstName">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="firstName"
                      label={`First Name ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      placeholder="Text only"
                      variant="outlined"
                      color="secondary"
                      name="firstName"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="lastName">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="lastName"
                      label={`Last Name ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      placeholder="Text only"
                      variant="outlined"
                      color="secondary"
                      name="lastName"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="userName">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="userName"
                      label={`User Name ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      placeholder="Should be unique"
                      variant="outlined"
                      color="secondary"
                      name="userName"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="email">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="email"
                      label={`Email ${meta.touched && meta.error ? "*" : ""}`}
                      placeholder="Valid Email"
                      variant="outlined"
                      color="secondary"
                      name="email"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="mobileNumber">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="mobileNumber"
                      label={`Mobile Number ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      placeholder="10 Digit mobile number"
                      variant="outlined"
                      color="secondary"
                      name="mobileNumber"
                      inputProps={{maxLength: 10}}
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="password">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="password"
                      label={`Password ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      placeholder="Must be 6 character"
                      variant="outlined"
                      color="secondary"
                      name="password"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="grade">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="grade"
                      label={`Grade ${meta.touched && meta.error ? "*" : ""}`}
                      placeholder="Number only"
                      variant="outlined"
                      color="secondary"
                      name="grade"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="school">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="school"
                      label={`School ${meta.touched && meta.error ? "*" : ""}`}
                      placeholder="Text only"
                      variant="outlined"
                      color="secondary"
                      name="school"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="board">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="board"
                      label={`Board ${meta.touched && meta.error ? "*" : ""}`}
                      placeholder="Text only"
                      variant="outlined"
                      color="secondary"
                      name="board"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="pincode">
              {({ field, meta }) => {
                return (
                  <Grid
                    sx={{
                      "& .MuiTextField-root": { m: "10px", width: "100%" },
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <TextField
                      error={meta.touched && meta.error ? true : false}
                      id="pincode"
                      label={`Pincode ${meta.touched && meta.error ? "*" : ""}`}
                      placeholder="Number only"
                      variant="outlined"
                      color="secondary"
                      name="pincode"
                      {...field}
                    />
                  </Grid>
                );
              }}
            </Field>
            <br />

            <Grid sx={{ mx: "auto", mt: 2 }}>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </MainCard>
  );
};

export default CreateUser;
