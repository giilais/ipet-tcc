import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import imgNotFoundService from "../../assets/images/notFoundService.jpg";
import ModalNewService from "../ModalNewService/ModalNewService";
import "./NotFoundService.css";

const NotFoundService = () => {
  return (
    <Box justifyContent={"center"} sx={{ mt: 5 }}>
      <Grid container>
        <img
          src={imgNotFoundService}
          alt="By storyset on Freepik"
          className="img-notfoundservice"
        />
      </Grid>

      <Typography
        sx={{ fontFamily: "Montserrat", fontSize: "20px", textAlign: "center" }}
      >
        Nenhum serviço cadastrado!
      </Typography>
      <Grid container justifyContent={"center"}>
        <ModalNewService />
      </Grid>
    </Box>
  );
};

export default NotFoundService;
