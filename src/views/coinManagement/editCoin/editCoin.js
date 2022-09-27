import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import config from "config";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as React from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import "./index.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const EditCoin = ({
    open,
    handleClose,
    singleReward,
    pageReload,
    setPageReload,
}) => {
    const initialValues = {
        coinName: singleReward?.coinName === null ? "" : singleReward?.coinName,
        coin: singleReward?.coin === null ? "" : singleReward?.coin,
        amount: singleReward?.amount === null ? "" : singleReward?.amount,
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

        fetch(`${config.apiServer}/coin/${singleReward.id}/edit-coin`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(tempData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    handleClose();
                    swal("Update Successfully");
                    setPageReload(!pageReload);
                }
            })
            .catch((error) => {
                swal("Error!", "Something went wrong", "wrong");
            });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <Field name="coinName">
                                {({ field, meta }) => {
                                    return (
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
                                            margin="normal"
                                            style={{ width: "100%" }}
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="coin">
                                {({ field, meta }) => {
                                    return (
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
                                            margin="normal"
                                            style={{ width: "100%" }}
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="amount">
                                {({ field, meta }) => {
                                    return (
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
                                            margin="normal"
                                            style={{ width: "100%" }}
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Update
                            </Button>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
};

export default EditCoin;
EditCoin.propTypes = {
    open: PropTypes.any,
    handleClose: PropTypes.any,
    singleReward: PropTypes.any,
    // setPageReload: PropTypes.any,
    // singleImage: PropTypes.any,
    // pageReload: PropTypes.any
};
