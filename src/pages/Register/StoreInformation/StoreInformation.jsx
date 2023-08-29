import React from "react";
import FormInformationStore from "../../../components/FormInformationStore/FormInformationStore";
import { Box, LinearProgress } from "@mui/material";
import imgDogPaw from "../../../../src/assests/images/dog-paw.png";

const StoreInformation = () => {
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
            value={75}
            color="secondary"
            sx={{ height: "8px" }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 7, mb: 3 }}>
        <FormInformationStore />
      </Box>
    </>
  );
};

export default StoreInformation;
