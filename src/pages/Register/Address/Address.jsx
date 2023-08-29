import React from "react";
import FormAddress from "../../../components/FormAddress/FormAddress";
import HeaderProgressImg from "../../../components/HeaderProgressImg/HeaderProgressImg";
import Map from "../../../components/Map/Map";
import { Box, Typography } from "@mui/material";

const Address = () => {
  return (
    <>
      <HeaderProgressImg />
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Map />
      </Box>
    </>
  );
};

export default Address;
