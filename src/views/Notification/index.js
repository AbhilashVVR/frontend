import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import config from "config";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import * as Yup from "yup";

const Notification = () => {
  const initialValues = {
    title: "",
    notification: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("required*"),
    notification: Yup.string().required("required*"),
  });
  const onSubmit = (values) => {
    fetch(`${config.apiServer}/notification/sendNotification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        notification: values.notification,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        swal(data.message, "", "success");
      });
  };

  return (
    <MainCard title="Send Notification">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Box sx={{ width: { md: "50%" }, mx: "auto", my: 2 }}>
            <Field
              as={TextField}
              label="Title"
              sx={{ width: "100%" }}
              color="secondary"
              type="text"
              name="title"
            />
            <Box sx={{ py: 1 }}>
              <label htmlFor="title">
                <Box sx={{ color: "error.main" }}>
                  <ErrorMessage name="title" component="span" />
                </Box>
              </label>
            </Box>
          </Box>
          <Box sx={{ width: { md: "50%" }, mx: "auto", my: 2 }}>
            <Field
              as={TextField}
              label="Notification"
              multiline
              rows={4}
              sx={{ width: "100%" }}
              color="secondary"
              type="text"
              name="notification"
            />
            <Box sx={{ py: 1 }}>
              <label htmlFor="notification">
                <Box sx={{ color: "error.main" }}>
                  <ErrorMessage name="notification" component="span" />
                </Box>
              </label>
            </Box>
            <Box sx={{ textAlign: "center", width: 1 }}>
              <Button color="secondary" variant="contained" type="submit">
                Send
              </Button>
            </Box>
          </Box>
        </Form>
      </Formik>
    </MainCard>
  );
};

export default Notification;
