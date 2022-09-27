import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import config from "config";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";

const EditPowerUp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { powerupId } = useParams();
  const [powerUp, setPowerUp] = useState({});
  const [onOff, setOnOff] = useState(false);
  const [iap, setIap] = useState(false);
  const [buyingLimit, setBuyingLimit] = useState(false);
  const [coin, setCoin] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameName, setGameName] = useState("");
  const [limitCount, setLimitCount] = useState("");
  const [powerName, setPowerName] = useState("");
  // navigate to game list
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.apiServer}/power-ups/getPowerUpById/${powerupId}`)
      .then((res) => res.json())
      .then((data) => {
        setCoin(data.coins);
        setGameId(data.gameId);
        setGameName(data.gameName);
        setPowerUp(data);
        setOnOff(data.isEnable);
        setIap(data.isIAP);
        setBuyingLimit(data.isBuyingLimit);
        setOnOff(data.isEnable);
        setLimitCount(data.limitCount);
        setPowerName(data.powerName);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [powerupId]);

  // handle form data
  const handleEnable = (e) => {
    setOnOff(e.target.checked);
  };
  const handleIAP = (e) => {
    setIap(e.target.checked);
  };
  const handleBuyLimit = (e) => {
    setBuyingLimit(e.target.checked);
  };
  const handlePowerName = (e) => {
    setPowerName(e.target.value);
  };
  const handleCoin = (e) => {
    setCoin(e.target.value);
  };
  const handleLimit = (e) => {
    setLimitCount(e.target.value);
  };
  // handle submit
  const handleSubmit = (e) => {
    const formData = {
      coins: coin,
      gameId: gameId,
      gameName: gameName,
      id: powerupId,
      isBuyingLimit: buyingLimit,
      isEnable: onOff,
      isIAP: iap,
      limitCount: limitCount,
      powerName: powerName,
    };
    fetch(`${config.apiServer}/power-ups/${powerupId}/update-power-up`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          swal("Update Successfully");
          navigate("/admin/games/game-list");
        }
      })
      .catch((err) => {});
    e.preventDefault();
  };
  return (
    <MainCard
      title="Power-Up Single-Player (update in In App Purchases)
    "
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="game name"
                label={powerUp.gameName}
                variant="outlined"
                disabled
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} />

            <Grid item xs={2}>
              <TextField
                id="power name"
                variant="outlined"
                defaultValue={powerUp.powerName}
                onChange={handlePowerName}
                required
                fullWidth
                color="secondary"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="coins"
                variant="outlined"
                defaultValue={powerUp?.coins}
                onChange={handleCoin}
                required
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      disabled
                      onChange={handleEnable}
                      checked={onOff}
                    />
                  }
                  label="On/Off?"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      onChange={handleIAP}
                      checked={iap}
                    />
                  }
                  label="IAP?"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      onClick={handleBuyLimit}
                      checked={buyingLimit}
                    />
                  }
                  label="Buying Limit"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="limit"
                variant="outlined"
                defaultValue={powerUp?.limitCount}
                onChange={handleLimit}
                required
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button color="secondary" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </MainCard>
  );
};

export default EditPowerUp;
