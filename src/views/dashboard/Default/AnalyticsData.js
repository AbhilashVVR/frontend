import PropTypes from "prop-types";

// material-ui
import { styled } from "@mui/material/styles";
import {IconUsers} from "@tabler/icons";
import {

  Box,
  
  Typography,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";

// assets
// import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const AnalyticsData = ({ isLoading,name,value }) => {
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} style={{marginTop:"25px"}}>
            <Box sx={{ p: 2,display:"flex",alignItems:"center" }}>
              <IconUsers />
            <Typography variant="h4" sx={{ color: "#fff", p: 2 }}>
              {name}: {value}
            </Typography>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

AnalyticsData.propTypes = {
  isLoading: PropTypes.bool,
};

export default AnalyticsData;
