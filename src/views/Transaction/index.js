import { Button } from "@mui/material";
import format from "date-fns/format";
import React, { useEffect, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import MainCard from "ui-component/cards/MainCard.js";
import SubCard from "ui-component/cards/SubCard.js";
import MainTable from "ui-component/table/Maintable.js";
import config from "../../config.js";
import Filter from "./filter.js";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    fetch(`${config.apiServer}/purchase/getPurchase`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  }, []);

  const tempData = transactions.map((transaction, i) => {
    const temp = {
      sl: i + 1,
      purchaseId: transaction.id,
      userId: transaction.userId,
      coinPackageId: transaction.coinPackageId,
      transactionId: transaction.transactionId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: format(new Date(transaction.createdAt), "dd-MM-yyyy"),
    };
    return temp;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const filerIdArray = transactions.filter(
        (transaction) => transaction.userId === id
      );
      if (filerIdArray) {
        setTransactions(filerIdArray);
      }
    }
  };
  const handleId = (e) => setId(e.target.value);

  const handleClick = () => {
    fetch(`${config.apiServer}/purchase/getPurchase`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  };
  return (
    <MainCard
      title="Purchase"
      secondary={
        <Button variant="contained" color="secondary">
          <CSVDownloader
            data={transactions}
            filename="Purchase Detail"
            type="link"
          >
            Export
          </CSVDownloader>
        </Button>
      }
    >
      <SubCard sx={{ mb: 3 }} title="Filter">
        <Filter
          handleSubmit={handleSubmit}
          handleClick={handleClick}
          handleId={handleId}
        />
      </SubCard>
      <SubCard title="Purchase List">
        <MainTable
          data={tempData}
          titles={[
            "Sl. No.",
            "Purchase Id",
            "User Id",
            "Coin Package Id",
            "Transaction Id",
            "Amount",
            "Status",
            "Create Time",
          ]}
        />
      </SubCard>
    </MainCard>
  );
};

export default Transaction;
