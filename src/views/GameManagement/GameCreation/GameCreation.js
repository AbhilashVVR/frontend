import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import config from "config";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import "../../Banner/index.css";
import "./gameCreationApkfileCss.css";

const GameCreation = () => {
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [imageValidate, setImageValidate] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [gameTypes, setGameTypes] = useState("");
  const [FileUpload, setFileUpload] = useState({});
  const [newGameType, setNewGameType] = useState(false);
  const [featuredGameType, setFeaturedGameType] = useState(false);
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [multiPlayer, setMultiPlayer] = useState(false);
  const [dailyCompetition, setDailyCompetition] = useState(false);
  const [website, setWebsite] = useState(false);
  const [html5Url, setHtml5Url] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [gameVersion, setGameVersion] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const navigate = useNavigate();
  const formData = new FormData();
  const gameCreationValue = {};
  const [progress, setProgress] = useState(false);

  const date = new Date(dateValue).toISOString().slice(0, 10);


  const convertBase64 = (imagesFiles) => {
    const convertImage = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imagesFiles);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return convertImage;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(true);
    if (gameName === "" || gameDescription === "" || dateValue === null) {
      return setError2("Please fill all the fields");
    } else {
      setError2("");
      const appFile = FileUpload[0];
      const imagesFiles = imageFile[0];
      convertBase64(imagesFiles)?.then((image) => {
        // const removeImgVariable = image.split(",")[1];
        const stringLength = image.length - "data:image/png;base64,".length;
        const sizeInBytes =
          4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1000;
        if (sizeInKb < 200) {
          if (newGameType) {
            gameCreationValue.gameType = "New";
          }
          if (featuredGameType) {
            gameCreationValue.gameType = "Featured";
          }
          if (newGameType === "" && featuredGameType === "") { 
            gameCreationValue.gameType = "";
          }
          
          gameCreationValue.singlePlayer = singlePlayer;
          gameCreationValue.multiPlayer = multiPlayer;
          gameCreationValue.dailyCompetition = dailyCompetition;
          gameCreationValue.website = website;
          gameCreationValue.gameIcon = image;
          gameCreationValue.gameDescription = gameDescription;
          gameCreationValue.createdAt = date;
          gameCreationValue.html5Link = html5Url;
          gameCreationValue.appType = gameTypes;
          gameCreationValue.gameVersion = gameVersion;
          gameCreationValue.gameName = gameName;

          const re = /^[0-9\b]+$/;
          if (re.test(gameName) || re.test(gameDescription)) {
            return setError(
              "Please enter a valid name, it should not contain numbers"
            );
          }

          if (appFile) { 
            gameCreationValue.actionName = name;
            gameCreationValue.packageName = packageName;
            formData.append("file_path", appFile);
          } else {
            gameCreationValue.actionName = "";
            gameCreationValue.packageName = "";
            gameCreationValue.apkLink = "";
      }
          formData.append("data", JSON.stringify(gameCreationValue));
        console.log(gameCreationValue);
          setImageValidate(false);
          var header = {
            "Content-Type": "application/json",
            charset: "utf-8",
          };

          axios
            .post(`${config.apiServer}/game/register`, formData, {
              headers: header,
            })
            .then((res) => {
              if (res.data) {
                setProgress(false);
                swal({
                  title: "Game Created",
                  text: "Game Created Successfully",
                  icon: "success",
                  button: true,
                }).then((willSuccess) => {
                  if (willSuccess) {
                    navigate("/admin/games/game-list");
                  }
                });
              } else {
                swal({
                  title: "Game Creation Failed",
                  text: "Game Creation Failed",
                  icon: "error",
                  button: true,
                });
              }
            });
        } else {
          return setImageValidate(true);
        }
      });
      setImageFile(null);
      setFileUpload(null);
    }

    // e.target.reset();
  };

  return (
    <>
      <MainCard title="Game Creation">
        {progress ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  onChange={(e) => setGameName(e.target.value)}
                  id="outlined-basic"
                  label="Game Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  helperText={
                    error || error2 ? (
                      <span style={{ color: "red" }}>{error || error2}</span>
                    ) : (
                      ""
                    )
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sm={12}
                sx={{
                  "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
                    width: "100%",
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="outlined-basic"
                    label="Created On"
                    margin="normal"
                    disablePast
                    value={dateValue}
                    required
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-basic"
                  label="Game Description"
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                  fullWidth
                  multiline
                  rows={3}
                  helperText={
                    error || error2 ? (
                      <span style={{ color: "red" }}>{error || error2}</span>
                    ) : (
                      ""
                    )
                  }
                  // required
                  onChange={(e) => setGameDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  Upload Image (*Image Size should be less than 200 KB)
                </Typography>
                <Box>
                  <label htmlFor="contained-button-file">
                    <span className="imageFieldPosition">
                      <input
                        className="FlexButton_uploadText"
                        id="contained-button-file"
                        accept="image/*"
                        type="file"
                        style={{ display: "block" }}
                        onChange={(e) => setImageFile?.(e.target.files)}
                      />
                    </span>
                  </label>

                  {imageValidate && (
                    <Alert variant="outlined" severity="error">
                      "Oops!", "Image size should be less than 200 KB"
                    </Alert>
                  )}
                </Box>
              </Grid>
              {/* Game type selection */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl
                    fullWidth
                    style={
                      !imageFile ? { marginTop: "22px" } : { marginTop: "20px" }
                    }
                  >
                    <InputLabel color="secondary" id="demo-simple-select-label">
                      Game Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gameTypes}
                      color="secondary"
                      label="Game Type"
                      onChange={(e) => {
                        setGameTypes(e.target.value);
                      }}
                      
                    >
                      <MenuItem value={"html5"}>HTML5</MenuItem>
                      <MenuItem value={"apk"}>APK</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {/* Conditional file upload section */}
              <Grid item xs={12} md={6} sm={12}>
                {gameTypes === "apk" && (
                  <label>
                    {/* writing the uploaderComponent */}
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Upload Apk
                      </Typography>
                      <input
                        className="FlexButton_uploadText"
                        id="contained-button-file"
                        accept=".apk,.xapk"
                        type="file"
                        style={{ display: "block" }}
                        onChange={(e) => setFileUpload(e.target.files)}
                      />
                    </Box>
                    
                  </label>
                )}
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                {gameTypes === "apk" && (
                  <TextField
                    sx={{ mt: 4 }}
                    id="outlined-basic"
                    label="Game Version"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    // sx={{ mt: 1 }}
                    onChange={(e) => setGameVersion(e.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                {gameTypes === "apk" && (
                  <TextField
                    style={{ marginTop: "17px" }}
                    id="outlined-basic"
                    label="Activity Name"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    onChange={(e) => setName(e.target.value)}
                    helperText={
                      error || error2 ? (
                        <span style={{ color: "red" }}>{error || error2}</span>
                      ) : (
                        ""
                      )
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                {gameTypes === "apk" && (
                  <TextField
                    style={{ marginTop: "16px" }}
                    id="outlined-basic"
                    label="Package Name"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    onChange={(e) => setPackageName(e.target.value)}
                    helperText={
                      error || error2 ? (
                        <span style={{ color: "red" }}>{error || error2}</span>
                      ) : (
                        ""
                      )
                    }
                  />
                )}
              </Grid>
              {/* Switch buttons */}
              <Grid item xs={12} md={6} sm={12}>
                <Typography sx={{ marginTop: "15px" }} variant="h3">
                  Game Type
                </Typography>
                <Typography sx={{ marginTop: "15px" }} variant="h4">
                  New
                  <span>
                    {checked ? (
                      <Switch
                        color="secondary"
                        disabled
                        onChange={(e) => {
                          setNewGameType(e.target.checked);
                          setChecked2(e.target.checked);
                        }}
                      />
                    ) : (
                      <Switch
                        color="secondary"
                        onChange={(e) => {
                          setNewGameType(e.target.checked);
                          setChecked2(e.target.checked);
                        }}
                      />
                    )}
                  </span>{" "}
                </Typography>
                <Typography sx={{ marginTop: "15px" }} variant="h4">
                  Featured{" "}
                  <span>
                    {checked2 ? (
                      <Switch
                        color="secondary"
                        disabled
                        onChange={(e) => {
                          setFeaturedGameType(e.target.checked);
                          setChecked(e.target.checked);
                        }}
                      />
                    ) : (
                      <Switch
                        color="secondary"
                        onChange={(e) => {
                          setFeaturedGameType(e.target.checked);
                          setChecked(e.target.checked);
                        }}
                      />
                    )}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                <Typography sx={{ marginTop: "15px", mb: 2 }} variant="h3">
                  Game Functions (Min. One)
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    sx={{ marginTop: "15px", width: "40%" }}
                    variant="h4"
                  >
                    Single Player{" "}
                    <span>
                      <Switch
                        color="secondary"
                        onChange={(e) => {
                          setSinglePlayer(e.target.checked);
                        }}
                      />
                    </span>
                  </Typography>
                  <Box sx={{ width: "60%" }}>
                    {gameTypes === "html5" && singlePlayer && (
                      <TextField
                        id="outlined-basic"
                        label="HTML5 URL"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        // error={error2}
                        helperText={
                          error2 ? (
                            <span style={{ color: "red" }}>{error2}</span>
                          ) : (
                            ""
                          )
                        }
                        // required
                        onChange={(e) => setHtml5Url(e.target.value)}
                      />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    sx={{ marginTop: "15px", width: "40%" }}
                    variant="h4"
                  >
                    Multi Player{" "}
                    <span>
                      <Switch
                        color="secondary"
                        onChange={(e) => setMultiPlayer(e.target.checked)}
                      />
                    </span>{" "}
                  </Typography>
                  <Box sx={{ width: "60%" }}>
                    {gameTypes === "html5" && multiPlayer && (
                      <TextField
                        id="outlined-basic"
                        label="HTML5 URL"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        // error={error2}
                        helperText={
                          error2 ? (
                            <span style={{ color: "red" }}>{error2}</span>
                          ) : (
                            ""
                          )
                        }
                        // required
                        onChange={(e) => setHtml5Url(e.target.value)}
                      />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    sx={{ marginTop: "15px", width: "40%" }}
                    variant="h4"
                  >
                    Daily Competition{" "}
                    <span>
                      <Switch
                        color="secondary"
                        onChange={(e) => setDailyCompetition(e.target.checked)}
                      />
                    </span>{" "}
                  </Typography>
                  <Box sx={{ width: "60%" }}>
                    {gameTypes === "html5" && dailyCompetition && (
                      <TextField
                        id="outlined-basic"
                        label="HTML5 URL"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        // error={error2}
                        helperText={
                          error2 ? (
                            <span style={{ color: "red" }}>{error2}</span>
                          ) : (
                            ""
                          )
                        }
                        // required
                        onChange={(e) => setHtml5Url(e.target.value)}
                      />
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{ marginTop: "15px", width: "40%" }}
                    variant="h4"
                  >
                    Website{" "}
                    <span>
                      <Switch
                        color="secondary"
                        onChange={(e) => setWebsite(e.target.checked)}
                      />
                    </span>{" "}
                  </Typography>
                  <Box sx={{ width: "60%" }}>
                    {gameTypes === "html5" && website && (
                      <TextField
                        id="outlined-basic"
                        label="HTML5 URL"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        // error={error2}
                        helperText={
                          error2 ? (
                            <span style={{ color: "red" }}>{error2}</span>
                          ) : (
                            ""
                          )
                        }
                        // required
                        onChange={(e) => setHtml5Url(e.target.value)}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {(gameName && date && gameDescription ? (
              <Button
                sx={{ marginTop: "30px" }}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            ) : (
              <Button
                sx={{ marginTop: "30px" }}
                type="submit"
                variant="contained"
                color="secondary"
                disabled
              >
                Submit
              </Button>
            ))}
          </form>
            
        )}
      </MainCard>
    </>
  );
};

export default GameCreation;
