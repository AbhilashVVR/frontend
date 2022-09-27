import { Box, Button, Switch, Typography } from "@mui/material";
import { IconBolt, IconEdit, IconPlus } from "@tabler/icons";
import config from "config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";
const GameList = () => {
  const [games, setGames] = useState([]);
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    fetch(`${config.apiServer}/game/get-games`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => {});
  }, [enable]);

  const handleSwitch = (e, id) => {
    const value = e.target.checked;
    fetch(`${config.apiServer}/game/${id}/enable-disable-game`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEnable(!enable);
        if (data) {
          swal("Game status Updated !!", "", "success");
        }
      })
      .catch((err) => {});
    setEnable(e.target.checked);
  };
  
  const tempData = games.map((game, i) => {
    const temp = {
      index: i + 1,
      gameImage: (
        <img
          style={{ height: "100px" }}
          src={game?.gameIcon}
          alt={game.gameName}
        />
      ),
      name: game.gameName,

      publishDate: game.createdAt,

      activePlayers: 0,

      gameFunctionality: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* single player */}
          {game.singlePlayer && (
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Typography variant="body2" sx={{ mr: 2, width: "50%" }}>
                Single Player
              </Typography>
              <Box style={{ display: "flex", width: "50%" }}>
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "10px",
                    backgroundColor: "#673AB7",
                    textAlign: "right",
                    marginRight: "10px",
                  }}
                >
                  <Link
                    to={`single-player/${game.id}`}
                    sx={{ cursor: "pointer" }}
                  >
                    <IconPlus color="#fff" />
                  </Link>
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                    borderRadius: "10px",
                    backgroundColor: "#673AB7",
                  }}
                >
                  <Link to={`powerUp/${game.id}`}>
                    <IconBolt color="#fff" />
                  </Link>
                </span>
              </Box>
            </span>
          )}
          {/* multiplayer */}
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            {game.multiPlayer && (
              <>
                <Typography variant="body2" sx={{ mr: 2, width: "50%" }}>
                  Multi Player
                </Typography>
                <Box style={{ display: "flex", width: "50%" }}>
                  <span
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "10px",
                      backgroundColor: "#673AB7",
                      textAlign: "right",
                      margin: "0px 10px",
                    }}
                  >
                    <Link
                      to={`multi-player/${game.id}`}
                      sx={{ cursor: "pointer" }}
                    >
                      <IconPlus color="#fff" />
                    </Link>
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      width: "25px",
                      height: "25px",
                      borderRadius: "10px",
                      backgroundColor: "#673AB7",
                    }}
                  >
                    <Link to={`powerUp/${game.id}`}>
                      <IconBolt color="#fff" />
                    </Link>
                  </span>
                </Box>
              </>
            )}
          </span>
          {/* daily compitation */}
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            {game.dailyCompetition && (
              <>
                <Typography variant="body2" sx={{ mr: 2, width: "50%" }}>
                  Daily Competition
                </Typography>
                <Box style={{ display: "flex", width: "50%" }}>
                  <span
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "10px",
                      backgroundColor: "#673AB7",
                      margin: "0px 10px",
                    }}
                  >
                    <Link
                      to={`dailyCompetition/${game.id}`}
                      sx={{ cursor: "pointer" }}
                    >
                      <IconPlus color="#fff" />
                    </Link>
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      width: "25px",
                      height: "25px",
                      borderRadius: "10px",
                      backgroundColor: "#673AB7",
                    }}
                  >
                    <Link to={`powerUp/${game.id}`}>
                      <IconBolt color="#fff" />
                    </Link>
                  </span>
                </Box>
              </>
            )}
          </span>
          {/* website */}
          {game?.website && (
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ mr: 2, width: "50%" }}>
                Website
              </Typography>
              <Box
                style={{
                  display: "flex",
                  width: "50%",
                }}
              >
                <span
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "10px",
                    backgroundColor: "#673AB7",
                    textAlign: "right",
                    margin: "0px 10px",
                  }}
                >
                  <Link to={`website/${game.id}`} sx={{ cursor: "pointer" }}>
                    <IconPlus color="#fff" />
                  </Link>
                </span>
              </Box>
            </span>
          )}
        </Box>
      ),
      action: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>
            <Switch
              defaultChecked={game.isEnabled ? true : false}
              color="secondary"
              onChange={(e) => handleSwitch(e, game.id)}
            />{" "}
            {game.isEnabled ? "Enable" : "Disable"}
          </span>
          <Link to={`editGame/${game.id}`} style={{ textDecoration: "none" }}>
            <Button sx={{ p: 0 }} color="secondary">
              <IconEdit />
            </Button>
          </Link>
        </Box>
      ),
    };
    return temp;
  });
  return (
    <MainCard title="Game List">
      <MainTable
        titles={[
          "Sl. No.",
          "Game Icon",
          "Game Name",
          "Publish Date	",
          "Active Players	",
          "Game Functionality",
          "Action",
        ]}
        data={tempData}
      />
    </MainCard>
  );
};

export default GameList;
