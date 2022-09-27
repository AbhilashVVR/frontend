import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
// import PopularCard from './PopularCard';
import AnalyticsData from "./AnalyticsData";
import AnalyticsLightData from "./AnalyticsLightData";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from "store/constant";
import config from "config";
import axios from "axios";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    axios.get(`${config.apiServer}/analytics`).then((res) => {
      if (res.data?.Items) {
        setAnalytics(res.data?.Items);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} analytics={analytics} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard
              isLoading={isLoading}
              analytics={analytics}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              {/* <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard isLoading={isLoading} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeLightCard isLoading={isLoading} />
                </Grid> */}
              {/* {analytics.map((analytic, index) => {
                  console.log("ANALYTICS",analytic);
                  return (
                    <Grid item xs={12} md={12} key={index}>
                      <AnalyticsData
                        name="New User"
                        value={analytic.newUser}
                        isLoading={isLoading}
                      />
                      <AnalyticsLightData
                        name="Guest User"
                        value={analytic.guestUser}
                        isLoading={isLoading}
                      />
                      <AnalyticsData
                        name="Verified User"
                        value={analytic.verfiedUser}
                        isLoading={isLoading}
                      />
                      <AnalyticsLightData
                        name="Total User"
                        value={analytic.totalUser}
                        isLoading={isLoading}
                      />
                    </Grid>
                  );
                })} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* {analytics.map((analytic, index) => {
              return (
                <Grid item xs={12} md={12} key={index}>
                  <AnalyticsData
                    name="New User"
                    value={analytic.newUser}
                    isLoading={isLoading}
                  />
                  <AnalyticsLightData
                    name="Guest User"
                    value={analytic.guestUser}
                    isLoading={isLoading}
                  />
                  <AnalyticsData
                    name="Verified User"
                    value={analytic.verfiedUser}
                    isLoading={isLoading}
                  />
                  <AnalyticsLightData
                    name="Total User"
                    value={analytic.totalUser}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })} */}
          {/* <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid> */}
          {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
