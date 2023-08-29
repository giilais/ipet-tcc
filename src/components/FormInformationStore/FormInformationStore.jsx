import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormInformationStore = () => {
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
              Informações da loja
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
              Preencha com os dados do seu negócio
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">CNPJ</Typography>
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
              <Typography variant="p">Razão Social</Typography>
              <br></br>
              <TextField
                id="address"
                variant="outlined"
                type="text"
                {...register("address")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">
                Nome da loja (como aparecerá no app)
              </Typography>
              <br></br>
              <TextField
                id="address"
                variant="outlined"
                type="text"
                {...register("address")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">
                Telefone ou celular da loja (como aparecerá no app)
              </Typography>
              <br></br>
              <TextField
                id="address"
                variant="outlined"
                type="text"
                {...register("address")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">Especialidade</Typography>
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
              onClick={() => navigate("/registerPlans")}
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FormInformationStore;
