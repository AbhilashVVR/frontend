import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
// material-ui
import { useTheme } from "@mui/material/styles";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "ui-component/Logo";
import AuthLogin from "../auth-forms/AuthLogin";
import AuthCardWrapper from "../AuthCardWrapper";
// project imports
import AuthWrapper1 from "../AuthWrapper1";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      //navigate("/admin");
      const user = token ? jwtDecode(token) : {};

      if (user?.id) {
        navigate("/admin");
      }
    } catch (err) {
    } finally {
    }
  }, [navigate]);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;