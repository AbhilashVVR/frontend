import { Button } from "@mui/material";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";
import config from "../../config.js";
import { CSVDownloader } from "react-papaparse";
const QueryManager = () => {
  const [query, setQuery] = useState([]);

  useEffect(() => {
    fetch(`${config.apiServer}/query/getQuery`)
      .then((res) => res.json())
      .then((data) => {
        setQuery(data);
      });
  }, []);

  const tempData = query.map((q, i) => {
    return {
      sl: i + 1,
      userUniqueId: q.userUniqueId,
      topic: q.topic,
      message: q.message,
      createdAt: format(new Date(q.createdAt), "dd-MM-yyyy"),
    };
  });
  return (
    <>
      <MainCard
        title="All Query List"
        secondary={
          <CSVDownloader
            data={tempData}
            filename={"Query List"}
            bom={true}
            // type="button"
          >
            <Button variant="contained" color="secondary">
              Download
            </Button>
          </CSVDownloader>
        }
      >
        <MainTable
          data={tempData}
          titles={["Sl .No", "userUniqueId", "Title", "Message", "Created On"]}
        />
      </MainCard>
    </>
  );
};

export default QueryManager;
