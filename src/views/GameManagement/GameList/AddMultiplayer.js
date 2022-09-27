import { Typography } from "@mui/material";
// import { IconCheck } from "@tabler/icons";
import config from "config";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";
import Multiplayer from "./Multiplayer";

const AddMultiplayer = () => {
  const params = useParams();
  const [playerData, setPlayerData] = useState([]);
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    fetch(`${config.apiServer}/game/${params.gameId}/get-game`)
      .then((res) => res.json())
      .then((data) => {
        setPlayerData(data);
      })
      .catch((err) => {});
    fetch(`${config.apiServer}/singleque/get/${params.gameId}`)
      .then((res) => res.json())
      .then((data) => {
        setPreviousData(data.Items);
      });
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
      <Multiplayer playerData={playerData} />
      <MainCard title="Previously Added" sx={{ mt: 2 }}>
        {previousData.length > 0 ? (
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

export default AddMultiplayer;
