import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormStoreManager = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
        width: "800px",
        pl: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "800px",
          justifyContent: "flex-start",
          mb: 3,
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
                mb: 2,
              }}
            >
              Responsável da loja
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
              Informe os dados da pessoa que tem o nome no contrato social da
              empresa, seja como dona, sócia ou sócia administrativa.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">Nome completo</Typography>
              <br></br>
              <TextField
                id="neighborhood"
                variant="outlined"
                type="text"
                {...register("neighborhood")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">CPF do responsável legal</Typography>
              <br></br>
              <TextField
                id="address"
                variant="outlined"
                type="text"
                {...register("address")}
                sx={{ width: "750px" }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#000000",
                width: "200px",
                height: "45px",
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "15px",
                color: "#FFF",
                mt: 1,
              }}
              onClick={() => navigate("/registerInformationStore")}
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FormStoreManager;
