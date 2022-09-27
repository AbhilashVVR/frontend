import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import config from "../../../config";
import "../../Banner/index.css";
import CircularProgress from "@mui/material/CircularProgress";
import "../GameCreation/gameCreationApkfileCss.css";
const EditGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [initialValue, setInitialvalue] = useState({});
  const [gameName, setGameName] = useState(initialValue.gameName);
  const [gameDescription, setGameDescription] = useState(
    initialValue.gameDescription
  );
  const [imageValidate, setImageValidate] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [gameTypes, setGameTypes] = useState('');
  const [FileUpload, setFileUpload] = useState({});
  const [newGameType, setNewGameType] = useState(false);
  const [featuredGameType, setFeaturedGameType] = useState(false);
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [multiPlayer, setMultiPlayer] = useState(false);
  const [dailyCompetition, setDailyCompetition] = useState(false);
  const [website, setWebsite] = useState(false);
  const [html5Link, setHtmlLink] = useState("");
  const [gameVersion, setGameVersion] = useState("");
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [error, setError] = useState("");
  const formData = new FormData();
  const [progress, setProgress] = useState(false);

  const convertBase64 = (file) => {
    const convertImage = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return convertImage;
  };
  const gameCreationValue = {};
  useEffect(() => {
    fetch(`${config.apiServer}/game/${gameId}/get-game`)
      .then((res) => res.json())
      .then((data) => {
        setInitialvalue(data);
        setNewGameType(data.gameType === "New" ? true : false);
        setFeaturedGameType(data.gameType === "Featured" ? true : false);
        setSinglePlayer(data.singlePlayer);
        setMultiPlayer(data.multiPlayer);
        setWebsite(data.website);
        setGameDescription(data.gameDescription);
        setGameName(data.gameName);
        setGameTypes(data.appType);
        setHtmlLink(data.html5Link);
        setGameVersion(data.gameVersion);
      });
  }, [gameId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(true);
    if (imageFile) {
      const file = imageFile[0];
      const appFile = FileUpload[0];

      convertBase64(file).then((image) => {
        // const removeImgVariable = image.split(",")[1];
        const stringLength = image.length - "data:image/png;base64,".length;
        const sizeInBytes =
          4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1000;
        if (sizeInKb < 200) {
          

          if (featuredGameType) {
            gameCreationValue.gameType = "Featured";
          }
          if (newGameType) {
            gameCreationValue.gameType = "New";
          }
          gameCreationValue.gameIcon = image;
          gameCreationValue.singlePlayer = singlePlayer;
          gameCreationValue.multiPlayer = multiPlayer;
          gameCreationValue.dailyCompetition = dailyCompetition;
          gameCreationValue.website = website;
          gameCreationValue.gameDescription = gameDescription;
          gameCreationValue.gameVersion = gameVersion;
          gameCreationValue.packageName = initialValue?.packageName;
          gameCreationValue.actionName = initialValue?.actionName;
          gameCreationValue.html5Link = !html5Link
            ? initialValue.html5Link
            : html5Link;
          gameCreationValue.appType = gameTypes;
          gameCreationValue.gameName = gameName;
          const re = /^[0-9\b]+$/;
          if (re.test(gameName) || re.test(gameDescription)) {
            return setError(
              "Please enter a valid name, it should not contain numbers"
            );
          }
          formData.append("file_path", appFile);
          formData.append("data", JSON.stringify(gameCreationValue));
         
          var header = {
            "Content-Type": "application/json",
            charset: "utf-8",
          };

          axios
            .put(
              `${config.apiServer}/game/${initialValue?.id}/edit-game`,
              formData,
              {
                headers: header,
              }
            )
            .then((res) => {
              setProgress(false);
              if (res.data) {
                
                swal({
                  title: "Game Updated",
                  text: "Game Updated Successfully",
                  icon: "success",
                  button: true,
                }).then((willSuccess) => {
                  if (willSuccess) {
                    navigate("/admin/games/game-list");
                  }
                });
              } else {
                swal({
                  title: "Game Updated Failed",
                  text: "Game Updated Failed",
                  icon: "error",
                  button: true,
                });
              }
            })
            .catch((error) => {});
        } else {
          setImageValidate(true);
          return;
        }
      });
    } else {
      const appFile = FileUpload[0];
          if (featuredGameType) {
            gameCreationValue.gameType = "Featured";
          }
          if (newGameType) {
            gameCreationValue.gameType = "New";
          }
          gameCreationValue.gameIcon = initialValue?.gameIcon;
          gameCreationValue.singlePlayer = singlePlayer;
          gameCreationValue.multiPlayer = multiPlayer;
          gameCreationValue.dailyCompetition = dailyCompetition;
          gameCreationValue.website = website;
          gameCreationValue.gameDescription = gameDescription;
          gameCreationValue.gameVersion = gameVersion;
          gameCreationValue.packageName = initialValue?.packageName;
          gameCreationValue.actionName = initialValue?.actionName;
          gameCreationValue.html5Link = !html5Link
            ? initialValue.html5Link
            : html5Link;
          gameCreationValue.appType = gameTypes;
      gameCreationValue.gameName = gameName;
      
          const re = /^[0-9\b]+$/;
          if (re.test(gameName) || re.test(gameDescription)) {
            return setError(
              "Please enter a valid name, it should not contain numbers"
            );
      }
      if (appFile) { 
        formData.append("file_path", appFile);
      } else {
        gameCreationValue.apkLink = initialValue?.apkLink;
      }
          console.log(gameCreationValue);
          formData.append("data", JSON.stringify(gameCreationValue));

          var header = {
            "Content-Type": "application/json",
            charset: "utf-8",
          };

          axios
            .put(
              `${config.apiServer}/game/${initialValue?.id}/edit-game`,
              formData,
              {
                headers: header,
              }
            )
            .then((res) => {
              setProgress(false);
              if (res.data) {
                swal({
                  title: "Game Updated",
                  text: "Game Updated Successfully",
                  icon: "success",
                  buttons: true,
                }).then((willSuccess) => {
                  if (willSuccess) {
                    navigate("/admin/games/game-list");
                  }
                });
              } else {
                swal({
                  title: "Game Updated Failed",
                  text: "Game Updated Failed",
                  icon: "error",
                  button: true,
                });
              }
            })
            .catch((error) => {});
    }
  };

  return (
    <>
      <MainCard title="Game Edit">
        {progress ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={initialValue?.gameName || ""}
                  helperText={
                    error ? <span style={{ color: "red" }}>{error}</span> : ""
                  }
                  disabled
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
                    disabled
                    defaultValue={initialValue?.createdAt}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(e) => e.preventDefault()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                  defaultValue={initialValue?.gameDescription}
                  fullWidth
                  multiline
                  rows={3}
                  helperText={
                    error ? <span style={{ color: "red" }}>{error}</span> : ""
                  }
                  required
                  onChange={(e) => setGameDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    Upload Image (*Image Size should be less than 200 KB)
                  </Typography>
                  <label htmlFor="contained-button-file">
                    <span className="imageFieldPosition">
                      <input
                        className="FlexButton_uploadText"
                        id="contained-button-file"
                        accept="image/*"
                        type="file"
                        style={{ display: "block" }}
                        onChange={(e) => setImageFile(e.target.files)}
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
              {/* Apk type selection */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant="caption" display="block" gutterBottom>
                      Game Type
                    </Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gameTypes || ""}
                      color="secondary"
                      onChange={(e) => {
                        setGameTypes(e.target.value);
                      }}
                      required
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
                    defaultValue={initialValue?.gameVersion}
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
                    disabled
                    defaultValue={initialValue?.actionName}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                {gameTypes === "apk" && (
                  <TextField
                    style={{ marginTop: "17px" }}
                    id="outlined-basic"
                    label="Package Name"
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    disabled
                    defaultValue={initialValue?.packageName}
                  />
                )}
              </Grid>
              {/* Switch buttons */}
              <Grid item xs={12} md={6} sm={12}>
                <Typography sx={{ marginTop: "15px" }} variant="h3">
                  Game Type
                </Typography>
                <Typography sx={{ marginTop: "15px" }} variant="h4">
                  New{" "}
                  <span>
                    {(initialValue?.gameType === "New" ||
                      initialValue?.gameType === "html5") && (
                        <Switch
                          color="secondary"
                          defaultChecked
                          disabled={checked2}
                          onChange={(e) => {
                            setNewGameType(e.target.checked);
                            setChecked(e.target.checked);
                          }}
                        />
                      )}
                    
                  </span>{" "}
                </Typography>
                <Typography sx={{ marginTop: "15px" }} variant="h4">
                  Featured{" "}
                  <span>
                    {initialValue?.gameType === "Featured" && (
                      <Switch
                        color="secondary"
                        defaultChecked
                        disabled={checked2}
                        onChange={(e) => {
                          setFeaturedGameType(e.target.checked);
                        }}
                      />
                    )}
                    {initialValue?.gameType !== "Featured" && (
                      <Switch
                        color="secondary"
                        disabled={checked}
                        onChange={(e) => {
                          setFeaturedGameType(e.target.checked);
                          setChecked2(e.target.checked);
                        }}
                      />
                    )}
                  </span>{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                <Typography sx={{ marginTop: "15px", mb: 1 }} variant="h3">
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
                      {initialValue.singlePlayer && (
                        <Switch
                          defaultChecked
                          color="secondary"
                          onChange={(e) => setSinglePlayer(e.target.checked)}
                        />
                      )}
                      {!initialValue.singlePlayer && (
                        <Switch
                          color="secondary"
                          onChange={(e) => setSinglePlayer(e.target.checked)}
                        />
                      )}
                    </span>{" "}
                  </Typography>
                  <Box sx={{ width: "60%" }}>
                    {gameTypes === "html5" && singlePlayer && (
                      <TextField
                        id="outlined-basic"
                        label="HTML5 URL"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        onChange={(e) => {
                          setHtmlLink(e.target.value);
                        }}
                        defaultValue={initialValue?.html5Link}
                        required
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
                      {initialValue.multiPlayer && (
                        <Switch
                          defaultChecked
                          color="secondary"
                          onChange={(e) => setMultiPlayer(e.target.checked)}
                        />
                      )}
                      {!initialValue.multiPlayer && (
                        <Switch
                          color="secondary"
                          onChange={(e) => setMultiPlayer(e.target.checked)}
                        />
                      )}
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
                        onChange={(e) => {
                          setHtmlLink(e.target.value);
                        }}
                        defaultValue={initialValue?.html5Link}
                        required
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
                      {initialValue.dailyCompetition && (
                        <Switch
                          defaultChecked
                          color="secondary"
                          onChange={(e) =>
                            setDailyCompetition(e.target.checked)
                          }
                        />
                      )}
                      {!initialValue.dailyCompetition && (
                        <Switch
                          color="secondary"
                          onChange={(e) =>
                            setDailyCompetition(e.target.checked)
                          }
                        />
                      )}
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
                        onChange={(e) => {
                          setHtmlLink(e.target.value);
                        }}
                        defaultValue={initialValue?.html5Link}
                        required
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
                    Website
                    <span>
                      {initialValue.website && (
                        <Switch
                          defaultChecked
                          color="secondary"
                          onChange={(e) => setWebsite(e.target.checked)}
                        />
                      )}
                      {!initialValue.website && (
                        <Switch
                          color="secondary"
                          onChange={(e) => setWebsite(e.target.checked)}
                        />
                      )}
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
                        onChange={(e) => {
                          setHtmlLink(e.target.value);
                        }}
                        defaultValue={initialValue?.html5Link}
                        required
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {
              <Button
                sx={{ marginTop: "30px" }}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            }
          </form>
        )}
      </MainCard>
    </>
  );
};

export default EditGame;
