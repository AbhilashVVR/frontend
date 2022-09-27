import { Typography } from "@mui/material";
import config from "config";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";
import DailyCompetition from "./DailyCompatition";

const AddDailyCompatition = () => {
  const params = useParams();
  const [playerData, setPlayerData] = useState([]);
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    fetch(`${config.apiServer}/game/${params.gameId}/get-game`)
      .then((res) => res.json())
      .then((data) => {
        setGameData(data);
      })
      .catch((err) => {});

    fetch(`${config.apiServer}/dailycomp/get/${params.gameId}`)
      .then((res) => res.json())
      .then((data) => setPlayerData(data.Items))
      .catch((err) => {});
  }, [params.gameId]);

  const datas = playerData.map((data, i) => {
    const temp = {
      sl: i + 1,
      words: data.words,
      answer: data.answer,
      grade: data.grade,
      level: data.level,
      language: data.language,
      createdAt: format(new Date(`${data.createdAt}`), "dd-MMM-yyyy"),
    };
    return temp;
  });

  return (
    <div>
      <DailyCompetition playerData={gameData} />
      <MainCard title="Previously Added" sx={{ mt: 2 }}>
        {playerData.length > 0 ? (
          <MainTable
            titles={[
              "Sl. No.",
              "Words",
              "Answer",
              "Grade",
              "Level",
              "Language",
              "Created On",
            ]}
            data={datas}
          />
        ) : (
          <Typography
            variant="caption"
            sx={{ textAlign: "center" }}
            display="block"
            gutterBottom
          >
            No Data Found
          </Typography>
        )}
      </MainCard>
    </div>
  );
};

export default AddDailyCompatition;
