import { Box, Grid, Typography } from "@mui/material";
import config from "config";
import React, { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

const AllNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`${config.apiServer}/notification/getNotification`)
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);
  return (
    <MainCard title="All Notifications">
      <Grid container spacing={2}>
        {notifications.map((notification) => (
          <Grid item xs={2} sm={6} md={4} key={notification.id}>
            <Box
              sx={{
                border: "1px solid #c1c1c1",
                borderRadius: "10px",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography component="h3" variant="h3">
                {notification.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {notification.notification}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default AllNotifications;
