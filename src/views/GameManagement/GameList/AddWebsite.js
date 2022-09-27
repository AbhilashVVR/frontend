import { Typography } from "@mui/material";
import config from "config";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";
import Website from "./Website";

const AddWebsite = () => {
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

    fetch(`${config.apiServer}/websiteGameQue/get/${params.gameId}`)
      .then((res) => res.json())
      .then((data) => setPlayerData(data.Items))
      .catch((err) => {});
  }, [params.gameId]);

  const dataS = playerData?.map((data, i) => {
    const temp = {
      sl: i + 1,
      words: data?.words,
      answer: data?.answer,
      level: data?.level,
      language: data?.language,
      createdAt: format(new Date(`${data?.createdAt}`), "dd-MMM-yyyy"),
    };
    return temp;
  });

  return (
    <div>
      <Website playerData={gameData} />
      <MainCard title="Previously Added" sx={{ mt: 2 }}>
        {playerData?.length > 0 ? (
          <MainTable
            titles={[
              "Sl. No.",
              "Words",
              "Answer",
              "Level",
              "Language",
              "Created On",
            ]}
            data={dataS}
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

export default AddWebsite;
