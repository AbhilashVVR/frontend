import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { IconEdit } from "@tabler/icons";
import config from "config";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";

const PowerUp = () => {
  const { gameId } = useParams();
  const [previous, setPrevious] = useState([]);
  const [mainGame, setMainGame] = useState([]);
  // from data
  const [powerUp, setPowerUp] = useState("");
  const [coin, setCoin] = useState("");
  const [limitCount, setLimitCount] = useState("");
  const [onOff, setOnOff] = useState(false);
  const [iap, setIap] = useState(false);
  const [buyingLimit, setBuyingLimit] = useState(false);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    fetch(`${config.apiServer}/game/${gameId}/get-game`)
      .then((res) => res.json())
      .then((data) => setMainGame(data))
      .catch((err) => {});

    fetch(`${config.apiServer}/power-ups/get-powerup/${mainGame.id}`)
      .then((res) => res.json())
      .then((data) => setPrevious(data.Items))
      .catch((err) => {});
  }, [gameId, mainGame.id, updated]);
  // Table data
  let tempData;
  if (previous.length > 0) {
    tempData = previous.map((game, i) => {
      const temp = {
        index: i + 1,
        powerName: game.powerName,
        coins: game.coins,
        enable: game.isEnable ? "True" : "False",
        iap: game.isIAP ? "True" : "False",
        buyingLimit: game.isBuyingLimit ? "True" : "False",
        limitCount: game.limitCount,
        edit: (
          <Link to={`editPowerUp/${game.id}`}>
            <Button>
              <IconEdit />
            </Button>
          </Link>
        ),
      };
      return temp;
    });
  }
  // handle form data
  const handlePowerUp = (e) => {
    setPowerUp(e.target.value);
  };
  const handleCoin = (e) => {
    setCoin(e.target.value);
  };
  const handleNumber = (e) => {
    setLimitCount(e.target.value);
  };
  // handle form submit
  const handleSubmit = (e) => {
    const formData = {
      coins: coin,
      gameId: mainGame.id,
      gameName: mainGame.gameName,
      isBuyingLimit: buyingLimit,
      isEnable: onOff,
      isIAP: iap,
      limitCount: limitCount,
      powerName: powerUp,
    };
    fetch(`${config.apiServer}/power-ups/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          swal("Success", "Power Up Added Successfully", "success");
          setUpdated(true);
        }
      });
    e.preventDefault();
    e.target.reset();
  };
  return (
    <React.Fragment>
      <MainCard
        title="Power-Up Single-Player (update in In App Purchases)"
        sx={{ marginBottom: "20px" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={mainGame.gameName}
                variant="outlined"
                disabled
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Power Up"
                variant="outlined"
                required
                color="secondary"
                onBlur={(e) => {
                  handlePowerUp(e);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Coins"
                variant="outlined"
                fullWidth
                required
                color="secondary"
                type={"number"}
                onBlur={(e) => {
                  handleCoin(e);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={onOff} color="secondary" />}
                  label="ON/OFF"
                  onClick={(e) => {
                    setOnOff(e.target.checked);
                  }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={iap} color="secondary" />}
                  label="IAP?"
                  onClick={(e) => {
                    setIap(e.target.checked);
                  }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={3}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={buyingLimit} color="secondary" />}
                  label="Buying Limit"
                  onClick={(e) => {
                    setBuyingLimit(e.target.checked);
                  }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="1"
                variant="outlined"
                fullWidth
                type={"number"}
                color="secondary"
                required
                onChange={handleNumber}
              />
            </Grid>
            <Grid item xs={3}>
              {powerUp && coin && limitCount ? (
                <Button variant="contained" type="submit" color="secondary">
                  Create
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  type="submit"
                  color="secondary"
                >
                  Create
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </MainCard>

      {/* Table */}
      <MainCard
        title="Previously Added
    "
      >
        {previous.length > 0 && (
          <MainTable
            titles={[
              "Sr. No.",
              "Power Name",
              "Coins",
              "Enable",
              "IAP",
              "BuyingLimit",
              "Limit Count",
              "Edit",
            ]}
            data={tempData}
          />
        )}
      </MainCard>
    </React.Fragment>
  );
};

export default PowerUp;
