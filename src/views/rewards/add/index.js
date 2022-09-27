import { Button, Grid, TextField } from "@mui/material";
import config from "config";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import * as Yup from "yup";

const AddRewards = () => {
    const navigate = useNavigate();
    const initialValues = {
        rewardName: "",
        amount: "",
    };
    const validationSchema = Yup.object({
        rewardName: Yup.string().required("required field"),
        amount: Yup.number().required("required field"),
    });

    const onSubmit = (values) => {
        const tempData = {
            name: values.rewardName,
            coin: Number(values.amount),
        };

        fetch(`${config.apiServer}/rewards/createReward`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(tempData),
        })
            .then((res) => res.json())
            .then((data) => {
                swal("Successfully created").then(() => {
                    navigate("/admin/rewards/rewards-list");
                });
            })
            .catch((error) => {
                swal("Error!", "Something went wrong", "wrong");
            });
    };
    return (
        <MainCard title="Add Rewards">
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
                        <Field name="rewardName">
                            {({ field, meta }) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            error={
                                                meta.touched && meta.error
                                                    ? true
                                                    : false
                                            }
                                            id="rewardName"
                                            label={`Reward Name ${
                                                meta.touched && meta.error
                                                    ? "*"
                                                    : ""
                                            }`}
                                            sx={{ width: 1 }}
                                            placeholder="Text only"
                                            variant="outlined"
                                            color="secondary"
                                            name="rewardName"
                                            {...field}
                                        />
                                    </Grid>
                                );
                            }}
                        </Field>
                        <Field name="amount">
                            {({ field, meta }) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            error={
                                                meta.touched && meta.error
                                                    ? true
                                                    : false
                                            }
                                            id="amount"
                                            label={`amount ${
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
                        <Grid item xs={12} sm={6} md={4}>
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

export default AddRewards;
