import React from "react";

import { Grid, Box } from "@mui/material";

import logo from "../../assests/images/login.jpg";
import "./login.css";
import CardLogin from "../../components/CardLogin/CardLogin";

const Login = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          container
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CardLogin />
        </Grid>
        <Grid
          item
          xs={6}
          container
          sx={{ justifyContent: "center", alignContent: "flex-end" }}
        >
          <img
            src={logo}
            className="logo-login"
            alt="Imagem logo da Ipet"
          ></img>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
