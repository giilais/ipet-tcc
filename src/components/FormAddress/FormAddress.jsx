import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const FormAddress = () => {
  const { register, handleSubmit, setValue, setFocus } = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // register({ name: 'address', value: data.logradouro });
        setValue("address", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("addressNumber");
      });
  };

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
              }}
            >
              Endereço da loja
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
              Preencha as informações de endereço da sua loja
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box

        >
          <Grid container>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">CEP</Typography>
              <br></br>
              <TextField
                id="cep"
                variant="outlined"
                type="text"
                {...register("cep")}
                onBlur={checkCEP}
                sx={{ width: "750px" }}
              />
              <br></br>
              <a href="https://buscacepinter.correios.com.br/app/endereco/index.php">
                Descubra seu CEP
              </a>
            </Grid>

            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Estado</Typography>
              <br></br>
              <TextField
                id="uf"
                variant="outlined"
                type="text"
                {...register("uf")}
                sx={{ width: "350px" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Cidade</Typography>
              <br></br>
              <TextField
                id="city"
                variant="outlined"
                type="text"
                {...register("city")}
                sx={{ width: "350px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant="p">Bairro</Typography>
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
              <Typography variant="p">Rua</Typography>
              <br></br>
              <TextField
                id="address"
                variant="outlined"
                type="text"
                {...register("address")}
                sx={{ width: "750px" }}
              />
            </Grid>

            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Nº</Typography>
              <br></br>
              <TextField
                id="addressNumber"
                variant="outlined"
                type="text"
                {...register("addressNumber")}
                sx={{ width: "350px" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 4 }}>
              <Typography variant="p">Complemento (opcional)</Typography>
              <br></br>
              <TextField
                id="complement"
                variant="outlined"
                type="text"
                sx={{ width: "350px" }}
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
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FormAddress;
