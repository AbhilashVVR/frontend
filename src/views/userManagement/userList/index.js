import { Button } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import config from "config";
import React, { useEffect, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${config.apiServer}/user`)
      .then((res) => res.json())
      .then((data) => {
        const temp = data.map((user) => {
          return {
            uniqueId: user.uniqueId,
            name: `${user.firstName} ${user.lastName ? user.lastName : ""}`,
            userName: user.userName,
            mobileNumber: user.mobileNumber,
            email: user.email,
            grade: user.grade,
            action: (
              <Button
                color="secondary"
                onClick={() => navigate(`/admin/users/edit-user/${user.id}`)}
              >
                {<IconEdit />}
              </Button>
            ),
          };
        });
        setUsers(temp);
      })
      .catch((err) => {});
  }, [navigate]);

  return (
    <div>
      <MainCard
        title="User Creation"
        secondary={
          <CSVDownloader filename={"Users List"} bom={true} data={users}>
            <Button variant="contained" color="secondary">
              Download
            </Button>
          </CSVDownloader>
        }
      >
        <MainTable
          titles={[
            "Unique Id",
            "Name",
            "UserName",
            "Mobile Number",
            "Email",
            "Grade",
            "Action",
          ]}
          data={users}
        />
      </MainCard>
    </div>
  );
};

export default UserList;
