import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import imgDogPaw from "../../../../src/assests/images/dog-paw.png";
import CardsPlans from "../../../components/CardPlans/CardPlans";

const Plans = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box sx={{ width: "70px", height: "70px", mb: 2, mt: 2 }}>
          <img
            src={imgDogPaw}
            alt="By storyset on Freepik"
            className="img-dogpaw"
          />
        </Box>

        <Box sx={{ width: "100%", color: "grey.500" }}>
          <LinearProgress
            variant="determinate"
            value={99}
            color="secondary"
            sx={{ height: "8px" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          mt: 4,
        }}
      >
        <Grid>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 400,
                fontSize: "45px",
                color: "#000000",
                textAlign: "center",
              }}
            >
              Planos iPet
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="p"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "20px",
                color: "#000000",
              }}
            >
              Selecione o plano ideal para sua loja.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <CardsPlans />
    </>
  );
};

export default Plans;
