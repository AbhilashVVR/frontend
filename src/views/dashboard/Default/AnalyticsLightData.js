import PropTypes from "prop-types";

// material-ui
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
} from "@mui/material";
import { IconUsers } from "@tabler/icons";
// project imports
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";

// assets
// import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading, name, value }) => {
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper
          border={false}
          content={false}
          style={{ marginTop: "25px" }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <IconUsers />
            <Typography variant="h4" sx={{ color: "#000", p: 2 }}>
              {name}: {value}
            </Typography>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeLightCard;
