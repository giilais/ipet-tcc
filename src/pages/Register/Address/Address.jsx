import React from "react";
import FormAddress from "../../../components/FormAddress/FormAddress";
import Map from "../../../components/Map/Map";
import { Box, LinearProgress, Typography } from "@mui/material";
import imgDogPaw from "../../../../src/assests/images/dog-paw.png";
import "../../style.css";
import { orange } from "@mui/material/colors";

const Address = () => {
  const color = orange[500];

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

        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={40}
            color="primary"
            sx={{ height: "8px", backgroundColor: "#FABF7C" }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
        <FormAddress />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
        <Typography
          variant="p"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "15px",
            color: "#000000",
          }}
        >
          Revise a localização da sua loja.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="p"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 300,
            fontSize: "15px",
            color: "#000000",
          }}
        >
          Voce tambem pode usar o zoom para visualizar melhor.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Map />
      </Box>
    </>
  );
};

export default Address;
