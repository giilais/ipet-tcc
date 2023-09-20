import React from "react";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Grid, Typography } from "@mui/material";
import ModalNewService from "../../components/ModalNewService/ModalNewService";
import CardService from "../../components/CardService/CardService";

const RegisterService = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Grid container>
        <Grid item xs={10}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: "35px",
              fontWeight: 700,
              padding: 2,
              color: "#000000",
            }}
          >
            Cadastros de Serviços
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <ModalNewService />
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <CardService/>
      </Grid>
    </>
  );
};

export default RegisterService;
