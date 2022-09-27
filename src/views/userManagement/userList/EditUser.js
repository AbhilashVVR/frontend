import { Button, Grid, TextField } from "@mui/material";
import config from "config";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import Loader from "ui-component/Loader";
import * as Yup from "yup";

const EditUser = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.apiServer}/user/searchById/${params.userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
  }, [params.userID]);

  if (isLoading) return <Loader />;

  // initial values
  const initialValues = {
    firstName: user?.firstName === null ? "" : user?.firstName,
    lastName: user?.lastName === null ? "" : user?.lastName,
    userName: user?.userName === null ? " " : user?.userName,
    email: user?.email === null ? "" : user?.email,
    uniqueId: user?.uniqueId === null ? " " : user?.uniqueId,
    walletCoin: user?.walletCoin === null ? 0 : user?.walletCoin,
    mobileNumber: user?.mobileNumber === null ? "" : user?.mobileNumber,
    grade: user?.grade === null ? "" : user?.grade,
    school: user?.school === null ? "" : user?.school,
    board: user?.board === null ? "" : user?.board,
    pincode: user?.pincode === null ? "" : user?.pincode,
  };

  // schema validation
  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    userName: Yup.string(),
    email: Yup.string().email(),
    uniqueId: Yup.string(),
    walletCoin: Yup.number(),
    mobileNumber: Yup.number().max(10),
    grade: Yup.number().min(1).max(7),
    school: Yup.string(),
    board: Yup.string(),
    pincode: Yup.number().min(100000).max(999999),
  });

  // submit handler
  const onSubmit = (values) => {
    const temp = { ...values };
    temp.firstName = temp.firstName.trim();
    temp.lastName = temp.lastName.trim();
    temp.userName = temp.userName.trim();
    temp.uniqueId = temp.uniqueId.trim();
    temp.email = temp.email.trim();

    //
    fetch(`${config.apiServer}/user/edit/${params.userID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(temp),
    })
      .then((res) => res.json())
      .then((data) => {
        swal(data.message).then(() => {
          navigate("/admin/users/list-users");
        });
      });
  };

  return (
    <MainCard title="Update User">
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
                      placeholder="Text only"
                      variant="outlined"
                      color="secondary"
                      name="userName"
                      {...field}
                      disabled
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

            <Field name="uniqueId">
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
                      id="uniqueId"
                      label={`Unique Id ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      variant="outlined"
                      color="secondary"
                      name="uniqueId"
                      {...field}
                      disabled
                    />
                  </Grid>
                );
              }}
            </Field>

            <Field name="walletCoin">
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
                      id="walletCoin"
                      label={`Wallet Coin ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      variant="outlined"
                      color="secondary"
                      name="walletCoin"
                      {...field}
                      disabled
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
                      inputProps={{
                        maxLength: 10,
                      }}
                      id="mobileNumber"
                      label={`Mobile Number ${
                        meta.touched && meta.error ? "*" : ""
                      }`}
                      placeholder="10 Digit mobile number"
                      variant="outlined"
                      color="secondary"
                      name="mobileNumber"
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
                    sm={12}
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

export default EditUser;
