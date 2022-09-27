import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Proptypes from "prop-types";
import React from "react";

const Filter = ({ handleSubmit, handleId, handleClick }) => {
    return (
        <Box>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        style={{ textAlign: "center", alignItems: "center" }}
                        spacing={3}
                    >
                        <Grid item md={8}>
                            <TextField
                                label="User Id"
                                sx={{ width: 1 }}
                                color="secondary"
                                type="text"
                                onChange={handleId}
                            />
                        </Grid>

                        <Grid item md={4}>
                            <Button
                                color="secondary"
                                variant="contained"
                                style={{ marginRight: "10px" }}
                                type="submit"
                            >
                                Search
                            </Button>
                            <Button
                                type="reset"
                                onClick={handleClick}
                                color="secondary"
                                variant="contained"
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </Box>
    );
};
Filter.propTypes = {
    handleSubmit: Proptypes.func,
    handleId: Proptypes.func,
    handleClick: Proptypes.func,
};
export default Filter;
