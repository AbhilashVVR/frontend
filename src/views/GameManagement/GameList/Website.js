import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import config from "config";
import React, { useState } from "react";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import "../../Banner/index.css";
const Website = ({ playerData }) => {
  const [FileUpload, setFileUpload] = useState(null);

  const handleSinglePlayer = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("files", FileUpload[0]);
    formData.append("gameName", playerData?.gameName);
    fetch(`${config.apiServer}/websiteGameQue/register`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message) {
          swal("Success", data?.message, "success");
        } else {
          swal("Error", "Something Went Wrong!", "error");
        }
      }).catch((err) => {
        swal("Error", "Something Went Wrong!", "error");
      }
    );
    setFileUpload(null);
  };
  return (
    <div>
      <MainCard title="Website(Add Question)">
        <form onSubmit={handleSinglePlayer}>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>
              Game Name
            </Typography>
            <TextField
              // label="GameName"
              name="gameName"
              variant="outlined"
              fullWidth
              disabled
              color="secondary"
              value={playerData?.gameName}
            />
          </Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              mt: 1,
            }}
          >
            <Grid item xs={12} md={12}>
              <Typography variant="caption" display="block" gutterBottom>
                Import Questions
              </Typography>
              <label htmlFor="contained-button-file">
                <span className="FlexButton">
                  {!FileUpload ? (
                    <div className="FlexButton_uploadText">
                      <Button variant="contained" component="span">
                        Upload Files
                      </Button>
                    </div>
                  ) : (
                    <div className="FlexButton_uploadText">
                      {FileUpload[0]?.name}
                    </div>
                  )}
                </span>
                <span className="imageFieldPosition">
                  <input
                    id="contained-button-file"
                    accept=".xls, .xlsx"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFileUpload(e.target?.files)}
                    required
                    margin="normal"
                  />
                </span>
              </label>
            </Grid>
          </Grid>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </MainCard>
    </div>
  );
};

export default Website;
