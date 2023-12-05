import React from "react";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Grid, Typography } from "@mui/material";
import ModalAgenda from "../../components/ModalAgenda/ModalAgenda";
import AgendaCard from "../../components/AgendaCard/AgendaCard";

const MinhaAgenda = () => {
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
            Minha Agenda
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <ModalAgenda />
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <AgendaCard />
      </Grid>
    </>
  );
};

export default MinhaAgenda;
