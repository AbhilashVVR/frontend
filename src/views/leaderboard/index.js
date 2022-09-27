import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import config from "config";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";

const LeaderBoard = () => {
  const [time, setTime] = useState("");
  const [data, setData] = useState([]);
  const [game, setGame] = useState("");
  const [games, setGames] = useState([]);
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleGame = (e) => {
    setGame(e.target.value);
  };
  // Load game data
  useEffect(() => {
    fetch(`${config.apiServer}/game/get-games`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  //   load data by time
  useEffect(() => {
    time &&
      game &&
      fetch(`${config.apiServer}/leaderboard/${time}/${game}`)
        .then((res) => res.json())
        .then((data) => setData(data.leaderboard));
  }, [time, game]);
  const tempData = data.map((transaction, i) => {
    const temp = {
      index: i + 1,
      userName: transaction.userName,
      email: transaction.usermail,
      score: transaction.score,
      lastUpdatedDate: format(new Date(transaction.updatedAt), "dd-MM-yyyy"),
    };
    return temp;
  });
  return (
    <React.Fragment>
      <MainCard title="Leader Board">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl color="secondary" sx={{ width: "250px" }}>
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Time"
                  onChange={handleTime}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="lifetime">Life Time</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl color="secondary" sx={{ width: "250px" }}>
                <InputLabel id="demo-simple-select-label">Game Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={game}
                  label="Game Type"
                  onChange={handleGame}
                >
                  {games.map((gameDetails) => (
                    <MenuItem key={gameDetails.id} value={gameDetails.id}>
                      {gameDetails.gameName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
      {/* data table */}
      <MainCard title="LeaderBoard Table" sx={{ mt: 5 }}>
        {data.length > 0 ? (
          <MainTable
            titles={[
              "Rank",
              "User Name",
              "Email",
              "Score",
              "Last updated date",
            ]}
            data={tempData}
          ></MainTable>
        ) : (
          <Box sx={{ textAlign: "center" }}>No data found</Box>
        )}
      </MainCard>
    </React.Fragment>
  );
};

export default LeaderBoard;
