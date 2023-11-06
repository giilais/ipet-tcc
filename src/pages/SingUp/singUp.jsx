import React from "react";

import { Grid, Box } from "@mui/material";

import logo from "../../assests/images/login.jpg";

import "./singUp.css";
import CardSingUp from "../../components/CardSingUp/CardSingUp";

const SingUp = () => {
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
            paddingLeft: "50px",
          }}
        >
          <CardSingUp />
        </Grid>
        <Grid
          item
          xs={6}
          container
          sx={{ justifyContent: "center", alignContent: "flex-end" }}
        >
          <img src={logo} className="logo-login" alt=""></img>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingUp;
