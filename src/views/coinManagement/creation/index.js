import { Button, Grid, TextField } from "@mui/material";
// import { useState } from "react";
import config from "config";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import * as Yup from "yup";

const CoinCreation = () => {
    const navigate = useNavigate();
    const initialValues = {
        coinName: "",
        coin: "",
        amount: "",
    };
    const validationSchema = Yup.object({
        coinName: Yup.string().required("required field"),
        coin: Yup.number().required("required field"),
        amount: Yup.number().required("required field"),
    });

    const onSubmit = (values) => {
        const tempData = {
            name: values.coinName,
            coin: Number(values.coin),
            amount: Number(values.amount),
        };

        fetch(`${config.apiServer}/coin/createCoinWallet`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(tempData),
        })
            .then((res) => res.json())
            .then((data) => {
                swal("Successfully created").then(() => {
                    navigate("/admin/coin/coin-list");
                });
            })
            .catch((error) => {
                swal("Error!", "Something went wrong", "wrong");
            });
    };
    return (
        <MainCard title="Coin Package Creation">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <Grid
                        container
                        style={{ textAlign: "center", alignItems: "center" }}
                        spacing={3}
                    >
                        <Field name="coinName">
                            {({ field, meta }) => {
                                return (
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            error={
                                                meta.touched && meta.error
                                                    ? true
                                                    : false
                                            }
                                            id="coinName"
                                            label={`Name of Package ${
                                                meta.touched && meta.error
                                                    ? "*"
                                                    : ""
                                            }`}
                                            sx={{ width: 1 }}
                                            placeholder="Text only"
                                            variant="outlined"
                                            color="secondary"
                                            name="coinName"
                                            {...field}
                                        />
                                    </Grid>
                                );
                            }}
                        </Field>
                        <Field name="coin">
                            {({ field, meta }) => {
                                return (
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            error={
                                                meta.touched && meta.error
                                                    ? true
                                                    : false
                                            }
                                            id="coin"
                                            label={`Number of Coins ${
                                                meta.touched && meta.error
                                                    ? "*"
                                                    : ""
                                            }`}
                                            sx={{ width: 1 }}
                                            placeholder="Number only"
                                            variant="outlined"
                                            color="secondary"
                                            name="coin"
                                            {...field}
                                        />
                                    </Grid>
                                );
                            }}
                        </Field>
                        <Field name="amount">
                            {({ field, meta }) => {
                                return (
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            error={
                                                meta.touched && meta.error
                                                    ? true
                                                    : false
                                            }
                                            id="amount"
                                            label={`Price ${
                                                meta.touched && meta.error
                                                    ? "*"
                                                    : ""
                                            }`}
                                            sx={{ width: 1 }}
                                            placeholder="Number only"
                                            variant="outlined"
                                            color="secondary"
                                            name="amount"
                                            {...field}
                                        />
                                    </Grid>
                                );
                            }}
                        </Field>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                color="secondary"
                                variant="contained"
                                style={{ marginRight: "10px" }}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </MainCard>
    );
};

export default CoinCreation;
