import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import config from "config";
import React, { useState } from "react";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import "../../Banner/index.css";
const Multiplayer = ({ playerData }) => {
  const Grade = [1, 2, 3, 4, 5, 6, "Others"];
  const [gradeValue, setGradeValue] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const formData = new FormData();
  const [FileUpload, setFileUpload] = React.useState(null);

  const handleMultiPlayer = (event) => {
    event.preventDefault();
    formData.append("files", FileUpload[0]);
    formData.append("grade", gradeValue);
    formData.append("gameCategory", gameCategory);
    formData.append("gameName", playerData?.gameName);
    setTimeout(() => {
      fetch(`${config.apiServer}/singleque/register`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            swal("Success", data.message, "success");
          } else {
            swal("Error", "Something Went Wrong!", "error");
          }
        })
        .catch((err) => {});
    }, 1000);
  };
  return (
    <div>
      <MainCard title="Single Player(Add Question)">
        <form onSubmit={handleMultiPlayer}>
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
          >
            <Grid item xs={12} md={6}>
              <InputLabel id="demo-simple-select-label">Grade</InputLabel>
              <Select
                id="demo-simple-select-label"
                // label="Grade"
                value={gradeValue || ""}
                placeholder="Select-Grade"
                onChange={(e) => setGradeValue(e.target.value)}
                style={{ width: "100%" }}
                color="secondary"
                required
              >
                {Grade?.map((grade, index) => (
                  <MenuItem key={index} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                id="demo-simple-select-label"
                //   label="Grade"
                placeholder="Select-Grade"
                value={gameCategory || ""}
                onChange={(e) => setGameCategory(e.target.value)}
                style={{ width: "100%" }}
                color="secondary"
                required
              >
                <MenuItem value="singlePlayer">Single Player</MenuItem>
                <MenuItem value="multiPlayer">Multi Player</MenuItem>
                <MenuItem value="dailyCompetition">Daily Competition</MenuItem>
              </Select>
            </Grid>
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
                    accept=".csv"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFileUpload(e.target.files)}
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

export default Multiplayer;
