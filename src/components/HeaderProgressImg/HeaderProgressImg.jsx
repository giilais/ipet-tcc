import React from "react";
import { Box } from "@mui/material";
import imgDogPaw from "../../../src/assests/images/dog-paw.png";
import ProgressBar from "../ProgressBar/ProgressBar";
import "../style.css";

const HeaderProgressImg = () => {
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
        <Box sx={{ width: "70px", height: "70px", mb: 2, mt: 2}}>
          <img
            src={imgDogPaw}
            alt="By storyset on Freepik"
            className="img-dogpaw"
          />
        </Box>

        <ProgressBar />
      </Box>
    </>
  );
};

export default HeaderProgressImg;
